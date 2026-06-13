import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';

export function Editor() {
  return (
    <LexicalComposer initialConfig={{namespace:'editor',theme:{},onError:console.error}}>
      <RichTextPlugin
        contentEditable={<ContentEditable aria-placeholder='Write...' />}
        placeholder={<div>Write...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin onChange={(state)=>console.log(state.toJSON())} />
    </LexicalComposer>
  );
}
