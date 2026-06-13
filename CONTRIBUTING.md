# Contributing

This repository is for small, installable agent skills with clear execution value.

## What belongs here

Good additions are narrow, practical, and maintainable. A skill should help an agent do a specific kind of work better than a generic system prompt would.

Examples of suitable skills:

- a framework-specific implementation or review workflow
- a production checklist for a technical domain
- a repeatable migration or debugging process
- a domain-specific coding assistant with concrete red flags

Weak additions will be rejected:

- generic productivity prompts
- broad topic summaries
- instructions that cannot be acted on or reviewed
- skills that duplicate an existing skill without improving it

## Required layout

Each skill must live under `skills/<skill-name>/` and include `SKILL.md`.

Required frontmatter:

```yaml
---
name: skill-name
description: A specific, searchable description of what this skill helps an agent do.
---
```

Optional supporting material:

- `references/` for deeper guidance loaded only when useful
- `resources/examples/` for compact examples or fixtures

## Quality bar

A good skill should include:

1. a precise activation condition
2. non-negotiable rules for the domain
3. a first-pass workflow
4. a file map for references and resources
5. common red flags
6. concrete output expectations

## Validation

Run:

```sh
npm test
```

The validator checks frontmatter, naming, descriptions, and the presence of a top-level heading.

## Review mindset

Keep the repo boring and useful. Do not add structure unless it protects quality, improves discovery, or makes future skills easier to maintain.
