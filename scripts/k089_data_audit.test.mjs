import test from 'node:test';
import assert from 'node:assert/strict';
import {auditData} from './k089_data_audit.mjs';
const valid=()=>({
  updated:'2026-11-09',
  groups:[{id:'sample',name:'サンプルグループ',company:'テスト株式会社',summary:'サンプル説明',accent:'#123ABC',source:'https://example.org/',checked:'2026-11-08',events:[{year:2025,text:'会社設立'}]}],
  brands:[{name:'テスト店',group:'sample',operator:'テスト株式会社',category:'飲食',source:'https://example.org/shop',aliases:['てすとてん']}]
});
const run=x=>auditData(x,{today:'2026-11-09'});
test('valid data passes without errors/warnings',()=>{const r=run(valid());assert.deepEqual(r.errors,[]);assert.deepEqual(r.warnings,[]);});
test('orphan brands block a release',()=>{const x=valid();x.brands[0].group='wrong';assert.ok(run(x).errors.some(e=>e.includes('unresolved group')));});
test('duplicate group IDs and same-group brand duplicates block release',()=>{const x=valid();x.groups.push({...x.groups[0]});x.brands.push({...x.brands[0]});const r=run(x);assert.ok(r.errors.some(e=>e.includes('duplicate group')));assert.ok(r.errors.some(e=>e.includes('duplicate brand')));});
test('HTTPS source is required',()=>{const x=valid();x.brands[0].source='javascript:alert(1)';assert.ok(run(x).errors.some(e=>e.includes('source must be HTTPS')));});
test('impossible/future checked dates block release',()=>{const x=valid();x.groups[0].checked='2026-02-31';assert.ok(run(x).errors.some(e=>e.includes('invalid checked date')));x.groups[0].checked='2026-11-10';assert.ok(run(x).errors.some(e=>e.includes('checked date in future')));});
test('repeated alias is a warning, not a breaking error',()=>{const x=valid();x.brands[0].aliases.push('てすとてん');const r=run(x);assert.deepEqual(r.errors,[]);assert.equal(r.warnings.length,1);});
test('a brand name in two groups is permitted',()=>{const x=valid();x.groups.push({...x.groups[0],id:'different'});x.brands.push({...x.brands[0],group:'different'});assert.deepEqual(run(x).errors,[]);});
