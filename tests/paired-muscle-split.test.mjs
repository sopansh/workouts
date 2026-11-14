import { readFile, readdir } from 'node:fs/promises';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parse } from 'yaml';
import { weeklyVolume } from '../src/lib/plan.ts';

const programs = parse(await readFile(new URL('../src/content/programs.yml', import.meta.url), 'utf8'));
const folder = new URL('../src/content/exercises/', import.meta.url);
const files = (await readdir(folder)).filter(name => name.endsWith('.yml'));
const exercises = (await Promise.all(files.map(async name => parse(await readFile(new URL(name, folder), 'utf8'))))).flat();
const exMap = new Map(exercises.map(exercise => [exercise.id, exercise]));
const program = programs.find(p => p.id === 'paired-muscle-split');

test('the paired split covers the major muscle groups with working sets', () => {
  assert.ok(program);
  const days = new Map(program.days.map(day => [day.id, day]));
  const scheduled = program.week.flatMap((entry, dayIndex) => entry.dayId ? [{ dayIndex, day: days.get(entry.dayId) }] : []);
  const volume = weeklyVolume(scheduled, exMap);
  for (const muscle of ['latissimus-dorsi', 'biceps-brachii', 'pectoralis-major', 'triceps-brachii', 'deltoid',
    'quadriceps', 'hamstrings', 'gluteus-maximus', 'gluteus-medius-minimus', 'adductors', 'erector-spinae',
    'gastrocnemius', 'soleus', 'tibialis-anterior', 'rotator-cuff', 'forearm-extensors', 'rectus-abdominis', 'obliques']) {
    assert.ok(volume.get(muscle)?.direct > 0, `${muscle} needs direct working sets`);
  }
  for (const muscle of ['quadriceps', 'hamstrings', 'gluteus-maximus']) {
    assert.equal(volume.get(muscle).sessions.length, 2, `${muscle} should have two direct leg sessions`);
  }
});
