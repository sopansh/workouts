export const families = ['press', 'fly', 'pushup', 'plus', 'dip', 'punch', 'squat', 'lunge', 'leg-press', 'hinge', 'bridge', 'extension', 'curl', 'nordic', 'hip-machine', 'calf', 'tibialis'] as const;
export const variants = ['flat', 'incline', 'seated', 'standing', 'prone', 'back', 'front', 'goblet', 'box', 'hack', 'bulgarian', 'walking', 'floor', 'bench', 'dowel', 'pull-through', 'abduction', 'adduction'] as const;
export const equipmentTypes = ['none', 'barbell', 'dumbbells', 'goblet', 'cable', 'machine', 'dowel', 'bars', 'wall'] as const;
export interface AnimationConfig {
  family: typeof families[number];
  variant: typeof variants[number];
  equipment: typeof equipmentTypes[number];
  tempo: [number, number, number, number];
  range: [number, number];
  incline: number;
  lean: number;
  yaw: number;
}
export type Point = [number, number, number];
export interface Chain { start: Point; joint: Point; end: Point }
export interface Prop { kind: 'pad' | 'bar' | 'weight' | 'cable'; start: Point; end: Point; width: number }
export interface ExercisePose {
  hip: Point; shoulder: Point; head: Point;
  arms: Chain[]; legs: Chain[]; feet: Point[]; props: Prop[];
}
const rad = (angle: number) => angle * Math.PI / 180;
const add = (a: Point, b: Point): Point => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const scale = (a: Point, n: number): Point => [a[0] * n, a[1] * n, a[2] * n];
const sub = (a: Point, b: Point): Point => add(a, scale(b, -1));
const norm = (a: Point) => Math.hypot(...a);
const unit = (a: Point): Point => scale(a, 1 / norm(a));
export const distance = (a: Point, b: Point) => norm(sub(a, b));
const finitePoint = (a: Point) => Array.isArray(a) && a.length === 3 && a.every(Number.isFinite);

/** Contact-driven two-bone chains in an authored bend plane; lengths never interpolate. */
export function chain(start: Point, end: Point, first: number, second: number, hint: Point): Chain {
  if (![start, end, hint].every(finitePoint) || ![first, second].every(n => Number.isFinite(n) && n > 0)) throw new RangeError('Invalid chain input.');
  const delta = sub(end, start);
  const d = norm(delta);
  if (d < 1e-8 || d > first + second + 1e-8 || d < Math.abs(first - second) - 1e-8) throw new RangeError('Unreachable contact.');
  const axis = unit(delta);
  const dot = hint.reduce((sum, n, i) => sum + n * axis[i], 0);
  const plane = sub(hint, scale(axis, dot));
  if (norm(plane) < 1e-8) throw new RangeError('Invalid bend plane.');
  const along = (first ** 2 - second ** 2 + d ** 2) / (2 * d);
  const height = Math.sqrt(Math.max(0, first ** 2 - along ** 2));
  return { start, joint: add(add(start, scale(axis, along)), scale(unit(plane), height)), end };
}

const combinations: Record<AnimationConfig['family'], string[]> = {
  press: ['flat:barbell', 'flat:dumbbells', 'incline:barbell', 'incline:dumbbells', 'seated:machine'],
  fly: ['flat:dumbbells', 'standing:cable', 'seated:machine'],
  pushup: ['floor:none'], plus: ['floor:none'], dip: ['standing:bars'], punch: ['standing:cable'],
  squat: ['back:barbell', 'front:barbell', 'goblet:goblet', 'box:barbell', 'hack:machine'],
  lunge: ['bulgarian:dumbbells', 'walking:dumbbells'], 'leg-press': ['seated:machine'],
  hinge: ['standing:barbell', 'pull-through:cable', 'dowel:dowel'],
  bridge: ['floor:none', 'bench:barbell'], extension: ['seated:machine'],
  curl: ['seated:machine', 'prone:machine'], nordic: ['floor:bars'],
  'hip-machine': ['abduction:machine', 'adduction:machine'],
  calf: ['standing:machine', 'seated:machine'], tibialis: ['standing:wall'],
};

