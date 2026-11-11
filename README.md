# この店、どこの系列？ （試作版）

## アクセス解析設定（2026-11-07）

Cloudflare PagesのMetrics → Web Analyticsで計測を有効化。Cloudflareの自動スクリプト挿入を利用し、HTMLには手動の計測タグを追加しない。計測反映は次回本番デプロイ後、受信状況をCloudflare管理画面で確認する。

スマホで店名を検索すると、どの企業グループに属するかがすぐわかる静的サイト。公式企業情報に基づく抜粋データを随時追加しています（2026-11-11現在、126グループ・882ブランド）。

## UI改善メモ（2026-11-06）

「グループから眺める」で長い一覧をスクロールしても戻りやすいよう、画面右下に「↑ トップへ」ボタンを追加。スクロール450px未満では非表示、450px以上で表示。押すとページ先頭へ戻り、検索語とフィルターは維持。タッチ操作用の押下領域を確保し、スマートフォンのセーフエリアと動き軽減設定にも対応。HTML/CSS/JSのみの変更でブランドデータは変更なし。

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

- `groups`：企業グループ／公式情報のURL／確認日／短い年表。階層構造は単一の `group` ID に直接表現できないため、上位親会社と子会社グループを別項目にする場合は双方の概要へ資本関係を明記する
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

## 出典・更新メモ（2026-11-06 ミスタードーナツ／サーティワン）

ミスタードーナツ（日本事業）を株式会社ダスキンのグループに登録。ダスキン公式の2026年3月末時点の事業ページを確認し、モスド（モスとの資本・業務提携による協業）、かつアンドかつ、子会社ボストンハウスのイタリアン「ナポリの食卓」「ボーノボーノ DINING CAFE」「BOSTON's Cafe」「パスタアルデンティーノ」、とり重「とり弁鶏」を追加。モスドがダスキンとモスの共同ブランドであることを明記し、両社を単純な同一子会社グループとして扱っていない。日本のミスタードーナツは1971年大阪・箕面に1号店。

国内サーティワンを運営する「B-R サーティワン アイスクリーム株式会社」を独立上場の企業グループとして登録。2025年12月末の大株主は不二家36.76%、ダンキン ブランズ インターナショナル ホールディングス リミテッド36.76%。B-Rサーティワンには直接の親会社がないことを2026年3月30日付会社の「支配株主等に関する事項について」でも確認。海外のバスキン・ロビンスとダンキンはInspire Brands傘下（米国等のブランド資本関係）であり、日本のミスタードーナツと同じグループには分類しない。米国では1990年3月30日にDunkin' DonutsがMister Donut of Americaを買収（Dunkin'公表の旧フランチャイズ開示資料）。これは歴史情報であり現在の日本運営会社の直接的な持株関係を示さない。

不二家とつながる資本構成を見られるよう「ヤマザキパングループ」も新設。不二家洋菓子店、不二家レストラン、ペコちゃんmilkyドーナツ、ダロワイヨ、ヴィ・ド・フランス、デイリーヤマザキ、ニューヤマザキデイリーストア、アンパンマン＆ペコズキッチン、銀座みやちくを収録。山崎製パンが不二家の過半数を保有するため不二家店舗はヤマザキパングループ。一方でサーティワンは不二家が36.76%を保有する**持分法適用関連会社／独立上場会社**であり山崎製パンの子会社ではない。ブランド同士の資本関係を同じ親会社傘下の「兄弟ブランド」と誤記しない。

- https://www.duskin.co.jp/company/business/food/
- https://www.duskin.co.jp/company/group/
- https://www.duskin.co.jp/company/history/
- https://www.misterdonut.jp/businessinfo/founder/
- https://www.misterdonut.jp/enjoy/history/
- https://www.br31.jp/contents/company/about/outline/
- https://www.br31.jp/contents/company/ir/stock/memo/
- https://www.br31.jp/contents/company/about/message/
- https://www.daiwair.co.jp/td_download.cgi?c=2268&i=3179651
- https://www.fujiya-peko.co.jp/company/about/outline.html
- https://www.fujiya-peko.co.jp/company/about/business.html
- https://www.fujiya-peko.co.jp/cakebrand/milkydonuts/
- https://www.fujiya-peko.co.jp/restaurant/restaurant_brand/
- https://www.dalloyau.co.jp/societe/
- https://www.yamazakipan.co.jp/company/group/
- https://www.yamazakipan.co.jp/company/enkaku/index.html
- https://www2.yamazakipan.co.jp/company/zigyou/daily.html
- https://inspirebrands.com/about-us/
- https://www.dunkinbrands.com/company/about/about-dunkin-brands
- https://fddexchange.com/wp-content/uploads/2014/01/Dunkin_Donuts_FDD_2010.pdf

## 出典・更新メモ（2026-11-06 とんかつ新宿さぼてん／やきとり日本一）

さぼてんの母体「グリーンハウスグループ」を登録。グリーンハウスは1947年の慶應義塾大学予科学生食堂運営に始まる会社。1966年に「とんかつ新宿さぼてん」を開店、1967年に「謝朋殿」を開店。1972年に外食部門を株式会社さぼてんとして独立させ、1982年グリーンハウスフーズに改称。レストラン・デリカ・食品流通・受託給食を営む企業グループとして分類し、社員食堂（受託先の施設）自体を独立ブランドとして登録していない。公式サイト収録ブランドから、さぼてん／銀座かつ匠／覇王樹／かつ彩／謝朋殿／西安餃子／粥餐庁／11イマサ／PARIYA等を追加。山和食品株式会社が運営する「おこわのたごさく」「おこわの里 たもかみ」「釜旬」「しゃれむすび」「新生公司」も含む。さぼてんのレストランと持ち帰り店は同一ブランドとして重複登録しない。2026年10月22日付のグリーンハウスフーズの告知によれば公式Webサイトの一部はセキュリティ対策によるメンテナンス中であり、公開ページが一時的に参照できない場合がある。

やきとり「日本一」はイオンやセブン＆アイの子会社ではなく、両社は主要取引先。運営は千葉県野田市の株式会社日本一、持株会社は日本一ホールディングス株式会社。創業は嘉永年間（1848–1854頃）に始まる川魚問屋。日本一、うなぎ日本一、銀座 縁、いちどり、からあげ日本一を追加。関連会社コーワフード株式会社の「赤坂ふきぬき」「神楽坂 富貴貫」は公式関連会社ページと同社サイトの株主欄を根拠に同グループへ登録。うなぎ日本一と赤坂ふきぬきは業態は似ていても運営法人が異なる。

- https://www.greenhouse.co.jp/corporate/history/index.html
- https://www.greenhouse.co.jp/corporate/group/index.html
- https://www.tonkatsu-saboten.com/view/company
- https://www.ghf.co.jp/company/service/
- https://www.ghf.co.jp/sitemap/
- https://www.ghf.co.jp/sanwa/
- https://www.ghf.co.jp/search/?list=1&shop_area=0&shop_brand%5B%5D=13
- https://www.ghf.co.jp/maintenance.html
- https://www.nihonichi.jp/aboutus/overview
- https://www.nihonichi.jp/tenpoinfo
- https://www.nihonichi.jp/search/chart/
- https://www.nihonichi.jp/aboutus/company-kowa
- https://www.fukinuki.shop/html/company.html

## 出典・更新メモ（2026-11-06 ローソン／セイコーマート）

ローソンとセコマを追加。ローソンの株主は2024年8月15日から三菱商事50%、KDDI50%（議決権ベース）。三菱商事単独の連結子会社時代の古い情報で分類しない。ローソンの直営・フランチャイズ店舗に加え、ナチュラルローソン、ローソンストア100、子会社の成城石井、成城石井プロデュースの「Le Bar a Vin 52 AZABU TOKYO」、ローソンエンタテインメントが運営するHMV、HMV&BOOKS、HMV record shopを収録。ローソン・ユナイテッドシネマなど映画館事業はグループ概要で言及し、現行の店舗業種フィルターに合わないため今回は個別ブランドデータに収録しない。店舗と異なるローチケやローソン銀行等のサービスも検索データには収録しない。

**資本関係の例外**：ローソン・スリーエフは株式会社エル・ティーエフによる合弁事業（2025年2月末時点でスリーエフ51%、ローソン49%）。2025年にローソンとスリーエフ本体の株式保有関係は解消され、合弁出資は継続。ローソン・ポプラはポプラリテール（ポプラ100%子会社）がローソンのメガフランチャイジーとして運営する提携店舗。ローソンは2025年8月にポプラの18.22%株式をすべて売却する方針を公表し業務提携へ移行。双方を普通のローソン完全子会社として登録しない。

セコマは1971年8月に札幌でセイコーマートを創業、2016年に株式会社セイコーマート（事業持株会社）が株式会社セコマへ改称。公式グループ会社一覧でセイコーマート、ハセガワストア、タイエー、ハマナスクラブを確認した。セイコーマートの本部は株式会社セイコーマートで、株式会社セイコーリテールサービス等が店舗運営。ハマナスクラブはボランタリーチェーン本部で、全店をセコマ直営と誤解しないよう注記。グループには牛乳・アイス・惣菜等の製造会社、物流会社、システム会社なども存在するが、店頭ブランドと混同しない。ホットシェフは1994年に始まった店内調理の商品ブランドであり、独立した店舗チェーンとしては登録しない。2026年10月末のセイコーマート店舗数は1,192（北海道1,090、茨城92、埼玉10）。

- https://www.mitsubishicorp.com/jp/ja/news/release/2024/0000054346.html
- https://www.kddi.com/extlib/files/corporate/ir/library/yuka_shoken/pdf/yuho_2025_i_r_rW4LVy.pdf
- https://www.lawson.co.jp/company/corporate/data/about/
- https://www.lawson.co.jp/company/corporate/data/relation/
- https://www.lawson.co.jp/company/corporate/data/sales/
- https://store100.lawson.co.jp/company/outline/about/
- https://www.ent.lawson.co.jp/company/
- https://www.lbv52.jp/
- https://www.unitedcinemas.jp/about_company/uc_concept.html
- https://www.lawson.co.jp/company/news/detail/1504514_2504.html
- https://www.lawson.co.jp/company/news/detail/1509390_2504.html
- https://www.secoma.co.jp/aboutus/company.html
- https://www.secoma.co.jp/aboutus/group.html
- https://www.secoma.co.jp/aboutus/history.html
- https://www.secoma.co.jp/recruit/newgraduate/philosophy/
- https://www.secoma.co.jp/aboutus/nurture/kids/product.html

## 出典・更新メモ（2026-11-06 馬車道／町田商店／田所商店）

馬車道、ギフトホールディングス、トライ・インターナショナルを新規登録し、合計3グループ・26ブランドを追加。各グループに出典URL・確認日を記録し、ブランドごとに参照先・運営法人・検索用別名を記載した。

