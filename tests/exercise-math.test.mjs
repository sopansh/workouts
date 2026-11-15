import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { parse } from 'yaml';
import { chain, cycleWeight, distance, exercisePose, validateAnimation } from '../src/scripts/core/exercise-math.ts';

const animationFiles = (await readdir(new URL('../src/content/animations/', import.meta.url))).filter(name => name.endsWith('.yml')).sort();
const animations = (await Promise.all(animationFiles.map(name => readFile(new URL(`../src/content/animations/${name}`, import.meta.url), 'utf8').then(parse)))).flat();
const byId = id => animations.find(a => a.id === id);
const almost = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-8, `${actual} != ${expected}`);
const peak = config => (config.tempo[0] + config.tempo[1] / 2) / config.tempo.reduce((sum, n) => sum + n, 0);
const midpoint = prop => prop.start.map((n, i) => (n + prop.end[i]) / 2);
const pointSegmentDistance = (point, start, end) => {
  const [x, y] = point;
  const [startX, startY] = start;
  const [endX, endY] = end;
  const delta = [endX - startX, endY - startY];
  const lengthSquared = delta.reduce((sum, n) => sum + n * n, 0);
  const t = Math.max(0, Math.min(1, ((x - startX) * delta[0] + (y - startY) * delta[1]) / lengthSquared));
  return Math.hypot(x - (startX + t * delta[0]), y - (startY + t * delta[1]));
};

test('all authored movements keep fixed chain lengths, stable props and visible motion', () => {
  for (const config of animations) {
    const start = exercisePose(config, 0);
    const armLengths = start.arms.map(arm => [distance(arm.start, arm.joint), distance(arm.joint, arm.end)]);
    const legLengths = start.legs.map(leg => [distance(leg.start, leg.joint), distance(leg.joint, leg.end)]);
    const trunkLength = distance(start.hip, start.shoulder);
    for (let frame = 0; frame <= 80; frame++) {
      const pose = exercisePose(config, frame / 80);
      for (const [i, arm] of pose.arms.entries()) {
        almost(distance(arm.start, arm.joint), armLengths[i][0]);
        almost(distance(arm.joint, arm.end), armLengths[i][1]);
      }
      for (const [i, leg] of pose.legs.entries()) {
        almost(distance(leg.start, leg.joint), legLengths[i][0]);
        almost(distance(leg.joint, leg.end), legLengths[i][1]);
        almost(distance(leg.end, pose.feet[i]), distance(start.legs[i].end, start.feet[i]));
      }
      almost(distance(pose.hip, pose.shoulder), trunkLength);
      for (const arm of pose.arms) assert.ok([arm.start, arm.joint, arm.end].every(point => point[1] >= -0.01), `${config.id}: arms stay above the floor`);
      assert.equal(pose.props.length, exercisePose(config, 0).props.length, `${config.id}: stable prop topology`);
      if (config.motion === 'hold') assert.deepEqual(pose, start, `${config.id}: hold remains still`);
      else assert.notDeepEqual(start, exercisePose(config, 0.45), `${config.id}: moving reference changes pose`);
    }
  }
});

test('all newer equipment families expose drawable props and a moving action', () => {
  for (const id of ['pull-up', 'lat-pulldown', 'straight-arm-pulldown', 'chest-supported-row', 'one-arm-dumbbell-row', 'seated-cable-row', 'barbell-row', 'deadlift', 'back-extension-45', 'bird-dog', 'suitcase-carry', 'shrug', 'dumbbell-lateral-raise', 'cable-lateral-raise', 'reverse-pec-deck', 'face-pull', 'cable-external-rotation', 'overhead-press', 'seated-dumbbell-press', 'barbell-curl', 'overhead-cable-triceps-extension', 'wrist-curl', 'cable-crunch', 'hanging-leg-raise', 'ab-wheel-rollout', 'pallof-press']) {
    const config = byId(id);
    const start = exercisePose(config, 0);
    const middle = exercisePose(config, 0.45);
    assert.notDeepEqual(start, middle, `${id}: movement is not a still placeholder`);
    if (config.equipment === 'none') assert.equal(start.props.length, 0, `${id}: no equipment is expected`);
    else assert.ok(start.props.length > 0, `${id}: key equipment or support is present`);
    assert.ok([...start.props, ...middle.props].every(prop => [prop.start, prop.end].every(point => point.every(Number.isFinite)) && distance(prop.start, prop.end) > 0), `${id}: props have finite, drawable geometry`);
  }
  assert.equal(byId('side-plank').motion, 'hold');
});

