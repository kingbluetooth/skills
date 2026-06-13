export function saveEditorState(editor) {
  return editor.getEditorState().toJSON();
}

export function loadEditorState(editor, state) {
  const parsed = editor.parseEditorState(JSON.stringify(state));

  if (!parsed.isEmpty()) {
    editor.setEditorState(parsed);
  }
}
