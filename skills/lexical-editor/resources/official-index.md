# Official Lexical source index

## Start here

1. Editor.tsx
2. Relevant plugin
3. Concepts docs
4. Only then invent code

## Editor shell

`packages/lexical-playground/src/Editor.tsx`

Use for:

- overall architecture
- plugin composition
- activeEditor pattern
- floating anchor pattern
- collaboration mode
- feature flags

Never build one giant plugin.

## Plugin source of truth

ToolbarPlugin
- formatting commands
- selection updates
- active editor changes

FloatingLinkEditorPlugin
- link editing UI
- anchor elements
- floating controls

MentionsExtension
- autocomplete
- entity nodes
- decorators

ActionsPlugin
- import/export
- persistence
- markdown

Also consult:

- ComponentPickerPlugin
- AutoEmbedPlugin
- ShortcutsPlugin
- TableActionMenuPlugin
- TableCellResizer
- CodeActionMenuPlugin
- TreeViewPlugin
- VersionsPlugin

## Concepts docs

commands.md
listeners.md
node-transforms.md
selection.md
serialization.md
nodes.md
tables.md
collaboration/react.md

## Architecture rules

- Prefer many plugins over one giant plugin.
- Use commands instead of direct mutations.
- Use transforms instead of update waterfalls.
- Keep collaboration separate from persistence.
- Persist Lexical JSON, not HTML.
- Register nodes before loading state.
- Use anchor elements for floating UI.
- Maintain activeEditor correctly.
- Clean up listeners.

## Anti-patterns

Avoid:

- giant plugins
- direct DOM mutations
- HTML as canonical storage
- state replacement every render
- loading state before node registration
- unbounded update listeners
- update waterfalls
- copy-pasting entire playground codebases
