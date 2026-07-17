# Project Context

## Goal

This directory is the workspace for creating a compiler for a new
Markdown-like language.

The project has three connected parts:

1. Design and implement the language, including its syntax and semantics.
2. Compile the language into a useful target representation or output.
3. Provide developer tooling: syntax highlighting and a formatter.

## Current State

- The project is at the initial stage.
- A minimal lexer, parser, AST, HTML compiler, project compiler, and test suite
  now exist.
- The project compiler discovers `.mdr` pages under `src/pages/`, maps them to
  Astro-style routes, copies `public/`, and writes the result under `dist/` by
  default.
- Formatter and syntax highlighter are not implemented yet.

## Working Principles

- Keep the language easy to read and write like Markdown, while making its
  compiler-oriented capabilities explicit and extensible.
- Separate parsing, the intermediate representation, compiler output, and
  language tooling as the project grows. The compiler, formatter, and
  highlighter should share the lexer/parser and source location information.
- Prefer small executable examples and tests for each syntax decision.
- Record important design decisions in this file or in a nearby design note so
  a new Codex session can resume without relying on chat history.
- Do not introduce a framework or dependency until it supports a concrete
  project requirement.

## Session Handoff

Before making substantial changes, inspect this file and the current project
tree. When a decision, milestone, or unresolved issue becomes important,
update this file or add a focused note under `docs/`.

The first syntax decisions are recorded in `docs/syntax.md`:

- `*text*` renders as bold; italic syntax is not supported.
- A line beginning with `+` is an ordered-list item, with numbering generated
  during rendering.
- A line beginning with `-` is an unordered-list item. A line beginning with
  `*` is not a list item.

The minimal language example is in `examples/basic.mdr`. The planned shared
pipeline is described in `docs/architecture.md`.

The next useful step is to derive a small lexer/parser and its tests from the
example, keeping the compiler, formatter, and highlighter as separate
consumers of the parsed representation.
