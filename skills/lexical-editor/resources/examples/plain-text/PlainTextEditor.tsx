import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';

export function PlainTextEditor() {
  return (
    <LexicalComposer initialConfig={{namespace:'plain',theme:{},onError:console.error}}>
      <PlainTextPlugin
        contentEditable={<ContentEditable aria-placeholder='Write...' />}
        placeholder={<div>Write...</div>}
      />
      <HistoryPlugin />
    </LexicalComposer>
  );
}
