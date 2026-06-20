# DEPLOY.md

## 東北クマ出没・安全確認マップ｜公開・バックアップ・GitHub運用管理

| 項目 | 内容 |
| --- | --- |
| プロジェクトコード | TBM |
| 本番URL | https://tohoku-bear-safety-map.vercel.app/ |
| GitHub | https://github.com/toitenlamaiko0915-max/tohoku-bear-safety-map |
| 公開先 | Vercel |
| 最終更新日 | 2026-06-20 |

---

## 1. このファイルの目的

ローカル起動、GitHub運用、Vercel公開、バックアップ、ロールバック、障害時確認を再現できるようにする。

---

## 2. 現在の構成

| 項目 | 確認済み内容 |
| --- | --- |
| フレームワーク | Next.js 15.5.19（App Router、宣言は`^15.3.5`） |
| UI | React 19.2.7 / Tailwind CSS 3.4.19 / lucide-react |
| 地図 | Leaflet 1.9 / OpenStreetMapタイル |
| 言語 | TypeScript 5.9.3（宣言は`^5.7.2`） |
| データ | `public/data/bear_sightings.csv` |
| パッケージ管理 | npm / `package-lock.json` |
| Next.js設定 | `next.config.mjs` |
| Vercel設定 | リポジトリ内に`vercel.json`なし。Vercelの自動判定を利用 |
| 環境変数 | 必須変数なし。`NEXT_PUBLIC_SITE_URL`は任意 |
| 自動テスト | 未実装 |

Node.jsの固定バージョンは`package.json`に未指定。Vercelとローカルで同じメジャーバージョンを使う方針だが、正式バージョンは要確認。

---

## 3. ローカル起動手順

### 初回

```bash
git clone https://github.com/toitenlamaiko0915-max/tohoku-bear-safety-map.git
cd tohoku-bear-safety-map
npm install
```

CIや再現性を優先する場合は、ロックファイルに基づく以下を使う。

```bash
npm ci
```

### 開発サーバー

```bash
npm run dev
```

通常の確認URL：

```text
http://127.0.0.1:3000/
http://127.0.0.1:3000/map
http://127.0.0.1:3000/updates
http://127.0.0.1:3000/about
http://127.0.0.1:3000/official-links
http://127.0.0.1:3000/safety
http://127.0.0.1:3000/sitemap.xml
http://127.0.0.1:3000/robots.txt
```

### 検証コマンド

```bash
npm run typecheck
npm run build
```

本番ビルドをローカル起動する場合：

```bash
npm run start
```

`npm run build`が成功した後に実行する。

---

## 4. GitHub管理方針

* `main`は本番公開可能な状態を保つ
* `main`へ直接pushしない
* 作業ごとにブランチを作る
* 変更範囲を小さく保つ
* CSV更新、UI変更、仕様変更、設定変更を可能な限り分ける
* Pull Requestの`Files changed`とテスト結果を人間が確認する
* CodexはPRを作成してもマージしない
* force push、履歴改変、ブランチ削除は明示承認なしに行わない

---

## 5. ブランチ運用

| 接頭辞 | 用途 | 例 |
| --- | --- | --- |
| `codex/` | Codex作業 | `codex/tbm-cx-001-management-docs` |
| `docs/` | 文書 | `docs/update-spec` |
| `data/` | CSV・更新日 | `data/update-sightings-20260620` |
| `fix/` | 不具合 | `fix/csv-error-state` |
| `feat/` | 機能 | `feat/map-date-filter` |
| `chore/` | 設定・保守 | `chore/update-node-version` |

### 手順

```bash
git switch main
git pull --ff-only origin main
git switch -c <branch-name>
```

作業後：

```bash
git status --short
git diff --check
git diff --name-only main...HEAD
```

対象外ファイルが含まれていないことを確認してからcommit・pushする。

---

## 6. コミットルール

Conventional Commitsを基本とする。

