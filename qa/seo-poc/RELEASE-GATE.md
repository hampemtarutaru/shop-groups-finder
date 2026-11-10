# K-089｜3グループSEO公開前ゲート（2026-11-10）

## 現状と目的
- 既存の店名検索サービスはCloudflare Pagesの `public/` で公開中。
- `qa/seo-poc/groups/` にあるゼンショー、すかいらーく、U.S.M.Hの独立HTMLは **noindex の隔離試作**。
- 119グループ全件を自動公開しない。検索エンジン向けの量産は目的にしない。
- 試作は検索できる店名・運営主体・公式出典・確認日・グループのつながりをまとめ、トップの店名検索へ行き来できることが価値。既存サイトの単なる複製・言い換えページを増やさない。

## 今回の追加（公開せずに実施）
`scripts/k089_seo_release_gate.mjs`：正本 `public/data.json` を**読み取りのみ**で評価する。標準候補は `zensho`、`skylark`、`usmh`。
- ID・会社名・説明文・30日以内のグループ公式情報確認日
- 公式グループ出典URLとブランドごとの出典URLが安全なHTTPSか
- 原則5ブランド以上（今回の3件は18/29/13件の試作）
- ブランド名・運営会社名が空でないか
- 結果は候補・要再調査の識別。**通過しても公開許可を意味しない**。

実行: `node --test scripts/k089_seo_release_gate.test.mjs`
観察: `node scripts/k089_seo_release_gate.mjs`
日時を固定する再現検査: `node scripts/k089_seo_release_gate.mjs --as-of=2026-11-10`

## 人手による公開前チェック（未完了）
- [ ] 3グループの公式出典を最新状態でもう一度照合し、変化したブランド関係・運営主体を修正
- [ ] 登録ブランドが網羅リストでないことを明示し、同名ブランド・フランチャイズ・地域別運営の誤解を防ぐ
- [ ] 既存検索と重複するだけでなく、グループ別ページ固有の探索価値があるか確認
- [ ] 公開用URLの決定、canonical・サイトマップ・トップからの実リンクと相互回遊、必要なrobots設定の確認
- [ ] HTML/リンク/スクリーンリーダー/PC/スマホ実機・404のQA
- [ ] 公開範囲とSEO試験開始について創業者が最終承認
- [ ] 公開後は実データ（Search Consoleの表示・クリック、Analytics流入）を観測し、改善または撤回判断

## 変更禁止の境界
このリリースゲートは `public/`、`data.json`、本番検索JS、広告、Cloudflare設定、DNS、Search Consoleを変更しない。新しいSEOページを配信領域へ移さない。Cloudflareの非本番ブランチPreviewは公開URLになり得るため、試作品の機密保持手段として扱わない。

参考:
- Google Search Central: https://developers.google.com/search/docs/essentials/spam-policies
- Google canonical: https://developers.google.com/search/docs/crawling-indexing/canonicalization
- Cloudflare Pages: https://developers.cloudflare.com/pages/configuration/branch-build-controls/
