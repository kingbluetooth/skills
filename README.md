# Agent Skills Portfolio

A public, installable collection of agent skills for AI coding workflows.

This repository is designed to be discoverable by the open agent skills ecosystem, including [skills.sh](https://skills.sh), and to show practical skill design: clear triggers, production-minded guardrails, structured reference material, and validation that keeps future additions consistent.

## Why this repo exists

Most agent instructions fail because they are vague, stale, or too broad. This repo treats skills as small, versionable software assets:

- each skill lives in its own directory under `skills/`
- each skill exposes a `SKILL.md` file with YAML frontmatter
- each skill has a focused use case, explicit constraints, and supporting references
- automated validation catches broken metadata before changes are merged

## Available skills

| Skill | Purpose | Install |
| --- | --- | --- |
| [`lexical-editor`](./skills/lexical-editor/SKILL.md) | Build, review, debug, and modernize Lexical rich-text editors in production React applications. | `npx skills add kingbluetooth/skills --skill lexical-editor` |

## Install

Install the full repository:

```sh
npx skills add kingbluetooth/skills
```

Install a single skill:

```sh
npx skills add kingbluetooth/skills --skill lexical-editor
```

## Repository structure

```text
skills/
  lexical-editor/
    SKILL.md
    references/
    resources/
docs/
  skill-template.md
scripts/
  validate-skills.mjs
.github/
  workflows/
    validate-skills.yml
```

## Skill standard

Every skill added to this repo should include:

1. `skills/<skill-name>/SKILL.md`
2. YAML frontmatter with `name` and `description`
3. a narrow activation scope: when the skill should and should not be used
4. non-negotiable technical rules for the domain
5. a first-pass workflow an agent can follow without guessing
6. references or examples only where they improve execution quality

A valid skill starts like this:

```md
---
name: example-skill
description: A concise, searchable description of what this skill helps an agent do.
---

# Example Skill
```

## Validation

Run the local validation before committing:

```sh
npm test
```

The validator checks that every `skills/*/SKILL.md` file has required frontmatter, stable naming, a useful description, and a matching directory name.

GitHub Actions runs the same check on pushes and pull requests.

## Adding a new skill

1. Copy the pattern in [`docs/skill-template.md`](./docs/skill-template.md).
2. Create `skills/<new-skill>/SKILL.md`.
3. Add supporting reference files under `skills/<new-skill>/references/` only when they are genuinely useful.
4. Add examples under `skills/<new-skill>/resources/examples/` when examples reduce ambiguity.
5. Run `npm test`.
6. Add the skill to the table in this README.

## Design principles

- **Specific beats broad.** A skill should improve one class of work, not become a dumping ground for generic prompts.
- **Instructions should be operational.** Prefer workflows, checks, file maps, and red flags over abstract advice.
- **Guardrails matter.** Good skills tell the agent what not to do.
- **Future readers count.** The repo should be understandable to maintainers, recruiters, and engineers scanning it cold.

## Open-source posture

This is intentionally small and reviewable. The goal is not to collect hundreds of prompts; it is to publish useful, maintainable agent skills that demonstrate AI-assisted engineering judgement.

Contributions are welcome when they keep the repo focused and raise execution quality.
