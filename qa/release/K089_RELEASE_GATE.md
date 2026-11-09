# K-089 リリース候補（2026-11-09）

## 範囲
統合PR #5は、正式サービス化 Draft PR #2、グループ個別ページ生成の隔離PoC Draft PR #3、検索別名6件整理 Draft PR #4 を、mainからの別ブランチにコピーした**公開前候補**です。3つの元PRは未マージのまま。現在の公開先：https://groups.hampemtarutaru.com/

本番の `main` は未更新。対象のCloudflare PagesはGitHub mainへの変更でデプロイする運用。Draft PRをマージしない限りmainへの変更は起きません。ただしCloudflare PagesのPreviewは別ブランチでも自動生成・公開される可能性があります。

## リリース候補の変更
- `public/index.html`: 「試作」表記除去、非公式表記、運営・プライバシーリンク
- `public/about.html`・`public/privacy.html`: 公開情報の出典と運営主体（君たち株式会社は登記法人ではない）、解析の取扱いを明記。「公開前草案」表記は削除済み
- `public/styles.css`: 情報ページ専用表示調整
- `public/data.json`: 重複別名6件のみ除去、ブランド842件・グループ119件を保持、検索正規化後の結果トークン集合は変更なし
- `public/app.js`: **変更なし**
- `qa/seo-poc/`: SEO試作HTML3件、公開用publicには含めない
- `scripts/`・`.github/workflows/`: 自動検査と再生成手順

## GitHubでの確認
1. RCとmainの差分が指定の17ファイル＋このリリースノートだけであること。競合や想定外の追加があれば中断
2. GitHub Actions「K-089 SEO PoC verification」で119グループ・842ブランドの整合性検査、3件再生成、サンプルHTMLの一致・決定性が合格
3. GitHub Actions「K-089 Browser smoke QA」でデスクトップ/390pxスマホ相当の検索、共有URL、業種絞込み、2情報ページ、未捕捉JSエラーなし、公開前ラベルなしを検証
4. テストに追加した運営者の**法人未登記説明**が合格。これらはコード・ブラウザ動作の試験であり、公式出典の最新性や現行会社フォームの承認確認には代替しない

## 公開前の人間判断・環境確認（未完了）
- [ ] 会社サイト「お問い合わせ」リンクの現在のURLと送信先が確認でき、K-089に案内してよいこと。別サイトで使われたフォームを無断で流用しない
- [ ] Cloudflare PagesのPreview/Production設定、Previewの閲覧制限、Deployments一覧を確認。Production branch=main、Build output=publicを実機で確認
- [ ] 公開する「このサイトについて」「プライバシー」の本文を創業者が確認
- [ ] 主要な記載企業の公式出典の現在性に重要な誤りがないことを確認
- [ ] 最終承認を受けてからPRをReady for reviewにし、mainへのマージ/Cloudflare本番デプロイを実施

## 反映後のスモークチェック
- [ ] https://groups.hampemtarutaru.com/ で検索可能・データ数表示・ブランドカードが正常
- [ ] /?q=%E3%81%AA%E3%81%8B%E5%8D%AF（なか卯）からゼンショーへの検索結果
- [ ] /about.html と /privacy.html のリンク・スマホ表示・登記法人ではない旨の注記
- [ ] ブラウザの共有URL・検索クリア・業種フィルタの動作
- [ ] 新規の /groups/zensho.html 等は存在しない（隔離PoCを誤公開していない）
- [ ] Analyticsのデータ受信は継続しているか。前日との差は小標本のため効果の断定に使わない
- [ ] Search Console / Cloudflare で予期せぬ noindex, 404, JSエラーやキャッシュ問題がないか確認

## 切戻し方針
公開に不具合が出た場合、問題のあるマージコミットの変更をgit revertしてmainに新しいコミットを反映させ、Cloudflare Pagesの新しい本番デプロイを確認する。**切戻しはコミット前の証拠確認・権限と承認を受けてから行う**。クラウド/DBの状態変更、DNS変更はこの候補の対象外。

※本書のチェックリストは実作業をしたときに更新すること。まだ終わっていない確認を完了と書かない。
