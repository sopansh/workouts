import { getCollection, type CollectionEntry } from 'astro:content';
import { guideSessionMinutes } from './plan';

export type GuideGroup = CollectionEntry<'guideGroups'>;
export type GuideExercise = CollectionEntry<'guideExercises'>;
export type GuidePlan = CollectionEntry<'guidePlans'>;
export type GuideSession = GuidePlan['data']['sessions'][number];
export type GuideItem = GuideSession['items'][number];

export const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

/** Everything a guide section (getting started, calisthenics, plyometrics) needs, filtered to that section. */
export async function loadGuide(section: string, options: { phase?: string } = {}) {
  const [groups, exercises, plans, painRules, claims, sources] = await Promise.all([
    getCollection('guideGroups'), getCollection('guideExercises'), getCollection('guidePlans'),
    getCollection('painRules'), getCollection('claims'), getCollection('sources'),
  ]);
  const mine = <T extends { data: { section: { id: string } } }>(list: T[]) => list.filter(item => item.data.section.id === section);
  // With a phase, groups and plans are limited to it, so a section can hold several independent stages.
  const inPhase = <T extends { data: { phase?: string } }>(list: T[]) => (options.phase ? list.filter(item => item.data.phase === options.phase) : list);
  const sortedGroups = inPhase(mine(groups)).sort((a, b) => a.data.order - b.data.order);
  const order = new Map(sortedGroups.map((g, i) => [g.id, i]));
  const sortedExercises = mine(exercises).filter(exercise => order.has(exercise.data.group.id)).sort((a, b) =>
    (order.get(a.data.group.id) ?? 0) - (order.get(b.data.group.id) ?? 0) || (a.data.level ?? 0) - (b.data.level ?? 0) || a.data.order - b.data.order);
  const sectionPlans = inPhase(mine(plans));
  // The first plan is the hub plan: new plans go last in plans.yml, or pass a phase.
  const plan = sectionPlans[0];
  if (!plan) throw new Error(`No plan for section "${section}"${options.phase ? ` in phase "${options.phase}"` : ''}`);
  const mineClaims = inPhase(mine(claims));
  // A section's evidence page lists every source its claims cite, including ones registered under another section.
  const cited = new Set(mineClaims.flatMap(claim => claim.data.sources.map(source => source.id)));
  return {
    groups: sortedGroups,
    exercises: sortedExercises,
    plan,
    plans: sectionPlans,
    claims: mineClaims,
    sources: sources.filter(source => (source.data.section.id === section && (!options.phase || source.data.phase === options.phase)) || cited.has(source.id)),
    painById: new Map(painRules.map(rule => [rule.id, rule])),
    claimById: new Map(claims.map(claim => [claim.id, claim])),
    sourceById: new Map(sources.map(source => [source.id, source])),
    groupById: new Map(sortedGroups.map(group => [group.id, group])),
    exerciseById: new Map(sortedExercises.map(exercise => [exercise.id, exercise])),
  };
}

export type GuideData = Awaited<ReturnType<typeof loadGuide>>;

/** Every pain rule an exercise points at: its main rule first, then any extra ones. */
export const painRuleIds = (exercise: GuideExercise): string[] => [exercise.data.painRule.id, ...exercise.data.alsoPainRules.map(rule => rule.id)];

/** The pain-rule links for one exercise's card, in the order of painRuleIds. */
export const painRuleLinks = (data: GuideData, exercise: GuideExercise): { title: string; href: string }[] =>
  painRuleIds(exercise).map(id => ({ title: data.painById.get(id)!.data.title, href: `#pain-${id}` }));

/** Every pain rule used on a page, once each, for the list at its foot. */
export const usedPainRuleIds = (data: GuideData): string[] => [...new Set(data.exercises.flatMap(painRuleIds))];

export const groupsInPhase = (data: GuideData, phase: string): GuideGroup[] => data.groups.filter(group => group.data.phase === phase);

export const exercisesInGroup = (data: GuideData, groupId: string): GuideExercise[] =>
  data.exercises.filter(exercise => exercise.data.group.id === groupId);

/** A one-line dose for an exercise: its fixed dose, or where its weekly schedule starts and ends. */
export function doseText(exercise: GuideExercise): string {
  const { dose, schedule } = exercise.data;
  if (dose) return dose;
  if (schedule?.length) {
    const first = schedule[0];
    const last = schedule[schedule.length - 1];
    return `${first.sets} × ${first.reps} to start; ${last.sets} × ${last.reps} by ${last.weeks.toLowerCase()}`;
  }
  return '';
}

/** Estimated minutes for a session at a given number of sets per exercise, from the plan's timing assumptions. */
export function estimateMinutes(plan: GuidePlan, session: GuideSession, sets: number): number {
  const timing = plan.data.timing;
  if (!timing) throw new Error(`Plan "${plan.id}" has no timing assumptions`);
  return guideSessionMinutes(timing, session.items.length, sets);
}

export const sentenceCase = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);
