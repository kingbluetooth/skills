# Plugins, commands, and transforms

## Plugins

Keep plugins small and single-purpose.

Good:

- ToolbarPlugin
- PersistencePlugin
- MentionsPlugin
- SaveShortcutPlugin

Bad:

- One plugin owning everything.

## Commands

Create typed commands.

```ts
export const INSERT_TIMESTAMP_COMMAND = createCommand<void>();
```

Register handlers with cleanup.

```ts
return editor.registerCommand(
  INSERT_TIMESTAMP_COMMAND,
  () => {
    editor.update(() => {
      // mutation
    });
    return true;
  },
  COMMAND_PRIORITY_NORMAL,
);
```

Return true only if the command was handled.

## Transforms

Use node transforms for structural normalization.

Prefer transforms over update waterfalls.

Bad:

```ts
registerUpdateListener(() => {
  editor.update(() => {
    // second update
  });
});
```

Good:

```ts
editor.registerNodeTransform(TextNode, node => {
  // normalization
});
```

## Priorities

- COMMAND_PRIORITY_LOW
- COMMAND_PRIORITY_EDITOR
- COMMAND_PRIORITY_NORMAL
- COMMAND_PRIORITY_HIGH
- COMMAND_PRIORITY_CRITICAL

Choose deliberately.

## Cleanup

Every registration must return cleanup.

Missing cleanup is one of the most common Lexical bugs.
