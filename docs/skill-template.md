# Skill template

Use this template when adding a new skill. Replace every placeholder before opening a pull request.

## Frontmatter

Every skill must start with YAML frontmatter:

- `name`: lowercase kebab-case, matching the directory name
- `description`: specific, searchable, and between 80 and 280 characters

## Recommended sections

# Example Skill

Use this skill when the task involves clear trigger conditions.

Do not use this skill for nearby but incorrect use cases.

## Non-negotiables

1. Add hard rules the agent must follow.
2. Prefer constraints that can be checked in review.
3. Include domain-specific mistakes to avoid.

## First-pass workflow

1. Scope the task.
2. Inspect the relevant files, dependencies, inputs, or product constraints.
3. Pick the implementation path and explain why.
4. Produce patches, review notes, tests, or acceptance checks.

## File map

Load reference files only when useful:

- `references/topic.md` for deeper guidance
- `resources/examples/` for example snapshots or fixtures

## Output style when helping

Be concrete. Prefer exact patches, commands, review notes, and acceptance checks over broad advice.

## Red flags

- Generic prompting with no domain judgement.
- Missing cleanup, tests, migration notes, or security considerations where relevant.
- References that repeat the main skill instead of adding depth.

## Review checklist

Before adding a skill, check:

- the directory name and `name` frontmatter match
- the description is clear enough for search and discovery
- the skill has a narrow trigger, not a generic topic label
- hard rules are actually enforceable
- references are split only when they reduce cognitive load
- examples are small enough to review
- `npm test` passes