- **馬車道**：埼玉県熊谷市の株式会社馬車道。1972年に小規模な焼肉店として創業、1975年法人設立。公式掲載に基づき、レストラン馬車道、ピッツェリア馬車道、モダンパスタ、カプリモーネ、徳樹庵、野草庵、煉火亭、黒塀家、粋な黒塀、青磁、鶏彩の11ブランドを登録。2026年11月6日確認時、同社公式サイトの直接閲覧には『緊急システムメンテナンス』が表示されたため、同社運営の公式オンラインショップ案内と、検索エンジンが取得できた公式会社概要・ブランド一覧・アレルゲンページも突き合わせた。店舗営業状況は別途要確認。
- **町田商店**：株式会社ギフトホールディングス。2008年に東京都町田市で創業、2009年に法人『株式会社町田商店』（現ギフトHD）設立。町田商店、豚山、元祖油堂、がっとん、長岡食堂、四天王、赤みそ家を登録。国内店舗運営会社は株式会社ギフト、株式会社Amazing、株式会社Craft等が存在し、プロデュース事業・FC事業の参加店は必ずしも直営ではない。公式の『東京ラーメン横丁』は複数ブランドが集まる施設のため単体ラーメン店としては今回登録しない。海外のMACHIDA SHOTEN・GANSO ABURADOは国内屋号と同一系統であり重複登録せず、既存ブランドの別名やグループ概要で表現。
- **田所商店**：株式会社トライ・インターナショナル（2003年設立）。蔵出し味噌 麺場 田所商店、Ramen Misoya、RAMEN SORA、マルニ味噌らーめん、Ramen Ristorante 田所商店 Premium、田所商店 タンタンメン部、俺の空、早川みそちゃんぽんを登録。2024年に魚介豚骨ラーメン『俺の空』、2025年に老舗味噌蔵『早川しょうゆみそ』がグループ入り。味噌・タレ類の製造卸等の事業と店舗ブランドは区別。名称が似たディスカウントストア『トライアル』や町田商店とは資本系列が異なる。

公式出典（確認日：2026-11-06）：

- https://bashamichi.base.shop/about
- https://www.bashamichi.co.jp/
- https://www.bashamichi.co.jp/corporate/
- https://www.bashamichi.co.jp/allergy/
- https://www.bashamichi.co.jp/renkatei/
- https://www.gift-group.co.jp/brand
- https://www.gift-group.co.jp/company/information
- https://www.gift-group.co.jp/company/history
- https://www.gift-group.co.jp/company/business
- https://try-international.co.jp/brand/
- https://try-international.co.jp/about/
- https://try-international.co.jp/business/management/
- https://misoya.net/company/

## 出典・更新メモ（2026-11-06 高倉町珈琲／コメダ）

株式会社高倉町珈琲および株式会社コメダホールディングスの2グループ、計15ブランドを追加。検索用別名（「高倉町コーヒー」「コメダ」「おかげ庵」等）、運営主体、出典URL、グループ確認日を保存。

**高倉町珈琲**：社名・正式店名は「珈琲」表記。株式会社高倉町珈琲（2014年4月28日設立、横川竟会長、鬼澤修社長）の単独ブランドとして登録。公式会社概要には2026年2月時点で41店舗と記載。2013年の八王子店開店後に別会社を設立した。横川竟氏はすかいらーくの共同創業者・元会長だが、高倉町珈琲は現在のすかいらーくグループ傘下ではない。**創業者の人的・歴史的つながりと、現在の資本系列を混同しない**。ほかの新ブランドを裏付ける公式情報が見つからなかったため、グループは1ブランドのみの登録。

**コメダ**：株式会社コメダホールディングスの公式事業説明および2026年2月末現在の会社概要に基づき、国内10業態と海外4業態を登録。国内：コメダ珈琲店／コメダ和喫茶 おかげ庵／BAKERY ADEMOK／KOMEDA is □／大餡吉日／ジェリコ堂／おむすび 米屋の太郎／ハンバーガー＆サンドイッチ ベイス／ラ・ヴィノテーク／BLUE LEAF CAFÉ。海外：Kaffe & Toast／Saap Saap Thai／Ma Mum／Paad Paad Thai（シンガポール）。国内外の屋号を区別し、コメダ珈琲店の海外店舗は同一ブランドの海外出店として重複登録しない。2025年3月にシンガポールPOON RESOURCES社株式70％を取得したことで海外4業態もコメダHDの連結グループに入っている。グループ公式沿革では2024年11月に株式会社コメダコマースがベイス事業を譲受と記載。ブランドや店舗によって直営・FC・別のグループ会社による運営があるため、すべてを株式会社コメダの直接運営店とは表記しない。

出典（確認日2026-11-06）：

- https://takakuramachi-coffee.co.jp/company/
- https://takakuramachi-coffee.co.jp/shop/
- https://takakuramachi-coffee.co.jp/news/2023.12.27/181/
- https://magazine.chichi.co.jp/articles/4354491475/
- https://komeda-holdings.co.jp/about-us/
- https://komeda-holdings.co.jp/company-profile/
- https://komeda-holdings.co.jp/history/
- https://www.komeda.co.jp/company/outline.html
- https://www.komeda.co.jp/shop/
- https://www.komeda-holdings.co.jp/annual2025.pdf

## 出典・更新メモ（2026-11-06 ゴンチャ／50グループ達成）

「ゴンチャ」について、世界展開するGong cha Globalと国内運営会社・株式会社ゴンチャ ジャパンの関係を分けて掲載。グループ1・ブランド1を追加し、合計50グループ・303ブランド。グループ名を「ゴンチャグループ（世界ブランド）」とし、カテゴリは飲食、検索用別名は「貢茶」「gongcha」「Gong cha」等。ゴンチャ以外に現行Gong cha Global傘下の独立した異名の店舗チェーンは確認できなかったため、同一ブランドの世界各国店舗を重複して登録しない。

**歴史**：公式ブランド沿革では、1996年に創業者が台湾で最初の茶店を開業し、2006年に高雄市で『Gong cha』ブランドを正式開始。2009年に香港、2015年に日本・原宿へ進出。日本法人は2015年3月25日設立。2025年に国内200店舗以上へ拡大。2019年に米投資会社TA AssociatesがGong cha Groupへ成長投資。2026年8月5日付TA、8月6日付ベイン・キャピタルの発表で、Bain CapitalがTA等からGong cha Globalを買収することに**合意**し、取引完了は2026年第4四半期を予定と公表。2026年11月6日時点の確認ではベイン側の買収完了日を明示した日付付き一次発表を確認できない。TAのポートフォリオページではステータスが「Past／Acquired by Bain Capital Private Equity」となっている一方、同社の8月発表と買い手側の一次発表は予定表現であり、2026年11月6日の確定した親会社・完了日としては採用しない（継続確認が必要）。ベインの他の投資先を同一グループの恒久的な兄弟ブランドに混ぜない。

- https://www.gongcha.co.jp/company/
- https://www.gongcha.co.jp/brand/
- https://www.gong-cha.com/about-us
- https://www.ta.com/news/ta-portfolio-company-gong-cha-to-be-acquired-by-bain-capital/
- https://www.ta.com/portfolio/investments/gong-cha/
- https://www.baincapital.com/news/bain-capital-acquire-gong-cha-one-worlds-fastest-growing-tea-brands-ta-associates

## 出典・更新メモ（2026-11-06 華屋与兵衛／とんでん）

華屋与兵衛と北海道生まれ 和食処とんでんを調査。**華屋与兵衛は既存ゼンショーグループ、とんでんは別の独立した企業グループ**として扱う。とんでんグループを1件新設し、ゼンショー側の不足9ブランド＋とんでん1ブランド、合計10ブランドを追加。51グループ・313ブランドとなった。

**華屋与兵衛（ゼンショー）**：1986年にエル・フードサービスを設立、同年12月に新松戸店を開業、1996年に株式会社華屋与兵衛へ商号変更。2008年10月にゼンショーグループ入り。2026年11月6日の公式会社概要・ゼンショー公式事業ブランド・店舗検索により現在も所属することを確認。華屋与兵衛の名称は江戸時代に江戸前にぎりずしを生み出したとされる人物への敬意に由来。既存ゼンショーのグループ概要も更新し、同グループで不足していた「熟成焼肉いちばん」「かつ庵」「久兵衛屋」「エルトリート」「ヴィクトリアステーション」「伝丸」「威風」「壱鵠堂」を併せて追加。元から登録済みの「ビッグボーイ」「ココス」「ゼッテリア」等を重複させない。運営会社名がブランドごとに一次情報から確認できない場合は、ゼンショーグループの事業会社と表記し、法人名を推測しない。

**とんでん**：北海道で1968年に10円まんじゅう等の和菓子を製造・販売して創業。1973年「とんでん鮨」北光店、1978年に埼玉県の「ファミリーレストランとんでん」浦和店を開店。2004年「湯けむりの丘 つきさむ温泉」を札幌に開業。2018年に持株会社体制へ分割、2020年に現行の屋号「北海道生まれ 和食処とんでん」へ変更。現在のレストランの運営会社はとんでん株式会社、持株会社は株式会社とんでんホールディングス。1973年の「とんでん鮨」は沿革上の旧業態として扱い、現行チェーンとの二重登録を避けた。「しゃぶしゃぶと鮨とんでん」は2017年に開業した履歴を確認したが、2026年時点の継続営業と独立ブランド扱いを確認できないため登録見送り。「和菓子処とんでん」「とんでんおもてなし食堂」は和菓子・通販などのブランドで、今回は店名検索対象の店舗チェーンに加えない。「つきさむ温泉」は関連事業としてグループ概要・沿革に記載するが、現行UIのカテゴリ分類（飲食・スーパー等）では温浴施設に適した分類がないため検索対象には無理に登録しない。

**発見**：2026年11月6日から8日まで、とんでんの創業58周年祭が開催される旨を10月1日付公式発表で確認。これは企業系列の恒常情報ではないためデータには掲載せず、調査時の話題として扱う。

公式出典・確認日：2026-11-06
- https://www.hanayayohei.co.jp/company/
- https://www.hanayayohei.co.jp/recruit/site/about/
- https://www.zensho.co.jp/jp/company/outline/
- https://www.zensho.co.jp/jp/brands/
- https://maps.zensho.co.jp/jp/index_map.html
- https://www.tonden.co.jp/
- https://www.tonden.co.jp/privacy/handling/
- https://www.tonden55th.com/
- https://tsukisamu.jp/restaurant/
- https://www.tonden.co.jp/info/detail/2635939

## 出典・更新メモ（2026-11-06 藍屋・すかいらーくグループ追加補完）

「藍屋」は株式会社すかいらーくレストランツの運営で、親会社は株式会社すかいらーくホールディングス。1983年誕生。ブランド名は荀子の「青は藍より出でて藍よりも青し」に由来し、師となるすかいらーくを超える店舗へ、との期待が込められた。2026年9月30日現在、すかいらーく公式店舗数表に藍屋31店と記載。

既存のすかいらーくグループ項目に対し、公式「ブランド一覧」と「グループ企業・事業」の2026-11-06確認内容に基づいて22ブランドを補完。今回の追加は藍屋・から好し・グラッチェガーデンズ・魚屋路・chawan・La Ohana・とんから亭・ゆめあん食堂・三〇三・八郎そば（すかいらーくレストランツ）、グランブッフェ・點心甜心・包包點心・ブッフェ エクスブルー・くし葉・ペルティカ・すうぷ（ニラックス）、トマト＆オニオン・じゅうじゅうカルビ（トマトアンドアソシエイツ）、フロプレステージュ（フロジャポン）、資さんうどん（資さん）、しんぱち食堂（しんぱち）。レストランと惣菜専門店では業態カテゴリを区別。各ブランドの店舗ごとにFC法人運営がある場合でも、ブランド事業会社の関係を公式のグループ所属として登録する。海外の「藍屋」は同じ屋号の海外店舗であり別ブランドとして二重登録しない。

