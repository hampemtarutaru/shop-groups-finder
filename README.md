# この店、どこの系列？ （試作版）

スマホで店名を検索すると、どの企業グループに属するかがすぐわかる静的サイト。公式企業情報に基づく抜粋データを随時追加しています（2026-11-06現在、37グループ・204ブランド）。

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

- https://www.kurasushi.co.jp/company/company/aboutus.php
- https://www.kurasushi.co.jp/company/ir/
- https://food-and-life.co.jp/brands/
- https://food-and-life.co.jp/sustainability/value-creation-process/
- https://srsholdings.com/pages/brand/
- https://srsholdings.com/pages/about-group
- https://www.itochu-shokuhin.com/company/group/
- https://imc-oisio.co.jp/store/
更新メモ（2026-11-05）：くら寿司を独立系として、スシロー・杉玉・酒林をFOOD & LIFE COMPANIES、京樽・回転寿司みさき等をSRSホールディングスとして追加。京樽は2026年9月1日にF&LCからSRSへ譲渡。伊藤忠食品傘下のOISIOも掲載。メーカーの商品ブランドは店舗検索対象外。

## 出典（2026-11-05 カフェ系列の追加）

- https://www.dnh.co.jp/company/brand/
- https://www.dnh.co.jp/company/about/
- https://www.doutor.co.jp/recruitsite/bland/index.html
- https://www.itoen.co.jp/company/business/
- https://www.itoen.co.jp/ir/performance/
- https://www.tullys.co.jp/company/outline.html
- https://www.starbucks.co.jp/company/summary/

ドトール・日レスHD、伊藤園／タリーズ、米国スターバックスの日本事業を追加。タリーズは伊藤園の完全子会社。日本のスターバックス法人の株主はスターバックス・イーエムイーエー・ホールディングス・リミテッド。飲料商品と実店舗ブランドは区別して掲載。

## 出典・更新メモ（2026-11-05 牛丼御三家）

吉野家HDと松屋フーズHDを新たに登録。すき家所属のゼンショーではゼッテリアも追加。ブランドの例：吉野家・はなまるうどん・せたが屋・ばり嗎、松屋・松のや・すし松・六厘舎・舎鈴・ジャンクガレッジ。松屋フーズHDによる松富士子会社化は2026年1月。ゼッテリア運営会社は同年2月に株式会社バーガー・ワンへ社名変更済み。確認済みの代表的ブランドを抜粋して掲載。

- https://www.yoshinoya-holdings.com/company/brand_list/
- https://stores.yoshinoya-holdings.com/yoshinoya-holdings/spot/list/map?address=13102&search=address
- https://www.yoshinoya-holdings.com/ir/info/dividend/
- https://www.matsuyafoods-holdings.co.jp/2026/10/14/14430/
- https://www.matsuyafoods-holdings.co.jp/2025/12/15/13171/
- https://www.matsuyafoods-holdings.co.jp/company/history/
- https://www.zensho.co.jp/jp/company/news/2026/post_6841.html

## 出典・更新メモ（2026-11-05 一蘭・花月嵐・一風堂）

一蘭HD（独立系・全店直営）、グロービート・ジャパン（花月嵐・芳香麻辣湯・札幌味噌ラーメン岳・セアブラノ神・おむすびの神等）、力の源HD（一風堂・RAMEN EXPRESS・名島亭・因幡うどん・五行・楓・奏等）を登録。商品メニュー名や期間限定コラボを独立ブランドとして扱わない。楓・奏は2025年4月にライズの買収によりグループ入り。一蘭のFCなしの方針、花月嵐の2026年時点の業態は公式資料に基づく。

- https://ichiran.com/company/profile.html?wovn=en
- https://ichiran.com/company/fc.html
- https://globeat.jp/company/
- https://globeat.jp/brand/
- https://www.atpress.ne.jp/news/627323
- https://www.chikaranomoto.com/company/
- https://edinetdb.jp/company/E33011/text
- https://www.chikaranomoto.com/new-news/2746

## 出典・更新メモ（2026-11-05 からやま／ゆで太郎）

からやま・かつや等のアークランドサービスHD系外食業態と、同じアークランズ親会社を持つホームセンタームサシ・ビバホーム・ムサシ食品館・アークオアシス等を登録。ゆで太郎は信越食品とゆで太郎システムの二系統を独立したグループ項目として表示し、同名ブランド検索では両方が見つかるようにした。両社の関係は2004年のマスターフランチャイズ契約であり、親子会社として表示していない。ゆで太郎システム系にもつ次郎を追加。

