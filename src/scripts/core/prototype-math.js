const MOVEMENTS = {
  bench: {
    cycle: 3.2,
    shoulder: [-0.36, 0.78],
    hip: [0.28, 0.78],
    ankle: [0.82, 0.11],
    barX: -0.04,
    top: 1.33,
    bottom: 0.93,
    upperArm: 0.34,
    forearm: 0.3,
    thigh: 0.47,
    shin: 0.44,
  },
  squat: {
    cycle: 3.4,
    topHip: [0.02, 1],
    bottomHip: [0.14, 0.59],
    ankle: [0.25, 0.11],
    topShoulderOffset: [0.1, 0.43],
    bottomShoulderOffset: [0.16, 0.41],
    upperArm: 0.32,
    forearm: 0.3,
    thigh: 0.48,
    shin: 0.44,
  },
};

const finitePoint = point => Array.isArray(point)
  && point.length === 2
  && point.every(Number.isFinite);

export function solveTwoBone(start, end, firstLength, secondLength, bend = 1) {
  if (!finitePoint(start) || !finitePoint(end)) {
    throw new TypeError('Two-bone endpoints must be finite [x, y] points.');
  }
  if (!Number.isFinite(firstLength) || !Number.isFinite(secondLength)
    || firstLength <= 0 || secondLength <= 0) {
    throw new RangeError('Two-bone segment lengths must be finite and positive.');
  }
  if (!Number.isFinite(bend) || bend === 0) {
    throw new RangeError('Two-bone bend direction must be finite and non-zero.');
  }

  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const distance = Math.hypot(dx, dy);
  const minimum = Math.abs(firstLength - secondLength);
  const maximum = firstLength + secondLength;
  const tolerance = 1e-9;
  if (distance < tolerance || distance < minimum - tolerance || distance > maximum + tolerance) {
    throw new RangeError('Two-bone endpoints are outside the reachable segment lengths.');
  }

  const along = (firstLength ** 2 - secondLength ** 2 + distance ** 2) / (2 * distance);
  const height = Math.sqrt(Math.max(0, firstLength ** 2 - along ** 2));
  const direction = Math.sign(bend);
  return [
    start[0] + (dx * along - dy * height * direction) / distance,
    start[1] + (dy * along + dx * height * direction) / distance,
  ];
}

function point(x, y, z) {
  return [x, y, z];
}

function limb(start, end, firstLength, secondLength, bend, z) {
  const elbow = solveTwoBone(start, end, firstLength, secondLength, bend);
  return {
    start: point(start[0], start[1], z),
    joint: point(elbow[0], elbow[1], z),
    end: point(end[0], end[1], z),
  };
}

export function prototypePose(movement, progress) {
  if (!Object.hasOwn(MOVEMENTS, movement)) {
    throw new RangeError(`Unknown prototype movement: ${movement}.`);
  }
  const config = MOVEMENTS[movement];
  if (!Number.isFinite(progress) || progress < 0 || progress > 1) {
    throw new RangeError('Prototype progress must be a finite value from 0 to 1.');
  }

  const rep = (1 - Math.cos(progress * Math.PI * 2)) / 2;
  const eased = rep * rep * (3 - 2 * rep);
  const nearZ = 0.14;
  const farZ = -0.14;

  if (movement === 'bench') {
    const barY = config.top + (config.bottom - config.top) * eased;
    const bar = point(config.barX, barY, 0);
    const shoulder = point(...config.shoulder, 0);
    const hip = point(...config.hip, 0);
    const arms = [nearZ, farZ].map(z => limb(
      config.shoulder,
      [config.barX, barY],
      config.upperArm,
      config.forearm,
      -1,
      z,
    ));
    const legs = [nearZ, farZ].map(z => limb(
      config.hip,
      config.ankle,
      config.thigh,
      config.shin,
      -1,
      z,
    ));
    return {
      movement,
      bar,
      benchTop: 0.7,
      head: point(-0.63, 0.81, 0),
      shoulder,
      hip,
      arms,
      legs,
      feet: [nearZ, farZ].map(z => point(config.ankle[0] + 0.21, 0.015, z)),
      back: [shoulder, hip],
    };
  }

  const hipX = config.topHip[0] + (config.bottomHip[0] - config.topHip[0]) * eased;
  const hipY = config.topHip[1] + (config.bottomHip[1] - config.topHip[1]) * eased;
  const torsoLength = Math.hypot(...config.topShoulderOffset);
  const topAngle = Math.atan2(config.topShoulderOffset[0], config.topShoulderOffset[1]);
  const bottomAngle = Math.atan2(config.bottomShoulderOffset[0], config.bottomShoulderOffset[1]);
  const angle = topAngle + (bottomAngle - topAngle) * eased;
  const offset = [Math.sin(angle) * torsoLength, Math.cos(angle) * torsoLength];
  const shoulder = point(hipX + offset[0], hipY + offset[1], 0);
  const hip = point(hipX, hipY, 0);
  const bar = point(shoulder[0], shoulder[1] + 0.07, 0);
  const wrist = [bar[0], bar[1]];
  const arms = [nearZ, farZ].map(z => limb(
    [shoulder[0], shoulder[1]],
    wrist,
    config.upperArm,
    config.forearm,
    -1,
    z,
  ));
  const legs = [nearZ, farZ].map(z => limb(
    [hipX, hipY],
    config.ankle,
    config.thigh,
    config.shin,
    1,
    z,
  ));
  return {
    movement,
    bar,
    benchTop: null,
    head: point(shoulder[0] + 0.04, shoulder[1] + 0.18, 0),
    shoulder,
    hip,
    arms,
    legs,
    feet: [nearZ, farZ].map(z => point(config.ankle[0] + 0.21, 0.015, z)),
    back: null,
  };
}

export function movementCycle(movement) {
  if (!Object.hasOwn(MOVEMENTS, movement)) {
    throw new RangeError(`Unknown prototype movement: ${movement}.`);
  }
  return MOVEMENTS[movement].cycle;
}
