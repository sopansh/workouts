// Pure planning maths shared by the weekly-plan page and scripts/check-content.mjs. No Astro imports, erasable TypeScript only.

export type SpinalLoad = 'none' | 'low' | 'moderate' | 'high';

export const SPINAL_RANK: Record<SpinalLoad, number> = { none: 0, low: 1, moderate: 2, high: 3 };

export interface ExerciseLike {
  id: string;
  primary: string[];
  secondary: string[];
  spinalLoad: SpinalLoad;
}

export interface PrescriptionLike {
  exercise: string;
  sets: number;
  rest: number;
}

export interface DayLike {
  id: string;
  primer?: PrescriptionLike[];
  exercises: PrescriptionLike[];
}

// Planning assumptions, shown on the weekly-plan page: set time includes the lift itself, plus setting up each exercise.
export const SECONDS_PER_SET = 45;
export const SECONDS_BETWEEN_EXERCISES = 60;
export const WARM_UP_MINUTES = 10;

const setSeconds = (list: PrescriptionLike[]) => list.reduce((sum, rx) => sum + rx.sets * (SECONDS_PER_SET + rx.rest), 0);

export function estimateMinutes(day: DayLike): number {
  const all = [...(day.primer ?? []), ...day.exercises];
  const seconds = setSeconds(all) + all.length * SECONDS_BETWEEN_EXERCISES;
  return Math.round(seconds / 60 + WARM_UP_MINUTES);
}

export function totalSets(day: DayLike): number {
  return day.exercises.reduce((sum, rx) => sum + rx.sets, 0);
}

export function peakSpinalLoad(day: DayLike, exercises: Map<string, ExerciseLike>): SpinalLoad {
  let peak: SpinalLoad = 'none';
  for (const rx of [...(day.primer ?? []), ...day.exercises]) {
    const load = exercises.get(rx.exercise)?.spinalLoad ?? 'none';
    if (SPINAL_RANK[load] > SPINAL_RANK[peak]) peak = load;
  }
  return peak;
}

export interface MuscleVolume {
  muscle: string;
  direct: number;
  indirect: number;
  effective: number;
  sessions: number[];
}

// Direct sets count in full, indirect sets count half (the "fractional" method). Primer and warm-up sets are not counted.
export function weeklyVolume(days: Array<{ dayIndex: number; day: DayLike }>, exercises: Map<string, ExerciseLike>): Map<string, MuscleVolume> {
  const out = new Map<string, MuscleVolume>();
  const entry = (muscle: string) => {
    if (!out.has(muscle)) out.set(muscle, { muscle, direct: 0, indirect: 0, effective: 0, sessions: [] });
    return out.get(muscle)!;
  };

  for (const { dayIndex, day } of days) {
    const directToday = new Map<string, number>();
    for (const rx of day.exercises) {
      const ex = exercises.get(rx.exercise);
      if (!ex) continue;
      for (const m of ex.primary) {
        entry(m).direct += rx.sets;
        directToday.set(m, (directToday.get(m) ?? 0) + rx.sets);
      }
      for (const m of ex.secondary) if (!ex.primary.includes(m)) entry(m).indirect += rx.sets;
    }
    for (const [m, sets] of directToday) if (sets >= 2) entry(m).sessions.push(dayIndex);
  }
  for (const v of out.values()) v.effective = v.direct + v.indirect / 2;
  return out;
}

// Gaps in days between consecutive hard sessions, including the wrap from the last session to the first of next week.
export function sessionGaps(sessions: number[]): number[] {
  if (sessions.length < 2) return [];
  const sorted = [...sessions].sort((a, b) => a - b);
  return sorted.map((d, i) => (i === sorted.length - 1 ? sorted[0] + 7 - d : sorted[i + 1] - d));
}

export const VOLUME_FLOOR = 10;
export const VOLUME_CEILING = 20;

export type VolumeStatus = 'below' | 'in-range' | 'above';

// Judged on direct sets, but a muscle that gets a lot of helper work (biceps, triceps) is not flagged if its effective sets reach the floor.
export function volumeStatus(direct: number, effective: number): VolumeStatus {
  if (direct > VOLUME_CEILING) return 'above';
  return direct >= VOLUME_FLOOR || effective >= VOLUME_FLOOR ? 'in-range' : 'below';
}

export function formatRest(seconds: number): string {
  if (seconds < 120) return `${seconds} s`;
  const minutes = seconds / 60;
  return `${Number.isInteger(minutes) ? minutes : minutes.toFixed(1)} min`;
}
