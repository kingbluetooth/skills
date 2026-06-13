import {TextNode} from 'lexical';

export function registerTextTransform(editor) {
  return editor.registerNodeTransform(TextNode, node => {
    const text = node.getTextContent();

    if (text.includes('--')) {
      node.setTextContent(text.replaceAll('--', '—'));
    }
  });
}
