import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {dirname,resolve,join} from "node:path";
import {mapOperator,buildHierarchy,buildDiscoveries,renderPage} from "./k089_hierarchy_poc.mjs";
const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const db=JSON.parse(readFileSync(join(root,"public","data.json"),"utf8"));
const expectations=[["zensho",18,13,2],["skylark",29,6,0],["usmh",13,4,0]];
for(const [id,count,operators,unknown] of expectations){
  test("hierarchy preserves all brands and categorizes operators: "+id,()=>{
    const h=buildHierarchy(db,id);
    assert.equal(h.brands.length,count);
    assert.equal(h.clusters.filter(c=>c.verified).length,operators);
    assert.equal(h.unknownBrandCount,unknown);
    const names=h.clusters.flatMap(c=>c.brands.map(b=>b.name));
    assert.equal(names.length,count);
    assert.deepEqual([...names].sort(),h.brands.map(b=>b.name).sort());
    const html=renderPage(db,id);
    assert.match(html,/noindex,nofollow/);
    assert.match(html,/親グループ → 運営会社 → ブランド/);
    assert.match(html,/登録出典<\/a>/);
    assert.match(html,/ブランド専用ページとは限りません/);
    assert.match(html,/本番サイト未掲載の検証用HTML/);
    assert.doesNotMatch(html,/個別の公式情報/);
    assert.match(html,/公式リンクで、ブランド専用ページとは限りません/);
    assert.match(html,/本文へスキップ/);
    assert.match(html,/min-height:44px/);
    assert.doesNotMatch(html,/<script\b/i);
    assert.match(html,/検索対象外/);
    for(const b of h.brands)assert.ok(html.includes(encodeURIComponent(b.name)),b.name);
  });
}
test("explicit and narrow legal-name canonicalization",()=>{
  assert.equal(mapOperator("usmh","株式会社カスミ（U.S.M.H／イオングループ）").label,"株式会社カスミ");
  assert.equal(mapOperator("zensho","株式会社バーガー・ワン（ゼンショーグループ）").label,"株式会社バーガー・ワン");
  const x=mapOperator("zensho","ゼンショーグループのラーメン事業会社");
  assert.equal(x.verified,false);
  assert.equal(x.label,"運営法人を確認中");
});
test("only the expected three pages are generated as snapshots",()=>{
  for(const [id] of expectations){
    const file=join(root,"qa","hierarchy-poc",id+".html");
    assert.equal(readFileSync(file,"utf8"),renderPage(db,id));
  }
});

test("six editorial discoveries belong to exactly the same registered operator",()=>{
  const expected={
    skylark:[["夢庵","むさしの森珈琲"],["グランブッフェ","くし葉"],["トマト＆オニオン","じゅうじゅうカルビ"]],
    usmh:[["マルエツ プチ","リンコス"],["カスミ","BLΛNDE"],["いなげや","ブルーミングブルーミー"]]
  };
  for(const [id,pairs] of Object.entries(expected)){
    const h=buildHierarchy(db,id);
    const discoveries=buildDiscoveries(h.clusters,id);
    assert.deepEqual(discoveries.map(d=>d.brandNames),pairs);
    for(const d of discoveries){
      const cluster=h.clusters.find(c=>c.label===d.company);
      assert.ok(cluster);
      assert.equal(new Set(d.brandNames).size,2);
      assert.ok(d.brandNames.every(n=>cluster.brands.some(b=>b.name===n)));
      assert.match(renderPage(db,id),new RegExp(d.anchor));
    }
    // If the operator changes in the underlying DB, the pairing must fail closed.
    const changed=structuredClone(db);
    const target=changed.brands.find(b=>b.group===id&&b.name===pairs[0][0]);
    assert.ok(target);
    target.operator="株式会社別法人";
    assert.throws(()=>buildDiscoveries(buildHierarchy(changed,id).clusters,id),/Unverified discovery pair/);
  }
  assert.deepEqual(buildDiscoveries(buildHierarchy(db,"zensho").clusters,"zensho"),[]);
});
