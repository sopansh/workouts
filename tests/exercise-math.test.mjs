import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';
import { chain, cycleWeight, distance, exercisePose, validateAnimation } from '../src/scripts/core/exercise-math.ts';

const animations = (await Promise.all(['chest', 'legs'].map(name => readFile(new URL(`../src/content/animations/${name}.yml`, import.meta.url), 'utf8').then(parse)))).flat();
const byId = id => animations.find(a => a.id === id);
const almost = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-8, `${actual} != ${expected}`);

test('moving chains keep fixed lengths in every authored movement, including depth and frontal arcs', () => {
  for (const config of animations) {
    for (let frame = 0; frame <= 80; frame++) {
      const pose = exercisePose(config, frame / 80);
      for (const arm of pose.arms) { almost(distance(arm.start, arm.joint), 0.32); almost(distance(arm.joint, arm.end), 0.3); }
      for (const [i, leg] of pose.legs.entries()) {
        almost(distance(leg.start, leg.joint), 0.46);
        almost(distance(leg.joint, leg.end), 0.44);
        const start = exercisePose(config, 0);
        almost(distance(leg.end, pose.feet[i]), distance(start.legs[i].end, start.feet[i]));
      }
      almost(distance(pose.hip, pose.shoulder), 0.6);
      for (const arm of pose.arms) assert.ok([arm.start, arm.joint, arm.end].every(point => point[1] >= -0.01), `${config.id}: arms stay above the floor`);
      assert.equal(pose.props.length, exercisePose(config, 0).props.length, `${config.id}: stable prop topology`);
      assert.notDeepEqual(exercisePose(config, 0), exercisePose(config, 0.45), `${config.id}: not a still placeholder`);
    }
  }
});

test('planted floor, raised-foot, hand, shoulder and ankle contacts do not slide', () => {
  for (const id of ['back-squat', 'front-squat', 'goblet-squat', 'box-squat', 'bulgarian-split-squat', 'hip-hinge-dowel']) {
    const start = exercisePose(byId(id), 0);
    for (const progress of [0.2, 0.45, 0.7]) assert.deepEqual(exercisePose(byId(id), progress).legs.map(l => l.end), start.legs.map(l => l.end));
  }
  for (const id of ['push-up', 'push-up-plus', 'chest-dip']) {
    const start = exercisePose(byId(id), 0);
    for (const progress of [0.2, 0.45, 0.7]) assert.deepEqual(exercisePose(byId(id), progress).arms.map(l => l.end), start.arms.map(l => l.end));
  }
  for (const id of ['glute-bridge', 'hip-thrust', 'standing-calf-raise', 'seated-calf-raise']) {
    const start = exercisePose(byId(id), 0);
    for (const progress of [0.2, 0.45, 0.7]) {
      assert.deepEqual(exercisePose(byId(id), progress).feet, start.feet);
      if (id.includes('bridge') || id === 'hip-thrust') assert.deepEqual(exercisePose(byId(id), progress).shoulder, start.shoulder);
      if (id === 'seated-calf-raise') assert.deepEqual(exercisePose(byId(id), progress).hip, start.hip);
    }
  }
});

test('walking step advances and holds the leading foot after landing', () => {
  const config = byId('walking-lunge');
  const start = exercisePose(config, 0);
  const planted = exercisePose(config, 0.3);
  const bottom = exercisePose(config, 0.5);
  const finish = exercisePose(config, 0.98);
  assert.deepEqual(planted.legs[1].end, bottom.legs[1].end);
  assert.ok(finish.hip[0] > start.hip[0] + 0.5);
  assert.ok(finish.legs[0].end[0] > start.legs[0].end[0] + 0.5);
});

test('inclined lying pads have fixed vertical posts meeting both underside endpoints', () => {
  for (const id of ['incline-barbell-press', 'incline-dumbbell-press', 'leg-press']) {
    const config = byId(id);
    const start = exercisePose(config, 0);
    const pad = start.props.find(p => p.kind === 'pad');
    const posts = start.props.filter(p => p.kind === 'bar' && p.start[1] === 0.03);
    assert.equal(posts.length, 2, `${id}: two support posts`);
    const dx = pad.end[0] - pad.start[0];
    const dy = pad.end[1] - pad.start[1];
    const length = Math.hypot(dx, dy);
    posts.forEach((post, i) => {
      const endpoint = i ? pad.end : pad.start;
      almost(post.start[0], post.end[0]);
      almost(post.start[2], post.end[2]);
      almost(post.end[0], endpoint[0] + dy / length * 0.04);
      almost(post.end[1], endpoint[1] - dx / length * 0.04);
      assert.ok(post.end[1] > post.start[1]);
    });
    for (const progress of [0.2, 0.45, 0.7, 1]) {
      const pose = exercisePose(config, progress);
      assert.equal(pose.props.length, start.props.length);
      assert.deepEqual(pose.props.filter(p => p.kind === 'bar' && p.start[1] === 0.03), posts);
    }
  }
});

test('curl, fly, press and hip machine paths remain distinct', () => {
  const curl = exercisePose(byId('seated-leg-curl'), 0.45);
  const prone = exercisePose(byId('lying-leg-curl'), 0.45);
  assert.ok(curl.legs[0].end[1] < curl.legs[0].joint[1]);
  assert.ok(prone.legs[0].end[1] > prone.legs[0].joint[1]);
  const start = exercisePose(byId('dumbbell-fly'), 0);
  const end = exercisePose(byId('dumbbell-fly'), 0.6);
  almost(distance(start.arms[0].start, start.arms[0].end), distance(end.arms[0].start, end.arms[0].end));
  assert.ok(Math.abs(end.arms[0].end[2]) > Math.abs(start.arms[0].end[2]));
});

test('invalid timing, geometry, unknown families and unreachable contacts fail explicitly', () => {
  const valid = byId('back-squat');
  for (const change of [{ family: 'unknown' }, { equipment: 'cable' }, { tempo: [0, 1, 1, 1] }, { tempo: [NaN, 1, 1, 1] }, { range: [0, Infinity] }, { range: [5, 5] }, { incline: 90 }, { yaw: NaN }]) assert.throws(() => validateAnimation({ ...valid, ...change }), RangeError);
  assert.throws(() => validateAnimation({ ...byId('seated-leg-curl'), range: [0, 130] }), /bounds/);
  for (const progress of [-0.1, 1.1, NaN]) assert.throws(() => exercisePose(valid, progress), RangeError);
  assert.throws(() => chain([0, 0, 0], [2, 0, 0], 0.3, 0.3, [0, 1, 0]), /Unreachable/);
  assert.throws(() => chain([0, 0, 0], [0.5, 0, 0], 0.3, 0.3, [1, 0, 0]), /bend plane/);
  assert.equal(cycleWeight(valid, 1), 0);
});