既存「ガスト」「バーミヤン」「しゃぶ葉」「ジョナサン」「夢庵」「むさしの森珈琲」「ステーキガスト」は保持。すかいらーくグループのまとめ文と確認日を2026-11-06に更新。公式の全ブランドを網羅すると断定せず、今後の変更は再検証する。

公式出典（確認日：2026-11-06）：
- https://corp.skylark.co.jp/brand/brand_list/
- https://corp.skylark.co.jp/brand/groupbrand/
- https://corp.skylark.co.jp/brand/stores/
- https://corp.skylark.co.jp/about/locations/
- https://www.skylark.co.jp/brand/
- https://www.skylark.co.jp/aiya/

## 出典・更新メモ（2026-11-06 セイムス／ウエルシア・ツルハ、ドラッグストアフィルター）

新規2グループ「富士薬品グループ（セイムス）」「ツルハ・ウエルシア統合グループ（イオン傘下）」を登録し、合計29ブランドを追加（計53グループ・364ブランド）。カテゴリー「ドラッグストア」を追加し、専用の絞り込みボタンをpublic/index.htmlに設置。既存アプリの `data-filter` 処理を利用しているため `public/app.js` の変更は不要。「COLOR STUDIO」「MASAYA」「NARCIS」は化粧品専門店として「専門店」に分類。製薬メーカーと医薬品の商品名は店舗検索対象に含めない。

**富士薬品**：富山県富山市で1930年2月に配置薬販売業として創業、1954年4月に法人設立。現在の本社は埼玉県さいたま市大宮区。1992年3月にドラッグストア事業へ進出。2026年3月末時点で全国39都道府県にドラッグストア・調剤薬局1,285店舗。公式グループ会社一覧と2026年のドラッグセイムス公式キャンペーン対象店舗の双方で「ドラッグセイムス」「アメリカンドラッグ」「ドラッグユタカ」「ドラッグストアスマイル」「スーパードラッグキリン」「ドラッグストアエース」「くすりの救命堂」を確認し登録。同じ「セイムス」看板は富士薬品本体のみならず地域のグループ運営会社が展開するため、本社と各地域店舗の運営法人を混同しない。医薬品開発・製造・販売の一貫体制が特徴。東和製薬、パナケイア製薬は関連メーカーとしてグループ概要にのみ記載。

**ツルハ・ウエルシア**：株式会社ツルハホールディングスが2025年12月1日の株式交換でウエルシアホールディングス株式会社を完全子会社化。2026年1月14日、イオン株式会社がツルハHDを連結子会社化（イオン公式発表とツルハ公式沿革で確認）。イオングループそのものは既存の「aeon」項目があるため、この統合ドラッグストアグループを子階層として別に作成し、両方のグループ説明・沿革に資本関係を記載する。「ウエルシア」はツルハHDの別の完全子会社として持つウエルシアHD傘下であり、セイムス（富士薬品）とは別系列。

ツルハ側の代表7ブランド：ツルハドラッグ、くすりの福太郎、ドラッグストアウェルネス、ウォンツ、くすりのレデイ、杏林堂薬局、ドラッグイレブン。

ウエルシア側の代表12ブランド：ウエルシア、ハックドラッグ、金光薬品、とをしや薬局（ウエルシア薬局）、ダックス（シミズ薬品）、ハッピー・ドラッグ（丸大サクラヰ薬局）、よどやドラッグ（よどや）、マルエドラッグ（クスリのマルエ）、スーパードラッグひまわり（ププレひまわり）、コクミン（コクミン）、ふく薬品（ふく薬品）、ウェルパーク（ウェルパーク）。同じグループの化粧品専門店COLOR STUDIO、MASAYA、NARCIS（株式会社MASAYA）も収録。同一ブランドの地域ごとの店舗、海外展開店舗は二重登録しない。

**編集方針**：持株会社・事業会社・実店舗の運営主体を区別し、提携先や単なる取引先は親会社と誤認させない。今回の出典は2026年11月6日時点に取得可能な公式一次情報。カテゴリを増やしたため、既存分類でドラッグストアが「専門店」に誤混在しないよう明示的に振り分けた。

公式出典（2026-11-06確認）：
- https://www.fujiyakuhin.co.jp/company/profile/
- https://www.fujiyakuhin.co.jp/company/history/
- https://www.fujiyakuhin.co.jp/company/group/
- https://www.fujiyakuhin.co.jp/business/drugstore_pharmacy/
- https://www.fujiyakuhin.co.jp/company/at-a-glance/
- https://www.seims.co.jp/shop/pages/santool_2026cp.aspx
- https://www.tsuruha-hd.co.jp/company/list/
- https://www.tsuruha-hd.co.jp/company/history/
- https://www.tsuruha-hd.co.jp/brand/
- https://www.welcia.co.jp/ja/company/groupcompany.html
- https://www.welcia.co.jp/ja/form.html
- https://www.aeon.info/ir/policy/organization/
- https://www.aeon.info/news/release_101301/
- https://www.aeon.info/wp-content/uploads/news/pdf/2026/01/260107R_1.pdf

## 出典・更新メモ（2026-11-06 スギドラッグ／ドラッグストア セキ）

**意外な系列関係：スギ薬局とセキ薬品が2026年9月に同一連結グループへ。** スギホールディングス株式会社の公式会社情報・グループ一覧・2026年4月9日付株式追加取得発表に基づいて、スギ薬局・スギドラッグ・ドラッグスギ・ジャパン・ドラッグストア セキ・セキ薬局・阪神調剤薬局・薬日本堂・ニホンドウ漢方ブティック・カガエ カンポウ ブティックを同一「sugi-holdings」グループに収録。グループ1件・ブランド10件追加で、合計54グループ・374ブランド。正式な店名は「ドラッグストア セキ」で、会話上の「セキドラッグ」も検索別名として登録。ドラッグストアセキとセキ薬局は実際には同じ敷地や建物に併設される場合もあるが、異なる看板・調剤業態としてそれぞれ検索可能。スギ薬局／スギドラッグ／ドラッグスギも公式2026年キャンペーンの対象屋号から区別して登録し、店舗を重複数として数えない。

**連結子会社化の時系列**：スギHDは2025年9月30日にセキ薬品の株式49%を取得して持分法適用関連会社とした。2026年4月9日に株式2%の追加取得を決議し同年9月1日実行予定と発表。2026年10月公表の中間期報告書では、2026年9月1日に追加取得が完了し、議決権保有率51%となって連結子会社化したことを確認できる。最初の計画では2030年6月を目途としていたが、企業文化の親和性や人材交流・ノウハウ共有が想定を超えて進んだため、約4年の前倒しとなった。スギHD公式グループ会社一覧にもセキ薬品を掲載。セキ薬品は埼玉県南埼玉郡宮代町に本社を置き、1973年12月に前身の1号店を開業、1984年1月に法人化。1989年にチューリップマークを設定し、2008年からドラッグストア セキの店名を使用、2017年に調剤ブランドを「チューリップ薬局」から「セキ薬局」に変更した。2026年9月24日時点の公式店舗検索ではドラッグストアセキ226店舗、セキ薬局118店舗。両業態は別の独立法人ではなく株式会社セキ薬品の事業。

**その他の兄弟業態**：旧I&H（阪神調剤グループ）は2024年にスギ傘下に入り、2025年3月に株式会社スギ薬局へ吸収合併。阪神調剤の屋号は薬局事業として継続。薬日本堂は2023年12月にスギHD傘下となり、ニホンドウ漢方ブティック・カガエ カンポウ ブティックなどの漢方専門店を展開。関西の「ジャパン」はスギグループのディスカウントドラッグ業態。スギとトライアルホールディングスの2026年の包括的協業は、親子会社関係とは異なるため、トライアルのブランドをスギの兄弟ブランドには登録しない。「スギ薬局」「スギドラッグ」「ドラッグスギ」「ドラッグストア セキ」「ジャパン」はドラッグストア分類、「セキ薬局」「阪神調剤薬局」は調剤薬局分類、漢方専門店は専門店分類とし、新しい調剤薬局フィルターをpublic/index.htmlに設置（既存の検索JSで利用できる）。

公式出典（2026-11-06確認）：
- https://www.sugi-hd.co.jp/
- https://www.sugi-hd.co.jp/company/business/
- https://www.sugi-hd.co.jp/groupcompany-list/
- https://www.sugi-hd.co.jp/company/history/
- https://www.sugi-hd.co.jp/pdf/20260409_03.pdf
- https://www.sugi-hd.co.jp/pdf/2025.0819.01.pdf
- https://www.sugi-hd.co.jp/pdf/20250218_01.pdf
- https://www.sugi-net.jp/contents/data/31141-syuusei260428.pdf
- https://www.sugi-net.jp/store-type
- https://www.sugi-net.jp/stores
- https://www.sekiyakuhin.co.jp/outline
- https://www.sekiyakuhin.co.jp/index.php/outline/greeting.html
- https://www.sekiyakuhin.co.jp/shop
- https://www.sekiyakuhin.co.jp/dispensingpharmacy
- https://www.nihondo.co.jp/company/history/
- https://www.nihondo.co.jp/shop/
- https://www.nihondo.co.jp/shop/boutique/

2026年9月1日の実行確認の補助資料（スギHD中間期報告書のテキスト版。一次開示を転記した外部ホスト）：
- https://financialfilings.com/filings/sugi-holdings-coltd/interim-quarterly-report/2026/70794541/


## 出典・更新メモ（2026-11-06 長崎ちゃんぽん／山田うどん／ぎょうざの満洲／餃子の王将）

「長崎ちゃんぽん」は特定の料理名でもあるため、今回はユーザーの希望するチェーン名として「長崎ちゃんぽん リンガーハット」を登録し、検索別名に「長崎ちゃんぽん」「リンガーハット」を設定した。独立系の4グループに加え、王将フードサービスと間違えやすい大阪王将の親会社・イートアンドホールディングスも別グループとして追加し、5グループ・20ブランド追加（累計59グループ・394ブランド）。全件で出典、既存と重複しないブランド名、運営会社（分かる範囲）、確認日2026-11-06を記録した。

**リンガーハット**：株式会社リンガーハットがグループを統括。1962年7月22日に「とんかつ浜勝」を長崎で創業したのが出発点。1968年に長崎卓袱浜勝の前身、1974年に「長崎ちゃんめん」1号店を開店し、1977年に「リンガーハット」屋号へ。現在の公式事業紹介に掲載される「長崎ちゃんぽん リンガーハット」「とんかつ濵かつ」「長崎卓袱浜勝」の3屋号を登録。海外のリンガーハットは同一ブランドの海外店舗として重複登録せず、2009年国産野菜への切替や1979年の埼玉県与野市出店を沿革・概説に記録。冷凍食品のリンガーフーズ、設備管理のリンガーハット開発等は関連会社であって飲食店ブランドではない。

