// Read-only K-089 data quality audit. Never edits public/data.json.
// Use: node scripts/k089_data_audit.mjs
import {readFileSync} from 'node:fs';
import {dirname,join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const requiredText=(v)=>typeof v==='string'&&v.trim().length>0;
const isDate=(v)=>{
  if(typeof v!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(v))return false;
  const [y,m,d]=v.split('-').map(Number),date=new Date(Date.UTC(y,m-1,d));
  return date.getUTCFullYear()===y&&date.getUTCMonth()===m-1&&date.getUTCDate()===d;
};
const isHttps=(v)=>{
  if(!requiredText(v))return false;
  try{const u=new URL(v);return u.protocol==='https:'&&Boolean(u.hostname)&&!u.username&&!u.password;}catch{return false;}
};
const normalized=(v)=>String(v).normalize('NFKC').trim().toLowerCase();
const todayJST=()=>new Date().toLocaleDateString('sv-SE',{timeZone:'Asia/Tokyo'});

export function auditData(db,{today=todayJST()}={}){
  const errors=[],warnings=[];
  const error=(id,message)=>errors.push(id+': '+message);
  const warn=(id,message)=>warnings.push(id+': '+message);
  if(!db||!Array.isArray(db.groups)||!Array.isArray(db.brands)){
    return {errors:['root: expected groups[] and brands[]'],warnings,summary:null};
  }
  if(!isDate(db.updated))error('root','updated is not YYYY-MM-DD');
  else if(db.updated>today)error('root','updated is in the future');
  const byId=new Map(),brandPerGroup=new Map(),samePair=new Set();
  db.groups.forEach((g,i)=>{
    const p='groups['+i+']';
    if(!g||typeof g!=='object'){error(p,'not an object');return;}
    if(!requiredText(g.id)||!/^[a-z0-9-]{1,80}$/.test(g.id))error(p,'invalid group ID');
    if(byId.has(g.id))error(p,'duplicate group ID '+g.id);
    else byId.set(g.id,g);
    for(const name of ['name','company','summary'])if(!requiredText(g[name]))error(p,'missing '+name);
    if(!isHttps(g.source))error(p,'source must be HTTPS');
    if(!isDate(g.checked))error(p,'invalid checked date');
    else if(g.checked>today)error(p,'checked date in future');
    if(!/^#[0-9a-f]{6}$/i.test(String(g.accent||'')))error(p,'invalid accent CSS color');
    if(!Array.isArray(g.events))error(p,'events must be an array');
    else g.events.forEach((e,j)=>{
      if(!e||!/^(?:19|20|21)\d{2}$/.test(String(e.year))||!requiredText(e.text))error(p+'.events['+j+']','invalid event');
    });
  });
  db.brands.forEach((b,i)=>{
    const p='brands['+i+']';
    if(!b||typeof b!=='object'){error(p,'not an object');return;}
    for(const name of ['name','group','operator','category'])if(!requiredText(b[name]))error(p,'missing '+name);
    if(!byId.has(b.group))error(p,'unresolved group '+String(b.group));
    if(!isHttps(b.source))error(p,'source must be HTTPS');
    if(!Array.isArray(b.aliases))error(p,'aliases must be an array');
    else {
      const seen=new Set();
      b.aliases.forEach((alias,j)=>{
        if(!requiredText(alias))error(p+'.aliases['+j+']','empty alias');
        const key=normalized(alias);
        if(seen.has(key))warn(p,'redundant alias '+alias);
        seen.add(key);
      });
    }
    // Exact brand names can appear in different groups (e.g. franchising),
    // but duplicate name+group pairs are likely accidental.
    const pair=String(b.group)+'\u0000'+normalized(b.name);
    if(samePair.has(pair))error(p,'duplicate brand in same group '+b.name);
    samePair.add(pair);
    brandPerGroup.set(b.group,(brandPerGroup.get(b.group)||0)+1);
  });
  db.groups.forEach((g,i)=>{
    if(g&&requiredText(g.id)&&!brandPerGroup.has(g.id))warn('groups['+i+']','group has no brands '+g.id);
  });
  return {errors,warnings,summary:{groups:db.groups.length,brands:db.brands.length,updated:db.updated}};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
  let data;try{data=JSON.parse(readFileSync(join(root,'public','data.json'),'utf8'));}
  catch(e){console.error('ERROR: JSON loading failed: '+e.message);process.exit(1);}
  const result=auditData(data);
  console.log('K-089 data audit: '+JSON.stringify(result.summary));
  result.warnings.forEach(x=>console.warn('WARN '+x));
  result.errors.forEach(x=>console.error('ERROR '+x));
  console.log('K-089 data audit: '+result.errors.length+' error(s), '+result.warnings.length+' warning(s)');
  if(result.errors.length)process.exitCode=1;
}
