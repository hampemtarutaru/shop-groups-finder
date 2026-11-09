# K-089 ブラウザ実機自動試験（正式版草案）
`qa/site-smoke/smoke.mjs` は、開発用のローカルHTTPサーバーに対し Chromium で実際に操作する試験です。**本番サイトへアクセス・投稿・設定変更を行いません。**

確認対象：トップのHTML/ブランド一覧読込、なか卯検索、共有URLの生成、リロードでの検索復元、検索クリア、スーパー絞り込み、運営/プライバシー案内への導線、スマホ390px画面の横はみ出し、JavaScript例外なし。

`navigator.clipboard` はCIでコピー文字列の意味だけを確かめるためブラウザー内でモック化しています。OSネイティブのクリップボード権限を検査するものではありません。

GitHub Actionsの実行で `qa-results/*.png` をテスト成果物としてアップロード（7日間保持）します。プレビュー画像とコードの合格だけで人間のデザイン審査が不要になるわけではありません。企業データの全件検証も別工程です。

手動実行（開発者向け）：リポジトリ直下で `python3 -m http.server 8765 --bind 127.0.0.1 --directory public` を起動し、Node.js+PlaywrightとChromiumをインストールしてから `node qa/site-smoke/smoke.mjs`。
