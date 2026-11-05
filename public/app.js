(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const el = (tag, cls, value) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (value !== undefined) n.textContent = value;
    return n;
  };
  const normalize = (v) => String(v || '').normalize('NFKC').toLowerCase()
    .replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60))
    .replace(/[・\s\-_ー]/g, '');
  let db = null;
  let activeFilter = 'すべて';
  const groupById = (id) => db.groups.find(g => g.id === id);
  const categoryMatches = (b) => activeFilter === 'すべて' || b.category === activeFilter;
  function link(href, label) {
    const a = el('a','source',label);
    a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer';
    return a;
  }
  function sectionDetailFor(group, items) {
    const card = el('article','group-card');
    const heading = el('div','group-heading');
    const dot = el('span','group-dot');dot.style.background = group.accent;
    const top = el('div'); top.append(el('h3','',group.name),el('p','group-company',group.company));
    heading.append(dot,top);card.append(heading,el('p','group-summary',group.summary));
    const pillWrap = el('div','brand-list');
    items.forEach(item => {
      const button = el('button','brand-pill',item.name);button.type='button';
      button.addEventListener('click',()=>{$('search').value=item.name;update();$('search').focus();window.scrollTo({top:220,behavior:'smooth'});});
      pillWrap.append(button);
    });card.append(pillWrap);
    if(group.events.length){const details=el('details','history'),summary=el('summary','', '成り立ちを少し見る'),list=el('ul');group.events.forEach(e=>list.append(el('li','',`${e.year}年 — ${e.text}`)));details.append(summary,list);card.append(details);}
    const bottom=el('div','group-bottom');bottom.append(link(group.source,'公式情報を確認 ↗'),el('span','group-date',`確認 ${group.checked}`));card.append(bottom);
    return card;
  }
  function resultFor(item){
    const g=groupById(item.group),card=el('article','result-card');
    card.style.borderTop=`4px solid ${g.accent}`;
    card.append(el('div','result-label',`${item.category} / 所属するグループ`),el('h3','',item.name),el('div','result-group',g.name));
    card.append(el('p','result-operator',`運営：${item.operator || '公式情報をご確認ください'}`));
    const row=el('div','detail-row');row.append(el('span','mini-tag','同じグループ'));const siblings=db.brands.filter(b=>b.group===item.group&&b.name!==item.name).slice(0,5);
    siblings.forEach(b=>{const button=el('button','brand-pill',b.name);button.type='button';button.addEventListener('click',()=>{$('search').value=b.name;update();});row.append(button);});card.append(row);
    const actions=el('div','result-actions');actions.append(link(item.source,'出典を見る ↗'));
    const share=el('button','share','リンクをコピー');share.type='button';share.addEventListener('click',async()=>{
      const u=new URL(location.href);u.searchParams.set('q',item.name);
      try{await navigator.clipboard.writeText(u.href);share.textContent='コピーしました';setTimeout(()=>share.textContent='リンクをコピー',1800);}catch{share.textContent='コピーに失敗しました';}
    });actions.append(share);card.append(actions);return card;
  }
  function update(){
    if(!db)return;
    const q=normalize($('search').value.trim());$('clear').hidden=!q;
    document.querySelectorAll('[data-filter]').forEach(b=>{const selected=b.dataset.filter===activeFilter;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));});
    const matched=q?db.brands.filter(b=>categoryMatches(b)&&[b.name,...(b.aliases||[]),groupById(b.group).name].some(v=>normalize(v).includes(q))):[];
    const area=$('results');area.replaceChildren();area.classList.toggle('show',!!q);
    $('section-heading').textContent=q?'検索結果':'グループから眺める';
    if(q){
      if(matched.length){const grid=el('div','results-grid');matched.forEach(b=>grid.append(resultFor(b)));area.append(grid);}
      else area.append(el('div','empty','一致するお店が見つかりません。未登録のブランドかもしれません。'));
    }
    const groups=$('groups');groups.replaceChildren();let visible=0;
    db.groups.forEach(g=>{const brands=db.brands.filter(b=>b.group===g.id&&categoryMatches(b));if(!brands.length)return;
      if(q&&!matched.some(b=>b.group===g.id))return;
      groups.append(sectionDetailFor(g,brands));visible+=brands.length;
    });
    $('count').textContent=q?`${matched.length}件`:`${db.groups.length}グループ・${visible}ブランド表示`;
    const params=new URL(location.href);if(q)params.searchParams.set('q',$('search').value.trim());else params.searchParams.delete('q');
    if (location.protocol === 'http:' || location.protocol === 'https:') { history.replaceState(null,'',params.pathname+params.search+params.hash); }
  }
  // Give long group lists a return path without changing the search or filter state.
  const backToTop = $('back-to-top');
  if (backToTop) {
    const updateBackToTop = () => { backToTop.hidden = window.scrollY < 450; };
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    backToTop.addEventListener('click', () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    updateBackToTop();
  }
  document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{activeFilter=b.dataset.filter;update();}));
  $('search').addEventListener('input',update);$('clear').addEventListener('click',()=>{$('search').value='';update();$('search').focus();});
  fetch('./data.json').then(r=>{if(!r.ok)throw Error('Failed to fetch data');return r.json();}).then(data=>{
    db=data;$('updated').textContent=`データ更新日：${data.updated}　／　${data.notice}`;
    $('search').value=new URLSearchParams(location.search).get('q')||'';update();
  }).catch(err=>{$('results').classList.add('show');$('results').append(el('div','empty','データを読み込めませんでした。ページを再読み込みしてください。'));console.error(err);});
})();
