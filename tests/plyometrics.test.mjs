import { test } from 'node:test';
import assert from 'node:assert/strict';
import { exercises, exerciseById } from '../site/plyometrics/js/data/exercises.js';
import { warmup, sessions } from '../site/plyometrics/js/data/sessions.js';
import { claims, sources } from '../site/plyometrics/js/data/evidence.js';

test('every exercise carries its safety fields and a dose', () => {
  for (const e of exercises) {
    assert.ok(e.contraindications?.length, `${e.id}: contraindications`);
    assert.ok(e.regression, `${e.id}: regression`);
    assert.ok(e.steps?.length && e.mistakes?.length, `${e.id}: steps and mistakes`);
    assert.ok(e.dose || e.progression?.length, `${e.id}: dose or progression`);
  }
});

test('sessions reference real exercises and every exercise is used', () => {
  const used = new Set([...warmup, ...sessions.flatMap(s => s.exercises)]);
  for (const id of used) assert.ok(exerciseById.has(id), `unknown exercise ${id}`);
  for (const e of exercises) assert.ok(used.has(e.id), `${e.id} is not in any session`);
});

test('progressions share the same week labels and never go down', () => {
  const jumps = exercises.filter(e => e.progression);
  const labels = jumps[0].progression.map(p => p.weeks);
  for (const e of jumps) {
    assert.deepEqual(e.progression.map(p => p.weeks), labels, `${e.id}: week labels`);
    e.progression.reduce((prev, step) => {
      assert.ok(step.sets * step.reps >= prev, `${e.id}: contacts must not fall`);
      return step.sets * step.reps;
    }, 0);
  }
});

test('claims cite known sources, graded claims cite at least one, and DOI sources are checked', () => {
  const ids = new Set(sources.map(s => s.id));
  for (const c of claims) {
    for (const s of c.sources) assert.ok(ids.has(s), `${c.id}: unknown source ${s}`);
    if (c.grade && c.grade !== 'D') assert.ok(c.sources.length > 0, `${c.id}: graded claim needs a source`);
  }
  for (const s of sources) assert.ok(s.url || s.doi, `${s.id}: needs a link`);
  for (const s of sources.filter(x => x.doi)) assert.ok(s.checked, `${s.id}: DOI needs a checked date`);
});