test('angle-driven shoulder and back movements use authored degrees once', () => {
  const lateral = byId('dumbbell-lateral-raise');
  const lateralStart = exercisePose(lateral, 0);
  const lateralTop = exercisePose(lateral, peak(lateral));
  assert.ok(lateralTop.arms[0].end[1] - lateralStart.arms[0].end[1] > 0.35);
  assert.ok(Math.abs(lateralTop.arms[0].end[2] - lateralStart.arms[0].end[2]) > 0.4);

  const pulldown = byId('straight-arm-pulldown');
  const pullStart = exercisePose(pulldown, 0);
  const pullTop = exercisePose(pulldown, peak(pulldown));
  assert.ok(pullTop.arms[0].end[1] < pullStart.arms[0].end[1] - 0.9);
  assert.ok(pullTop.arms[0].end[1] < pullTop.hip[1] + 0.15);

  const reverseFly = byId('reverse-pec-deck');
  const flyStart = exercisePose(reverseFly, 0);
  const flyTop = exercisePose(reverseFly, peak(reverseFly));
  assert.ok(Math.abs(flyTop.arms[0].end[2] - flyStart.arms[0].end[2]) > 0.45);

  const externalRotation = byId('cable-external-rotation');
  const rotationStart = exercisePose(externalRotation, 0);
  const rotationTop = exercisePose(externalRotation, peak(externalRotation));
  assert.ok(Math.abs(rotationTop.arms[0].end[2]) - Math.abs(rotationStart.arms[0].end[2]) > 0.25);
  assert.ok(rotationTop.arms[0].end[0] < rotationStart.arms[0].end[0]);
  assert.ok(rotationTop.arms[0].end[2] < rotationTop.arms[0].joint[2]);
  assert.deepEqual(rotationTop.arms[0].joint, rotationStart.arms[0].joint);
});

test('curl, triceps and forearm angles traverse their authored arcs', () => {
  for (const id of ['barbell-curl', 'incline-dumbbell-curl', 'preacher-curl', 'hammer-curl', 'skull-crusher', 'triceps-pushdown', 'overhead-cable-triceps-extension']) {
    const config = byId(id);
    const start = exercisePose(config, 0);
    const top = exercisePose(config, peak(config));
    assert.ok(distance(start.arms[0].end, top.arms[0].end) > 0.3, `${id}: hand travels through its curl or extension arc`);
  }

  for (const [id, sign] of [['wrist-curl', 1], ['reverse-wrist-curl', -1]]) {
    const config = byId(id);
    const start = exercisePose(config, 0);
    const top = exercisePose(config, peak(config));
    const wrist = top.arms[0].end;
    const hand = top.hands[0];
    almost(distance(wrist, hand), 0.12);
    almost(Math.atan2(hand[1] - wrist[1], hand[0] - wrist[0]), sign * config.range[1] * Math.PI / 180);
    assert.ok(distance(start.hands[0], top.hands[0]) > 0.09, `${id}: short hand rotates by the configured range`);
  }
});

test('bird dog and hanging leg raise reach their full prescribed ranges', () => {
  const dog = byId('bird-dog');
  const dogStart = exercisePose(dog, 0);
  const dogTop = exercisePose(dog, peak(dog));
  assert.ok(dogTop.arms[1].end[0] < dogTop.shoulder[0] - 0.65);
  assert.ok(distance(dogStart.arms[1].end, dogTop.arms[1].end) > 0.8);
  assert.ok(dogTop.legs[0].end[0] > dogTop.hip[0] + 0.8);
  assert.ok(distance(dogStart.legs[0].joint, dogTop.legs[0].joint) > 0.5);
  assert.equal(dogTop.arms[1].end[2], 0.16);
  assert.equal(dogTop.legs[0].end[2], -0.16);

  const raise = byId('hanging-leg-raise');
  const raiseStart = exercisePose(raise, 0);
  const raiseTop = exercisePose(raise, peak(raise));
  assert.ok(raiseTop.legs[0].end[0] - raiseStart.legs[0].end[0] > 0.7);
});

