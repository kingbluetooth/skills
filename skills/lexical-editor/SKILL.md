---
name: lexical-editor
description: Build, review, debug, and modernize Lexical rich-text editors, especially React editors using @lexical/react, plugins, custom nodes, commands, serialization, collaboration, accessibility, and production persistence.
---

# Lexical Editor Skill

Use this skill when the task involves Lexical, `@lexical/react`, rich-text editing, editor state, commands, plugins, custom nodes, serialization, markdown/HTML conversion, copy/paste behavior, collaboration, accessibility, testing, or migrations from Draft.js/Slate/ProseMirror/contenteditable.

## Non-negotiables

1. Treat Lexical as an editor framework, not a drop-in editor UI. Do not promise built-in toolbar/product UI.
2. Keep all `$` helper calls inside `editor.update`, `editorState.read`, command listeners, node transforms, or other Lexical-controlled read/update closures.
3. Do not mutate DOM or editor state outside Lexical APIs.
4. Register every listener, command, transform, mutation listener, DOM listener, and subscription with cleanup. In React plugins, return the teardown from `useEffect`.
5. Persist the canonical Lexical JSON editor state unless the product explicitly needs another derived representation. HTML and Markdown are export formats, not the source of truth.
6. Validate imported JSON, register every node type required by persisted documents, and guard empty parsed states before `setEditorState`.
7. Prefer `LexicalOnChangePlugin` in real React apps unless implementing a custom listener for a specific reason.
8. Avoid waterfalls: do not react to an update by immediately scheduling another update unless a node transform or command would not solve it.
9. Commands must return `true` only when handled. Pick command priority deliberately.
10. Custom nodes need stable import/export contracts, cloning, DOM conversion, and backward-compatible versioning.
11. Accessibility is product work: keyboard behavior, focus management, labels, placeholder semantics, screen-reader copy, and semantic output must be checked.
12. Never install deprecated packages or cargo-cult examples without checking the current Lexical package versions and docs.

## First-pass workflow

1. Identify editor mode: plain text, rich text, markdown, code, tables, mentions, embeds, comments, collaboration, or nested editors.
2. Check framework boundaries: React client component, SSR boundary, Next.js route/app router, hydration, bundler, and package versions.
3. Inventory node schema: built-in nodes, custom nodes, imported legacy schema, serialized state versions, and conversion requirements.
4. Decide persistence shape: canonical JSON; optional derived HTML/Markdown/search text generated from the same state.
5. Decide plugin architecture: small plugins with single responsibility; commands for cross-plugin intent; transforms for structural normalization.
6. Add tests at the editor-state level first, then integration tests for keyboard/paste/selection/UI.
7. When reviewing, look for stale closures, unregistered cleanup, misplaced `$` helpers, state-update waterfalls, unversioned nodes, broken paste/import paths, and inaccessible toolbar controls.

## File map

Load these only when useful:

- `references/react-integration.md` for React/Next.js composition, plugins, listeners, and SSR boundaries.
- `references/state-persistence.md` for JSON persistence, empty state handling, derived outputs, and migrations.
- `references/plugins-commands-transforms.md` for plugin design, commands, listeners, transforms, and update flow.
- `references/custom-nodes.md` for custom node contracts, NodeState, replacement, serialization, DOM conversion, and schema evolution.
- `references/testing-accessibility.md` for test strategy, keyboard/paste coverage, and a11y checks.
- `references/production-checklist.md` for launch review.
- `resources/examples/` for local example snapshots.

## Output style when helping

Be concrete. Provide code patches or exact file layouts. Call out architectural mistakes before implementation details. If there are multiple choices, pick one and say why.

## Common implementation patterns

### Minimal React editor

Use `LexicalComposer`, `RichTextPlugin` or `PlainTextPlugin`, `ContentEditable`, `HistoryPlugin`, `OnChangePlugin`, `LexicalErrorBoundary`, and a theme object. Keep toolbar and persistence as separate plugins.

### Persistence

Use `editorState.toJSON()` for storage. On load, call `editor.parseEditorState(jsonStringOrObject)` and then `editor.setEditorState(parsedState)` only after confirming the node schema is registered and the parsed state is not empty. For server-side updates that must be immediately read, use `editor.update(fn, {discrete: true})`.

### Commands

Create typed custom commands with `createCommand<T>()`. Dispatch from UI or plugins. Register command handlers in plugins with explicit priority and cleanup. Return `true` only if the handler consumed the command.

### Custom nodes

Use custom nodes when the content has durable document semantics, not just visual styling. Add import/export JSON, DOM import/export if copy/paste matters, tests for old versions, and a migration path.

## Red flags

- Saving only HTML and expecting future Lexical editing to remain lossless.
- Calling `$getRoot()` or `$getSelection()` directly in React render or event handlers outside `editor.update`/`read`.
- Forgetting custom nodes in `initialConfig.nodes`.
- One giant toolbar plugin owning persistence, commands, and UI state.
- Rebuilding editor config on every render.
- Using `dangerouslySetInnerHTML` for untrusted exported HTML.
- Async plugin effects that continue after unmount.
- Treating collaboration as normal persistence with polling.
