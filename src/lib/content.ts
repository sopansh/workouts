import { getCollection, type CollectionEntry } from 'astro:content';

export const BASE = '/strength/';

export const url = {
  hub: BASE,
  principles: `${BASE}principles/`,
  principle: (id: string) => `${BASE}principles/${id}/`,
  muscles: `${BASE}muscles/`,
  group: (id: string) => `${BASE}muscles/${id}/`,
  muscle: (group: string, id: string) => `${BASE}muscles/${group}/${id}/`,
  exercises: `${BASE}exercises/`,
  exercise: (id: string) => `${BASE}exercises/${id}/`,
  programs: `${BASE}programs/`,
  program: (id: string) => `${BASE}programs/${id}/`,
  day: (program: string, day: string) => `${BASE}programs/${program}/${day}/`,
  weekly: (program = 'push-pull-legs') => (program === 'push-pull-legs' ? `${BASE}weekly-plan/` : `${BASE}weekly-plan/${program}/`),
  cricket: `${BASE}cricket/`,
  cricketPage: (id: string) => (id === 'overview' ? `${BASE}cricket/` : `${BASE}cricket/${id}/`),
  evidence: `${BASE}evidence/`,
  sources: `${BASE}sources/`,
  glossary: `${BASE}glossary/`,
};

export const DEFAULT_PROGRAM = 'push-pull-legs';

export async function loadAll() {
  const [groups, muscles, exercises, claims, sources, painRules, programs, principles, cricket, glossary] = await Promise.all([
    getCollection('groups'), getCollection('muscles'), getCollection('exercises'), getCollection('claims'), getCollection('sources'),
    getCollection('painRules'), getCollection('programs'), getCollection('principles'), getCollection('cricket'), getCollection('glossary'),
  ]);
  const byId = <T extends { id: string }>(list: T[]) => new Map(list.map(item => [item.id, item]));
  return {
    groups: groups.sort((a, b) => a.data.order - b.data.order),
    muscles, exercises, claims, sources, painRules, programs,
    principles: principles.sort((a, b) => a.data.order - b.data.order),
    cricket: cricket.sort((a, b) => a.data.order - b.data.order),
    glossary: glossary.sort((a, b) => a.data.term.localeCompare(b.data.term)),
    groupById: byId(groups), muscleById: byId(muscles), exerciseById: byId(exercises), claimById: byId(claims),
    sourceById: byId(sources), painById: byId(painRules), programById: byId(programs), principleById: byId(principles),
  };
}

export type Data = Awaited<ReturnType<typeof loadAll>>;
export type Exercise = CollectionEntry<'exercises'>;
export type Muscle = CollectionEntry<'muscles'>;
export type Claim = CollectionEntry<'claims'>;

export const gradeLabel: Record<string, string> = {
  A: 'Established',
  B: 'Probable',
  C: 'Plausible, not proven to change growth',
  D: 'Practitioner consensus',
  Mixed: 'Contested',
};

export const spinalLabel: Record<string, string> = { none: 'None', low: 'Low', moderate: 'Moderate', high: 'High' };
export const levelLabel: Record<string, string> = { foundation: 'Foundation', intermediate: 'Intermediate', advanced: 'Advanced' };

export const joinNames = (names: string[]) => names.join(', ');

// "Schoenfeld BJ, Ogborn D" -> "Schoenfeld et al. 2017"; a single author is shown without "et al."
export function sourceCite(s: { authors: string; year: number }) {
  const people = s.authors.split(',').map(p => p.trim()).filter(Boolean);
  const parts = people[0].split(' ');
  if (parts.length > 1 && /^[A-Z]{1,3}$/.test(parts[parts.length - 1])) parts.pop();
  const lead = parts.join(' ');
  const etAl = people.length > 1 || /et al/.test(s.authors);
  return `${lead}${etAl ? ' et al.' : ''} ${s.year}`;
}
