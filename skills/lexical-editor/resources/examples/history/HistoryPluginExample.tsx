import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';

export function EditorHistory() {
  return <HistoryPlugin />;
}

// Undo and redo behavior should be tested with keyboard shortcuts
// and collaboration scenarios.