export function validateAnimation(config: AnimationConfig): void {
  if (!config || !families.includes(config.family) || !combinations[config.family].includes(`${config.variant}:${config.equipment}`)) throw new RangeError('Unsupported movement/equipment combination.');
  if (!Array.isArray(config.tempo) || config.tempo.length !== 4 || !config.tempo.every(n => Number.isFinite(n) && n > 0 && n <= 10)) throw new RangeError('Invalid animation tempo.');
  if (!Array.isArray(config.range) || config.range.length !== 2 || !config.range.every(n => Number.isFinite(n) && n >= -40 && n <= 140) || config.range[0] === config.range[1]) throw new RangeError('Invalid illustrative range.');
  const limits: Partial<Record<AnimationConfig['family'], [number, number]>> = {
    curl: [0, 110], extension: [0, 100], nordic: [0, 56],
    'hip-machine': [0, 40], tibialis: [0, 25], hinge: [0, 65], fly: [0, 90],
  };
  const bounds = limits[config.family];
  if (bounds && config.range.some(n => n < bounds[0] || n > bounds[1])) throw new RangeError('Range exceeds illustrative movement bounds.');
  if (!Number.isFinite(config.incline) || config.incline < 0 || config.incline > 45 || !Number.isFinite(config.lean) || Math.abs(config.lean) > 65 || !Number.isFinite(config.yaw) || Math.abs(config.yaw) > Math.PI * 2) throw new RangeError('Invalid illustration geometry.');
}

export function cycleWeight(config: AnimationConfig, progress: number): number {
  if (!Number.isFinite(progress) || progress < 0 || progress > 1) throw new RangeError('Invalid animation progress.');
  const [out, hold, back, rest] = config.tempo;
  const t = progress * (out + hold + back + rest);
  const ease = (n: number) => n * n * (3 - 2 * n);
  if (t < out) return ease(t / out);
  if (t < out + hold) return 1;
  if (t < out + hold + back) return 1 - ease((t - out - hold) / back);
  return 0;
}

