# Custom nodes

Use custom nodes for durable document semantics.

Examples:

- mentions
- embeds
- callouts
- equations
- annotations

## Requirements

Every custom node should support:

- clone
- importJSON
- exportJSON
- createDOM
- updateDOM

If copy and paste matters, also support DOM conversion.

## Versioning

Custom nodes are schema contracts.

Add migration paths instead of breaking stored documents.

## Registration

Nodes must be present in:

```ts
initialConfig.nodes
```

Loading persisted state before node registration causes failures.

## Prefer custom nodes when

Content has meaning.

Avoid custom nodes for purely visual styling.

## Testing

Test:

- serialization
- deserialization
- old versions
- copy and paste
- export behavior
