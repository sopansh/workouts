import assert from 'node:assert/strict';
import test from 'node:test';
import { movementCycle, prototypePose, solveTwoBone } from '../src/scripts/core/prototype-math.js';

const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const close = (actual, expected, tolerance = 1e-8) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} should equal ${expected}`);

test('bench press keeps limb lengths, feet, back and hands on their props throughout the cycle', () => {
  let firstFeet;
  let firstBack;
  for (let frame = 0; frame <= 100; frame++) {
    const pose = prototypePose('bench', frame / 100);
    firstFeet ??= pose.feet;
    firstBack ??= pose.back;
    for (let side = 0; side < 2; side++) {
      close(distance(pose.arms[side].start, pose.arms[side].joint), 0.34);
      close(distance(pose.arms[side].joint, pose.arms[side].end), 0.3);
      close(distance(pose.legs[side].start, pose.legs[side].joint), 0.47);
      close(distance(pose.legs[side].joint, pose.legs[side].end), 0.44);
      close(distance(pose.legs[side].end, pose.feet[side]), Math.hypot(0.21, 0.095));
      close(pose.arms[side].end[0], pose.bar[0]);
      close(pose.arms[side].end[1], pose.bar[1]);
      close(pose.legs[side].end[0], pose.legs[side].start[0] + 0.54);
    }
    for (let side = 0; side < 2; side++) {
      assert.deepEqual(pose.feet[side], firstFeet[side]);
      assert.deepEqual(pose.back[side], firstBack[side]);
      close(pose.back[side][1] - 0.08, pose.benchTop);
      close(pose.feet[side][1] - 0.055, -0.04);
    }
  }
});

test('back squat keeps limb lengths, planted feet and hand-to-bar contact throughout the cycle', () => {
  let firstFeet;
  for (let frame = 0; frame <= 100; frame++) {
    const pose = prototypePose('squat', frame / 100);
    firstFeet ??= pose.feet;
    for (let side = 0; side < 2; side++) {
      close(distance(pose.arms[side].start, pose.arms[side].joint), 0.32);
      close(distance(pose.arms[side].joint, pose.arms[side].end), 0.3);
      close(distance(pose.legs[side].start, pose.legs[side].joint), 0.48);
      close(distance(pose.legs[side].joint, pose.legs[side].end), 0.44);
      close(distance(pose.legs[side].end, pose.feet[side]), Math.hypot(0.21, 0.095));
      close(pose.arms[side].end[0], pose.bar[0]);
      close(pose.arms[side].end[1], pose.bar[1]);
      assert.deepEqual(pose.feet[side], firstFeet[side]);
      close(pose.feet[side][1] - 0.055, -0.04);
    }
    close(pose.bar[0], pose.shoulder[0]);
    close(pose.bar[1], pose.shoulder[1] + 0.07);
    close(distance(pose.hip, pose.shoulder), Math.hypot(0.1, 0.43));
  }
});

test('bench and squat top endpoints are nearly extended while bottom endpoints are shorter', () => {
  const benchTop = prototypePose('bench', 0);
  const benchBottom = prototypePose('bench', 0.5);
  const squatTop = prototypePose('squat', 0);
  const squatBottom = prototypePose('squat', 0.5);
  for (let side = 0; side < 2; side++) {
    assert.ok(distance(benchTop.arms[side].start, benchTop.arms[side].end) >= 0.98 * (0.34 + 0.3));
    assert.ok(distance(benchBottom.arms[side].start, benchBottom.arms[side].end)
      < distance(benchTop.arms[side].start, benchTop.arms[side].end));
    assert.ok(distance(squatTop.legs[side].start, squatTop.legs[side].end) >= 0.98 * (0.48 + 0.44));
    assert.ok(distance(squatBottom.legs[side].start, squatBottom.legs[side].end)
      < distance(squatTop.legs[side].start, squatTop.legs[side].end));
  }
});

test('two-bone solver rejects invalid and unreachable geometry', () => {
  assert.throws(() => solveTwoBone([0, 0], [1, 0], 0, 0.5), /positive/);
  assert.throws(() => solveTwoBone([0, 0], [Number.NaN, 0], 1, 1), /finite/);
  assert.throws(() => solveTwoBone([0, 0], [3, 0], 1, 1), /reachable/);
  assert.throws(() => solveTwoBone([0, 0], [1, 0], 1, 1, 0), /bend/);
  assert.throws(() => prototypePose('deadlift', 0), /Unknown prototype movement/);
  assert.throws(() => prototypePose('toString', 0), /Unknown prototype movement/);
  assert.throws(() => movementCycle('constructor'), /Unknown prototype movement/);
  assert.throws(() => prototypePose('bench', Number.POSITIVE_INFINITY), /finite value/);
  assert.throws(() => prototypePose('squat', 1.1), /finite value/);
});
