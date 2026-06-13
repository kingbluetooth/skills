# Testing and accessibility

## Test editor state first

Prefer testing editor state and serialization before UI snapshots.

Test:

- commands
- transforms
- node serialization
- copy and paste
- keyboard shortcuts
- persistence

## Integration tests

Verify:

- selection behavior
- undo and redo
- toolbar actions
- paste handling
- markdown import/export

## Accessibility

Editors are product UX, not just framework code.

Check:

- keyboard navigation
- focus management
- placeholders
- labels
- screen readers
- semantic output

Toolbar buttons should expose accessible names.

## Common failures

- mouse-only interactions
- invisible focus
- inaccessible dropdowns
- missing labels
- placeholder misuse
