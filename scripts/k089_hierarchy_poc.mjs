// K-089: hierarchy PoC. Writes ONLY to qa/hierarchy-poc/, never public/.
// Run: node scripts/k089_hierarchy_poc.mjs
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {dirname,resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const ALIASES={
  "usmh": {
    "株式会社マルエツ（U.S.M.H／イオングループ）": "株式会社マルエツ",
    "株式会社カスミ（U.S.M.H／イオングループ）": "株式会社カスミ",
    "株式会社イオンフードスタイル（関東エリア）": "株式会社イオンフードスタイル"
  },
  "zensho": {
    "株式会社バーガー・ワン（ゼンショーグループ）": "株式会社バーガー・ワン",
    "株式会社エイ・ダイニング（ゼンショーグループ）": "株式会社エイ・ダイニング"
  }
};
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#39;"}[c]));}
function safeHttps(s){try{const u=new URL(String(s??""));return u.protocol==="https:"&&!u.username&&!u.password?u.href:"";}catch{return"";}}
function mapOperator(groupId,raw){
  const source=String(raw??"").trim();
  const name=ALIASES[groupId]?.[source]||source;
  if(!/(株式会社|有限会社|合同会社|合名会社|合資会社)/.test(name))
    return {key:"__unverified",label:"運営法人を確認中",verified:false,sourceLabel:source};
  return {key:name,label:name,verified:true,sourceLabel:source};
}
function buildHierarchy(db,groupId){
  if(!Array.isArray(db.groups)||!Array.isArray(db.brands))throw Error("Invalid data");
  const group=db.groups.find(x=>x.id===groupId);
  if(!group)throw Error("Group not found: "+groupId);
  const brands=db.brands.filter(x=>x.group===groupId);
  if(!brands.length)throw Error("No brands for: "+groupId);
  const clusters=new Map();
  for(const b of brands){
    const op=mapOperator(groupId,b.operator);
    if(!clusters.has(op.key))clusters.set(op.key,{key:op.key,label:op.label,verified:op.verified,brands:[]});
    clusters.get(op.key).brands.push({...b,operatorDisplay:op.sourceLabel});
  }
  const parts=[...clusters.values()];
  for(const p of parts)p.brands.sort((a,b)=>a.name.localeCompare(b.name,"ja"));
  parts.sort((a,b)=>(a.verified===b.verified?(b.brands.length-a.brands.length||a.label.localeCompare(b.label,"ja")):(a.verified?-1:1)));
  return {group,brands,clusters:parts,unknownBrandCount:parts.filter(p=>!p.verified).reduce((n,p)=>n+p.brands.length,0)};
}
function renderPage(db,groupId){
  const {group,brands,clusters,unknownBrandCount}=buildHierarchy(db,groupId);
  const knownCompanies=clusters.filter(c=>c.verified).length;
  const intro=unknownBrandCount?`運営法人が特定できていない${unknownBrandCount}件は、会社名を推測せず別枠に置いています。`:"";
  const navigation=clusters.map((c,i)=>`<a href="#operator-${i+1}">${esc(c.label)} <span>${c.brands.length}件</span></a>`).join("\n");
  const sections=clusters.map((c,i)=>{
    const list=c.brands.map(b=>{
      const src=safeHttps(b.source);
      return `<li><span class="brand"><a href="/?q=${encodeURIComponent(b.name)}">${esc(b.name)}</a></span>${src?`<a class="ref" href="${esc(src)}" target="_blank" rel="noopener noreferrer">個別の公式情報</a>`:"<span class=\"ref\">公式出典未確認</span>"}${!c.verified?`<div class="raw">現行データの記載：${esc(b.operatorDisplay||"記載なし")}</div>`:""}</li>`;
    }).join("\n");
    return `<section class="operator ${c.verified?"":"pending"}" id="operator-${i+1}" aria-labelledby="operator-heading-${i+1}">
  <div class="operator-heading"><h2 id="operator-heading-${i+1}">${esc(c.label)}</h2><span class="count">${c.brands.length}ブランド</span></div>
  ${c.verified?"":'<p class="warning">下記は会社名として確定できないため仮置きしています。</p>'}
  <ul class="brand-list">${list}</ul>
</section>`;
  }).join("\n");
  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${esc(group.name)}｜運営会社別のブランド一覧・非公開検証</title>
<meta name="description" content="${esc(group.name)}の企業グループ、運営法人、登録ブランドのつながりを試作表示。">
<style>
:root{color-scheme:light}*{box-sizing:border-box}body{margin:0;background:#f6f7f3;color:#1c342d;font-family:system-ui,"Hiragino Kaku Gothic ProN",Meiryo,sans-serif;line-height:1.7}
a{color:#155e51}a:hover{text-decoration-thickness:2px}a:focus-visible{outline:3px solid #e4a543;outline-offset:3px}
header{background:#143f36;color:white;padding:14px 24px}header a{color:white;text-decoration:none;font-weight:700}
main{max-width:1050px;margin:auto;padding:28px 20px 70px}h1{font-size:clamp(1.7rem,4vw,2.6rem);line-height:1.3;margin:8px 0 14px}h2{font-size:1.08rem;margin:0}
.kicker{font-size:.79rem;font-weight:700;letter-spacing:.04em;color:#416960}.lead{font-size:1.04rem;max-width:75ch}
.status{padding:12px 16px;background:#fff3da;border-left:4px solid #b88431;font-size:.88rem;margin:22px 0}
.summary{display:flex;gap:10px;flex-wrap:wrap;margin:18px 0 28px}.summary span{background:#e5eee8;padding:7px 13px;border-radius:8px;font-weight:700;font-size:.9rem}
.tree{border-left:3px solid #78a095;margin:20px 0 28px;padding-left:17px}.tree strong{display:block}.tree small{color:#4a675d}
nav{background:white;border:1px solid #dae6df;border-radius:12px;padding:15px 19px;margin:24px 0 28px}nav h2{margin-bottom:8px}nav .links{display:flex;flex-wrap:wrap;gap:8px}nav a{font-size:.83rem;text-decoration:none;border:1px solid #cbdcd4;border-radius:7px;padding:5px 9px}nav a span{color:#52746a}
.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;align-items:start}.operator{background:white;border:1px solid #d9e6df;border-radius:14px;padding:18px;min-width:0;box-shadow:0 1px 6px #153b2e0d}
.operator-heading{display:flex;justify-content:space-between;align-items:center;gap:10px;border-bottom:1px solid #e5eee9;padding-bottom:12px}.count{white-space:nowrap;color:#35675c;font-size:.78rem;background:#eaf4ed;padding:3px 8px;border-radius:20px}
.brand-list{list-style:none;padding:0;margin:8px 0 0}.brand-list li{display:flex;justify-content:space-between;gap:10px;align-items:baseline;flex-wrap:wrap;border-bottom:1px solid #eff3f0;padding:8px 0}.brand-list li:last-child{border:0}.brand{font-weight:700}.ref{font-size:.75rem}.pending{border:2px dashed #bf8c38}.warning,.raw{font-size:.78rem;color:#825c18}.raw{flex-basis:100%}
.notes{margin-top:28px;padding:18px 20px;background:#edf1ec;border-radius:12px;font-size:.88rem}footer{background:#e3ebe5;padding:18px;text-align:center;font-size:.8rem}
@media(max-width:680px){.grid{grid-template-columns:1fr}.operator{padding:15px}.brand-list li{gap:4px}.summary span{font-size:.84rem}}
</style>
</head>
<body>
<header><a href="/">この店、どこの系列？</a> ／ 構造表示の隔離試作</header>
<main>
<p class="kicker">親グループ → 運営会社 → ブランド</p>
<h1>${esc(group.name)}</h1>
<p class="lead">現行の登録情報を、運営会社ごとに並べ替えました。同じグループでも実際の運営会社は異なることがあります。</p>
<div class="status"><strong>非公開の検証用HTML・検索対象外。</strong> ブランドの網羅や各店舗の直営・FC契約の証明ではありません。${esc(intro)}</div>
<div class="tree"><strong>親グループ：${esc(group.company)}</strong><small>登録上のグループ名：${esc(group.name)} ／ グループデータの確認日：${esc(group.checked||"未記録")}</small></div>
<div class="summary"><span>${brands.length} 登録ブランド</span><span>${knownCompanies} 運営会社</span>${unknownBrandCount?`<span>${unknownBrandCount}件 要確認</span>`:""}</div>
<nav aria-label="運営会社へ移動"><h2>運営会社から探す</h2><div class="links">${navigation}</div></nav>
<div class="grid">${sections}</div>
<section class="notes"><h2>表示の考え方</h2><p>会社名として確認できる登録情報だけを運営会社の見出しにしました。カッコ内のグループ説明は既知の対応表でのみ整理し、元のブランド所属データは変更していません。各店舗の運営主体がフランチャイズ等で異なる可能性があります。</p>
<p>出典は現行の登録データに保存された公式リンクです。新規に全件の照合を終えたことを意味しません。正式公開前に個別の出典確認・使い勝手とSEOの品質審査が必要です。</p><a href="/">店名検索トップへ戻る</a></section>
</main>
<footer>君たち株式会社 ／ 企業公式サイトではありません ／ このページは公開前の試作品です。</footer>
</body>
</html>`;
}
export {mapOperator,buildHierarchy,renderPage};
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const db=JSON.parse(readFileSync(join(root,"public","data.json"),"utf8"));
  const ids=["zensho","skylark","usmh"];
  const out=join(root,"qa","hierarchy-poc");
  mkdirSync(out,{recursive:true});
  for(const id of ids){
    const {brands,clusters,unknownBrandCount}=buildHierarchy(db,id);
    writeFileSync(join(out,id+".html"),renderPage(db,id),"utf8");
    console.log(id+" "+brands.length+" brands / "+clusters.filter(x=>x.verified).length+" companies / "+unknownBrandCount+" unresolved");
  }
}
