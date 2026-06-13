# Official Lexical source index

This skill should be a navigation layer over Meta's Lexical repository, not a competing set of local examples.

## Retrieval order

For implementation questions, route work in this order:

1. `packages/lexical-playground/src/Editor.tsx` for the overall shell and plugin composition.
2. The closest official playground plugin under `packages/lexical-playground/src/plugins/`.
3. The matching concept doc under `packages/lexical-website/docs/`.
4. Only then write product-specific code.

## Editor shell source of truth

`facebook/lexical/packages/lexical-playground/src/Editor.tsx`

Use for:

- overall architecture
- rich-text vs plain-text branching
- plugin composition
- `activeEditor` handling
- floating anchor element handling
- link edit mode state
- small viewport behavior
- collaboration gates
- Yjs collaboration v2 setup
- feature flags/settings
- cleanup of DOM listeners

Do not copy the whole playground into an app. Copy the architecture: small plugins, explicit modes, anchored floating UI, settings gates, cleanup, and separate collaboration/persistence concerns.

## Playground plugin map

Use `facebook/lexical/packages/lexical-playground/src/plugins/` as the primary example bank.

### Formatting and toolbar

`plugins/ToolbarPlugin`

Use for:

- formatting buttons
- command dispatch
- selection-derived toolbar state
- active editor switching
- link edit mode entry points

### Floating link UI

`plugins/FloatingLinkEditorPlugin`

Use for:

- link editing UI
- floating controls
- anchor element positioning
- editable vs read-only link states

### Floating text formatting

`plugins/FloatingTextFormatToolbarPlugin`

Use for:

- contextual inline formatting controls
- selection-sensitive floating UI
- toolbar placement relative to selected text

### Mentions and autocomplete

`plugins/MentionsExtension`

Use for:

- mentions
- autocomplete
- entity-like text behavior
- decorators
- trigger matching

### Embeds and component insertion

`plugins/AutoEmbedPlugin`
`plugins/ComponentPickerPlugin`

Use for:

- slash/component picker UX
- embed insertion
- async option lookup
- menu rendering patterns

### Shortcuts and keyboard behavior

`plugins/ShortcutsPlugin`

Use for:

- keyboard shortcuts
- markdown-like shortcut behavior
- delegating actions to commands

### Import, export, persistence actions

`plugins/ActionsPlugin`

Use for:

- import/export UI
- markdown actions
- serialized editor state handling
- debugging actions

### Tables

`plugins/TableActionMenuPlugin`
`plugins/TableCellResizer`
`plugins/TableHoverActionsV2Plugin`
`plugins/TableFitNestedTablePlugin`
`plugins/TableScrollShadowPlugin`

Use for:

- table menus
- cell merge/split operations
- resizing
- nested table behavior
- scroll affordances
- table hover controls

### Code blocks

`plugins/CodeActionMenuPlugin`

Use for:

- code block action menus
- anchored code UI
- language/action controls

### Debugging and inspection

`plugins/TreeViewPlugin`

Use for:

- editor state inspection
- node tree debugging
- development-only diagnostics

### Collaboration and versions

`plugins/VersionsPlugin`
`packages/lexical-playground/src/collaboration`

Use for:

- version history
- collaboration provider setup
- Yjs document handling
- collaboration-specific persistence boundaries

## Official docs map

Use these docs for API rules and conceptual grounding:

- `packages/lexical-website/docs/react/plugins.md`
  - React plugin composition
  - `@lexical/react` patterns

- `packages/lexical-website/docs/concepts/commands.md`
  - `createCommand`
  - command dispatch
  - command priorities
  - command return values

- `packages/lexical-website/docs/concepts/listeners.md`
  - update listeners
  - mutation listeners
  - text content listeners
  - cleanup requirements

- `packages/lexical-website/docs/concepts/node-transforms.md`
  - structural normalization
  - avoiding update waterfalls
  - transform lifecycle

- `packages/lexical-website/docs/concepts/serialization.md`
  - JSON state
  - HTML conversion
  - import/export boundaries

- `packages/lexical-website/docs/concepts/selection.md`
  - range selection
  - node selection
  - grid/table selection
  - selection-safe reads and updates

- `packages/lexical-website/docs/concepts/nodes.md`
  - custom node contracts
  - serialization
  - replacement
  - node lifecycle

- `packages/lexical-website/docs/concepts/dom-events.md`
  - DOM event integration
  - listener registration
  - cleanup

- `packages/lexical-website/docs/collaboration/react.md`
  - React collaboration setup
  - Yjs integration
  - provider behavior

## Architecture rules

- Prefer many focused plugins over one giant plugin.
- Use commands for cross-plugin intent.
- Use node transforms for structural normalization.
- Avoid update waterfalls.
- Keep collaboration separate from ordinary persistence.
- Persist Lexical JSON as canonical state unless there is a strong product reason not to.
- Treat HTML and Markdown as derived import/export formats.
- Register every custom node before loading saved editor state.
- Use anchor elements for floating UI rather than arbitrary DOM queries.
- Track `activeEditor` when nested editors or floating UI can change focus.
- Return cleanup functions for every listener, command, transform, DOM listener, and subscription.
- Keep Next.js/server-rendered routes behind a client boundary.

## Anti-patterns

Avoid:

- inventing local examples when official playground code exists
- giant editor plugins
- direct DOM mutation
- HTML as canonical storage
- loading persisted state before node registration
- replacing editor state every React render
- unbounded update listeners
- update waterfalls
- toolbar actions that mutate state directly instead of dispatching commands
- copy-pasting the entire playground into product code
- hiding corrupt state or schema errors in `onError`

## Skill policy

Do not maintain toy examples in this repository. Prefer official source routes plus concise derived notes. When answering a Lexical implementation question, cite the official area to consult, summarize the pattern, then adapt it to the user's codebase.