| 種別 | 用途 | 例 |
| --- | --- | --- |
| `docs` | 文書 | `docs: align management documents with implementation` |
| `data` | CSVデータ | `data: update official bear sightings` |
| `fix` | 不具合 | `fix: handle missing map coordinates` |
| `feat` | 機能 | `feat: add map update date` |
| `test` | テスト | `test: add CSV parser coverage` |
| `chore` | 設定・保守 | `chore: document Node.js version` |

* 1コミットの目的を明確にする
* APIキー、トークン、個人情報をコミットメッセージや本文へ含めない
* CSV更新では対象日・対象県・出典確認結果をPR本文に残す

---

## 7. Pull Request運用

### PR本文に含めること

* 目的と変更概要
* 変更ファイル一覧
* 実行したテストと結果
* 未確認事項・リスク
* 安全情報・個人情報への影響
* Vercel Preview確認結果
* ロールバック方法

### マージ前

* [ ] 対象外ファイルがない
* [ ] typecheck成功
* [ ] build成功
* [ ] 主要ページを確認
* [ ] スマホ幅を確認
* [ ] CSV更新時は列数・ID・日付・公式URLを確認
* [ ] 詳細住所・ピンポイント座標・独自の安全判断がない
* [ ] Vercel PreviewがReady
* [ ] 人間が`Files changed`を確認

---

## 8. Vercelデプロイ手順

### 通常フロー

1. 作業ブランチをGitHubへpushする
2. Pull Requestを作成する
3. Vercel PreviewがReadyになるまで待つ
4. Previewで主要ページとデータを確認する
5. 人間がPRを`main`へマージする
6. VercelのProduction DeploymentがReadyになるまで待つ
7. 本番URLを確認する
8. `PROJECT_LOG.md`、`TEST_LOG.md`、必要に応じて`/updates`を更新する

### 本番確認URL

* https://tohoku-bear-safety-map.vercel.app/
* https://tohoku-bear-safety-map.vercel.app/map
* https://tohoku-bear-safety-map.vercel.app/updates
* https://tohoku-bear-safety-map.vercel.app/about
* https://tohoku-bear-safety-map.vercel.app/official-links
* https://tohoku-bear-safety-map.vercel.app/safety
* https://tohoku-bear-safety-map.vercel.app/sitemap.xml
* https://tohoku-bear-safety-map.vercel.app/robots.txt

### Vercelで確認する項目

* Deploymentの状態が`Ready`
* Productionが対象の`main`コミットを参照している
* Build Logsにエラーがない
* PreviewとProductionの環境変数差分がない
* 独自ドメインを追加した場合はSSL・リダイレクトが正常

Vercelプロジェクトの所有者、権限、保持期間、請求設定はリポジトリから確認できないため要確認。

---

## 9. 公開前チェックリスト

### アプリ

* [ ] 主要6ページが表示できる
* [ ] `/sitemap.xml`・`/robots.txt`がHTTP 200
* [ ] 地図・一覧・フィルターが動作する
* [ ] 一覧件数とピン件数の差を説明できる
* [ ] トップページの最終更新日が正しい
* [ ] `/updates`に必要な更新履歴がある
* [ ] 390px幅とPC幅で大きく崩れない

### CSV・安全情報

* [ ] ヘッダーが現行13列と一致する
* [ ] 全行の列数が一致する
* [ ] ID重複がない
* [ ] `occurred_at`が確認可能な発生日・目撃日である
* [ ] `source_url`が公式情報で空欄がない
* [ ] 詳細住所や個人を特定できる情報がない
* [ ] 座標が概略位置で`accuracy_m`が適切
* [ ] 独自の安全・危険断定がない
* [ ] 仮URLやプレースホルダーURLがない

### Git・Vercel

* [ ] `git diff --check`に問題がない
* [ ] 変更対象が依頼範囲内
* [ ] typecheck・build成功
* [ ] PR本文に未確認事項がある
* [ ] Preview確認済み

---

## 10. 環境変数の管理

### 現在

アプリ実行に必須の秘密情報はない。

`app/sitemap.ts`と`app/robots.ts`は次を参照する。

