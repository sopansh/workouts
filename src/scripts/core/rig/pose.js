/**
 * Pure pose maths: no DOM and no three.js, so it can be reasoned about (and tested) alone.
 *
 * A "resolved pose" is a flat Float64Array of [x, y, z] triplets in JOINTS order.
 * Authored joints may be [x, y] or [x, y, z], with z in the same authoring units.
 */

/** Authoring units -> world units, and the authoring point that maps to world (0, 0). */
export const SCALE = 0.012;
export const ORIGIN = { x: 150, y: 150 };

export const JOINTS = [
  'head', 'shoulder', 'elbow', 'wrist', 'hip', 'knee', 'ankle', 'toe',
  'farElbow', 'farWrist', 'farKnee', 'farAnkle', 'farToe',
];

/** Joint name -> index into a resolved pose (x at 3 * i, y at 3 * i + 1, z at 3 * i + 2). */
export const J = Object.fromEntries(JOINTS.map((name, i) => [name, i]));

const FAR_FALLBACK = {
  farElbow: 'elbow', farWrist: 'wrist', farKnee: 'knee', farAnkle: 'ankle', farToe: 'toe',
};

export function resolvePose(pose) {
  const out = new Float64Array(JOINTS.length * 3);
  JOINTS.forEach((name, i) => {
    const point = pose[name] ?? pose[FAR_FALLBACK[name]];
    if (!point) throw new Error(`Pose is missing joint "${name}"`);
    out[3 * i] = point[0];
    out[3 * i + 1] = point[1];
    out[3 * i + 2] = point[2] ?? 0;
  });
  return out;
}

/** Convert one authored joint (x, y, optional z) into world space. */
export function setJointWorld(out, pose, jointIndex, baseZ = 0) {
  const i = 3 * jointIndex;
  return out.set(
    (pose[i] - ORIGIN.x) * SCALE,
    (ORIGIN.y - pose[i + 1]) * SCALE,
    pose[i + 2] * SCALE + baseZ,
  );
}

export function blendPoses(from, to, weight, out) {
  for (let i = 0; i < out.length; i++) out[i] = from[i] + (to[i] - from[i]) * weight;
  return out;
}

export const ease = x => (1 - Math.cos(Math.PI * x)) / 2;

/**
 * Where we are between start (0) and end (1) pose for loop position `u` in [0, 1):
 * ease in for 40%, hold the peak for 25%, ease back out for 35%.
 */
export function cycleWeight(u) {
  if (u < 0.4) return ease(u / 0.4);
  if (u < 0.65) return 1;
  return 1 - ease((u - 0.65) / 0.35);
}

export function poseBounds(poses) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const pose of poses) {
    for (let i = 0; i < pose.length; i += 3) {
      minX = Math.min(minX, pose[i]);
      maxX = Math.max(maxX, pose[i]);
      minY = Math.min(minY, pose[i + 1]);
      maxY = Math.max(maxY, pose[i + 1]);
    }
  }
  return { minX, maxX, minY, maxY };
}
