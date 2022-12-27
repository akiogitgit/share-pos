# SharePos
読んで良かった記事をシェアできるアプリ

URL: https://share-pos.vercel.app/

【GitHub】
- フロント: https://github.com/akiogitgit/share-pos
- API: https://github.com/akiogitgit/share-pos-api

## 使用技術
- Next.js v13.0.5
- React v18.2.0
- TypeScript v4.7.3
- Ruby on Rails v7.0.3
- DB: postgreSQL
- Windi CSS v1.7.7
- React Icons v4.4.0
- @next/font v13.0.6
- Headless UI v1.7.3
- Use scroll position v2.0.3
- CryptoJS v4.1.1
- SWR v1.3.0

## 作成理由
私は友達と読んで良かった記事を、Slackで共有することを習慣づけています。

Slackでは投稿が90日経つと消えてしまい、投稿が増えると上に流れてしまい、読み返しにくい問題があります。
なので、投稿が残り続け、投稿を管理して見返しやすいアプリを作成したいと思いました。

また、インターンシップで知り合った学生の話を聞くと、同じように友達同士で記事を共有している人が多かったです。
それは、友達以外の人たちにも需要があるものだと感じたので、友達同士は関係なく良いと思った記事を共有できるアプリを作成したいと思いました。


## 工夫点
GitHubのissue, Pull Requestを使いながら開発しました。
Pull Requestを毎回書き、approveされるまで直してからマージしました。

テーブル・カラム設計では、出来るだけ保守性が高く、大きな変更が無いような設計にしました。
API開発も初めてで、ステータスコードから学び、REST APIに沿ったAPI設計を心がけました。

命名やディレクトリ構造に拘り、分かりやすく、崩壊しにくい設計になるよう工夫しました。

キャッシュ戦略にSWRを使用し、データ取得を最初の１度だけにしました。
また、追加・更新・削除する時はmutateを使い、直接キャッシュデータを直接変更することで、リクエスト回数を減らしました。

他サービスであるTwiiter、Zenn、QiitaなどのUIを参考に、PC・スマホの画面を作成しました。

共有した記事をブラウザのフォルダ・ブックマークのように管理することで、記事を読み返しやすくしています。


## アピールポイント
- Gravatarでユーザーアイコン
- 記事のURLをスクレイピングし、meta情報からサムネイル画像を表示している
- 全ての画像を、同じ横幅で表示するようにしている。画面幅を変えても崩れにくくした。
- 画面スクロールで、ヘッダーとフッターが表示・非表示になる。
- position: fixedやモーダルが複数あるが、z-indexを1,2だけで実現させている
- モーダルをネイティブアプリのような見た目にした
- Next.js v13の next/fontでヘッダーのフォントを設定した
- SWRでキャッシュ管理して、リクエスト回数を減らしている
- グローバルステートを専用のライブラリを使用せず、SWRを用いた
- windi.config.jsのthemeをカスタマイズし、色を管理している
- 色の配色、コントラストに拘った。
- 投稿のコメントを2行だけ表示し、コメントをクリックで全コメント表示

