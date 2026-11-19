import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeSearchKey, findSearchAliasCollisions} from './k089_search_alias_audit.mjs';

test('normalization matches public app behavior', () => {
  assert.equal(normalizeSearchKey('ビーバーPRO'), 'びばpro');
  assert.equal(normalizeSearchKey('ビバPRO'), 'びばpro');
  assert.equal(normalizeSearchKey('Re.Ra.Ku'), 're.ra.ku');
  assert.equal(normalizeSearchKey('タイラヤ'), normalizeSearchKey('たいらや'));
});

test('one brand with repeated labels does not create a cross-brand collision', () => {
  const db = {brands: [{name: 'たいらや', aliases: ['タイラヤ', 'たいらや'], group: 'ecos'}]};
  assert.deepEqual(findSearchAliasCollisions(db), []);
});

test('different operators with a shared search key remain visible as a report', () => {
  const db = {brands: [
    {name: 'ゆで太郎（A系）', aliases: ['ゆで太郎', 'ゆでたろう'], group: 'company-a'},
    {name: 'ゆで太郎（B系）', aliases: ['ゆで太郎', 'ゆでたろう'], group: 'company-b'}
  ]};
  const result = findSearchAliasCollisions(db);
  assert.equal(result.length, 2);
  assert.ok(result.every(row => row.crossGroup && row.brands.length === 2));
});

test('separate brands within one group may also share shorthand', () => {
  const db = {brands: [
    {name: 'TAIRAYA', aliases: ['タイラヤ'], group: 'ecos'},
    {name: 'たいらや', aliases: [], group: 'ecos'}
  ]};
  const result = findSearchAliasCollisions(db);
  assert.equal(result.length, 1);
  assert.equal(result[0].crossGroup, false);
});

test('invalid data fails rather than reporting clean', () => {
  assert.throws(() => findSearchAliasCollisions({}), TypeError);
});
