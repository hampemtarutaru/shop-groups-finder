// K-089: source-only verification. Does not fetch networks or publish a site.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';

const publicDir=join(dirname(fileURLToPath(import.meta.url)),'..','public');
const entries=[
  ['index.html','https://groups.hampemtarutaru.com/'],
  ['about.html','https://groups.hampemtarutaru.com/about.html'],
  ['privacy.html','https://groups.hampemtarutaru.com/privacy.html']
];
const load=p=>readFileSync(join(publicDir,p),'utf8');

test('each current public HTML has one unique self-canonical URL',()=>{
  for(const [file,url] of entries){
    const html=load(file);
    const canonical=[...html.matchAll(/<link rel="canonical" href="([^"]+)">/g)];
    assert.equal(canonical.length,1,file);
    assert.equal(canonical[0][1],url,file);
    assert.match(html,/<meta name="description" content="[^"]+">/);
    assert.doesNotMatch(html,/<meta name="robots"[^>]*noindex/i);
  }
});

test('sitemap enumerates existing public pages and no QA/prototype paths',()=>{
  const xml=load('sitemap.xml');
  const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);
  assert.deepEqual(urls,entries.map(([,url])=>url));
  assert.match(xml,/^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.doesNotMatch(xml,/qa\/|seo-poc|noindex|\/groups\/zensho/i);
});

test('home text preview always agrees with canonical and source title',()=>{
  const home=load('index.html');
  const title=home.match(/<title>([^<]+)<\/title>/)[1];
  const description=home.match(/<meta name="description" content="([^"]+)">/)[1];
  assert.match(home,/<meta property="og:type" content="website">/);
  assert.match(home,/<meta property="og:locale" content="ja_JP">/);
  assert.ok(home.includes('<meta property="og:title" content="'+title+'">'));
  assert.ok(home.includes('<meta property="og:description" content="'+description+'">'));
  assert.ok(home.includes('<meta property="og:url" content="https://groups.hampemtarutaru.com/">'));
  // An actual published image asset is needed before adding og:image.
  assert.doesNotMatch(home,/<meta property="og:image"/);
});
