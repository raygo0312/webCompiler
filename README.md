# MDR compiler

MDR は Markdown をベースにした Web 向け言語です。`mdr-compiler` は、
Node.js プロジェクト内の `.mdr` ページを HTML へ変換します。

## プロジェクト構成

```text
my-site/
├── package.json
├── src/
│   ├── pages/
│   │   ├── index.mdr
│   │   └── about.mdr
│   ├── components/
│   └── layouts/
└── public/
    └── favicon.svg
```

## インストールとビルド

```sh
npm install --save-dev mdr-compiler
npx mdr .
```

`src/pages/index.mdr` は `dist/index.html` に、
`src/pages/about.mdr` は `dist/about/index.html` に変換されます。
`public/` のファイルはそのまま `dist/` へコピーされます。

プロジェクトの `package.json` にスクリプトを追加することもできます。

```json
{
  "scripts": {
    "build": "mdr ."
  }
}
```

入力・出力ディレクトリを変更する場合：

```sh
npx mdr . --pages-dir content/pages --out-dir public-build
```

## API

```js
const { compile, compileProject } = require('mdr-compiler');

const html = compile('# Hello');
compileProject(process.cwd());
```

## 開発

```sh
npm test
npm run compile -- .
```