```text
NEXT_PUBLIC_SITE_URL
```

未設定時は`https://tohoku-bear-safety-map.vercel.app`を使用するため、現在は任意。

### ルール

* 秘密情報を`NEXT_PUBLIC_`へ入れない
* APIキー、パスワード、トークンをGitへコミットしない
* `.env.local`はローカル専用とする
* 新しい環境変数を追加する場合は`.env.example`と本書を更新する
* VercelではProduction・Preview・Developmentの適用範囲を確認する
* 値を変更した場合は再デプロイとロールバック方法を記録する

---

## 11. バックアップ方針

### GitHub

* コード、CSV、文書の正本はGitHubの`main`
* 変更はPRとコミット履歴で追跡する
* 重要な公開版は必要に応じてタグを付ける

タグ例：

```bash
git tag -a v0.1.0 -m "MVP baseline"
git push origin v0.1.0
```

タグ作成は人間が公開内容を確認してから行う。

### CSV

* 更新前のCSVはGit履歴で復元可能にする
* 大量更新では、対象日・対象県・出典URL・追加件数をPR本文へ記録する
* 個人情報を含む原本や取得資料を公開リポジトリへ保存しない

### 追加バックアップ

GitHub障害に備える場合は、定期的にローカルcloneまたはGit bundleを別媒体へ保管する。頻度・保管先・担当者は未確定。

---

## 12. ロールバック方針

### Vercelで戻す

1. VercelのDeploymentsを開く
2. 直前の正常なProduction Deploymentを確認する
3. `Promote to Production`等の復旧操作を人間が実行する
4. 本番URLと主要ページを確認する

### GitHubで戻す

共有済み履歴を`reset --hard`やforce pushで書き換えない。

```bash
git switch -c revert/<ticket> main
git revert <commit-sha>
git push -u origin revert/<ticket>
```

Revert PRを作り、人間が確認してマージする。

### データだけ戻す

対象コミットからCSVを復元し、新しいデータ修正PRとして提出する。復元理由と影響期間を`/updates`とPR本文へ記録する。

---

## 13. トラブル時の確認

### サイトが開かない

* Vercel Deploymentの状態
* 対象ドメイン・SSL
* `main`の最新コミット
* Build Logs
* Vercel障害情報

### 地図が表示されない

* ブラウザコンソール
* Leaflet CSS・JS読込
* OpenStreetMapタイル通信
* 地図コンテナの高さ
* CSV取得エラー

### CSVが反映されない

* `public/data/bear_sightings.csv`のパス
* ヘッダー・列数・文字コード
* `status`が`published`か
* 日付・座標が解析可能か
* Vercelの対象コミットとキャッシュ

### buildが失敗する

* `npm ci`
* `npm run typecheck`
* `npm run build`
* Node.jsバージョン
* `package-lock.json`と`package.json`の差分
* Build Logsの最初のエラー

### push・PRができない

* 現在のブランチとcommitを確認
* `git remote -v`を確認
* GitHub Desktopのログイン状態を確認
* Codex環境で`Device not configured`が出る場合、GitHub Desktopで`Publish branch`する
* push後にGitHubの比較画面からDraft PRを作成する
* 認証トークンをチャットやコードへ貼らない

---

## 14. 未確定・要確認

* Node.jsの固定バージョン
* Vercelプロジェクトの所有者・管理権限
* Production / Preview環境変数の設定状況
* Vercelの復旧担当者と復旧判断基準
* Gitタグを付けるリリース基準
* 追加バックアップの頻度・保管先・保持期間
* 公式リンクの定期確認担当と頻度
* CSV更新担当・レビュー担当
* 独自ドメインを使用するか

---

## 15. 更新ルール

以下の場合に更新する。

* 開発・ビルド・起動手順が変わった
* GitHub・ブランチ・コミットルールが変わった
* Vercel設定・URL・環境変数が変わった
* バックアップ・ロールバック方法が変わった
* 障害対応で新しい知見が得られた
