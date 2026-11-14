import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname,resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {PILOT_IDS,generateCandidate} from './k089_public_candidate.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const db=JSON.parse(readFileSync(join(root,'public','data.json'),'utf8'));
test('only two groups enter the public candidate',()=>{
  assert.deepEqual(PILOT_IDS,['skylark','usmh']);
  assert.throws(()=>generateCandidate(db,'zensho'),/Not an approved pilot group/);
});
test('generated public pilot pages match committed files',()=>{
  for(const id of PILOT_IDS){
    const html=generateCandidate(db,id);
    const disk=readFileSync(join(root,'public','groups',id+'.html'),'utf8');
    assert.equal(disk,html);
    assert.match(html,/<meta name="robots" content="noindex,follow">/);
    assert.doesNotMatch(html,/非公開検証|3階層試作|本番サイト未掲載/);
    assert.match(html,/この2つの店も、同じ運営会社/);
    assert.match(html,/個々の店舗の直営・FC契約を示すものではありません/);
    assert.match(html,/href="\/\?q=/);
  }
});
test('no unreviewed third group is generated',()=>{
  assert.equal(PILOT_IDS.includes('zensho'),false);
});
