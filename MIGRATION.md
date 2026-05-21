# CodeceptJS v3 から v4 への移行ガイド

このドキュメントでは、本プロジェクトにおける CodeceptJS v3 から v4 への移行内容を説明します。

公式移行ガイド: [Migrating from 3.x to 4.x](https://codecept.io/migration-4)  
公式リリースブログ: [CodeceptJS 4 is out](https://codecept.io/blog/codeceptjs-4/)

---

## 主な変更点

### 1. ネイティブ ESM への移行

CodeceptJS 4.x は完全な ES Modules (ESM) を採用しています。

#### `package.json` に `"type": "module"` を追加

```diff
 {
   "name": "hotel-example-codeceptjs-ja",
+  "type": "module",
   ...
 }
```

#### `tsconfig.json` のモジュール設定を更新

```diff
 {
   "compilerOptions": {
-    "target": "es2018",
-    "lib": ["es2018", "DOM"],
-    "module": "commonjs"
+    "target": "ES2022",
+    "lib": ["ES2022", "DOM"],
+    "module": "NodeNext",
+    "moduleResolution": "NodeNext"
   }
 }
```

#### `ts-node` を `tsx` に置き換え

v4 では `ts-node` の代わりに `tsx` を使用します。

```diff
 "devDependencies": {
-  "ts-node": "^10.9.1",
+  "tsx": "^4",
   "codeceptjs": "^4"
 }
```

---

### 2. 廃止されたパッケージの削除

| 削除されたパッケージ | 理由 |
|---|---|
| `@codeceptjs/ui` | CodeceptUI は v4 で廃止 |
| `@codeceptjs/examples` | デモ用パッケージ（不要） |

関連する npm スクリプトも削除しました。

```diff
 "scripts": {
   "test": "codeceptjs run",
   "codeceptjs": "codeceptjs run --steps",
-  "codeceptjs:ui": "codecept-ui --app",
-  "codeceptjs:demo": "codeceptjs run --steps -c node_modules/@codeceptjs/examples",
   ...
 }
```

---

### 3. `setCommonPlugins()` の廃止

v3 では `@codeceptjs/configure` の `setCommonPlugins()` を利用して共通プラグインをまとめて有効化していました。  
v4 では `tryTo` などのプラグインが削除・変更されたため、必要なプラグインを明示的に設定します。

```diff
 import {
   setHeadlessWhen,
-  setCommonPlugins
 } from '@codeceptjs/configure';

-setCommonPlugins();

 export const config: CodeceptJS.MainConfig = {
   ...
+  plugins: {
+    retryFailedStep: {
+      enabled: true,
+    },
+    screenshot: {
+      enabled: true,
+      on: 'fail',
+    },
+  },
 }
```

---

### 4. `steps_file.ts` の ESM 対応

CommonJS スタイルの `export =` から ESM スタイルの `export default` に変更します。

```diff
-export = function() {
+export default function() {
   return actor({
     ...
   });
 }
```

`steps.d.ts` の型定義も合わせて更新します。

```diff
-type steps_file = typeof import('./steps_file');
+type steps_file = typeof import('./steps_file').default;
```

---

### 5. `require()` から `import` への変更

v4 (ESM) では `require()` は使用できません。すべて `import` に置き換えます。

```diff
-var fs = require("fs");
+import fs from "fs";
```

---

### 6. `tryTo` の移行

v3 では `tryTo` はプラグインとしてグローバルに利用できましたが、v4 では `codeceptjs/effects` からインポートします。

```diff
+import { tryTo } from 'codeceptjs/effects';

 const { I } = inject();

 Given('宿泊日を{int}日後にする。', (increment: number) => {
   const date = formatDate(increment);
   I.fillField('宿泊日', date);
   tryTo(() => I.click('閉じる'));
 });
```

---

### 7. CodeceptJS 4.0.0 の TypeScript トランスパイラのバグ修正

CodeceptJS 4.0.0 には、TypeScript ファイルをトランスパイルする際のバグがあります。  
ESM コンテキストで `import('typescript')` すると、`transpile` 関数に直接アクセスできない問題です。

`pnpm patch` を使用して修正を適用しました。

```diff
 // lib/utils/typescript.js
-const { transpile } = typescript
+const { transpile } = typescript.default || typescript
```

パッチファイル: [`patches/codeceptjs@4.0.0.patch`](./patches/codeceptjs@4.0.0.patch)

---

## v4 の新機能（本プロジェクトでは未使用）

v4 では多くの新機能が追加されていますが、本プロジェクトでは現時点では以下の機能は利用していません。

| 機能 | 説明 |
|---|---|
| `noGlobals: true` | `Given`, `inject()` などのグローバル関数をインポートに変更 |
| MCP サーバー (`npx codeceptjs-mcp`) | AI エージェントとの連携 |
| `aiTrace` プラグイン | AI デバッグ用トレース記録 |
| `heal` プラグイン | AI による自己修復機能 |
| `I.grabWebElement()` | ヘルパー非依存の WebElement API |
| `I.grabAriaSnapshot()` | アクセシビリティツリースナップショット |

---

## 参考リンク

- [CodeceptJS 4.x リリースブログ](https://codecept.io/blog/codeceptjs-4/)
- [v3 → v4 移行ガイド (公式)](https://codecept.io/migration-4)
- [CodeceptJS ドキュメント](https://codecept.io/)
- [v3 ブランチ](https://github.com/goataka/codeceptjs-hotel-planisphere/tree/v3)