test('cable crunch kneels on planted knees while the trunk curls and hands stay by the head', () => {
  const config = byId('cable-crunch');
  const start = exercisePose(config, 0);
  const top = exercisePose(config, peak(config));
  assert.deepEqual(top.hip, start.hip);
  assert.ok(distance(top.shoulder, start.shoulder) > 0.35);
  for (const pose of [start, top]) {
    pose.legs.forEach((leg, i) => {
      almost(leg.joint[1], 0.12);
      almost(leg.end[1], 0.12);
      almost(leg.joint[0], pose.hip[0]);
      almost(leg.end[0] - leg.joint[0], 0.44);
      almost(pose.feet[i][1], -0.04);
    });
    for (const arm of pose.arms) assert.ok(distance(arm.end, pose.head) < 0.25);
    assert.ok(pose.props.some(prop => prop.kind === 'cable' && distance(prop.end, pose.arms[0].end) < 1e-8));
  }
  assert.deepEqual(top.legs.map(leg => [leg.joint, leg.end]), start.legs.map(leg => [leg.joint, leg.end]));
});

test('bird dog reaches the opposite arm and leg from floor-planted start contacts', () => {
  const config = byId('bird-dog');
  const start = exercisePose(config, 0);
  const reach = exercisePose(config, peak(config));
  almost(start.legs[0].joint[1], 0.06);
  almost(start.legs[1].joint[1], 0.06);
  almost(start.arms[1].end[1], 0);
  assert.deepEqual(reach.arms[0].end, start.arms[0].end);
  assert.deepEqual(reach.legs[1].joint, start.legs[1].joint);
  assert.deepEqual(reach.legs[1].end, start.legs[1].end);
  assert.notDeepEqual(reach.arms[1].end, start.arms[1].end);
  assert.notDeepEqual(reach.legs[0].joint, start.legs[0].joint);
  assert.equal(reach.arms[1].end[2], 0.16);
  assert.equal(reach.legs[0].end[2], -0.16);
});

test('rollout keeps knees planted and the wheel rolling at ground-contact height', () => {
  const config = byId('ab-wheel-rollout');
  const start = exercisePose(config, 0);
  const extended = exercisePose(config, peak(config));
  const wheelAt = pose => midpoint(pose.props.find(prop => prop.kind === 'weight'));
  const startWheel = wheelAt(start);
  const extendedWheel = wheelAt(extended);
  for (const pose of [start, extended]) {
    pose.legs.forEach((leg, i) => {
      almost(leg.joint[0], 0.15);
      almost(leg.joint[1], 0.12);
      almost(leg.end[0], 0.59);
      almost(leg.end[1], 0.12);
      almost(pose.feet[i][1], -0.04);
    });
    almost(distance(pose.hip, pose.shoulder), 0.6);
  }
  almost(startWheel[1], 0.09);
  almost(extendedWheel[1], 0.09);
  almost(startWheel[1] - 0.13, -0.04);
  assert.ok(extendedWheel[0] < startWheel[0]);
  for (const pose of [start, extended]) {
    pose.arms.forEach((arm, i) => {
      almost(arm.end[0], midpoint(pose.props.find(prop => prop.kind === 'weight'))[0]);
      almost(arm.end[1], 0.09);
      almost(arm.end[2], i === 0 ? -0.16 : 0.16);
    });
  }
});

