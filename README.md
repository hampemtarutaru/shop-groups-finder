# この店、どこの系列？ （試作版）

スマホで店名を検索すると、どの企業グループに属するかがすぐわかる静的サイト。公式企業情報に基づく抜粋データを随時追加しています（2026-11-06現在、72グループ・553ブランド）。

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
