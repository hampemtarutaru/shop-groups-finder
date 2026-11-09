// K-089: SEO PoC, intentionally writes OUTSIDE public/ so Cloudflare Pages does not deploy it.
// Usage: node scripts/seo_group_poc.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const db=JSON.parse(readFileSync(join(root,'public','data.json'),'utf8'));
const sampleIds=["zensho","skylark","usmh"];
function esc(x){return String(x??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function safeExternal(u){try{const v=new URL(String(u??""));return v.protocol==="https:"?v.href:"";}catch{return"";}}
function render(g,brands){
  if(!/^[a-z0-9-]{1,80}$/.test(g.id))throw Error("invalid group slug");
  if(!brands.length)throw Error("missing brands "+g.id);
  const title=g.name+"の系列店・運営企業｜この店、どこの系列？";
  const description=`${g.name}の運営企業と登録ブランド${brands.length}件を公式情報から調査。${g.summary||""}`.slice(0,150);
  const lnk=(u,t)=>safeExternal(u)?`<a href="${esc(safeExternal(u))}" target="_blank" rel="noopener noreferrer">${esc(t)}</a>`:esc(t);
  const list=[...brands].sort((a,b)=>a.name.localeCompare(b.name,"ja")).map(b=>`      <li><a href="/?q=${encodeURIComponent(b.name)}">${esc(b.name)}</a> <span class="operator">${esc(b.operator||"")}</span>${safeExternal(b.source)?` <small>(${lnk(b.source,"公式情報")})</small>`:""}</li>`).join("\n");
  const history=Array.isArray(g.events)&&g.events.length?`<details><summary>企業グループの主な沿革</summary><ul>${g.events.map(e=>`<li>${esc(e.year)}年 — ${esc(e.text)}</li>`).join("")}</ul></details>`:"";
  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <meta name="description" content="${esc(description)}">
  <title>${esc(title)}</title>
  <style>body{font-family:system-ui,"Hiragino Sans",Meiryo,sans-serif;margin:0;background:#f5f4f0;color:#23342f;line-height:1.85}main{max-width:760px;margin:auto;padding:28px 20px 60px}header,footer{padding:14px 20px;background:#e8eee8}header>div,footer>div{max-width:760px;margin:auto}a{color:#245f52}h1{line-height:1.4;font-size:clamp(25px,4vw,34px)}li{padding:4px 0}.sub{color:#53665c}.operator{font-size:12px;color:#566c60}small{font-size:12px}.notice{border-left:3px solid #245f52;padding:12px;background:white}details{margin-top:24px}footer{font-size:13px}a:focus-visible{outline:3px solid #245f52}</style>
</head>
<body>
<header><div><a href="/">この店、どこの系列？</a> ／ 企業グループ紹介</div></header>
<main>
  <p class="sub">非公式・自動生成の試験ページ（検索対象外）</p>
  <h1>${esc(g.name)}</h1>
  <p><strong>運営・グループ主体：</strong>${esc(g.company)}</p>
  <p>${esc(g.summary)}</p>
  <p class="sub">情報確認日：${esc(g.checked)} ／ このグループに掲載したブランド：${brands.length}件</p>
  <h2>掲載ブランド・店舗名</h2>
  <ul>
${list}
  </ul>
  ${history}
  <p><strong>主な出典：</strong>${lnk(g.source,"企業の公式情報を開く")}</p>
  <p class="notice">このページは登録済み情報の一部をまとめたものです。グループの分類は便宜上のもので、全ブランドが同一法人の直営店であることや100%子会社であることを示しません。加盟店や地域別の運営主体、企業の合併・譲渡などで情報が変わることがあります。</p>
  <p><a href="/">店名検索に戻る</a></p>
</main>
<footer><div>運営：<a href="https://company.hampemtarutaru.com/">君たち株式会社</a> ／ 非公式サイト</div></footer>
</body>
</html>
`;
}
if(!Array.isArray(db.groups)||!Array.isArray(db.brands))throw Error('Invalid data shape');
const groups=new Map(db.groups.map(g=>[g.id,g]));
if(groups.size!==db.groups.length)throw Error('Duplicate group IDs');
if(db.brands.some(b=>!groups.has(b.group)))throw Error('Unmatched brand reference');
const dir=join(root,'qa','seo-poc','groups');
mkdirSync(dir,{recursive:true});
for(const id of sampleIds){
 const group=groups.get(id);
 if(!group)throw Error('Missing group '+id);
 const brands=db.brands.filter(b=>b.group===id);
 const html=render(group,brands);
 writeFileSync(join(dir,id+'.html'),html,'utf8');
 console.log(id+': '+brands.length+' brands');
}
console.log('Generated PoC in qa/seo-poc/groups/ only. public/ unchanged.');