test('side plank is a fixed side-on hold with elbow, forearm and mat contact', () => {
  const config = byId('side-plank');
  const pose = exercisePose(config, 0);
  for (const progress of [0.2, 0.45, 0.7, 1]) assert.deepEqual(exercisePose(config, progress), pose);
  almost(pose.shoulder[1], pose.hip[1]);
  almost(pose.hip[1], pose.legs[0].end[1]);
  assert.ok(pose.shoulder[0] < pose.hip[0] && pose.hip[0] < pose.legs[0].end[0]);
  const mat = pose.props.find(prop => prop.kind === 'pad');
  almost(pose.arms[0].joint[1] - 0.055, -0.04);
  almost(pose.arms[0].joint[1], pose.arms[0].end[1]);
  assert.ok(pose.arms[0].end[0] > pose.arms[0].joint[0]);
  assert.ok(Math.abs(pose.arms[0].joint[1] - mat.end[1]) < 0.05);
  assert.ok([...pose.arms.flatMap(arm => [arm.start, arm.joint, arm.end]), ...pose.legs.flatMap(leg => [leg.start, leg.joint, leg.end])].every(point => point[2] === 0));
  assert.ok(Math.abs(pose.legs[0].start[1] - pose.legs[1].start[1]) > 0);
});

test('wrist curls pivot short hands at fixed supported wrists and reverse direction', () => {
  const flex = byId('wrist-curl');
  const extension = byId('reverse-wrist-curl');
  const flexStart = exercisePose(flex, 0);
  const flexTop = exercisePose(flex, peak(flex));
  const extensionStart = exercisePose(extension, 0);
  const extensionTop = exercisePose(extension, peak(extension));
  for (const [start, top] of [[flexStart, flexTop], [extensionStart, extensionTop]]) {
    assert.deepEqual(top.arms, start.arms);
    assert.notDeepEqual(top.hands, start.hands);
    const pad = start.props.find(prop => prop.kind === 'pad' && prop.start[1] === 0.92);
    for (const arm of start.arms) {
      almost(arm.joint[1] - pad.start[1], 0.05);
      almost(arm.end[1] - pad.start[1], 0.05);
      assert.ok(arm.joint[0] >= pad.start[0] && arm.end[0] <= pad.end[0]);
    }
    for (const hand of top.hands) {
      assert.ok(top.props.filter(prop => prop.kind === 'weight').some(prop => Math.abs(prop.start[0] - hand[0]) < 1e-8 && Math.abs(prop.start[1] - hand[1]) < 1e-8));
    }
    assert.deepEqual(top.props.filter(prop => prop.kind === 'pad'), start.props.filter(prop => prop.kind === 'pad'));
  }
  assert.ok(flexTop.hands[0][1] > flexTop.arms[0].end[1]);
  assert.ok(extensionTop.hands[0][1] < extensionTop.arms[0].end[1]);
});

test('shrugs elevate shoulder anchors and carried weights without moving the trunk or head', () => {
  const config = byId('shrug');
  const start = exercisePose(config, 0);
  const top = exercisePose(config, peak(config));
  assert.deepEqual(top.hip, start.hip);
  assert.deepEqual(top.shoulder, start.shoulder);
  assert.deepEqual(top.head, start.head);
  assert.deepEqual(top.feet, start.feet);
  assert.ok(top.arms.every((arm, i) => arm.start[1] > start.arms[i].start[1]));
  assert.ok(top.arms.every((arm, i) => arm.end[1] > start.arms[i].end[1]));
});

test('face pull spreads the elbows and brings hands to face level', () => {
  const config = byId('face-pull');
  const start = exercisePose(config, 0);
  const top = exercisePose(config, peak(config));
  for (const [i, arm] of top.arms.entries()) {
    assert.ok(Math.abs(arm.joint[2]) > Math.abs(start.arms[i].joint[2]));
    assert.ok(Math.abs(arm.end[2]) > Math.abs(start.arms[i].end[2]));
    assert.ok(Math.abs(arm.end[1] - top.head[1]) < 0.25);
  }
});