- https://www.arclands.co.jp/ja/company/outline.html
- https://www.arclands.co.jp/ja/company/history.html
- https://www.arclands.co.jp/ja/company/network.html
- https://www.arclandservice.co.jp/brands/
- https://www.arclandservice.co.jp/company/overview/
- https://yudetaro.jp/company_outline/
- https://yudetaro.jp/company_history/
- https://yudetaro.jp/shoplist_shinetsu/
- https://yudetaro.jp/menu/

## 出典・更新メモ（2026-11-06 ファストフード系列）

主要ハンバーガー・フライドチキン・サンドイッチ系列の日本の運営会社と資本関係を確認し、7グループ・25ブランドを追加。日本マクドナルド、バーガーキング、ウェンディーズ／ファーストキッチン、日本KFC、ワタミ（サブウェイ等）、モスフードサービス、スガキコシステムズ（ドムドム含む）を登録。既存のコロワイド／フレッシュネスバーガー、ゼンショー／ゼッテリアと連携し、ロッテリアをゼンショーに追加。

**関係の注意点**：米国等のブランド保有元と日本の国内店舗運営会社・出資ファンドは別。ウェンディーズ・ジャパンの公式情報によれば、日本の店舗運営はファーストキッチン株式会社。バーガーキング日本事業は2026年2月19日にGoldman Sachs Alternativesへの売却完了。ドムドムは2026年1月にMBOを実施した後、9月30日にスガキコシステムズが追加出資して正式にグループ会社化。KFC日本事業は2024年にカーライル傘下へ。サブウェイ日本事業は2024年10月よりワタミ傘下。モスとミスタードーナツの協業ブランドMOSDOは、資本上の単純な兄弟関係を誤認させないため今回の個別ブランド登録から除外。

- https://www.mcd-holdings.co.jp/company/profile/
- https://www.mcd-holdings.co.jp/ir/management/business_strength/
- https://www.burgerking.co.jp/story/about
- https://www.affinityequity.com/blogs/affinity-equity-partners-completes-sale-burger-king-japan-goldman-sachs-alternatives
- https://wendys-firstkitchen.co.jp/company/wj.php
- https://wendys-firstkitchen.co.jp/company/
- https://www.longreachgroup.com/jp/investment-solutions-cross-cultural-solutions-jp
- https://japan.kfc.co.jp/company/outline
- https://www.carlyle.com/media-room/news-release-archive/Carlyle-completes-tender-offer-for-KFC-Japan
- https://subway.co.jp/company/info/
- https://www.watami.co.jp/group/restaurant/
- https://watamishopsearch.jp/brand/
- https://www.mos.co.jp/company/outline/profile/
- https://www.mos.co.jp/company/outline/store_data/
- https://www.colowide.co.jp/corpo/group.html
- https://www.zensho.co.jp/jp/company/news/2026/post_6841.html
- https://www.sugakico.co.jp/
- https://www.sugakico.co.jp/company/
- https://www.sugakico.co.jp/menu/takojyu/
- https://domdomhamburger.com/company
- https://prtimes.jp/main/html/rd/p/000000065.000028112.html
- https://prtimes.jp/main/html/rd/p/000000059.000097460.html

## 出典・更新メモ（2026-11-06 あえん・てんや）

モスフードサービスグループに「あえん」「玄米食堂あえん」「カフェ山と海と太陽」を追加。これまでグループ概要に「あえん」の記載はあったが検索データから漏れていたため補完した。運営会社は株式会社モスフードサービス。モス公式店舗数ページには、あえん・玄米食堂あえんの別業態として掲載されている。

ロイヤルホールディングスグループを新設し、天丼てんや、ロイヤルホスト、シズラー、シェーキーズ、とんかつおりべ、天ぷらてんや、ロイヤルガーデンカフェ、ミセスエリザベスマフィン、スタンダードコーヒーを追加。外食事業の運営会社はロイヤルフードサービス株式会社。1989年のてんや1号店開店と2006年6月のテン コーポレーション連結子会社化をロイヤル公式沿革で確認。ロイヤルグループにはホテル事業（リッチモンドホテル）もあるが、ホテルを飲食ブランドとして誤登録しないよう、この追加には含めなかった。

- https://www.mos.jp/shop/group/
- https://www.mos.co.jp/company/outline/store_data/
- https://www.royal-holdings.co.jp/co/group/brand/
- https://www.royal-holdings.co.jp/co/business/
- https://www.royal-holdings.co.jp/co/history/
- https://www.royalfoodservice.co.jp/company/index.html
- https://www.royalfoodservice.co.jp/brands/