**山田うどん**：山田食品産業株式会社（埼玉県所沢市）が1935年に手打ちうどん専門店として創業。1953年法人設立、1965年に山田うどん1号店、2018年に「ファミリー食堂 山田うどん食堂」へ改称。2021年には「埼玉タンメン 山田太郎」を開店。2026年3月末時点の会社概要では両ブランド合計151店舗（直営147、FC4）。1965年開始の学校給食向け麺供給や1975年NYでのラーメン店「TARO」も公式沿革にあるが、TAROは現在の営業継続が確認できないため現行ブランド検索には登録しない。「おうち山田うどん」は通販サイトにつき独立実店舗には数えない。

**ぎょうざの満洲**：株式会社ぎょうざの満洲は1964年に所沢市の「満洲里」から始まり、1977年に現在の屋号へ。自社工場で餃子や麺・惣菜を製造し、2026年4月時点で直営104店。2010年に群馬県老神温泉の旅館「東明館」を開業。旅館は飲食店カテゴリの既存仕様には合わないためグループ沿革で紹介し、現行の食堂ブランドとしては登録しない。「ギャラリーマンシュウ」は貸ギャラリーであり、ぎょうざ店とは別の事業として検索登録しない。正式表記は「満洲」で、「満州」の入力でもヒットするよう検索別名に設定。

**餃子の王将 vs 大阪王将**：京都の餃子の王将は株式会社王将フードサービス（1967年創業）。2026年3月末の公式店舗数は728（直営551、FC177）。「GYOZA OHSHO」は同社のニューコンセプト店舗として掲載されるため区別して登録。大阪王将は1969年大阪京橋創業の株式会社イートアンドホールディングス系、店舗事業の運営は株式会社大阪王将。餃子の王将の公式「お問い合わせ」ページで、同社は大阪王将と**資本関係・業務提携関係を持たない無関係の別会社**と明言している。両ブランドを同一グループへ誤登録しない。「王将」は曖昧な検索語なので餃子の王将を検索別名に登録しつつ、「大阪王将」も実名検索でヒットするようにする。

**イートアンドグループ**：株式会社イートアンドホールディングスの2026年公式事業・ブランド一覧に掲載された飲食屋号から、大阪王将、太陽のトマト麺、よってこや、横濱一品香、恵比寿 大龍軒、新御茶ノ水 萬龍、大塚 幸龍軒、R Baker、Coccinelle、THE GROUNDS BAKER、SAPPORO餃子製造所、北海道めんこい鍋 くまちゃん温泉の12店名を登録。「くまちゃん温泉」は鍋料理のお店の屋号であり温浴施設ではない。大阪王将ブランドの冷凍餃子やラーメンじゃーにーなど通販事業は同社の事業だが、実店舗の別ブランドとしては扱わない。2026年8月末の同社公式会社概要にはFC含む計459店舗と記載。

公式出典（確認日2026-11-06）：
- https://www.ringerhut.co.jp/business/
- https://www.ringerhut.co.jp/corporate/outline/
- https://www.ringerhut.co.jp/corporate/history/
- https://www.ringerhut.co.jp/three_minutes/
- https://www.ringerhut.jp/corporate/
- https://www.yamada-udon.co.jp/company/overview
- https://www.yamada-udon.co.jp/company/history
- https://www.yamada-udon.co.jp/tanmen
- https://www.mansyu.co.jp/company/index.html
- https://www.mansyu.co.jp/shop/
- https://ir.ohsho.co.jp/company/outline/
- https://www.ohsho.co.jp/inquiry/
- https://ohsho.co.jp/concept/gyoza-ohsho/index.html
- https://www.eat-and.jp/company/outline/
- https://www.eat-and.jp/company/group/
- https://www.eat-and.jp/company/history/
- https://www.eat-and.jp/brand/
- https://www.eat-and.jp/grouplist/
- https://www.osaka-ohsho.com/profile/

 
## 出典・更新メモ（2026-11-06 居酒屋チェーン大型調査・13グループ159ブランド）

2026年11月6日夜の調査で、新規13グループ・159ブランドを追加し、合計72グループ・553ブランド。ユーザー指定の白木屋・はなの舞・目利きの銀次・鳥貴族・村さ来・養老乃瀧に加え、魚民・笑笑・山内農場・千年の宴・一軒め酒場・やきとり大吉・庄や・日本海庄や・磯丸水産・鳥良商店・塚田農場・新時代・串カツ田中・や台ずし・くいもの屋わん等、公式サイトで掲載確認できた別屋号を追加。

**「居酒屋」フィルター**をサイトに追加した。カテゴリ「居酒屋」を新設し、既存「飲食」フィルターは「飲食」「居酒屋」の両方を含む上位分類として引き続き機能するよう `public/app.js` を修正。結果一覧の「○グループ・○ブランド表示」は絞り込み後に実際に表示するグループ数を数えるよう改良。既存の「ドラッグストア」「調剤薬局」等のカテゴリはそのまま維持。

### 古典的な居酒屋チェーン：系列の違い

- **モンテローザ**（30ブランド新規）：白木屋、魚民、笑笑、目利きの銀次、山内農場、千年の宴、福福屋、月の宴、横濱魚萬、濱焼北海道魚萬、かば屋、竹取酒物語、豊後高田どり酒場等を公式ブランドページに基づき収録。同一モンテローザグループの複数屋号であり、地名や人名がついていても独立した経営グループではない。食事業態（俺の店・みつえちゃん・しゃぶ食べ等）も同じグループとして登録。
- **チムニー／やまや**（14ブランド新規）：はなの舞、さかなや道場、魚鮮水産、さかな酒場魚星、大衆食堂安べゑ、焼肉牛星、龍馬軍鶏農場、こだわりやま、やきとり道場等。2026年3月期チムニー有価証券報告書で、**株式会社やまやが議決権50.5%を保有する親会社**と明示されている。やまやは酒販事業、チムニーは外食事業。「つぼ八」はチムニーが34.0%を保有する**持分法適用関連会社**であり、チムニーの100%子会社ではないため別グループにした。親会社・関連会社・事業会社の差を明記。
- **焼肉坂井HD**（18ブランド新規）：村さ来（1973年創業）、ゆるりと菜村さ来、囲炉家村さ来、ふらりむらさき、とりあえず吾平、餃子歩兵、えん屋、地魚屋等。焼肉屋さかい・肉匠坂井・平禄寿司も同系列。2026年10月5日のグループ公式発表によると村さ来は全国約60店舗。旧商号「ジー・テイスト」に由来する沿革あり。FC・グループ会社ブランドと提携店の区別は個別に確認する。ブランドとして公式店舗検索に掲載されたものを登録し、独立経営の提携先ブランドを無理に全て同一傘下扱いしない。
- **養老乃瀧**（4ブランド新規）：養老乃瀧・だんまや水産・一軒め酒場・韓激。1938年松本市創業、1956年横浜で養老乃瀧1号店。1970年代から2000年代初頭に「昼は牛丼、夜は居酒屋」の二毛作営業を行っていた。1977年発売の養老牛丼は現行独立店としては登録しない。
- **鳥貴族／エターナルホスピタリティ**（6ブランド新規）：鳥貴族、やきとり大吉、zoku、HASU、mozu、やきとり松明を同グループとして登録。鳥貴族東日本・西日本とダイキチシステムなど子会社が個別に屋号を展開。「焼きとりの八兵衛 北新地店」は別企業ブランドのFC出店なので、八兵衛チェーン全体を傘下と表現しない。
- **つぼ八**（2ブランド新規）：つぼ八、伊藤課長を収録。1973年札幌市琴似発祥。2026年のチムニー連結決算資料ではチムニー保有34%の持分法適用関連会社。以前の「茜どき」「旨居屋新八」等は過去の沿革として記録したが、現時点の継続展開を確認できないため現役ブランドには登録していない。

### 現代・新世代チェーン：系列の広がり

- **クリエイト・レストランツHD**（13ブランド新規）：磯丸水産、鳥良商店、おもてなしとりよし、五の五、きづなすし、ビストロISOMARU等、元SFPブランドを中心に登録。**SFPホールディングスは2026年7月1日に親会社クリエイト・レストランツ・ホールディングスと合併**しており、独立の現行持株会社として誤登録しない。元SFP系の店舗ブランドとして区別。
- **エー・ピーホールディングス**（19ブランド新規）：宮崎・鹿児島・北海道別の塚田農場屋号、四十八漁場、なきざかな、芝浦食肉、関根精肉店、日本橋墨之栄、農家ごはんつかだ食堂、じとっこ等を登録。公式ブランド＆ビジネスページに掲載される屋号をベースとする。FC・ライセンス運営店はグループ屋号と実店舗の経営法人が一致しない場合がある。
- **ファッズ／新時代**（5ブランド新規）：新時代、新時代44、鳥ぶら、とんぺら屋、タイ料理スコンターを登録。株式会社ファッズは2006年設立、2010年に愛知県刈谷市で新時代開店。創業者さのなおしが100%出資。2026年8月に海帆から新時代・新時代44の16店を譲受。「伝串」は商品名のため独立したチェーンとして数えない。
- **ユニシアHD／串カツ田中**（9ブランド新規）：串カツ田中、PISOLA（イタリアン）、天のめし、TANAKA、ザ・メンチ、厚とん、焼肉くるとん、カツのジョー、富之上等を登録。2026年2月27日付正式発表により、**2026年3月1日に串カツ田中ホールディングスからユニシアホールディングスに社名変更済み**。PISOLAを2025年12月に完全子会社化。串カツ田中は2026年10月23日和歌山出店で47都道府県の店舗展開を達成（公式発表、自社調べ）。今後買収等に応じて更新。
- **大庄**（15ブランド新規）：庄や、日本海庄や、大庄水産、お魚総本家、満天酒場、呑兵衛、やる気酒場、三四味屋、とり家ゑび寿、羊肉酒場悟大、築地日本海、CAFE＆BAKERY MIYABI等をグループとして登録。実際の居酒屋と飲食／ベーカリー業態でカテゴリを区別する。
- **ヨシックスHD**（10ブランド新規）：や台ずし、ニパチ、ひとくち餃子の頂、や台や、これや、焼とりてっぱん、玉鋼等。2026年8月時点で41都道府県400店舗と公式沿革に記載。一部屋号は他社事業から譲受。
- **オーイズミフーズ**（14ブランド新規）：くいもの屋わん、くいもの屋つう、九州自慢、九州魂、千の庭、かっこ、とんとんびょうし、三代目文治、越前華丸、すりみやなど。イタリアンLOGiCも同グループで別カテゴリ登録。公式ブランド一覧および店舗検索を照合。

### 主な公式出典（確認日：2026-11-06）