test('one-arm row hinges and keeps the same-side hand and knee on a fixed bench', () => {
  const config = byId('one-arm-dumbbell-row');
  const start = exercisePose(config, 0);
  const top = exercisePose(config, peak(config));
  const pad = start.props.find(prop => prop.kind === 'pad');
  assert.ok(Math.abs(start.shoulder[0] - start.hip[0]) > Math.abs(start.shoulder[1] - start.hip[1]));
  assert.deepEqual(top.props.find(prop => prop.kind === 'pad'), pad);
  assert.deepEqual(top.arms[0].end, start.arms[0].end);
  assert.deepEqual(top.legs[0].joint, start.legs[0].joint);
  assert.equal(start.arms[0].end[2], start.legs[0].joint[2]);
  almost(start.arms[0].end[1], pad.start[1]);
  almost(start.legs[0].joint[1], pad.start[1]);
  almost(pad.start[1], pad.end[1]);
  assert.ok(start.arms[0].end[0] >= pad.start[0] && start.arms[0].end[0] <= pad.end[0]);
  assert.ok(start.legs[0].joint[0] >= pad.start[0] && start.legs[0].joint[0] <= pad.end[0]);
  assert.notDeepEqual(top.arms[1].end, start.arms[1].end);
  assert.ok(start.arms[0].end[0] > start.shoulder[0]);
  assert.ok(top.arms[1].end[0] < start.arms[1].end[0]);
  assert.equal(pad.start[2], pad.end[2]);
  assert.equal(pad.start[2], start.arms[0].end[2]);
  assert.deepEqual(top.legs[1].end, start.legs[1].end);
  almost(start.feet[1][1], -0.04);
});

test('back extension keeps its hip support fixed and returns to a neutral leg-aligned top', () => {
  const config = byId('back-extension-45');
  const top = exercisePose(config, 0);
  const lowered = exercisePose(config, peak(config));
  const supports = pose => pose.props.filter(prop => prop.kind === 'pad' || prop.kind === 'bar');
  assert.deepEqual(supports(lowered), supports(top));
  const trunk = top.shoulder.map((n, i) => n - top.hip[i]);
  const leg = top.hip.map((n, i) => n - (top.legs[0].end[i] + top.legs[1].end[i]) / 2);
  const cosine = trunk.slice(0, 2).reduce((sum, n, i) => sum + n * leg[i], 0) / (Math.hypot(...trunk.slice(0, 2)) * Math.hypot(...leg.slice(0, 2)));
  assert.ok(cosine > 0.99);
  assert.ok(lowered.shoulder[1] < top.shoulder[1]);
});

test('incline curl has planted feet and a fixed supported bench', () => {
  const config = byId('incline-dumbbell-curl');
  const start = exercisePose(config, 0);
  const top = exercisePose(config, peak(config));
  for (const pose of [start, top]) {
    for (const foot of pose.feet) almost(foot[1], -0.04);
    assert.ok(pose.props.filter(prop => prop.kind === 'pad').length >= 2);
    assert.ok(pose.props.filter(prop => prop.kind === 'bar' && prop.start[1] === 0.03).length >= 4);
  }
  assert.deepEqual(start.feet, top.feet);
  assert.deepEqual(start.props.filter(prop => prop.kind === 'pad'), top.props.filter(prop => prop.kind === 'pad'));
});

test('lat pulldown reaches upper chest and overhead press clears the head', () => {
  const lat = byId('lat-pulldown');
  const latTop = exercisePose(lat, peak(lat));
  const latBar = latTop.props.find(prop => prop.kind === 'bar' && prop.width === 0.025);
  assert.ok(latTop.arms.every(arm => arm.end[1] < latTop.shoulder[1] - 0.1));
  assert.ok(latTop.arms.every(arm => arm.end[0] > latTop.shoulder[0]));
  almost(midpoint(latBar)[1], latTop.arms[0].end[1]);

  const press = byId('overhead-press');
  const pressStart = exercisePose(press, 0);
  const pressTop = exercisePose(press, peak(press));
  const barAt = pose => midpoint(pose.props.find(prop => prop.kind === 'bar'));
  const startBar = barAt(pressStart);
  const topBar = barAt(pressTop);
  assert.ok(startBar[0] > pressStart.shoulder[0] + 0.15);
  almost(startBar[1], pressStart.shoulder[1]);
  assert.ok(topBar[0] < startBar[0]);
  assert.ok(topBar[1] > pressTop.head[1]);
});

