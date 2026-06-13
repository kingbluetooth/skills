import {createCommand, COMMAND_PRIORITY_NORMAL, $createTextNode, $insertNodes} from 'lexical';
import {useEffect} from 'react';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';

export const INSERT_TIMESTAMP_COMMAND = createCommand<void>();

export function InsertTimestampPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      INSERT_TIMESTAMP_COMMAND,
      () => {
        editor.update(() => {
          $insertNodes([$createTextNode(new Date().toISOString())]);
        });
        return true;
      },
      COMMAND_PRIORITY_NORMAL,
    );
  }, [editor]);

  return null;
}
