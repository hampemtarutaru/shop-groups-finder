import test from 'node:test';
import assert from 'node:assert/strict';
import {inspectSeoCohort} from './k089_seo_release_gate.mjs';

const fixture=()=>({
  groups:[{
    id:'example',name:'テストグループ',company:'株式会社テスト',
    summary:'公式資料に基づく事業内容と複数ブランドの関係を利用者向けに説明する文章です。',
    source:'https://example.org/groups',checked:'2026-11-06'
  }],
  brands:[
    {name:'ブランドA',group:'example',operator:'株式会社A',source:'https://example.org/a'},
    {name:'ブランドB',group:'example',operator:'株式会社B',source:'https://example.org/b'}
  ]
});
const options={asOf:'2026-11-10',ids:['example'],minBrands:2,maxAgeDays:30};

test('a sourced recent small cohort passes technical checks, but never becomes approved to publish',()=>{
  const data=fixture(),before=JSON.stringify(data);
  const r=inspectSeoCohort(data,options);
  assert.equal(r.results[0].technicalCandidate,true);
  assert.equal(r.publishable,false);
  assert.deepEqual(r.issues,[]);
  assert.equal(JSON.stringify(data),before,'read-only gate mutated source data');
});

test('old group source review is reported, not silently accepted',()=>{
  const data=fixture();data.groups[0].checked='2026-09-01';
  const r=inspectSeoCohort(data,options);
  assert.equal(r.results[0].technicalCandidate,false);
  assert.ok(r.issues.some(x=>x.includes('older than')));
});

test('invalid or missing brand source is reported',()=>{
  const data=fixture();data.brands[1].source='http://example.org/b';
  const r=inspectSeoCohort(data,options);
  assert.ok(r.issues.some(x=>x.includes('brand has incomplete')));
});

test('future source review date is rejected',()=>{
  const data=fixture();data.groups[0].checked='2026-11-11';
  const r=inspectSeoCohort(data,options);
  assert.ok(r.issues.some(x=>x.includes('in future')));
});

test('missing group and insufficient brand count are reported',()=>{
  const r=inspectSeoCohort(fixture(),{...options,ids:['unknown'],minBrands:5});
  assert.equal(r.results[0].technicalCandidate,false);
  assert.ok(r.issues.some(x=>x.includes('group missing')));
  assert.ok(r.issues.some(x=>x.includes('fewer than')));
});
