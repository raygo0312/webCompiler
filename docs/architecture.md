# 構成方針

このプロジェクトの目的は、独自の Markdown 系言語を実装することです。
特定の Web サイトを作ること自体は目的にしません。言語を利用するサンプル
サイトや文書は、コンパイラの動作確認用の入力として扱います。

## 共有パイプライン

```text
source
  ↓
lexer ───────────────┬─→ syntax highlighter
  ↓                  └─→ parser
AST / IR ────────────┬─→ compiler backend
                     └─→ formatter
```

- Lexer はトークンとソース位置を生成する。
- Parser はトークン列から AST または共通 IR を生成する。
- Compiler は共通 IR から対象となる出力を生成する。出力形式は実装時に
  決定する。
- Highlighter はトークンと構文情報を使い、エディタ向けの色付け情報を
  生成する。
- Formatter は AST / IR を正規化されたソースへ戻す。

コンパイラ、ハイライト、フォーマット処理で構文の解釈が分裂しないよう、
言語仕様と lexer/parser を共有する。各機能固有の出力処理は別モジュールに
分離する。

## 実装順

1. 最小トークン定義と lexer
2. 見出し、段落、太字、2 種類のリストを扱う parser
3. AST / IR の検証テスト
4. 最小 compiler backend
5. AST / IR を使う formatter
6. トークンとノード範囲を使う syntax highlighter

各段階で `examples/basic.md` を入力にした小さな実行例を追加する。

## 現在の使い方

入力ファイルを HTML に変換するには、次を実行する。

```sh
npm run compile -- examples/basic.md
```

プログラムから使う場合は `src/index.js` の `compile(source)` を利用する。
