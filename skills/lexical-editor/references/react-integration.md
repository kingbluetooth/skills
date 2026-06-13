# React integration

Use this reference when building or reviewing Lexical editors in React, Next.js, Remix, Vite, or other client-rendered React apps.

## Baseline shape

A production React editor usually has this shape:

```tsx
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';

const initialConfig = {
  namespace: 'ArticleEditor',
  theme,
  nodes,
  onError(error: Error) {
    reportEditorError(error);
    throw error;
  },
};

export function ArticleEditor({initialState, onSave}) {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable aria-placeholder="Write..." placeholder={<div>Write...</div>} />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin
        ignoreSelectionChange
        onChange={(editorState, editor) => {
          onSave(editorState.toJSON());
        }}
      />
      <LoadInitialStatePlugin value={initialState} />
    </LexicalComposer>
  );
}
```

Keep `initialConfig` stable. Defining it inline inside a frequently re-rendering component is a common source of accidental editor resets and plugin churn.

## Next.js and SSR

Lexical is a browser editor. In Next.js App Router, place the editor behind a client boundary:

```tsx
'use client';

export function EditorClient() {
  return <ArticleEditor />;
}
```

For dynamic imports, disable SSR for the editor shell if the parent route is server-rendered:

```tsx
const EditorClient = dynamic(() => import('./EditorClient'), {ssr: false});
```

Do not access `window`, selection, DOM nodes, or editor instances in server components.

## Plugin rules

A React plugin should usually be a tiny component that calls `useLexicalComposerContext()` and registers exactly one behavior.

```tsx
function SaveShortcutPlugin({onSave}: {onSave: () => void}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_MODIFIER_COMMAND,
      (event) => {
        if (event.key.toLowerCase() !== 's') return false;
        event.preventDefault();
        onSave();
        return true;
      },
      COMMAND_PRIORITY_NORMAL,
    );
  }, [editor, onSave]);

  return null;
}
```

Bad pattern: one huge plugin owns toolbar UI, persistence, import/export, commands, analytics, and validation. Split those responsibilities.

## State access

Read editor state with `editorState.read(() => {...})` or inside `editor.update(() => {...})`. Do not call `$getRoot`, `$getSelection`, or node helpers directly from React render or uncontrolled event handlers.

```tsx
editor.getEditorState().read(() => {
  const root = $getRoot();
  const text = root.getTextContent();
});
```

## Loading initial state

Load once, after the composer exists. Avoid overwriting user edits when props refresh.

```tsx
function LoadInitialStatePlugin({value}: {value?: unknown}) {
  const [editor] = useLexicalComposerContext();
  const didLoadRef = useRef(false);

  useEffect(() => {
    if (didLoadRef.current || value == null) return;
    didLoadRef.current = true;

    const parsed = editor.parseEditorState(JSON.stringify(value));
    if (!parsed.isEmpty()) {
      editor.setEditorState(parsed);
    }
  }, [editor, value]);

  return null;
}
```

## Error handling

`onError` is not a place to hide corrupt document state. Log enough context to identify the document, user action, editor namespace, and node versions. In development, rethrow. In production, use a product-specific fallback rather than silently losing edits.

## Toolbar pattern

Toolbar components should dispatch commands rather than directly manipulating editor internals. Read selection state through a listener and unsubscribe on cleanup.

## Checklist

- Editor shell is client-only where needed.
- `initialConfig`, `theme`, and `nodes` are stable.
- Plugins are small and cleaned up.
- Persistence does not run on every selection-only update unless intended.
- Import/load plugin does not clobber user edits.
- Toolbar actions dispatch commands.
- Keyboard shortcuts prevent default only when handled.
- Errors are reported with document context.
