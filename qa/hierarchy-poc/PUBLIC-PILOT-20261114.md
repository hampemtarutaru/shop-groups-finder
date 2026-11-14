# K-089｜運営会社別一覧：正式版候補（2026-11-14）

対象：すかいらーく29ブランド、U.S.M.H13ブランド。運営法人の未特定が残るゼンショーは公開候補から除外。

## 本番サイトとの境界
- 本変更は先行Draft PR #11の隔離PoCを元にした、スタックされた別Draft PRに保持する。mainには未投入。
- 現行トップの検索・絞り込み機能を改変せず、該当2グループのカードに『運営会社別に見る』を追加する。
- public/groups/skylark.html、public/groups/usmh.html は noindex,follow とし、検索インデックス化は審査後に別途判断。
- public/data.json は変更しない。2グループの登録ブランド情報は2026-11-14時点のmainと元ブランチ間で一致。
- 最新の運営関係や個別店舗FC/直営関係の網羅的な保証ではない。出典リンクは一部共通グループ資料である。

## 再生成・検査
node --test scripts/k089_hierarchy_poc.test.mjs
node --test scripts/k089_public_candidate.test.mjs
node scripts/k089_public_candidate.mjs
git diff --exit-code -- public/groups/

## 残る公開ゲート
1. Chrome等のスマホ・PCでページ表示、リンク/戻る、既存検索結果を確認する。
2. グループ別一覧の説明、ロボット制御・canonical/SEOの方針を確定する。
3. 創業者による本番公開可否判断。PRはDraftであり、Production未反映。
