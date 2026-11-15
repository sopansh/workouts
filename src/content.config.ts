import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { yamlDir } from './loaders/yaml-dir';

const status = z.enum(['draft', 'verified', 'expert-reviewed']).default('draft');
const grade = z.enum(['A', 'B', 'C', 'D', 'Mixed']);

const accent = z.enum(['p1', 'p2', 'p3', 'p4']);
// Zod defaults skip the reference transform, so the default must already have the shape a resolved reference has.
const strengthSection = { collection: 'sections' as const, id: 'strength' };
const link = z.object({ label: z.string(), href: z.string() });

const sections = defineCollection({
  loader: file('src/content/sections.yml'),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    title: z.string(),
    short: z.string(),
    blurb: z.string(),
    image: z.string(),
    accent,
    status: z.enum(['live', 'soon']),
    href: z.string().optional(),
    nav: z.array(link).default([]),
    footer: z.array(link).default([]),
  }),
});

const groups = defineCollection({
  loader: file('src/content/groups.yml'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    order: z.number(),
    summary: z.string(),
    detail: z.enum(['full', 'overview']),
    accent,
    anatomySources: z.array(reference('sources')).default([]),
  }),
});

const sources = defineCollection({
  loader: file('src/content/sources.yml'),
  schema: z.object({
    id: z.string(),
    type: z.enum(['systematic-review', 'meta-analysis', 'rct', 'cohort', 'cross-sectional', 'biomechanics', 'review', 'consensus', 'guideline', 'preprint', 'textbook']),
    section: reference('sections').default(strengthSection),
    /** Limits the source to one stage of a guide section (see loadGuide). */
    phase: z.string().optional(),
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
    kind: z.enum(['emphasis', 'programming', 'mechanism', 'safety', 'health', 'nutrition', 'cricket']),
    section: reference('sections').default(strengthSection),
    /** Limits the claim to one stage of a guide section (see loadGuide). */
    phase: z.string().optional(),
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
    /** Further rules for other joints the exercise loads. */
    alsoPainRules: z.array(reference('painRules')).default([]),
    variations: z.array(variation).default([]),
    claims: z.array(reference('claims')).default([]),
    dose: z.string().optional(),
    cricket: z.string().optional(),
    alternatives: z.array(reference('exercises')).default([]),
    status,
  }),
});

// Guides (getting started, plyometrics): groups of exercises, the exercises themselves, and the plan that schedules them.
const guideGroups = defineCollection({
  loader: yamlDir('src/content/guides/groups'),
  schema: z.object({
    id: z.string(),
    section: reference('sections'),
    order: z.number(),
    title: z.string(),
    summary: z.string(),
    /** A ladder runs from easier (level 1) to harder; the person starts at the level a placement test gives them. */
    ladder: z.boolean().default(false),
    test: z.string().optional(),
    /** Splits one section's groups and plans into stages, for example foundations and first skills. */
    phase: z.string().optional(),
    /** Kit that the whole ladder needs, so level 1 may need it too. */
    requires: z.string().optional(),
    /** Checks to pass before starting this group, shown on the page and in the plan. */
    gates: z.array(z.string()).default([]),
    /** True when the steps are a coaching convention with no training-outcome evidence. */
    convention: z.boolean().default(false),
  }),
});

const guideExercises = defineCollection({
  loader: yamlDir('src/content/guides/exercises'),
  schema: z.object({
    id: z.string(),
    section: reference('sections'),
    /** Position within the page. Collection load order is not guaranteed, so order is explicit. */
    order: z.number(),
    group: reference('guideGroups'),
    level: z.number().int().min(1).optional(),
    name: z.string(),
    equipment: z.array(z.string()).min(1),
    /** Needs kit beyond the no-equipment path. */
    optional: z.boolean().default(false),
    muscles: z.string(),
    /** Fixed dose, for exercises that are not progressed week to week. */
    dose: z.string().optional(),
    /** Dose by week range, for exercises that are progressed. */
    schedule: z.array(z.object({ weeks: z.string(), sets: z.number(), reps: z.number() })).optional(),
    setup: z.string(),
    steps: z.array(z.string()).min(1),
    cues: z.array(z.string()).default([]),
    mistakes: z.array(z.string()).min(1),
    contraindications: z.array(z.string()).min(1),
    regression: z.string(),
    progression: z.string(),
    painRule: reference('painRules'),
    /** Further rules for other joints the exercise loads (for example wrist as well as shoulder). */
    alsoPainRules: z.array(reference('painRules')).default([]),
    status,
  }),
});

const guideItem = z.object({
  group: reference('guideGroups').optional(),
  exercise: reference('guideExercises').optional(),
  reps: z.coerce.string().optional(),
  note: z.string().optional(),
});

const guidePlans = defineCollection({
  loader: yamlDir('src/content/guides/plans'),
  schema: z.object({
    id: z.string(),
    section: reference('sections'),
    phase: z.string().optional(),
    name: z.string(),
    warmup: z.object({ text: z.string(), items: z.array(guideItem).default([]) }),
    sessions: z.array(z.object({ id: z.string(), title: z.string(), intro: z.string().optional(), items: z.array(guideItem).min(1) })),
    weeks: z.array(z.object({
      label: z.string(),
      sets: z.number().optional(),
      rir: z.coerce.string().optional(),
      /** Day name to session id. Days not listed are rest days. */
      days: z.record(z.string(), z.string()),
      note: z.string(),
    })),
    /** Planning assumptions behind the time estimate; omit when sessions are not timed. */
    timing: z.object({
      secondsPerSet: z.number(),
      restSeconds: z.number(),
      secondsBetweenExercises: z.number(),
      warmUpMinutes: z.number(),
      maxMinutes: z.number(),
    }).optional(),
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

// Core guide: the recovery phases and the exercises, including the poses that drive the 3D figures.
const point = z.union([z.tuple([z.number(), z.number()]), z.tuple([z.number(), z.number(), z.number()])]);
const pose = z.object({
  head: point, shoulder: point, elbow: point, wrist: point, hip: point, knee: point, ankle: point, toe: point,
  farElbow: point.optional(), farWrist: point.optional(), farKnee: point.optional(), farAnkle: point.optional(), farToe: point.optional(),
});

const corePhases = defineCollection({
  loader: file('src/content/core/phases.yml'),
  schema: z.object({
    id: z.string(),
    number: z.number().int(),
    title: z.string(),
    duration: z.string().optional(),
    intro: z.string().optional(),
    moveOn: z.string(),
    plan: z.string(),
  }),
});

const coreExercises = defineCollection({
  loader: file('src/content/core/exercises.yml'),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    phase: z.number().int(),
    name: z.string(),
    dose: z.string(),
    muscles: z.string(),
    equipment: z.enum(['kettlebell']).optional(),
    glow: z.array(z.enum(['torso', 'hips', 'chest', 'lats', 'deltoids', 'arms', 'quads', 'hamstrings', 'calves'])),
    cycle: z.number(),
    spineBend: z.tuple([z.number(), z.number()]).optional(),
    poses: z.object({ start: pose, end: pose }),
    steps: z.array(z.string()).min(1),
    mistakes: z.string(),
  }),
});

const glossary = defineCollection({
  loader: file('src/content/glossary.yml'),
  schema: z.object({ id: z.string(), term: z.string(), definition: z.string() }),
});

export const collections = { sections, corePhases, coreExercises, guideGroups, guideExercises, guidePlans, groups, sources, claims, painRules, muscles, exercises, programs, principles, cricket, glossary };
