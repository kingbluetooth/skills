# Official Lexical playground architecture snapshot

Source standard: Meta Lexical playground `packages/lexical-playground/src/Editor.tsx`.

This is not a toy editor. The official playground composes many small plugins around a central editor shell:

- toolbar and shortcuts only in rich-text mode
- separate plain-text fallback
- component picker, emoji picker, auto-embed, mentions, speech-to-text
- comments and collaboration
- table resizing, scroll shadows, nested table fitting, table action menus
- floating link editor and floating text format toolbar anchored to the editor container
- draggable blocks and code action menu hidden on small viewports
- character-limit plugin
- table of contents
- context menu
- actions/import-export plugin
- optional tree view

Critical patterns reproduced from the official implementation:

1. Keep rich-text and plain-text paths explicit.
2. Use an anchor element for floating UI, not arbitrary document queries.
3. Track `activeEditor` separately from the root editor when nested editors or floating UI may change focus.
4. Clean up viewport listeners.
5. Gate complex plugins behind feature flags/settings rather than loading everything unconditionally.
6. Treat collaboration as a separate mode with provider factories.
7. Keep table, link, toolbar, block, action, and debugging plugins separate.

Official source observations:

- The editor imports many independent plugins rather than centralizing behavior in one mega-plugin.
- It uses `useLexicalComposerContext()` to get the editor instance.
- It tracks `floatingAnchorElem`, `activeEditor`, `isLinkEditMode`, and small viewport state in React state.
- It unregisters the resize listener in the `useEffect` cleanup.
- It renders rich text inside a scroller and editor anchor; plain text renders simpler content editable.
- Collaboration v2 creates a Yjs `Doc` with garbage collection disabled for version history.

Do not copy this entire playground wholesale into production. Reproduce the architecture: small plugins, explicit modes, cleanup, anchored floating UI, feature gates, and separate collaboration/persistence concerns.
