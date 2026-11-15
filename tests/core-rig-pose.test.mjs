import assert from 'node:assert/strict';
import test from 'node:test';
import { resolvePose, setJointWorld, blendPoses, poseBounds, J } from '../src/scripts/core/rig/pose.js';

test('resolvePose keeps authored z and defaults missing z to zero', () => {
  const pose = resolvePose({
    head: [10, 20, 0.2],
    shoulder: [11, 21],
    elbow: [12, 22, 0.3],
    wrist: [13, 23],
    hip: [14, 24],
    knee: [15, 25],
    ankle: [16, 26],
    toe: [17, 27],
    farElbow: [18, 28, -0.1],
    farWrist: [19, 29],
    farKnee: [20, 30],
    farAnkle: [21, 31],
    farToe: [22, 32, -0.2],
  });
  assert.equal(pose[3 * J.head + 2], 0.2);
  assert.equal(pose[3 * J.shoulder + 2], 0);
  assert.equal(pose[3 * J.farElbow + 2], -0.1);
  assert.equal(pose[3 * J.farWrist + 2], 0);
});

test('resolvePose uses near-side fallback including depth for missing far joints', () => {
  const pose = resolvePose({
    head: [10, 20],
    shoulder: [11, 21],
    elbow: [12, 22, 0.35],
    wrist: [13, 23, 0.25],
    hip: [14, 24],
    knee: [15, 25, 0.15],
    ankle: [16, 26, 0.1],
    toe: [17, 27, 0.08],
  });
  assert.equal(pose[3 * J.farElbow], 12);
  assert.equal(pose[3 * J.farElbow + 1], 22);
  assert.equal(pose[3 * J.farElbow + 2], 0.35);
  assert.equal(pose[3 * J.farAnkle + 2], 0.1);
});

test('blendPoses interpolates z values', () => {
  const from = new Float64Array([0, 0, 0, 10, 20, 0.2]);
  const to = new Float64Array([6, 8, 0.6, 14, 28, 0.8]);
  const out = new Float64Array(from.length);
  blendPoses(from, to, 0.5, out);
  assert.deepEqual([...out], [3, 4, 0.3, 12, 24, 0.5]);
});

test('setJointWorld scales authored z before adding base depth', () => {
  const pose = new Float64Array([160, 140, 5]);
  const point = { set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; } };
  setJointWorld(point, pose, 0, 0.1);
  assert.ok(Math.abs(point.x - 0.12) < 1e-12);
  assert.ok(Math.abs(point.y - 0.12) < 1e-12);
  assert.ok(Math.abs(point.z - 0.16) < 1e-12);
});

test('poseBounds measures x and y over xyz triplets', () => {
  const bounds = poseBounds([
    new Float64Array([10, 50, 0.3, 20, 40, -0.1]),
    new Float64Array([5, 55, 0, 25, 35, 0.6]),
  ]);
  assert.deepEqual(bounds, { minX: 5, maxX: 25, minY: 35, maxY: 55 });
});