- https://www.monteroza.co.jp/brand/
- https://www.monteroza.co.jp/company/profile/
- https://shop.monteroza.co.jp/
- https://www.chimney.co.jp/kameiten_buken-boshu/fc_site/feature/
- https://www.chimney.co.jp/company/profile/
- https://www.chimney.co.jp/prd/wordpress/wp-content/uploads/2026/06/yuka_2026.pdf
- https://ys-holdings.co.jp/brand/
- https://ys-holdings.co.jp/search/
- https://ys-holdings.co.jp/murasaki/
- https://www.yoronotaki.co.jp/corporate/businessarea.html
- https://www.yoronotaki.co.jp/corporate/asboutus.html
- https://eternal-hospitality.co.jp/business/
- https://eternal-hospitality.co.jp/company/group/
- https://tsubohachi.jp/
- https://tsubohachi.jp/company/history
- https://www.createrestaurants.com/business/main/
- https://sfpdining.jp/
- https://ap-holdings.jp/brand-and-business/
- https://www.phads.jp/shop_search/
- https://phads.jp/profile.html
- https://www.phads.jp/company/post-shinjidaigroup-ma/
- https://unisia.co.jp/about/company/
- https://unisia.co.jp/about/group/
- https://unisia.co.jp/press/entry/3226
- https://www.kushi-tanaka.com/news/entry/3378
- https://www.daisyo.co.jp/brand/index.html
- https://www.yossix.co.jp/shop-guide/
- https://yossix-shop.com/
- https://www.yossix.co.jp/corporate/history/
- https://www.oizumifoods.co.jp/
- https://search.oizumifoods.co.jp/


## 出典・更新メモ（2026-11-06 ラーメン編：頑者・魁力屋・くるまや・田中そば店・日月堂・ラーメンショップ）

企業公式の店舗一覧、会社概要、グループ会社情報、沿革、2026年の開示を照合し、**9グループ・39ブランド**を純増登録した（累計81グループ・592ブランド）。途中の並行更新により頑者、つじ田、魁力屋、三田製麺所、銀座いつき、天むす金子半之助が表記違いで複数登録されたため、同義の6件を削除して残す側の `aliases` に移した。『SAKIGAKEホールディングス』のグループIDも重複2件を1件（`sakigake`）へ統合。データ上の見かけの増加ではなく、実際に別の系列・ブランドであることを優先する。

### 5つの主なラーメン系統

- **頑者（株式会社頑者／川越）**：1985年に父・大橋英政が有限会社ひかり食品（製麺会社）設立、1993年に『ガンジャ』、2000年に川越の『頑者』。頑者 本店、頑者illmatic、頑者製麺所、らーめんひかり、UNDERGROUND RAMEN、GANJA RAMEN、メガガンジャを登録。GANJA（ガンジャ）は頑者の別読みとして検索可能とし、同一店舗の表記違いは重複数にしない。製麺所に由来する自家製極太麺・豚骨魚介スープ・魚粉に独自性がある。
- **SAKIGAKEホールディングス／魁力屋**：2005年京都北白川で魁力屋創業。2025年7月にグランキュイジーヌ、2026年1月にエムピーキッチンHD（現エムピーキッチン）を完全子会社化。2026年7月1日に旧株式会社魁力屋が持株会社化し『SAKIGAKEホールディングス』に商号変更、旧魁力屋の店舗事業は新設の株式会社魁力屋が承継。魁力屋と三田製麺所・札幌みその・からたま屋・とりサブロー・KIBARU・日本橋とんかつ一・渋谷餃子・銀座いつき・肉そばけいすけ・博多一星・鶏王けいすけ・鴨そば九代目けいすけなどが同じグループ。台湾魁力屋は同一の魁力屋ブランドの海外店舗展開として別登録を見送った。
- **くるまやラーメン**：運営本部は株式会社くるまやラーメン。1968年に綾瀬駅前でうどん・そば店創業、1970年前後に国道4号で『観光バスを改造したラーメン店』を開始したことが『くるまや』の名前の由来。公式会社概要2026年10月末時点の店舗数は136（直営33・FC103）。個々のFC店舗は別法人運営もあるため、FC運営会社の別ブランドを無条件でくるまや本部の子会社ブランドには含めない。
- **オイシーズ／田中そば店**：持株会社オイシーズ株式会社。GMSが田中そば店／田中商店、H.I.T WORLDがつじ田／つじ田 味噌の章／成都正宗担々麺、バイザ・エフエムが日本橋 天丼 金子半之助などを展開。海外のKILLER NOODLEなども傘下。田中商店は2000年12月足立区で創業、田中そば店は2008年に姉妹ブランドとして開店。つじ田・金子半之助は田中そば店とは商品も創業者も違うが、現在の親会社が同じという資本関係がある。オイシーズ公式2025年12月末データでは132店舗（国内103、海外29）。
- **ジンクル／日月堂**：株式会社ジンクル、本社埼玉県志木市。2000年草加で『ラーメンのまめぞう』、2003年『麺厨房ばんぶる』、2016年『日月堂』開店。2026年の公式ニュースでは3屋号を確認可能。過去の『ガツ盛リラーメンみちる屋』『日々是』は沿革に登場するが、2026年に展開継続中の独立チェーンと確定できていないので登録せず沿革での紹介にとどめる。

### ラーメンショップ：全国同一の親会社とは扱わない

『ラーメンショップ』は複数の加盟・独立運営の系統が存在する特殊な屋号。一般的な歴史・系譜を便宜上まとめる参考項目 `ramen-shop-network` は**単一企業の傘下を意味せず**、通常の企業グループとは区別して説明する。『椿』と看板にあっても、企業の統一的な資本関係を示す証拠にはならない。少なくとも公式・運営者の資料から確認できた以下の別組織を個別登録：

- 福島：有限会社アサカ商事が運営する椿ラーメンショップ。公式会社概要で自社直営店経営・製麺を明記。
- 茨城・千葉：有限会社つくばコーポレーションの採用サイトに新守谷・石下・河内・坂東・玉造・野田各店の採用が記載され、店舗紹介サイトが『椿ラーメンショップ』新守谷・石下・玉造・河内・坂東・野田、関連の牛久・つくば等を掲載。
- 埼玉：インペックスグループが『椿』上彦川戸、松伏、庄和町南桜井、春日部備後各店を自社飲食事業と公式掲載。インペックスが運営する『三郷たかの食堂』はまいどおおきに食堂のFC運営店舗であり、全国のまいどおおきに食堂チェーンがインペックス傘下という意味ではない。

同名・同看板の独立企業を一律に『椿本部の100%子会社』としない。『ラーメンショップ』全店の企業グループを単一IDに割り当てることはできないため、個別運営会社の識別に必要な地域・会社名をブランド名に添える。

公式一次資料・参考資料（確認日2026-11-06）：

- https://ganja.co.jp/shop/
- https://ganja.co.jp/company/
- https://ganja.co.jp/about/
- https://www.kairikiya.co.jp/company
- https://www.kairikiya.co.jp/brand
- https://www.sakigake-holdings.co.jp/brand
- https://www.sakigake-holdings.co.jp/company
- https://prtimes.jp/main/html/rd/p/000000003.000185678.html
- https://www.kurumayaramen.co.jp/profile.htm
- https://www.kurumayaramen.co.jp/tips.htm
- https://oishes.com/corporate/profile/
- https://oishes.com/business/domestic/
- https://tanaka-shoten.net/about/
- https://tanaka-shoten.net/information/
- https://jincle.com/about/
- https://jincle.com/news/
- https://jincle.com/nichigetsudo/
- https://ramenshop.jp/company.html
- https://tsukuba-corporation.com/shop/
- https://job-gear.net/tsukubac2/A20329890576/MDkyujin_d.htm
- https://inpex.jpn.com/about/food
- https://www.moneypost.jp/822720 （ラーメンショップ全体の歴史についての二次資料。各店の資本関係の一次確認には使用しない）


## スーパー大攻略編（2026-11-07）：18グループ、102ブランド追加

2026年11月7日、企業・屋号別の一次資料を照合し、18グループ・102ブランドを追加、累計**99グループ・694ブランド**。食品スーパーのカテゴリーは17件→**97件**に拡大。居酒屋・外食と違い、同じ名前が地域法人の屋号であるケース、独立企業が再編で同一持株会社に集まるケース、卸先・仕入先・FCだけの関係、少数株主が存在するケースが多いため、以下の区別を守った。**店舗ブランドは会社と別の概念**：物流・製造専業、商品PBの名前は独立店舗ブランドとして数えない。