export function exercisePose(config: AnimationConfig, progress: number): ExercisePose {
  validateAnimation(config);
  const w = cycleWeight(config, progress);
  const a = rad(config.range[0] + (config.range[1] - config.range[0]) * w);
  const props: Prop[] = [];
  const prop = (kind: Prop['kind'], start: Point, end: Point, width = 0.12) => props.push({ kind, start, end, width });
  const bar = (p: Point, width = 1.2) => {
    prop('bar', add(p, [0, 0, -width / 2]), add(p, [0, 0, width / 2]), 0.025);
    if (config.equipment === 'barbell') {
      for (const side of [-1, 1]) {
        const centre = side * (width / 2 - 0.07);
        prop('weight', add(p, [0, 0, centre - 0.035]), add(p, [0, 0, centre + 0.035]), 0.14);
      }
    }
  };
  const pad = (p: Point, end: Point, width = 0.42) => prop('pad', p, end, width);
  const z = [-0.16, 0.16];
  let hip: Point = [-0.08, 0.96, 0];
  let shoulder: Point = [-0.08, 1.56, 0];
  let head: Point;
  let legs: Chain[] = [];
  let arms: Chain[] = [];
  let feet: Point[] = [];
  const legContact = (start: Point, end: Point) => chain(start, end, 0.46, 0.44, [1, 0, 0]);
  const armContact = (start: Point, end: Point, side: number) => chain(start, end, 0.32, 0.3, [0, -1, side]);
  const standingLegs = () => {
    legs = z.map(side => legContact(add(hip, [0, 0, side]), [0, 0.09, side]));
    feet = z.map(side => [0.2, 0.02, side]);
  };
  const seated = () => {
    hip = [-0.25, 0.65, 0];
    shoulder = add(hip, [-Math.sin(rad(config.incline)) * 0.6, Math.cos(rad(config.incline)) * 0.6, 0]);
    legs = z.map(side => {
      const start = add(hip, [0, 0, side]);
      const joint = add(start, [0.46, 0, 0]);
      return { start, joint, end: add(joint, [0, -0.44, 0]) };
    });
    feet = legs.map(l => add(l.end, [0.2, -0.07, 0]));
    pad(add(hip, [-0.08, -0.09, 0]), add(hip, [0.45, -0.09, 0]));
    pad(add(hip, [-0.1, 0, 0]), add(shoulder, [-0.1, 0.1, 0]));
  };
  const lying = () => {
    hip = [0.2, 0.68, 0];
    shoulder = add(hip, [-0.6 * Math.cos(rad(config.incline)), 0.6 * Math.sin(rad(config.incline)), 0]);
    legs = z.map(side => legContact(add(hip, [0, 0, side]), [0.8, 0.09, side]));
    feet = z.map(side => [1, 0.02, side]);
    const start = add(shoulder, [-0.25, -0.09, 0]);
    const end = add(hip, [0.18, -0.09, 0]);
    pad(start, end);
    if (config.incline > 0) {
      const direction = unit(sub(end, start));
      const underside: Point = [direction[1] * 0.04, -direction[0] * 0.04, 0];
      for (const endpoint of [start, end]) {
        const top = add(endpoint, underside);
        prop('bar', [top[0], 0.03, top[2]], top, 0.035);
      }
    }
  };
  const relaxedArms = () => {
    arms = z.map(side => {
      const start = add(shoulder, [0, 0, side]);
      const joint = add(start, [0, -0.32, 0]);
      return { start, joint, end: add(joint, [0, -0.3, 0]) };
    });
  };

  switch (config.family) {
    case 'press':
    case 'fly': {
      if (config.variant === 'seated') seated();
      else if (config.variant === 'standing') {
        hip = [-0.08, 0.92, 0];
        legs = z.map((side, i) => legContact(add(hip, [0, 0, side]), [i ? 0.15 : -0.15, 0.09, side]));
        feet = legs.map(l => add(l.end, [0.2, -0.07, 0]));
        shoulder = add(hip, [0.1, Math.sqrt(0.36 - 0.01), 0]);
      }
      else lying();
      if (config.family === 'press') {
        arms = z.map(side => {
          const start = add(shoulder, [0, 0, side]);
          const lateral = config.equipment === 'barbell' ? 0.1 : 0.02 + 0.22 * w;
          const target: Point = config.variant === 'seated'
            ? add(start, [0.57 - 0.4 * w, -0.12, Math.sign(side) * lateral])
            : add(start, [0.14 * w, 0.57 - 0.42 * w, Math.sign(side) * lateral]);
          return armContact(start, target, Math.sign(side));
        });
      } else {
        // Constant elbow bend: the fly sweeps whole fixed-length arm segments.
        arms = z.map(side => {
          const start = add(shoulder, [0, 0, side]);
          const sign = Math.sign(side);
          const supine = config.variant === 'flat';
          const direction: Point = supine ? [0, Math.sin(a), sign * Math.cos(a)] : [Math.sin(a), 0, sign * Math.cos(a)];
          const fore: Point = supine ? [0, Math.sin(a + rad(20)), sign * Math.cos(a + rad(20))] : [Math.sin(a + rad(20)), 0, sign * Math.cos(a + rad(20))];
          const joint = add(start, scale(direction, 0.32));
          return { start, joint, end: add(joint, scale(fore, 0.3)) };
        });
      }
      break;
    }
    case 'pushup':
    case 'plus': {
      // Rotate the rigid body around planted toes; solve hands, never shorten the trunk or legs.
      const angle = config.family === 'plus' ? 0.39 + 0.02 * w : 0.4 - 0.29 * w;
      const toe: Point = [0.86, 0.06, 0];
      const direction: Point = [-Math.cos(angle), Math.sin(angle), 0];
      hip = add(toe, scale(direction, 0.9));
      shoulder = add(hip, scale(direction, 0.6));
      legs = z.map(side => {
        const end = add(toe, [0, 0, side]);
        const start = add(hip, [0, 0, side]);
        return { start, joint: add(start, scale(direction, -0.46)), end };
      });
      feet = z.map(side => [1.06, 0.02, side]);
      arms = z.map(side => armContact(add(shoulder, [0, 0, side]), [-0.58, 0.05, side], Math.sign(side)));
      if (config.family === 'plus') {
        arms = z.map(side => {
          const hand: Point = [-0.58, 0.05, side];
          const direction = unit(sub(add(shoulder, [0, 0, side]), hand));
          const reach = Math.sqrt(0.32 ** 2 + 0.3 ** 2 + 2 * 0.32 * 0.3 * Math.cos(rad(5)));
          return armContact(add(hand, scale(direction, reach)), hand, Math.sign(side));
        });
      }
      break;
    }
    case 'dip': {
      shoulder = [0.1, 1.66 - 0.36 * w, 0];
      hip = add(shoulder, [-Math.sin(rad(config.lean)) * 0.6, -Math.cos(rad(config.lean)) * 0.6, 0]);
      arms = z.map(side => armContact(add(shoulder, [0, 0, side]), [0.1, 1.05, side], Math.sign(side)));
      legs = z.map(side => {
        const start = add(hip, [0, 0, side]);
        const joint = add(start, [0, -0.46, 0]);
        return { start, joint, end: add(joint, [-Math.sqrt(0.44 ** 2 - 0.13 ** 2), 0.13, 0]) };
      });
      feet = legs.map(l => add(l.end, [-0.2, 0, 0]));
      z.forEach(side => { prop('bar', [-0.25, 1.05, side], [0.5, 1.05, side], 0.035); pad([-0.25, 0, side], [-0.25, 1.05, side], 0.08); });
      break;
    }
    case 'punch': {
      hip = [-0.08, 0.92, 0];
      shoulder = add(hip, [0.1, Math.sqrt(0.36 - 0.01), 0]);
      legs = z.map((side, i) => legContact(add(hip, [0, 0, side]), [i ? 0.15 : -0.15, 0.09, side]));
      feet = legs.map(l => add(l.end, [0.2, -0.07, 0]));
      relaxedArms();
      const start = add(shoulder, [0.025 * w, 0, z[1]]);
      arms[1] = armContact(start, add(start, [0.15 + 0.44 * w, -0.05, 0]), 1);
      break;
    }
    case 'squat': {
      hip = [-0.08 - 0.2 * w, 0.96 - 0.42 * w, 0];
      const tilt = rad(config.lean) * w;
      shoulder = add(hip, [0.6 * Math.sin(tilt), 0.6 * Math.cos(tilt), 0]);
      standingLegs();
      if (config.variant === 'hack') {
        hip = [-0.22 + 0.18 * w, 0.94 - 0.4 * w, 0];
        shoulder = add(hip, [-0.6 * Math.sin(rad(30)), 0.6 * Math.cos(rad(30)), 0]);
        standingLegs();
        pad(add(hip, [-0.08, -0.15, 0]), add(shoulder, [-0.08, 0.1, 0]));
        pad([-0.38, 0.25, -0.4], [-0.92, 1.85, -0.4], 0.06);
        pad([-0.1, 0.01, 0], [0.35, 0.01, 0], 0.7);
      }
      if (config.variant === 'box') pad([-0.48, 0.45, 0], [-0.05, 0.45, 0], 0.65);
      const load = add(shoulder, [config.variant === 'front' ? 0.12 : config.variant === 'goblet' ? 0.2 : -0.04, config.variant === 'goblet' ? -0.2 : 0, 0]);
      arms = z.map(side => {
        const start = add(shoulder, [0, 0, side]);
        const end = add(load, [0, 0, config.variant === 'goblet' ? 0 : side]);
        return config.variant === 'front' ? chain(start, end, 0.32, 0.3, [1, 0.1, Math.sign(side)]) : armContact(start, end, Math.sign(side));
      });
      if (config.equipment === 'barbell') bar(load);
      break;
    }
    case 'lunge': {
      const walking = config.variant === 'walking';
      const t = progress * config.tempo.reduce((sum, n) => sum + n, 0);
      const total = config.tempo.reduce((sum, n) => sum + n, 0);
      // A finite advancing step and an explicit loop reset, rather than a stationary squat.
      const plant = walking ? Math.min(t / 0.8, 1) : 1;
      const gather = walking ? Math.max(0, Math.min((t - total + 0.8) / 0.8, 1)) : 0;
      const frontX = walking ? -0.4 + 0.8 * plant : 0.4;
      const rearX = -0.4 + 0.8 * gather;
      hip = [walking ? -0.35 + 0.4 * plant + 0.35 * gather : 0, 0.85 - 0.25 * w, 0];
      shoulder = add(hip, [0.6 * Math.sin(rad(config.lean)), 0.6 * Math.cos(rad(config.lean)), 0]);
      const front: Point = [frontX, 0.09 + (walking && plant < 1 ? 0.13 * Math.sin(plant * Math.PI) : 0), z[1]];
      const rear: Point = [rearX, walking ? 0.09 + 0.13 * Math.sin(gather * Math.PI) : 0.39, z[0]];
      legs = [legContact(add(hip, [0, 0, z[0]]), rear), legContact(add(hip, [0, 0, z[1]]), front)];
      feet = legs.map(l => add(l.end, [0.19, -0.07, 0]));
      if (!walking) pad([-0.58, 0.32, z[0]], [-0.23, 0.32, z[0]], 0.4);
      relaxedArms();
      break;
    }
    case 'leg-press': {
      lying();
      legs = z.map(side => {
        const start = add(hip, [0, 0, side]);
        const end = add(start, [0.59 - 0.25 * w, 0.59 - 0.25 * w, 0]);
        return chain(start, end, 0.46, 0.44, [-1, 1, 0]);
      });
      feet = legs.map(l => add(l.end, [0.14, -0.14, 0]));
      pad(add(legs[0].end, [-0.13, 0.13, 0.16]), add(legs[0].end, [0.23, -0.23, 0.16]), 0.7);
      pad([0.4, 0.85, -0.45], [1.1, 1.55, -0.45], 0.06);
      relaxedArms();
      break;
    }
    case 'hinge': {
      hip = [-0.1 - 0.22 * w, 0.95 - 0.05 * w, 0];
      shoulder = add(hip, [0.6 * Math.sin(a), 0.6 * Math.cos(a), 0]);
      standingLegs(); relaxedArms();
      if (config.variant === 'dowel') {
        const bottom = add(hip, [-0.08 * Math.cos(a), 0.08 * Math.sin(a), 0]);
        const top = add(bottom, [0.82 * Math.sin(a), 0.82 * Math.cos(a), 0]);
        prop('bar', bottom, top, 0.018);
        arms = z.map((side, i) => armContact(add(shoulder, [0, 0, side]), add(bottom, [Math.sin(a) * (i ? 0.7 : 0.2), Math.cos(a) * (i ? 0.7 : 0.2), 0]), Math.sign(side)));
      }
      break;
    }
    case 'bridge': {
      const bench = config.variant === 'bench';
      shoulder = [-0.5, bench ? 0.52 : 0.15, 0];
      const angle = bench ? -0.65 + 0.65 * w : 0.08 + 0.65 * w;
      hip = add(shoulder, [0.6 * Math.cos(angle), 0.6 * Math.sin(angle), 0]);
      const ankleX = bench ? 0.73 : 0.65;
      legs = z.map(side => legContact(add(hip, [0, 0, side]), [ankleX, 0.09, side]));
      feet = z.map(side => [ankleX + 0.2, 0.02, side]);
      if (bench) {
        const load = add(hip, [-0.04, 0.05, 0]);
        arms = z.map(side => armContact(add(shoulder, [0, 0, side]), add(load, [0, 0, side]), Math.sign(side)));
        pad([-0.85, 0.43, 0], [-0.44, 0.43, 0], 0.55);
        bar(load);
      } else {
        arms = z.map(side => {
          const start = add(shoulder, [0, 0, side]);
          const joint = add(start, [0.32, 0, 0]);
          return { start, joint, end: add(joint, [0.3, 0, 0]) };
        });
      }
      break;
    }
    case 'extension':
    case 'curl': {
      if (config.variant === 'prone') {
        hip = [-0.1, 0.65, 0]; shoulder = [-0.7, 0.65, 0];
        pad([-0.95, 0.56, 0], [0.3, 0.56, 0]);
      } else seated();
      legs = z.map(side => {
        const start = add(hip, [0, 0, side]);
        const joint = add(start, [0.46, 0, 0]);
        const sign = config.variant === 'prone' ? 1 : -1;
        return { start, joint, end: add(joint, [0.44 * Math.cos(a), sign * 0.44 * Math.sin(a), 0]) };
      });
      feet = legs.map(l => add(l.end, [0.18 * Math.sin(a), -0.18 * Math.cos(a), 0]));
      const roller = add(legs[0].end, [0, config.family === 'extension' ? 0.06 : -0.06, 0.16]);
      prop('weight', add(roller, [0, 0, -0.3]), add(roller, [0, 0, 0.3]), 0.09);
      relaxedArms();
      break;
    }
    case 'nordic': {
      const knee: Point = [0, 0.12, 0];
      hip = add(knee, [0.46 * Math.sin(a), 0.46 * Math.cos(a), 0]);
      shoulder = add(hip, [0.6 * Math.sin(a), 0.6 * Math.cos(a), 0]);
      legs = z.map(side => ({ start: add(hip, [0, 0, side]), joint: add(knee, [0, 0, side]), end: [-0.44, 0.12, side] }));
      feet = legs.map(l => add(l.end, [-0.18, -0.07, 0]));
      bar([-0.44, 0.16, 0], 0.8);
      pad([-0.7, 0.03, 0], [0.25, 0.03, 0], 0.65);
      arms = z.map(side => {
        const start = add(shoulder, [0, 0, side]);
        const joint = add(start, [0.27, -Math.sqrt(0.32 ** 2 - 0.27 ** 2), 0]);
        return { start, joint, end: add(joint, [0, -0.3, 0]) };
      });
      break;
    }
    case 'hip-machine': {
      seated();
      legs = z.map(side => {
        const start = add(hip, [0, 0, side]);
        const joint = add(start, [0.46 * Math.cos(a), 0, Math.sign(side) * 0.46 * Math.sin(a)]);
        const end = add(joint, [0, -0.44, 0]);
        pad(add(joint, [0, -0.08, Math.sign(side) * (config.variant === 'abduction' ? 0.06 : -0.06)]), add(joint, [0, 0.12, Math.sign(side) * (config.variant === 'abduction' ? 0.06 : -0.06)]), 0.12);
        return { start, joint, end };
      });
      feet = legs.map(l => add(l.end, [0.2, -0.07, 0]));
      relaxedArms();
      break;
    }
    case 'calf': {
      if (config.variant === 'seated') seated();
      else standingLegs();
      const lift = (config.variant === 'seated' ? 0.06 : 0.1) * w;
      const dx = 0.2 - Math.sqrt(0.2 ** 2 + 0.07 ** 2 - (0.07 + lift) ** 2);
      feet = legs.map(l => add(l.end, [0.2, -0.07, 0]));
      if (config.variant === 'seated') {
        legs = legs.map(l => legContact(l.start, add(l.end, [dx, lift, 0])));
      } else {
        hip = add(hip, [dx, lift, 0]); shoulder = add(shoulder, [dx, lift, 0]);
        legs = legs.map(l => ({ start: add(l.start, [dx, lift, 0]), joint: add(l.joint, [dx, lift, 0]), end: add(l.end, [dx, lift, 0]) }));
      }
      pad([feet[0][0] - 0.02, feet[0][1] - 0.04, 0], [feet[0][0] + 0.2, feet[0][1] - 0.04, 0], 0.6);
      if (config.variant === 'seated') bar(add(legs[0].joint, [0, 0.1, 0.16]), 0.7);
      else bar(add(shoulder, [0, 0.04, 0]), 0.8);
      relaxedArms();
      break;
    }
    case 'tibialis': {
      standingLegs();
      const shift = -0.2;
      hip = add(hip, [shift, -0.04, 0]); shoulder = add(hip, [-0.1, Math.sqrt(0.36 - 0.01), 0]);
      legs = z.map(side => legContact(add(hip, [0, 0, side]), [0, 0.09, side]));
      feet = z.map(side => [0.2 * Math.cos(a) + 0.07 * Math.sin(a), 0.09 + 0.2 * Math.sin(a) - 0.07 * Math.cos(a), side]);
      pad([-0.5, 0, 0], [-0.5, 1.85, 0], 0.8);
      relaxedArms();
      break;
    }
  }
  if (!arms.length) relaxedArms();
  head = add(shoulder, scale(unit(sub(shoulder, hip)), 0.2));
  if (config.family === 'bridge') head = add(shoulder, [-0.2, 0, 0]);
  if (config.equipment === 'barbell' && !['squat', 'bridge'].includes(config.family)) {
    const mid = scale(add(arms[0].end, arms[1].end), 0.5);
    bar(mid);
  }
  if (config.equipment === 'dumbbells') {
    arms.forEach(arm => {
      prop('bar', add(arm.end, [0, 0, -0.1]), add(arm.end, [0, 0, 0.1]), 0.018);
      for (const side of [-1, 1]) prop('weight', add(arm.end, [0, 0, side * 0.07]), add(arm.end, [0, 0, side * 0.12]), 0.075);
    });
  }
  if (config.equipment === 'goblet') {
    prop('weight', add(arms[0].end, [0, -0.1, 0]), add(arms[0].end, [0, 0.1, 0]), 0.1);
  }
  if (config.equipment === 'cable') {
    const working = config.family === 'punch' ? [arms[1]] : arms;
    working.forEach((arm, i) => {
      const pulley: Point = config.family === 'fly' ? [-0.3, shoulder[1], i ? 1 : -1] : [-1.1, config.variant === 'pull-through' ? 0.15 : shoulder[1], arm.end[2]];
      prop('cable', pulley, arm.end, 0.008);
      prop('bar', add(arm.end, [0, -0.05, 0]), add(arm.end, [0, 0.05, 0]), 0.02);
    });
  }
  if (config.equipment === 'machine' && ['press', 'fly'].includes(config.family)) {
    arms.forEach(arm => prop('bar', [0.9, 1.65, arm.end[2]], arm.end, 0.025));
  }
  for (const support of [...props]) {
    if (support.kind === 'pad' && Math.abs(support.start[1] - support.end[1]) < 0.01 && support.start[1] > 0.25) {
      for (const end of [support.start, support.end]) {
        prop('bar', [end[0], 0.03, end[2]], [end[0], end[1] - 0.04, end[2]], 0.035);
      }
    }
  }
  return { hip, shoulder, head, arms, legs, feet, props };
}
