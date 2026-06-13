import {$generateHtmlFromNodes} from '@lexical/html';

export function exportHtml(editor) {
  let html = '';

  editor.update(() => {
    html = $generateHtmlFromNodes(editor, null);
  });

  return html;
}

export function importHtml(editor, htmlString) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(htmlString, 'text/html');

  editor.update(() => {
    // convert DOM into Lexical nodes here
  });
}
