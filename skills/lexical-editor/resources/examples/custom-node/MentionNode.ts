import {TextNode} from 'lexical';

export class MentionNode extends TextNode {
  static getType() {
    return 'mention';
  }

  static clone(node: MentionNode) {
    return new MentionNode(node.__text, node.__key);
  }

  static importJSON(serializedNode: any) {
    return new MentionNode(serializedNode.text);
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: 'mention',
      version: 1,
    };
  }
}
