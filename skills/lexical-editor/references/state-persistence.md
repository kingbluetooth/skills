# State persistence

Persist canonical Lexical JSON. HTML and Markdown are derived formats.

## Save

```ts
const json = editor.getEditorState().toJSON();
```

Store version information with documents when custom nodes are involved.

## Load

```ts
const parsed = editor.parseEditorState(JSON.stringify(savedState));
editor.setEditorState(parsed);
```

Load only after all custom nodes are registered.

## Avoid

- Saving HTML only.
- Replacing editor state every render.
- Loading before node registration.
- Ignoring schema evolution.

## Server updates

For immediate reads after updates:

```ts
editor.update(() => {
  // mutations
}, {discrete: true});
```

## Migration strategy

Treat node schemas as durable contracts. Version custom nodes and maintain backward compatibility.
