# この店、どこの系列？ （試作版）

スマホで店名を検索すると、どの企業グループに属するかがすぐわかる静的サイト。公式企業情報に基づく抜粋データを随時追加しています（2026-11-05現在、15グループ・66ブランド）。

## 技術

- HTML / CSS / JavaScript / JSON だけ。サーバー・データベース・ビルド不要。
- `public/` の中だけを公開する設計。企業ロゴは使用せず、独自配色・テキストのみ。
- `public/data.json` を編集すると表示内容を更新できます。
- サーバー（または `python3 -m http.server 8000 --directory public`）から閲覧してください。ブラウザで `index.html` を直接開くとJSON読み込みが制限される場合があります。

## Cloudflare Pagesで公開する（GitHub連携方式）

1. GitHubに新しいリポジトリを作り、このフォルダのファイルをコミットする。
2. Cloudflare ダッシュボードで `Workers & Pages` → Pages → `Connect to Git`。
3. そのリポジトリを選択し、Production branch=`main`、Build command=空欄、Build output directory=`public` でデプロイ。
4. Cloudflare Pagesの `Custom domains` で独自サブドメインを追加。DNS画面で必要な設定を行う。
5. 以後 GitHub の `main` への変更をCloudflareが自動公開。

注意：Cloudflare Pagesのダッシュボード設定は、GitHubの権限だけでは操作できません。初回はユーザーの操作が必要です。

## データ管理の方針

- `groups`：企業グループ／公式情報のURL／確認日／短い年表
- `brands`：ブランド名／検索用別名／業態／グループID／運営会社／公式情報のURL
- 会社・ブランドの関係や実際の運営主体は変化するため、更新時に確認日を記録します。
- 現時点の「同じグループ」は、支配・出資の程度が異なる会社も含む便宜的な表示です。持株比率を証明するものではありません。今後は資本関係の区分・履歴管理を追加予定。

## 出典（初期データ）

- https://www.zensho.co.jp/jp/company/outline/
- https://www.zensho.co.jp/jp/brands/organization/
- https://corp.skylark.co.jp/brand/brand_list/
- https://www.skylark.co.jp/brand/
- https://www.aeon.info/group/
- https://trial-holdings.inc/company/history/
- https://trial-holdings.inc/news/release/686382439f0b7297ddd48fb7/
- https://trial-holdings.inc/retail-investor/topics-cocotora2025/
- https://ppih.co.jp/search/
- https://ppih.co.jp/social/uny/
- https://www.saizeriya.co.jp/corporate/information/outline/
- https://www.7andi.com/group/group_list.html
- https://www.sej.co.jp/company/summary/
- https://www.itochu.co.jp/ja/about/partner/japan/index.html
- https://www.family.co.jp/company/familymart/outline.html
- https://yorkhd.co.jp/group/
- https://yorkhd.co.jp/company/message/
- https://www.colowide.co.jp/corpo/group.html
- https://www.colowide.co.jp/inquiry/brand_list.html
- https://hd.kourakuen.co.jp/company
- https://www.anrakutei.co.jp/company/profile.html
- https://www.anrakutei.co.jp/company/group.html
- https://www.monogatari.co.jp/brand/
- https://hidakaya.hiday.co.jp/co/chain.html
- https://maruchiyo.yamaokaya.com/business/yamaokaya/

補足：2025年9月にイトーヨーカドー等の事業はセブン＆アイの連結グループから分離し、ヨーク・ホールディングス傘下となりました（資本関係は一部存続）。現在のブランド所属先の分類と資本出資関係は区別しています。業態別表示は収録分のみで、各企業の全店舗や全ブランドを網羅するものではありません。

商標・ロゴは使用していません。本サイトは非公式です。
