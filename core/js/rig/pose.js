/**
 * Pure pose maths: no DOM and no three.js, so it can be reasoned about (and tested) alone.
 *
 * A "resolved pose" is a flat Float64Array of [x, y] pairs in JOINTS order.
 */

/** Authoring units -> world units, and the authoring point that maps to world (0, 0). */
export const SCALE = 0.012;
export const ORIGIN = { x: 150, y: 150 };

export const JOINTS = [
  'head', 'shoulder', 'elbow', 'wrist', 'hip', 'knee', 'ankle', 'toe',
  'farElbow', 'farWrist', 'farKnee', 'farAnkle', 'farToe',
];

/** Joint name -> index into a resolved pose (x at 2 * i, y at 2 * i + 1). */
export const J = Object.fromEntries(JOINTS.map((name, i) => [name, i]));

const FAR_FALLBACK = {
  farElbow: 'elbow', farWrist: 'wrist', farKnee: 'knee', farAnkle: 'ankle', farToe: 'toe',
};

export function resolvePose(pose) {
  const out = new Float64Array(JOINTS.length * 2);
  JOINTS.forEach((name, i) => {
    const point = pose[name] ?? pose[FAR_FALLBACK[name]];
    if (!point) throw new Error(`Pose is missing joint "${name}"`);
    out[2 * i] = point[0];
    out[2 * i + 1] = point[1];
  });
  return out;
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
    for (let i = 0; i < pose.length; i += 2) {
      minX = Math.min(minX, pose[i]);
      maxX = Math.max(maxX, pose[i]);
      minY = Math.min(minY, pose[i + 1]);
      maxY = Math.max(maxY, pose[i + 1]);
    }
  }
  return { minX, maxX, minY, maxY };
}