test('preacher curl keeps upper arms on a fixed pad and moves a loaded handle', () => {
  const config = byId('preacher-curl');
  const start = exercisePose(config, 0);
  const top = exercisePose(config, peak(config));
  const supportStart = start.shoulder.map((n, i) => n + [-0.12, 0.11, 0][i]);
  const supportEnd = start.shoulder.map((n, i) => n + [0.24, -0.51, 0][i]);
  for (const pose of [start, top]) {
    for (const arm of pose.arms) {
      assert.ok(pointSegmentDistance(arm.start, supportStart, supportEnd) < 0.1);
      assert.ok(pointSegmentDistance(arm.joint, supportStart, supportEnd) < 0.1);
      for (const point of [arm.start, arm.joint]) {
        const fraction = (point[0] - supportStart[0]) / (supportEnd[0] - supportStart[0]);
        const supportY = supportStart[1] + fraction * (supportEnd[1] - supportStart[1]);
        assert.ok(supportY < point[1], 'pad is beneath, not through, the upper arm');
      }
    }
  }
  assert.deepEqual(start.arms.map(arm => [arm.start, arm.joint]), top.arms.map(arm => [arm.start, arm.joint]));
  const handle = top.props.find(prop => prop.kind === 'bar' && Math.abs(prop.end[2] - prop.start[2]) > 0.6);
  const handleCenter = midpoint(handle);
  almost(handleCenter[0], (top.arms[0].end[0] + top.arms[1].end[0]) / 2);
  almost(handleCenter[1], (top.arms[0].end[1] + top.arms[1].end[1]) / 2);
  assert.ok(top.props.some(prop => prop.kind === 'cable'));
  assert.ok(top.props.some(prop => prop.kind === 'pad' && prop.start[0] > 0.4));
});

test('seated row pulls from a forward reach and chest-row support stays beneath the trunk', () => {
  const row = byId('seated-cable-row');
  const start = exercisePose(row, 0);
  const pulled = exercisePose(row, peak(row));
  for (const [i, arm] of pulled.arms.entries()) {
    assert.ok(start.arms[i].end[0] > start.shoulder[0] + 0.5);
    assert.ok(arm.end[0] > pulled.shoulder[0]);
    assert.ok(arm.end[0] < start.arms[i].end[0] - 0.4);
  }
  assert.deepEqual(pulled.hip, start.hip);
  assert.deepEqual(pulled.feet, start.feet);
  assert.ok(start.props.filter(prop => prop.kind === 'cable').every(prop => prop.start[0] > prop.end[0]));
  const supported = byId('chest-supported-row');
  const pose = exercisePose(supported, 0);
  const pad = pose.props.find(prop => prop.kind === 'pad');
  assert.ok(pad.start[1] < pose.shoulder[1]);
  assert.ok(pad.end[1] < pose.hip[1]);
  assert.deepEqual(exercisePose(supported, peak(supported)).props.filter(prop => prop.kind === 'pad'), [pad]);
  assert.equal(pose.props.filter(prop => prop.kind === 'bar' && prop.start[1] === 0.03).length, 2);
});

test('deadlift arms remain nearly straight through the raised low-start pull', () => {
  const config = byId('deadlift');
  for (const progress of [0, peak(config), 1]) {
    const pose = exercisePose(config, progress);
    for (const arm of pose.arms) assert.ok(distance(arm.start, arm.end) > 0.85, 'hands stay near the full 0.9 illustrative arm length');
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
  for (const change of [{ family: 'unknown' }, { equipment: 'cable' }, { tempo: [0, 1, 1, 1] }, { tempo: [NaN, 1, 1, 1] }, { range: [0, Infinity] }, { range: [5, 5] }, { incline: 90 }, { yaw: NaN }, { motion: 'hold' }]) assert.throws(() => validateAnimation({ ...valid, ...change }), RangeError);
  assert.throws(() => validateAnimation({ ...byId('seated-leg-curl'), range: [0, 130] }), /bounds/);
  assert.throws(() => validateAnimation({ ...byId('side-plank'), motion: 'move' }), /hold semantics/);
  for (const progress of [-0.1, 1.1, NaN]) assert.throws(() => exercisePose(valid, progress), RangeError);
  assert.throws(() => chain([0, 0, 0], [2, 0, 0], 0.3, 0.3, [0, 1, 0]), /Unreachable/);
  assert.throws(() => chain([0, 0, 0], [0.5, 0, 0], 0.3, 0.3, [1, 0, 0]), /bend plane/);
  assert.equal(cycleWeight(valid, 1), 0);
});
