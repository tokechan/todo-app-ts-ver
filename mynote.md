# TS_knowlege

## メリット

型定義できるので、チーム開発時に効率化できる

プロパティなどがいちいち読み解かなくて定義されているから

## デメリット

JS の柔軟なコードスタイルが使えないので不自由さを感じる

型を定義するので、時間がかかる

[tsc]が JS へコンパイルしてブラウザに JS が認識される

CLI で使用する　 webpack がビルドしてくれる

ファイル拡張子　 ts、tsx

## プリミティブ型　基本的な値のこと　データ型

`文字列　let str: string =”Hello”;`

`数値  let num: number = 100;`

`巨大な数値 let bignum: bigint = 103n; (tsconfig,json で target を指定できる　em2021)`

`真偽値 let bool: boolean = true;`

`null let nullish: null = null;`

`undefined  let undefineValue: undifinde = undefined;`

## リテラル型　特定の値を設定できる　文字列、数値

`let trueVal: true = true;`

`let num123: 123 = 123;  OK`

number の数値で 123 しか受けつけない

`num123 = 456; NG これを書くとエラーになる`

`let strHello: ‘Hello’ = ‘Hello’;  OK`

`‘Hello’ = ‘Hi’; NG エラーを吐く`

## ユニオン型は複数の方を組み合わせて「型 T または型 U」のような、「または」の意味を表すことができる

ポイントは T | U というように、| を用いてユニオン型を表す

ユニオン型はリテラル型組み合わせることでリテラル型の必要性がわかる

`let strOrNum: string | number = ‘Hello’;`

`strOrNum = 123; OK`

エラーはでない！コンソールに出すと 123 が表示される

`strOrNum = ’Hello’;  OK`

`strOrNum = true; NG 型定義されてないから`

`let helloOrNumOrBool: ‘Hello’ | number | boolean = false;`

`type HelloOrNum =  ‘Hello’ | number;`

`const hello: HelloOrNum = ‘Hello’;`

## 配列の定義

`const arry1: number[] = [1,2,3];`

`const arry2: string[] = [’hello’,’bye’];`

`const aary3: Array<nmber> = [1,2,3,]; ジェネリック型`

`const aary4: (string | number)[] = [1,’hello’];ユニオン型を使用した配列`

## オブジェクトの定義

`const obj1: {name: string, age: number } = {name: ‘toke’ , age: 38 };`

[`obj1.name](http://obj1.name) = 38; NG 型が違うのでエラー`

`type Person ＝ { name: strign, age: number }`

`const obj2: Person = { name: ‘toke’ };` NG これは Person 型で定義されている age: number が記述されていないので型エラーが起きる

`type Person ＝ { name: strign, age？: number }`

`const obj2: Person = { name: ‘toke’ };` OK。？を入れるだけで、age プロパティを任意にできるという意味なり

入れてもいいし、入れなくてもいいとなるので型エラーは起きない

また、存在しないプロパティを書くとエラーになる

## オブジェクトを含む配列

`const users: Person[] = [`

`{ name: ‘toke’ },`

`{ name: ‘nori’ },`

`]`

## 関数の定義

`function add(a: number, b: number): number {`

`return a + b;`

`}`

`const add2 = (a: number, b: number): number => {`

`return a + b;`

`}`

# toggleTodo を作成

setTodos を使って、クリックされた id の completed を true/false で切り替える。
map() を使い、該当する todo だけ completed を変更し、新しい配列を setTodos に渡す。
onChange を設定

<input type="checkbox" /> に onChange={() => toggleTodo(todo.id)} を追加。
チェックボックスをクリックすると toggleTodo(todo.id) が実行される。

# addTodo を作成

新しい状態 newTodo を追加
useState<string>("") を使って、入力フィールドの値を管理します。

addTodo 関数を作成
newTodo の値を使って、新しい Todo オブジェクトを作成。
setTodos([...prevTodos, newTask]) でリストに追加。
追加後、入力フィールドをリセット。

input と button を追加
input に onChange={(e) => setNewTodo(e.target.value)} を設定。
button に onClick={addTodo} を設定。

ここまでで、Todo を追加、完了状態の切り替えができるようになった

# 削除機能の追加

実装する内容
各 TODO アイテムの横に「削除ボタン 🗑️」を追加。
ボタンを押すと、その TODO がリストから削除される。

deleteTodo 関数を作成
setTodos() を使い、指定した id 以外のタスクだけを残す。
filter() を使用して、削除対象の id をリストから取り除く。

各 TODO の横に削除ボタン 🗑️ を追加
<button onClick={() => deleteTodo(todo.id)}>🗑️</button> で削除可能に。

ここまでで、Todo の追加、完了状態の切り替え、削除機能が実装できた。

#📌 基本機能の実装ステップ

1. 環境構築
   npx create-vite my-todo-app --template react-ts
   不要なファイルを削除し、クリーンな状態にする。

2. 型定義ファイルを作成 (types.ts)
   Todo 型を作成し、id: number, text: string, completed: boolean を定義。

3. useState を使って TODO リストを管理 (App.tsx)
   初期値として useState<Todo[]>([]) をセット。

4. 仮の TODO データを追加して表示の確認
   map() を使ってリスト表示。

5. チェックボックスの完了状態を切り替える (toggleTodo を作成)
   onChange で completed の状態を更新。

6. 新しい TODO を追加する (addTodo を作成)
   input フィールドを追加し、setTodos([...prevTodos, newTask]) で新規追加。

7. TODO を削除する (deleteTodo を作成)
   filter() を使って、選択した id の TODO をリストから削除。

#🎯 JavaScript から TypeScript に変更する利点

1. 型安全性が向上する
   Todo 型を定義することで、間違ったデータ型を扱うミスを防げる。
   useState<Todo[]> のように型を指定することで、配列の要素が Todo 型であることが保証される。

2. コードの可読性・保守性が向上する
   props に型を適用することで、どのデータを受け取るかが明確になる。
   他の開発者（または未来の自分）がコードを見たときに理解しやすくなる。

3. 開発時にエラーを事前に検出できる
   TypeScript はコンパイル時にエラーを検出してくれるため、実行前にバグを減らせる。
   strict モードを有効にすると、null や undefined に関するエラーも早めに発見可能。

4. オートコンプリートが強化される
   TypeScript を使うことで、エディタ（VSCode など）の補完機能が向上し、開発効率が上がる。

💡 今後の改善ポイント

1. ローカルストレージ対応 → リロードしても TODO が消えないようにする。
2. 編集機能の追加 → TODO の内容を変更できるようにする
