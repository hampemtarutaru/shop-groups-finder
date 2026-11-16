// K-089: deterministic two-group publication candidate from the isolated hierarchy PoC.
// Does not change data.json; outputs only public/groups/skylark.html and usmh.html.
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {dirname,resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderPage} from './k089_hierarchy_poc.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
export const PILOT_IDS=Object.freeze(['skylark','usmh']);
const REPLACEMENTS=[
  [
    "<meta name=\"robots\" content=\"noindex,nofollow\">",
    "<meta name=\"robots\" content=\"noindex,follow\">"
  ],
  [
    "・非公開検証</title>",
    "｜この店、どこの系列？</title>"
  ],
  [
    " ／ 3階層試作</header>",
    " ／ 運営会社別の一覧</header>"
  ],
  [
    "本番サイト未掲載の検証用HTML・検索対象外。",
    "登録済み情報を整理した参考ページです。"
  ],
  [
    "正式公開前に個別の出典確認・使い勝手とSEOの品質審査が必要です。",
    "情報の変更や個別店舗の事情については、公式出典をご確認ください。"
  ],
  [
    "このページは公開前の試作品です。",
    "運営主体の表示は登録データに基づく参考情報です。"
  ]
];
export function adaptForPublicationCandidate(html){
  for(const [before,after] of REPLACEMENTS){
    if(html.split(before).length!==2) throw Error('Unexpected PoC HTML marker: '+before);
    html=html.replace(before,after);
  }
  // K-093: keep public directory pages and their generator exactly in sync.
  const lead="<p class=\"lead\">現行の登録情報を、運営会社ごとに並べ替えました。同じグループでも実際の運営会社は異なることがあります。</p>";
  const mascot="<div class=\"mascot-k093-note\"><img src=\"../assets/pugmimina.webp\" width=\"128\" height=\"128\" alt=\"パグミミーナ\" loading=\"lazy\" decoding=\"async\"><span>店名から、企業とブランドのつながりを見てみよう。</span></div>";
  const mascotCss="\n/* K-093: mascot appears only in the introductory area */\n.mascot-k093-note{display:flex;align-items:center;gap:9px;max-width:460px;padding:6px 12px 6px 4px;margin:8px 0 20px;background:#fff9f4;border:1px solid #eaded9;border-radius:14px;color:#50665d;font-size:.83rem;line-height:1.55}\n.mascot-k093-note img{display:block;width:54px;height:54px;object-fit:contain;flex:none}\n@media(max-width:680px){.mascot-k093-note{font-size:.78rem;max-width:100%}.mascot-k093-note img{width:46px;height:46px}}\n\n";
  if(html.split(lead).length!==2 || html.split("</style>").length!==2) throw Error('Unexpected K-093 page structure');
  html=html.replace(lead,lead+"\n"+mascot).replace("</style>",mascotCss+"</style>");
  return html;
}
export function generateCandidate(db,id){
  if(!PILOT_IDS.includes(id))throw Error('Not an approved pilot group: '+id);
  return adaptForPublicationCandidate(renderPage(db,id));
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const db=JSON.parse(readFileSync(join(root,'public','data.json'),'utf8'));
  const dir=join(root,'public','groups');
  mkdirSync(dir,{recursive:true});
  for(const id of PILOT_IDS){writeFileSync(join(dir,id+'.html'),generateCandidate(db,id),'utf8');console.log('Generated candidate: '+id);}
}
