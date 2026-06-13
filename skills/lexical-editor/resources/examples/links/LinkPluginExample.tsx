import {LinkPlugin} from '@lexical/react/LexicalLinkPlugin';

export function EditorLinks() {
  return <LinkPlugin />;
}

// Validate URLs before insertion and avoid trusting pasted HTML.
