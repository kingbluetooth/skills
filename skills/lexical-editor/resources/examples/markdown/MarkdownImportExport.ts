import {$convertToMarkdownString, $convertFromMarkdownString, TRANSFORMERS} from '@lexical/markdown';

export function exportMarkdown(editor) {
  let markdown = '';

  editor.update(() => {
    markdown = $convertToMarkdownString(TRANSFORMERS);
  });

  return markdown;
}

export function importMarkdown(editor, markdown) {
  editor.update(() => {
    $convertFromMarkdownString(markdown, TRANSFORMERS);
  });
}
