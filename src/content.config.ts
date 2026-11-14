import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { yamlDir } from './loaders/yaml-dir';

const status = z.enum(['draft', 'verified', 'expert-reviewed']).default('draft');
const grade = z.enum(['A', 'B', 'C', 'D', 'Mixed']);

const groups = defineCollection({
  loader: file('src/content/groups.yml'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    order: z.number(),
    summary: z.string(),
    detail: z.enum(['full', 'overview']),
    accent: z.enum(['p1', 'p2', 'p3', 'p4']),
  }),
});

const sources = defineCollection({
  loader: file('src/content/sources.yml'),
  schema: z.object({
    id: z.string(),
    type: z.enum(['systematic-review', 'meta-analysis', 'rct', 'cohort', 'biomechanics', 'review', 'consensus', 'preprint', 'textbook']),
    authors: z.string(),
    year: z.number(),
    title: z.string(),
    venue: z.string(),
    doi: z.string().optional(),
    url: z.string().url().optional(),
    note: z.string().optional(),
    // Set by `npm run verify:sources` once Crossref confirms the DOI and title.
    verifiedOn: z.union([z.string(), z.date()]).transform(v => (v instanceof Date ? v.toISOString().slice(0, 10) : v)).optional(),
  }),
});

const claims = defineCollection({
  loader: yamlDir('src/content/claims'),
  schema: z.object({
    id: z.string(),
    kind: z.enum(['emphasis', 'programming', 'mechanism', 'safety', 'nutrition', 'cricket']),
    statement: z.string(),
    grade,
    sources: z.array(reference('sources')).min(1),
    caveats: z.string(),
    population: z.string().optional(),
    emgOnly: z.boolean().default(false),
  }),
});

const painRules = defineCollection({
  loader: file('src/content/pain-rules.yml'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    rule: z.string(),
    seeClinician: z.array(z.string()),
  }),
});

const muscles = defineCollection({
  loader: yamlDir('src/content/muscles'),
  schema: z.object({
    id: z.string(),
    group: reference('groups'),
    name: z.string(),
    latin: z.string().optional(),
    summary: z.string(),
    detail: z.enum(['full', 'basic']),
    // Tracked muscles get a weekly volume status on the weekly-plan page.
    tracked: z.boolean().default(false),
    regions: z.array(z.object({ id: z.string(), label: z.string(), note: z.string() })).default([]),
    anatomy: z.object({
      origin: z.string(),
      insertion: z.string(),
      innervation: z.string(),
      actions: z.array(z.string()),
    }),
    role: z.string(),
    synergists: z.array(reference('muscles')).default([]),
    growth: z.array(z.string()).default([]),
    claims: z.array(reference('claims')).default([]),
    injuries: z.array(z.string()).default([]),
    redFlags: z.array(z.string()).default([]),
    prerequisites: z.string().optional(),
    cricket: z.string().optional(),
    status,
  }),
});

const variation = z.object({
  name: z.string(),
  change: z.string(),
  emphasis: z.string().optional(),
  claim: reference('claims').optional(),
});

const exercises = defineCollection({
  loader: yamlDir('src/content/exercises'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    group: reference('groups'),
    primary: z.array(reference('muscles')).min(1),
    secondary: z.array(reference('muscles')).default([]),
    pattern: z.string(),
    equipment: z.array(z.string()).min(1),
    level: z.enum(['foundation', 'intermediate', 'advanced']),
    spinalLoad: z.enum(['none', 'low', 'moderate', 'high']),
    summary: z.string(),
    setup: z.string(),
    steps: z.array(z.string()).min(1),
    cues: z.array(z.string()).default([]),
    mistakes: z.array(z.string()).min(1),
    contraindications: z.array(z.string()).min(1),
    regression: z.string(),
    progression: z.string(),
    painRule: reference('painRules'),
    variations: z.array(variation).default([]),
    claims: z.array(reference('claims')).default([]),
    dose: z.string().optional(),
    cricket: z.string().optional(),
    alternatives: z.array(reference('exercises')).default([]),
    status,
  }),
});

const prescription = z.object({
  exercise: reference('exercises'),
  sets: z.number(),
  reps: z.coerce.string(),
  rir: z.coerce.string(),
  rest: z.number().describe('seconds between sets'),
  note: z.string().optional(),
});

const programs = defineCollection({
  loader: file('src/content/programs.yml'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    summary: z.string(),
    level: z.string(),
    daysPerWeek: z.number(),
    sessionMinutes: z.number(),
    rationale: z.array(z.string()),
    week: z.array(z.object({ day: z.string(), dayId: z.string().optional(), note: z.string() })),
    days: z.array(z.object({
      id: z.string(),
      name: z.string(),
      focus: z.string(),
      intro: z.string(),
      muscles: z.array(reference('muscles')),
      primer: z.array(prescription).default([]),
      exercises: z.array(prescription).min(1),
      order: z.string(),
      substitutions: z.array(z.string()).default([]),
    })),
    block: z.array(z.object({ week: z.string(), rir: z.coerce.string(), volume: z.string(), note: z.string() })),
    principles: z.array(reference('principles')).default([]),
    status,
  }),
});

const principles = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/content/principles' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number(),
    rules: z.array(z.object({ text: z.string(), claim: reference('claims').optional() })).default([]),
    claims: z.array(reference('claims')).default([]),
    related: z.array(reference('principles')).default([]),
    status,
  }),
});

const cricket = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/content/cricket' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    summary: z.string(),
    researched: z.boolean().default(false),
    demands: z.array(z.string()).default([]),
    questions: z.array(z.string()).default([]),
    claims: z.array(reference('claims')).default([]),
    exercises: z.array(reference('exercises')).default([]),
    status,
  }),
});

const glossary = defineCollection({
  loader: file('src/content/glossary.yml'),
  schema: z.object({ id: z.string(), term: z.string(), definition: z.string() }),
});

export const collections = { groups, sources, claims, painRules, muscles, exercises, programs, principles, cricket, glossary };
