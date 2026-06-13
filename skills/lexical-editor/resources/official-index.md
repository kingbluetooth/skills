Repository:
https://github.com/facebook/lexical

Documentation:
https://lexical.dev/docs/

# Official Lexical source index

This skill should be a navigation layer over Meta's Lexical repository, not a competing set of local examples.

## Retrieval order

For implementation questions, route work in this order:

1. `packages/lexical-playground/src/Editor.tsx` for the overall shell and plugin composition.
2. The closest official playground plugin under `packages/lexical-playground/src/plugins/`.
3. The matching concept doc under `packages/lexical-website/docs/`.
4. Only then write product-specific code.
