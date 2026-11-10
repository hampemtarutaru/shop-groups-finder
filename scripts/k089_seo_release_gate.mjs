// K-089: read-only release candidate checks for a deliberately small SEO cohort.
// This is NOT publication approval and never edits public/ or GitHub data.
import {readFileSync} from 'node:fs';
import {dirname,join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const defaultIds=['zensho','skylark','usmh'];
const nonEmpty=v=>typeof v==='string'&&v.trim().length>0;
const validDate=s=>{
  if(typeof s!=='string'||!(/^\d{4}-\d{2}-\d{2}$/).test(s))return false;
  const d=new Date(s+'T00:00:00Z');
  return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===s;
};
const https=s=>{
  try {const u=new URL(s);return u.protocol==='https:'&&!!u.hostname&&!u.username&&!u.password;}
  catch {return false;}
};
const jstDate=()=>new Date().toLocaleDateString('sv-SE',{timeZone:'Asia/Tokyo'});

export function inspectSeoCohort(db,{asOf=jstDate(),ids=defaultIds,maxAgeDays=30,minBrands=5}={}){
  if(!validDate(asOf))throw new Error('asOf must be a valid YYYY-MM-DD');
  if(!db||!Array.isArray(db.groups)||!Array.isArray(db.brands))
    return {asOf,results:[],issues:['missing groups[] or brands[]'],publishable:false};
  const uniqueIds=new Set(ids);
  if(uniqueIds.size!==ids.length)throw new Error('duplicate candidate IDs');
  const groups=new Map(db.groups.map(g=>[g.id,g]));
  const results=[],issues=[];
  for(const id of ids){
    const errors=[];
    const g=groups.get(id);
    const brands=db.brands.filter(b=>b.group===id);
    if(!g)errors.push('group missing');
    if(g){
      if(!(/^[a-z0-9-]{1,80}$/).test(String(g.id)))errors.push('unsafe slug');
      if(!nonEmpty(g.name)||!nonEmpty(g.company))errors.push('group identity incomplete');
      if(!nonEmpty(g.summary)||Array.from(g.summary).length<30)errors.push('thin group description');
      if(!https(g.source))errors.push('group official source missing/invalid');
      if(!validDate(g.checked))errors.push('invalid group source review date');
      else {
        const age=Math.round((Date.parse(asOf+'T00:00:00Z')-Date.parse(g.checked+'T00:00:00Z'))/86400000);
        if(age<0)errors.push('group source review date in future');
        if(age>maxAgeDays)errors.push('group source review older than '+maxAgeDays+' days');
      }
    }
    if(brands.length<minBrands)errors.push('fewer than '+minBrands+' brands');
    for(const b of brands){
      if(!nonEmpty(b.name)||!nonEmpty(b.operator)||!https(b.source))
        errors.push('brand has incomplete operator/source: '+String(b.name||'?'));
    }
    if(errors.length)issues.push(...errors.map(e=>id+': '+e));
    results.push({id,name:g?.name??null,brands:brands.length,checked:g?.checked??null,technicalCandidate:errors.length===0,errors});
  }
  // Technical checks are just a precondition: meaningful added value, source
  // verification, live-link QA, consent to public release, index/canonical,
  // sitemap and internal navigation still need deliberate human review.
  return {asOf,results,issues,publishable:false};
}

if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const raw=process.argv.find(a=>a.startsWith('--as-of='));
  const asOf=raw?raw.slice('--as-of='.length):jstDate();
  const db=JSON.parse(readFileSync(join(root,'public','data.json'),'utf8'));
  const r=inspectSeoCohort(db,{asOf});
  console.log('K-089 SEO pre-publication cohort check '+r.asOf);
  for(const entry of r.results)
    console.log((entry.technicalCandidate?'TECHNICAL OK ':'REVIEW NEEDED ')+entry.id+
      ' / '+entry.brands+' brands / source checked '+entry.checked);
  r.issues.forEach(x=>console.warn('REVIEW '+x));
  console.log('Publication is NOT approved; public/ remains unchanged.');
  // Stale information is an editorial warning, not permission to auto-publish.
}