- **ブルーゾーンHD**：ヤオコー、エイヴイ、フーコット、文化堂、せんどう、クックマートの6ブランド。同じグループ会社一覧に掲載されている持株会社傘下の企業。2025年に持株会社化。2026年3月末時点、ヤオコー202店・エイヴイ14店・フーコット5店・文化堂18店・せんどう25店・クックマート12店。地元の店名を維持したまま経営統合する例。
- **OIC**：ロピア、スーパーバリュー、アキダイ、新鮮大売ユータカラヤ、韓国食品・コスメ小売REACO。スーパーバリュー公式沿革によると2026年1月OICが同社を完全子会社化。ロピア公式の企業グループ案内で確認。なおチルドスイーツ製造の別会社『株式会社ロピア』（ropia.co.jp）とは別法人。
- **ベルク**：ベルク、旬鮮魚市場クルベ（CLBE）。2026年2月末のベルク公式株主情報：イオン15.00%、しまむら4.21%の大株主。ただし**独立上場企業でありイオン連結子会社ではない**。少数持分を同じ企業グループでの親子関係と混同しない。
- **マミーマート**：本部がさいたま市北区宮原町2-44-1。マミーマート、生鮮市場TOP!、マミープラスを運営。2025年10月に持株会社体制、株式会社マミーマートが小売事業を運営。2026年9月時点運営会社の店舗93店。彩裕フーズ、マミーサービス等は関連事業会社だが店名ではない。
- **オーケー**：1958年に岡永商店小売部門として創業、1967年に独立会社設立。大株主にオーケークリエイティブ、オーケー育英財団、伊藤忠食品、三菱商事等がいるが、ファミリーマートや三菱商事の子会社とは分類しない。関西への進出も公式店舗情報で確認。
- **ライフ／アルビス**：ライフ、ビオラルと、北陸のアルビスを**別グループ**で収録。2026年2月末、ライフの大株主として三菱商事24.37%（ライフは独立上場）。ライフは2026年9月8日にアルビスを買収するTOBを発表し、公開買付期間は9月9日から**11月10日まで**、決済開始日は11月17日の予定。**2026年11月7日現在は未成立**。TOBの結果・子会社化時点・残り株式の取り扱いが確認できるまでは『同じグループ』と書かない。次回買付終了時に一次開示を確認する対象。
- **サミット／トモズ＝住友商事**：住友商事公式の主要グループ会社一覧・2025年10月のリリース、トモズ公式会社概要で確認。サミットとトモズは各社とも住友商事100%子会社。『サミットストア』と『トモズ』『アメリカンファーマシー』『メディコ』『カツマタ』および専門店『インクローバー』を同一グループに。2025年10月には会員IDを統合した『STポイント』を導入。
- **ベイシアグループ**：ベイシア・ベイシアマート・ベイシアFoods Park、トップワン、スーパー三心。関連する別業種のカインズ・ワークマン・ワークマンプラス・ハンズ・ハンズビー・オートアールズ・ベイシア電器も登録。ベイシアとカインズ公式は企業グループ35社と表記する。ただしワークマン公式の2026年3月会社概要は『親会社及び子会社を有しておりません。ベイシアグループに所属』と明示：**共通の企業集団と単一の親会社に連結された子会社群を混同しない**。
- **ロヂャース**：さいたま市桜区の北辰商事が運営。ロヂャース・ロヂャースマート・マイカイマートを各店店舗リストで確認。食品だけでなく日用雑貨等も扱うためロヂャース本体は量販店、ほか2屋号はスーパー分類。『ロジャース』でも検索できる。
- **JMホールディングス**：ジャパンミート生鮮館・卸売市場・MEATMeet・パワーマート、肉のハナマサ・肉のハナマサPLUS、スーパーみらべる、焼肉や漫遊亭・とんかつや漫遊亭を登録。2026年7月末公式グループ概要と店舗一覧で確認。2023年にスーパーみらべるを子会社化。ジャパンミート生鮮館はジョイフル本田の建物内等にも展開するが、テナント関係と資本関係は別。
- **エコスグループ**：エコス、TAIRAYA、たいらや、マスダ、与野フード、フードガーデン、Yバリュー、ココスナカムラ、ベンガベンガ。2020年9月与野フードセンター、2024年9月ココスナカムラ、2026年10月ベンガベンガを子会社化。採用FAQにブランドと運営各社の対応関係が掲載。TAIRAYAは複数社共通の店舗ブランドなので『全店が株式会社たいらや運営』とは誤認させない。
- **オザム**：スーパーオザム、オザムバリュー、ラコマート、エネルギースーパーたじま。オザムは小売と別にパチンコ・アミューズメント事業を運営するが、店舗名と運営会社の同一性があってもレジャー店舗を食品スーパーと分類しない。
- **神戸物産**：業務スーパー（株式会社神戸物産はFC本部で店舗運営のすべてを直営するわけではない）。さらに神戸クック・ワールドビュッフェ、プレミアムカルビ、惣菜店の馳走菜。業務スーパー名を持つ加盟企業は資本上の子会社を意味しない。
- **大黒天物産**：ラ・ムー、ディオ、ザ・大黒天、ディオマート、バリュー100、ら・む～マート（コンビニ分類）。大黒天物産公式のブランド一覧で確認。
- **バローHD**：バロー、タチヤ、食鮮館タイヨー、公正屋、フタバヤ、スーパー三幸に加えV・drug、ホームセンターバロー。2026年9月末の公式店舗一覧はスーパー368店舗、ドラッグストア585店舗等と掲載。
- **アークス**：スーパーアークス、ラルズマート、ビッグハウス、ユニバース、東光ストア、フクハラ、ジョイス、ベルプラス、オータニ、FOOD DEPO COSPA。会社であるラルズ、ユニバース、ベルジョイス、福原、道北・道東アークス等がひとつのアークス企業グループだが、店名と会社名を混同しない。
- **U.S.M.H（イオン傘下の中間持株会社）**：マルエツ・カスミ・いなげや・イオンフードスタイルを傘下に持つスーパー共同持株会社。2026年9月28日時点で760店舗。既存データのマルエツ・カスミの単一紐付をイオン親グループ（`aeon`）から中間持株会社（`usmh`）へ付け替えた。親のイオンを別グループとして維持し、双方のグループ説明に階層を記載。マルエツプチ、リンコス、フードスクエアカスミ、FOOD OFFストッカー、BLΛNDE、いなげや、ina21、ブルーミングブルーミー、フードスタイル、ピーコックストアを追加。全国各地のマックスバリュは運営会社が異なるため、既存の広域『マックスバリュ』ブランドは親のイオンに残す。

### スーパー編で用いた公式出典（2026-11-07確認）

- https://www.bluezonesholdings.co.jp/corporate/group.html
- https://lopia.jp/company
- https://www.supervalue.jp/company/history.html
- https://www.belc.jp/company/stock/basicinfo
- https://www.belc.jp/clbe/0093
- https://mami-mart-holdings.com/
- https://mami-mart-holdings.com/company/
- https://mammymart.co.jp/corporate/about
- https://ok-corporation.jp/company/company-profile.html
- https://ok-corporation.jp/company/company-history.html
- https://www.lifecorp.jp/company/ir/IRnews/2026/index.html
- https://www.lifecorp.jp/company/info/news/
- https://www.albis.co.jp/
- https://www.jpx.co.jp/news/1023/20260908-11.html
- https://www.sumitomocorp.com/ja/jp/about/company/scgroup/business/business06
- https://www.sumitomocorp.com/ja/jp/news/topics/2025/group/20251001
- https://www.tomods.jp/company
- https://www.beisia.co.jp/企業情報/グループ紹介
- https://www.cainz.co.jp/corporate/group/
- https://www.workman.co.jp/ビジネス情報/企業概要
- https://www.rogers.co.jp/sp/shop/
- https://jm-holdings.co.jp/profile/profile.html
- https://jm-holdings.co.jp/profile/group.html
- https://www.eco-s.co.jp/profile/
- https://www.recruit-eco-s.jp/faq/
- https://www.ozam.jp/html/01.htm
- https://www.gyomusuper.jp/opinion/fc.php
- https://kobebussan.co.jp/business/restaurant.php
- https://www.e-dkt.co.jp/
- https://valorholdings.co.jp/corporate/stores.html
- https://www.arcs-g.co.jp/about/group-company/
- https://www.usmh.co.jp/about
- https://www.usmh.co.jp/group/giftticket


## 2026-11-08 パンチョ・さわやか・サンマルクHD：100グループ突破と売却後の所属訂正

2026年11月8日、ユーザーの「スパゲティのパンチョってなんかのグループ？さわやかハンバーグとかは？」を起点に公式情報を調査し、**3グループ・44ブランド**を登録（累計**102グループ・738ブランド**）。100グループを初突破。パンチョとさわやかの所属関係だけでなく、過去の系列と現在の系列を峻別するため、牛かつもと村の現在の親会社サンマルクHDも追加。最新の公式決算資料・2026年の会社説明を優先し、ブランドサイトに残る古い企業関係は現行所属の証拠としない。

### パンチョ／ファイブグループ：2009年居酒屋企業の社内ブランドから誕生

- 2026年7月3日、株式会社パンチョは「スパゲッティーのパンチョ」全国50店舗を達成。株式会社ファイブグループの社内ブランド開発から2009年11月に誕生し、**2022年に株式会社パンチョとして分社化**。2026年10月2日には新しいスープパスタ業態「ごちそうスープパスタ」（ごちスパ）代々木1号店を開いた。ファイブグループ2026年10月リリースは株式会社パンチョを「関連企業」と表記しており、**100%子会社とは断定しない**。
- パンチョ業態は「スパゲッティーのパンチョ」「キッチンパンチョ」「ごちそうスープパスタ」。ファイブグループの独自屋号（居酒屋：旨串とりとん、燻し家もっくん、いざこい、いざくる、ペコリ、鬼ぞりゴリラ、居酒屋大悟、蛙之介、とととりとん、とりとんくん／他業態：ステーキロッヂ、ローストビーフ大野、らあ麺さわ田、台湾老劉胡椒餅、甘味処旅氷）を公式ブランド紹介・グループ公式社内記事で照合して追加。2026年10月の「ごちそうスープパスタ」公式案内も参照。
- ファイブの公式ブランド紹介には「串カツ田中」「肉汁餃子のダンダダン」「ゴンチャ」「薄利多賣半兵ヱ」なども掲載されているが、これらは**同社が特定店舗でFC加盟・ライセンス運営するブランド**であり、全国のブランド全体がファイブグループ傘下になったわけではない。他の本来の企業グループ（串カツ田中＝ユニシアHD、ゴンチャ＝ゴンチャグローバル等）へ既存登録されているものは移動・重複登録しない。
- **重要な歴史上の変更：牛かつもと村は旧ファイブグループのブランドだったが、2024年12月6日にサンマルクHDへ移った。** ファイブグループ公式ブランド一覧にはなお「牛かつもと村」の記載が残るが、現在の資本系列はサンマルクHD。2025年のファイブ公式noteでも「2025年現在、ファイブを離れ事業譲渡済み」と明記。サンマルクHDの2026年会社概要・決算も確認。買収済みブランドを売却元の現在の兄弟店として案内しないこと。

### 静岡さわやか：同名別会社に注意、独立の直営単一ブランド

- 1976年9月にグリーン観光株式会社として設立、1977年7月に静岡県菊川市で「コーヒーショップさわやか」菊川本店を開業。1989年8月に「さわやか株式会社」・「炭焼きレストランさわやか」へ名称を変更。現在は静岡県袋井市宇刈137に本社を置く。
- さわやか株式会社の**2026年5月8日**の公式注意喚起では、**当時の35店舗すべて静岡県内・すべて直営**、ハンバーグは自社工場のみで製造し、他社への製造委託なし。他社が販売する「さわやか」風・類似商品は自社と関係なし。現在の店舗数は開店や移転によって変化するため、5月8日の35という値を11月時点の確定店舗数とは扱わない。
- 2026年11月2日の公式店舗案内には**2026年12月1日「御殿場ぐみ沢店」開店予定**と記載。11月8日現在は未来の予定として記録し、開業済みと扱わない。
- さわやかは「げんこつハンバーグ」等のメニュー商品名から生じた多店舗チェーンではなく、**「炭焼きレストランさわやか」1ブランドで登録**。東京都に本社がある同名の別会社「株式会社さわやか」（日東富士製粉の子会社）とも混同しない。

### サンマルクHD：元・ファイブ傘下「牛かつもと村」の移籍先

- サンマルクHDは2024年11月19日に、牛かつもと村を運営するB級グルメ研究所ホールディングス・BQ Internationalを取得して子会社化する方針を公表し、**2024年12月6日に全株式取得を実行**。2025年4月1日、株式会社牛かつもと村を存続会社としたグループ内合併が実行された。**2026年6月10日開示の「連結子会社からの配当金受領」に、株式会社牛かつもと村が連結子会社として明記**されている。
- サンマルクHDの公式ブランド紹介・2026年7月22日アプリ統合リリースに基づき、「サンマルクカフェ」「ベーカリーレストラン サンマルク」「生麺専門 鎌倉パスタ」「倉式珈琲店」「牛かつ もと村」「牛カツ京都勝牛」「神戸元町ドリア」「横濱元町ドリア」「グリル蔵敷」「てっぱんのスパゲッティ」「おだしもん」「ぎをん椿庵」「KamakuraPasta Fresca」「BISTRO309」「ベーカリーレストラン バケット」「ブレッドガーデン」「パントリエ」「台湾小籠包」「九份小籠包」「函館市場」「宝田水産」等25屋号を登録。
- **「てっぱんのスパゲッティ」と「スパゲッティーのパンチョ」は別系列**。さらに「パンチョ」と同グループにいた時期の「牛かつもと村」は、2026年には「鎌倉パスタ」「サンマルクカフェ」「京都勝牛」と同グループ。過去の創業企業と現在の持株会社を混同しないため、ファイブグループ内に「牛かつもと村」を登録しない。

### 主な公式一次出典（2026-11-08確認）

