import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const repoRoot = process.cwd();
const skillsDir = join(repoRoot, 'skills');
const failures = [];

function fail(message) {
  failures.push(message);
}

function parseFrontmatter(content, filePath) {
  if (!content.startsWith('---\n')) {
    fail(`${filePath}: missing YAML frontmatter block`);
    return null;
  }

  const end = content.indexOf('\n---', 4);
  if (end === -1) {
    fail(`${filePath}: frontmatter block is not closed`);
    return null;
  }

  const raw = content.slice(4, end).trim();
  const fields = new Map();

  for (const line of raw.split('\n')) {
    const match = line.match(/^([a-zA-Z][a-zA-Z0-9_-]*):\s*(.*)$/);
    if (!match) {
      fail(`${filePath}: unsupported frontmatter line: ${line}`);
      continue;
    }

    fields.set(match[1], match[2].replace(/^['"]|['"]$/g, '').trim());
  }

  return fields;
}

function validateSkill(skillName) {
  const skillPath = join(skillsDir, skillName);
  const skillFile = join(skillPath, 'SKILL.md');

  if (!statSync(skillPath).isDirectory()) {
    return;
  }

  if (!existsSync(skillFile)) {
    fail(`skills/${skillName}: missing SKILL.md`);
    return;
  }

  const relativePath = `skills/${skillName}/SKILL.md`;
  const content = readFileSync(skillFile, 'utf8');
  const fields = parseFrontmatter(content, relativePath);

  if (!fields) {
    return;
  }

  const name = fields.get('name');
  const description = fields.get('description');

  if (!name) {
    fail(`${relativePath}: missing required frontmatter field "name"`);
  } else if (!/^[a-z0-9][a-z0-9-]*$/.test(name)) {
    fail(`${relativePath}: name must be lowercase kebab-case`);
  } else if (name !== skillName) {
    fail(`${relativePath}: name must match directory name (${skillName})`);
  }

  if (!description) {
    fail(`${relativePath}: missing required frontmatter field "description"`);
  } else if (description.length < 80) {
    fail(`${relativePath}: description should be specific enough for search/discovery`);
  } else if (description.length > 280) {
    fail(`${relativePath}: description is too long; keep it searchable and concise`);
  }

  if (!/^#\s+/m.test(content)) {
    fail(`${relativePath}: missing top-level Markdown heading`);
  }
}

if (!existsSync(skillsDir)) {
  fail('missing skills/ directory');
} else {
  const skillNames = readdirSync(skillsDir).filter((entry) => !entry.startsWith('.')).sort();

  if (skillNames.length === 0) {
    fail('skills/ directory is empty');
  }

  for (const skillName of skillNames) {
    validateSkill(skillName);
  }
}

if (failures.length > 0) {
  console.error('Skill validation failed:\n');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Skill validation passed.');
