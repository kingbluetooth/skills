# Production checklist

Before shipping:

- node schema reviewed
- custom nodes versioned
- cleanup verified
- keyboard shortcuts tested
- copy and paste tested
- undo and redo tested
- persistence tested
- import and export tested
- accessibility tested
- error reporting configured
- no update waterfalls
- commands return correct values
- toolbar uses commands
- selection bugs checked
- server hydration boundaries reviewed
- large document performance tested

Red flags:

- saving HTML only
- direct DOM mutations
- missing node registration
- giant plugins
- stale listeners
- inaccessible controls
