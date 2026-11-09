// K-089 PoC verification. Standard Node modules only; no network, no deployment.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const db=JSON.parse(readFileSync(join(root,'public','data.json'),'utf8'));
const expected={zensho:18,skylark:29,usmh:13};
const groupIds=new Set(db.groups.map(group=>group.id));

test('the source data has unique and resolvable group references',()=>{
  assert.equal(groupIds.size,db.groups.length,'duplicate group ID');
  assert.ok(db.brands.every(brand=>groupIds.has(brand.group)),'orphan brand');
});

for(const [id,initialCount] of Object.entries(expected)){
  test('generated HTML for '+id+' preserves core content and safety controls',()=>{
    const group=db.groups.find(group=>group.id===id);
    const brands=db.brands.filter(brand=>brand.group===id);
    const html=readFileSync(join(root,'qa','seo-poc','groups',id+'.html'),'utf8');
    assert.ok(group,'group missing from source');
    assert.equal(brands.length,initialCount,'source sample changed: regenerate and review');
    assert.match(html,/<html lang="ja">/);
    assert.match(html,/<meta name="robots" content="noindex,nofollow">/);
    assert.match(html,/<title>[^<]+<\/title>/);
    assert.match(html,/情報確認日：/);
    assert.ok(html.includes('情報確認日：'+group.checked),'checked date out of sync');
    assert.ok(html.includes('このグループに掲載したブランド：'+brands.length+'件'),'brand count out of sync');
    assert.ok(html.includes('href="/"'),'back link to existing search missing');
    assert.equal((html.match(/<li><a href="\/\?q=/g)||[]).length,brands.length,'brand links mismatch');
    assert.equal((html.match(/<script\b/gi)||[]).length,0,'scripts should not appear in isolated PoC');
    for(const brand of brands){
      assert.ok(html.includes('href="/?q='+encodeURIComponent(brand.name)+'"'), 'search URL missing: '+brand.name);
    }
  });
}
