# Official Lexical source index

Prefer these official Meta sources over local toy examples. Local snippets should only summarize patterns or point to these files.

## Playground architecture

- `facebook/lexical/packages/lexical-playground/src/Editor.tsx`
  - overall playground shell
  - rich-text vs plain-text modes
  - plugin composition
  - collaboration gates
  - floating anchor pattern
  - viewport cleanup

## Playground plugins

Use the plugin directory as the primary example bank:

- `packages/lexical-playground/src/plugins/ToolbarPlugin`
- `packages/lexical-playground/src/plugins/FloatingLinkEditorPlugin`
- `packages/lexical-playground/src/plugins/FloatingTextFormatToolbarPlugin`
- `packages/lexical-playground/src/plugins/MentionsExtension`
- `packages/lexical-playground/src/plugins/AutoEmbedPlugin`
- `packages/lexical-playground/src/plugins/ComponentPickerPlugin`
- `packages/lexical-playground/src/plugins/ShortcutsPlugin`
- `packages/lexical-playground/src/plugins/ActionsPlugin`
- `packages/lexical-playground/src/plugins/TableActionMenuPlugin`
- `packages/lexical-playground/src/plugins/TableCellResizer`
- `packages/lexical-playground/src/plugins/CodeActionMenuPlugin`
- `packages/lexical-playground/src/plugins/TreeViewPlugin`
- `packages/lexical-playground/src/plugins/VersionsPlugin`

## Official docs areas

- `packages/lexical-website/docs/react/plugins.md`
- `packages/lexical-website/docs/concepts/commands.md`
- `packages/lexical-website/docs/concepts/listeners.md`
- `packages/lexical-website/docs/concepts/node-transforms.md`
- `packages/lexical-website/docs/concepts/serialization.md`
- `packages/lexical-website/docs/concepts/selection.md`
- `packages/lexical-website/docs/concepts/nodes.md`
- `packages/lexical-website/docs/collaboration/react.md`

## Skill policy

Do not invent examples when official examples exist. For implementation questions, first route the agent to the closest official playground plugin or docs page, then explain the pattern in product-specific terms.

Files in `resources/examples/` that are not official reproductions should be treated as temporary scaffolding and replaced with source-index notes or high-quality derived references.