- https://five-group.co.jp/brands/outline
- https://five-group.co.jp/
- https://naporitanpancho.com/about
- https://prtimes.jp/main/html/rd/p/000000104.000117096.html （株式会社パンチョ／2026年7月3日・50店舗達成）
- https://prtimes.jp/main/html/rd/p/000000383.000012709.html （ファイブグループ／2026年10月2日・ごちスパ開業）
- https://note.five-group.co.jp/n/n74c40cd4d0bc （2025年、牛かつもと村の事業譲渡を注記）
- https://corp.genkotsu-hb.com/history
- https://corp.genkotsu-hb.com/
- https://corp.genkotsu-hb.com/news/detail/22
- https://www.genkotsu-hb.com/faq
- https://www.saint-marc-hd.com/hd/company_info/ci
- https://www.saint-marc-hd.com/hd/brand
- https://www.saint-marc-hd.com/hd/contents/news20260722/
- https://static.saint-marc-hd.com/upload/irnews/278/%E6%A0%AA%E5%BC%8F%E3%81%AE%E5%8F%96%E5%BE%97%EF%BC%88%E5%AD%90%E4%BC%9A%E7%A4%BE%E5%8C%96%E3%81%8A%E3%82%88%E3%81%B3%E5%AD%AB%E4%BC%9A%E7%A4%BE%E5%8C%96%EF%BC%89%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B_20241119.pdf
- https://static.saint-marc-hd.com/upload/irnews/367/%E9%80%A3%E7%B5%90%E5%AD%90%E4%BC%9A%E7%A4%BE%E3%81%8B%E3%82%89%E3%81%AE%E9%85%8D%E5%BD%93%E9%87%91%E5%8F%97%E9%A0%98%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B.pdf


## 2026-11-08 俺の・ブロンコビリー・木曽路・銚子丸・梅の花：5グループ52ブランド追加

創業者から挙がった「俺のシリーズ」「ブロンコビリー」「木曽路」「銚子丸」「うめのはな（梅の花）」を、2026年11月8日時点の各社公式サイト・2026年の会社概要等に基づき調査。既存データとの重複を回避し、**5グループ・52ブランド追加**で**107グループ・790ブランド**へ。各会社の正式な資本関係・子会社と、単なる創業者の経歴／商品名／メニュー名／旧屋号を区別。実際に存在する店舗ブランドを優先し、2026年秋にリブランディングした旧屋号はaliasesへ保持した。

### 俺の株式会社：ブックオフ創業者による別会社

- 「俺のイタリアン」「俺のフレンチ」「俺のフレンチ・イタリアン」「俺の焼肉」「俺のステーキ」「俺の割烹」「俺のBakery」「俺のグランメゾン TOKYO」「銀座しまだ」「鳥たん」等を収録。公式2026年店舗検索／キャンペーンページを優先。
- 俺の株式会社創業者・坂本孝はBOOKOFFの創業者でもあるが、BOOKOFFと俺の株式会社が現在同じ資本系列であることを意味しない。2011年9月の俺のイタリアン創業を起点とする飲食事業。2025年10月30日付の2027年株式公開目標・代表2名体制への移行リリースも参照したが、**上場を実行済みとは扱わない**。
- **店舗ごとの屋号変更に注意**：2026年10～11月のキャンペーン・現在の店舗検索で、「俺のやきとり」は「俺の割烹 やきとり」、「俺の炉ばた」は「俺の割烹 炉ばた」、「俺のそば」は「俺の割烹 そば」、「おでん 俺のだし」は「俺の割烹 おでん」などへ変更された店舗がある。旧屋号は検索aliasesへ保存。実際には一部地域・店舗に従来の「俺のやきとり」呼称が残るので、全店が完全に同時改称したとは断定しない。銀座しまだは公式現行ブランドに掲載。通販の「俺のEC」は店舗ブランドとして数えない。

### ブロンコビリー：とんかつのかつ雅を買収、調味料も自前

- 「ステーキハウス ブロンコビリー」「厚切りとんかつ京風おばんざい かつひろ」「とんかつ かつ雅」「お酒とお肉とおばんざい 信貴や」の4ブランドを登録。
- かつひろは2021年9月に自社開発。**かつ雅は株式会社レ・ヴァンが運営し、2024年4月にブロンコビリーが同社を子会社化**。2022年7月に調味料メーカー松屋栄食品本舗も買収しており、後者は食品製造事業なので飲食チェーンの店舗ブランドには含めない。
- 2025年12月末の公式トップメッセージではステーキ・ハンバーグ146、とんかつ14、居酒屋1の合計161店舗と記載。2026年11月の現在の店舗数として転用しない。

### 木曽路：しゃぶしゃぶと焼肉「くいどん」は本当に兄弟

- 株式会社木曽路の公式2026年9月30日会社概要に掲載された全7業態：「しゃぶしゃぶ・日本料理 木曽路」「特選和牛 大将軍」「国産牛焼肉 くいどん」「鶏料理 とりかく」「酒場 大穴」「和食旬彩処 鈴のれん」「からあげ専門店 からしげ」。
- 2026年9月末時点、木曽路125、大将軍12、くいどん32、とりかく3、大穴7、鈴のれん5、からしげ4、合計188店舗。居酒屋のとりかく・大穴は「居酒屋」分類、それ以外は「飲食」。一部ブランドを経営する株式会社建部食肉産業は仕入れ会社としてグループ概要に関連会社記載、飲食店名には登録しない。

### 銚子丸：千葉発の独立寿司企業／Yasukeも兄弟

- 株式会社銚子丸は1977年11月設立、2007年3月上場。グループ名は「銚子」の地名を冠するが、実際の本拠は千葉県。
- 2026年10月31日から11月29日の**創業祭対象店**に公式掲載された「すし銚子丸」「すし銚子丸 雅」「江戸前すし 百萬石」「鮨 Yasuke」「Standing 鮨 Bar Yasuke」「鮨 Yasuke 潮彩」をそれぞれ収録。2026年キャンペーンでブランド名を具体的に確認できない古い屋号（鮨元など）は、2025年のキャンペーン掲載歴があっても現役の独立ブランドとして未登録とした。
- 2026年2月期有価証券報告書では寿司単一事業・国内直営のみ。「銚子丸全体が別の回転寿司会社の子会社」「Yasukeは別の企業」といった誤解を防ぐ。

### 梅の花：さくら水産・古市庵・すし半まで抱えるグループ

- 1976年7月にかに料理店「かにしげ」で創業、1986年4月に湯葉豆腐「梅の花」1号店。2025年5月に持株側の社名を**株式会社梅の花グループ**へ変更。2026年4月期の公式会社概要は275店舗・連結売上298億24百万円。
- 外食の「湯葉と豆腐の店 梅の花」「かに料理専門店 かにしげ」「かに料理専門店 かに重」「CHINA 梅の花」「季節釜めし 花小梅」「食のつむぎ」「茶青花」「うめまめ」「梅香」「熊本あか牛しゃぶしゃぶ 甲梅」「和食鍋処 すし半」「海鮮処 さくら水産」「てらけん本家」「魚がイチバン」「海鮮処 魚さま」「梅の花バイキングレストラン ほたる」等を登録。古市庵、梅の花物販店、Umenohana KITCHENはテイクアウト専門店（「専門店」に分類）、BUA SPAは非飲食のスパ店舗として専門店分類。
- **さくら水産**の運営会社株式会社テラケンを2019年5月子会社化。**すし半**は2017年4月完全子会社化、**古市庵**は2007年10月子会社化（2014年10月完全子会社化）。それぞれ運営会社名をデータに明記。2016年にフジオフードグループ本社との資本業務提携があったが、今回の情報をもって梅の花をフジオフードの子会社とは断定しない。オンライン通販の「梅あそび」は実店舗ブランドとして登録しない。

### 主要一次出典（2026-11-08確認）

- https://www.oreno.co.jp/restaurants
- https://www.oreno.co.jp/sp/kappo_hangaku2026/
- https://www.oreno.co.jp/sp/gyutanmatsuri2026/
- https://www.oreno.co.jp/wp-corp/wp-content/uploads/2025/10/359b64a1e715782328b3fdd9d636353d.pdf
- https://ec.oreno.co.jp/view/page/column_company
- https://www.bronco.co.jp/corporate/about/business/
- https://www.bronco.co.jp/corporate/about/history/
- https://www.bronco.co.jp/corporate/ir/management_policy/message/
- https://www.katumasa.jp/levan/company/
- https://www.kisoji.co.jp/company/profile.html
- https://www.choushimaru.co.jp/ir/faq.html
- https://event.choushimaru.co.jp/fes/2026sougyousai
- https://www.choushimaru.co.jp/
- https://www.umenohana.co.jp/corporate/brands
- https://www.umenohana.co.jp/brands
- https://www.umenohana.co.jp/corporate/company/
- https://www.umenohana.co.jp/special-occasion
- https://www.umenohana.co.jp/corporate/vision/

 
### 2026-11-08 追加差分・現営業確認（4ブランド補完）

既存5グループの出典と漏れを再照合し、登録ブランドは790件から794件へ。以下の4項目を公式出典で補完。**すし銚子丸 Shinjuku**（2026年2月開店、新宿サブナード）は銚子丸の有価証券報告書と2026年現在の公式店舗ページで営業を確認。**とんかつ＆バル かつまさ 伏見**はブロンコビリーの2025年株主通信で子会社レ・ヴァンの業態として掲載され、2026年の店舗掲載も確認。**BSカンツリー 梅の花**と**弁当本舗 梅の花**は梅の花グループ公式ブランド一覧に収録（前者はゴルフ場内レストラン、後者はテイクアウト専門）。『すし銚子丸 Shinjuku』は、既存の『すし銚子丸』と同じ株式会社銚子丸によるが、IR上の業態区分に合わせて別屋号として検索可能にした。『弁当本舗 梅の花』は『梅の花 物販店』と近い事業領域だが公式で異なる名称を掲示しているため両方を収録する。

**閉店・転換**：『鮨元』は株式会社銚子丸が2026年5月15日閉店を公式告知したため現行ブランドに登録しない。『とんかつの和くら』は2026年2月1日閉店、同所在地に2月16日『かつ雅一宮店』開業のため、独立の現営業ブランドとしては登録しない。ブロンコビリーグループは2026年6月末時点164店（ステーキ・ハンバーグ148店、とんかつ15店、居酒屋1店）と、2025年末161店から更新。会社紹介でグループの現在の店舗数と過去のブランドを混同しない。

追加参照（2026-11-08確認）：
- https://stores.choushimaru.co.jp/184
- https://www.choushimaru.co.jp/info_20260501_1/
- https://www.bronco.co.jp/corporate/ir/management_policy/message/
- https://tonkatu-no-wakura.com/info
- https://www.umenohana.co.jp/corporate/brands


## 出典・更新メモ（2026-11-08 百貨店・ファッションビル系列）

三越伊勢丹、J.フロント リテイリング、高島屋、そごう・西武、H2Oリテイリング、近鉄、東急、東武、小田急、京王、松屋百貨店、丸井グループを新規追加。百貨店を中心に12グループ・48ブランド。『百貨店』フィルターを追加。SCやスーパーは実際の業態に合わせ『専門店』『スーパー』に分類した。

**関係の注意点**：①2023年9月にそごう・西武はセブン＆アイからフォートレス関連事業体へ売却、ヨドバシとは協力関係でありヨドバシ子会社ではない。西武鉄道とも別系列。②J.フロントのPARCOはSC事業で百貨店店舗ではない。③『丸井今井』は三越伊勢丹傘下で、マルイ／モディの丸井グループとは別。④『ジェイアール名古屋タカシマヤ』はJR東海・高島屋等の共同出資で高島屋の完全子会社ではない。⑤H2Oは阪急阪神東宝グループの構成企業だが、阪急阪神HDの完全子会社ではない。⑥松屋銀座・松屋浅草の株式会社松屋と、牛めしの松屋フーズ、松坂屋は別法人。⑦2025年8月の東急百貨店法人再編、2026年4月のH2O食品事業再編、2026年9月の西武渋谷閉店を現行関係に反映。過去の屋号・店舗を現役ブランドとして混ぜない。

- https://www.imhds.co.jp/corporate/business/department/index.html
- https://www.imhds.co.jp/corporate/business/department/isetanmitsukoshi.html
- https://www.j-front-retailing.com/company/business.php
- https://www.takashimaya.co.jp/corp/info/outline/
- https://www.takashimaya.co.jp/corp/info/group/domestic.html
- https://www.jr-takashimaya.co.jp/company/
- https://www.sogo-seibu.co.jp/info/history.html
- https://www.sogo-seibu.co.jp/info/
- https://www.7andi.com/ir/file/library/ks/pdf/2023_1012ks_01.pdf
- https://global.yodobashi/announcement/418/
- https://www.h2o-retailing.co.jp/ja/company/hhtg.html
- https://www.h2o-retailing.co.jp/ja/company/group.ht
- https://www.h2o-retailing.co.jp/ja/company/history.html
- https://www.kintetsu-g-hd.co.jp/group-info/list.html
- https://www.kintetsu-g-hd.co.jp/recruit/g-hd_recruit/business/merchandise/index.html
- https://www.tokyu.co.jp/company/news/detail/56006.html
- https://www.tokyu-dept.co.jp/corporate/corporate/
- https://www.tobu.co.jp/corporation/group/list/
- https://www.odakyu.jp/company/group/
- https://www.odakyu-dept.co.jp/corporation/profile/index.html
- https://www.odakyu-shoji.jp/shop/list.html
- https://www.keionet.com/corp/company/outline.html
- https://www.matsuya.com/corp/company/profile/
- https://www.matsuya.com/corp/company/stores/
- https://www.matsuya.com/corp/company/group/
- https://www.0101maruigroup.co.jp/ci/group


## 出典・更新メモ（2026-11-11 とろ麦・フーズジャパン）

株式会社フーズジャパン（本社・滋賀県草津市）を追加し、公式ブランド紹介と店舗情報に基づいて『ご飯ととろろ とろ麦』『とんかつととろろ膳 かつ麦』『とんかつ 勝六』『そばと和食 麦福』『親子丼と鶏料理 鶏山賊』『うどんと和食膳 う権』『手打ちとんかつ かつ屋』の7ブランドを収録。店名の短縮形を検索別名に設定。愛知県安城市のかつ屋1店舗は2026年9月10日、かつ麦へ業態転換済みだが、全店一斉改称とは扱わない。

**運営体制の注意点**：フーズジャパンは『とろ麦』ブランドの展開元。2026年1月にグローバルフードソリューション（GFS）と共同設立した株式会社イートリンクが関東4店舗（浅草EKIMISE、立川高島屋、セレオ八王子、大宮マルイ）の運営拡大を担当。イートリンクは『サンドイッチのお店 Merci』も運営するが、運営委託・共同事業関係と資本上の同一グループは区別し、フーズジャパンの『兄弟ブランド』としてMerciを無断登録しない。今回追加は1グループ7ブランドのみ。

- https://www.foods-japan.co.jp/
- https://www.foods-japan.co.jp/brand/
- https://www.foods-japan.co.jp/shop_category/shop_toromugi/
- https://www.foods-japan.co.jp/shop_category/shop_katsuroku/
- https://www.foods-japan.co.jp/access/
- https://eat-link.co.jp/business/
- https://eat-link.co.jp/brand/
- https://eat-link.co.jp/faq/
- https://gourmetpress.net/1402358/


## 出典・更新メモ（2026-11-11 スイーツパラダイス／井上商事）

大阪市の井上商事株式会社（洋菓子製造・デザートバイキング経営）を追加。公式店舗一覧で確認した『スイーツパラダイス』『COLLABO PARADISE』『CONCEPT CAFE KOBE BY SWEETS PARADISE』『DISH UP』『S-PiCK CAFE』『CAFE STAND SWEETS PARADISE』を1グループ6ブランド登録。スタンドは大阪・京都の店舗名称を別名検索に登録し、同じブランドの地域店を独立ブランドとして二重登録しない。2026年にCOLLABO PARADISEへ改称された旧CONCEPT CAFE店舗と、改称済み名称を同時に現行屋号として重複登録しない。

**区分の注意点**：2026年11月1日オープンの『Puffy & Sweety』は株式会社STPRと井上商事の『STPR PARADISE』共同プロジェクト店。STPRと井上商事が同じ資本グループであるとは確認できないため、同一グループの単純な兄弟ブランドとして今回登録しない。2026年8月開設の農産物販売EC『スイパラ農園直売所』は実店舗型サービスではないためブランド検索対象外。スイパラ公式会社概要に掲載されるPARCO・丸井等は主な取引先・出店施設であり、スイーツパラダイスの親会社ではない。

- https://www.sweets-paradise.jp/company/
- https://www.sweets-paradise.jp/shop/
- https://www.sweets-paradise.jp/shop/area/collabo/
- https://www.sweets-paradise.jp/shop/area/cakeshop/
- https://www.sweets-paradise.jp/shop/dish-up/
- https://www.sweets-paradise.jp/collaboration/puffyandsweety
- https://stpr-info.com/special/stpr-paradise/puffy-and-sweety
- https://prtimes.jp/main/html/rd/p/000000842.000059399.html
- https://online.bci.co.jp/article/detail/5868


## 出典・更新メモ（2026-11-11 りらくる／Re.Ra.Ku／非飲食業態へ拡張）

公式資料から、以下の別グループ2件／店舗ブランド合計6件を追加し、『リラクゼーション』フィルターを新設した。

- 株式会社りらく：『りらくる』1ブランド。2009年『りらく』として創業、2016年『りらくる』へ改称（旧屋号は検索別名）。2013年アドバンテッジパートナーズ系が買収、2017年12月にCVC Asia IVが過半数を取得。CVC公式ポートフォリオに2026年11月時点で掲載があるが、直近の出資比率は未確認。公式2026年9月プレスリリースによると603店舗（2026年3月時点）。複数施術メニューを別ブランドとして重複登録しない。
- メディロム（株式会社メディロム・ウェルネス等）：『Re.Ra.Ku』『Spa Re.Ra.Ku』『Re.Ra.Ku PRO』『Bell Epoc』『Ruam Ruam』の5ブランド。2026年11月5日のメディロム公式発表でブランド一覧を確認。旧株式会社リラクは2017年1月にメディロムへ商号変更している。同グループにはほかに美容室ZACCやヘルスケア事業等があるが、異業態は現段階では個別登録しない。

**誤認回避**：ひらがなの『りらく』（りらくる旧屋号／株式会社りらく）と、Re.Ra.Ku読みの『リラク』（メディロム旧社名）は、似た名称でも異なる企業。『りらく』で検索したとき両社の現在の屋号が候補に現れるのは、区別の機会として意図した設定。資本上の兄弟ブランドとして表示していない。なおCVC投資先一覧にある他業種企業を無条件に『りらくる』の兄弟ブランドとして追加しない。

- https://relxle.com/company
- https://relxle.com/usr/news/detail/509
- https://www.cvc.com/media/news/2017/2017-12-18-cvc-asia-iv-to-partner-with-riraku/
- https://www.cvc.com/portfolio/our-portfolio/
- https://www.advantagepartners.com/news/2013_08_14/
- https://medirom.co.jp/news/20261105
- https://medirom.co.jp/news/6atb8v7n1z9k
- https://medirom-wellness.co.jp/
- https://reraku.jp/brand/reraku
- https://reraku.jp/brand/spareraku
- https://reraku.jp/brand/rerakupro
- https://reraku.jp/brand/bellepoc
- https://reraku.jp/brand/ruamruam


## 出典・更新メモ（2026-11-11 ラフィネ／てもみん／カラダファクトリー系列）

創業者の希望でリラクゼーション3系統を公式情報で調査し、新規3グループ・20店舗ブランドを追加。従来の『リラクゼーション』フィルターはそのまま使い、トレーニング・運動を主とする2サービスだけ『専門店』に分類した。ブランドごとの検索別名、会社の沿革、誤解しやすい資本関係の区別を追加した。

- **ボディワークグループ**：ラフィネ／グランラフィネ／バダンバルー／ラフィネプリュス／プチラフィネ／整体ナチュラルボディ／トータルセラピー／フットデザイン／リフレの9ブランド。ラフィネグループ公式ブランド一覧・ボディワークHDの子会社説明で確認。なおオーストラリアの『ラフィネ トウキョウ』や『ラフィネ ランニングスタイル』も公式ブランド一覧に記載されているが、今回は国内リラクゼーション店の検索収録に絞っており対象外。『リフレ』は一般名詞と混同しやすいため運営を株式会社ボディワークと明記。
- **グローバルスポーツ医学研究所**：てもみん／PLANET／グローバル治療院／ウェルネススタジオGSの4ブランド。前者2件はてもみん系リラクゼーション、グローバル治療院は国家資格の鍼灸マッサージ等に基づく治療院、ウェルネススタジオGSはトレーニングサービス。1982年に前身治療院が創業、1985年に会社設立、1996年1月東京駅前に『てもみん』1号店。提供資格や業態を混同しない。
- **ファクトリージャパングループ**：カラダファクトリー／カラダストレッチ／カラダピオニー／カラダプレミアム／カラダシエスタ／本格整体処 和み庵／カラダプチフィットの7ブランド。公式サロン事業・主力ブランド公式ガイドを参照。カラダプチフィットは運動・フィットネス寄りのサービスとして『専門店』で登録。2001年4月に上大岡1号店、2010年に現社名へ変更。

**注意**：3社はいずれも別の企業系列。商業施設への出店先（イオン・PARCO等）を親会社扱いしない。個別のFC店舗では運営主体が異なる場合がある。手技の宣伝・効能は公式の宣伝文を医療事実として検証したものではない。

公式出典：
- https://www.bodywork-holdings.co.jp/company/info
- https://www.bodywork-holdings.co.jp/group/bodywork
- https://www.bodywork.co.jp/brand/
- https://www.bodywork.co.jp/tokushoho
- https://www.global-sports.co.jp/company/company_outline
- https://www.global-sports.co.jp/brands/
- https://www.global-sports.co.jp/brands/temomin
- https://www.global-sports.co.jp/brands/global_clinic
- https://www.global-sports.co.jp/brands/wellnessstudio
- https://map.global-sports.co.jp/
- https://www.factoryjapan.jp/company/
- https://www.factoryjapan.jp/service/salon/
- https://factoryjapan.jp/company/history/
- https://karada39.com/guide/
