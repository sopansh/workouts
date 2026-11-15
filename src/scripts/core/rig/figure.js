import { THREE } from '../three.js';
import { SCALE, ORIGIN, J, resolvePose, setJointWorld, blendPoses, cycleWeight, poseBounds } from './pose.js';

export const DEFAULT_YAW = 0.4;

const BASE = new THREE.Color(0xd6e0dc);
const FAR_BASE = new THREE.Color(0x9db0aa);
const HOT = new THREE.Color(0xff4a4a);

/** [node, source joint, base depth] — near-side limbs sit in front of far-side ones. */
const NODES = [
  ['head', 'head', 0],
  ['shoulderN', 'shoulder', 0.13], ['shoulderF', 'shoulder', -0.13],
  ['elbowN', 'elbow', 0.15], ['wristN', 'wrist', 0.15],
  ['hipN', 'hip', 0.09], ['hipF', 'hip', -0.09],
  ['kneeN', 'knee', 0.1], ['ankleN', 'ankle', 0.1], ['toeN', 'toe', 0.1],
  ['elbowF', 'farElbow', -0.15], ['wristF', 'farWrist', -0.15],
  ['kneeF', 'farKnee', -0.1], ['ankleF', 'farAnkle', -0.1], ['toeF', 'farToe', -0.1],
];

const SPINE = Array.from({ length: 6 }, (_, i) => `spine${i}`);

/** [from, to, radius at `from`, material, taper toward `to`] */
const BONES = [
  ['shoulderN', 'elbowN', 0.055, 'armN', 0.85], ['elbowN', 'wristN', 0.045, 'armN', 0.85],
  ['shoulderF', 'elbowF', 0.055, 'armF', 0.85], ['elbowF', 'wristF', 0.045, 'armF', 0.85],
  ['hipN', 'kneeN', 0.085, 'thighN', 0.85], ['kneeN', 'ankleN', 0.06, 'calfN', 0.8],
  ['ankleN', 'toeN', 0.04, 'calfN', 1],
  ['hipF', 'kneeF', 0.085, 'thighF', 0.85], ['kneeF', 'ankleF', 0.06, 'calfF', 0.8],
  ['ankleF', 'toeF', 0.04, 'calfF', 1],
  ['shoulderF', 'shoulderN', 0.05, 'armN', 1], ['hipF', 'hipN', 0.07, 'hips', 1],
  ['spine0', 'head', 0.045, 'torso', 1],
  ['spine0', 'spine1', 0.115, 'torso', 1], ['spine1', 'spine2', 0.115, 'torso', 1],
  ['spine2', 'spine3', 0.105, 'torso', 1], ['spine3', 'spine4', 0.105, 'torso', 1],
  ['spine4', 'spine5', 0.11, 'torso', 1],
];

/** [node, radius, material] */
const BALLS = [
  ['elbowN', 0.055, 'armN'], ['elbowF', 0.055, 'armF'],
  ['wristN', 0.045, 'armN'], ['wristF', 0.045, 'armF'],
  ['shoulderN', 0.07, 'armN'], ['shoulderF', 0.07, 'armF'],
  ['kneeN', 0.07, 'thighN'], ['kneeF', 0.07, 'thighF'],
  ['ankleN', 0.055, 'calfN'], ['ankleF', 0.055, 'calfF'],
  ['toeN', 0.042, 'calfN'], ['toeF', 0.042, 'calfF'],
  ['hipN', 0.1, 'hips'], ['hipF', 0.1, 'hips'],
  ['head', 0.115, 'torso'],
  ['spine0', 0.12, 'torso'], ['spine1', 0.115, 'torso'], ['spine2', 0.105, 'torso'],
  ['spine3', 0.105, 'torso'], ['spine4', 0.105, 'torso'], ['spine5', 0.11, 'torso'],
];

const SPHERE = new THREE.SphereGeometry(1, 24, 18);
const cylinders = new Map();
function cylinder(taper) {
  if (!cylinders.has(taper)) cylinders.set(taper, new THREE.CylinderGeometry(taper, 1, 1, 18));
  return cylinders.get(taper);
}

const surface = (color, roughness = 0.5) => new THREE.MeshStandardMaterial({ color, roughness });
const MATERIAL_SPECS = {
  torso: { base: BASE, regions: ['torso', 'chest', 'lats'] },
  hips: { base: BASE, regions: ['hips'] },
  armN: { base: BASE, regions: ['arms', 'deltoids'] },
  armF: { base: FAR_BASE, regions: ['arms', 'deltoids'] },
  thighN: { base: BASE, regions: ['hips', 'quads', 'hamstrings'] },
  thighF: { base: FAR_BASE, regions: ['hips', 'quads', 'hamstrings'] },
  calfN: { base: BASE, regions: ['calves'] },
  calfF: { base: FAR_BASE, regions: ['calves'] },
};
const UP = new THREE.Vector3(0, 1, 0);
const from = new THREE.Vector3();
const dir = new THREE.Vector3();

/** One animated mannequin: owns its meshes, the pose loop and the auto-framing maths. */
export class Figure {
  constructor(exercise) {
    this.exercise = exercise;
    this.cycle = exercise.cycle;
    this.glow = new Set(exercise.glow);
    this.bend = exercise.spineBend ?? [0, 0];
    this.start = resolvePose(exercise.poses.start);
    this.end = resolvePose(exercise.poses.end);
    this.pose = new Float64Array(this.start.length);

    this.yaw = DEFAULT_YAW;
    this.frozen = false; // hold the peak pose (reduced motion)
    this.dirty = true;

    this.materials = Object.fromEntries(
      Object.entries(MATERIAL_SPECS).map(([name, spec]) => [name, surface(spec.base.clone())]),
    );
    this.nodes = Object.fromEntries([...NODES.map(n => n[0]), ...SPINE].map(name => [name, new THREE.Vector3()]));

    this.root = new THREE.Group(); // rotates around the figure's centre
    this.rig = new THREE.Group(); // shifted so that centre sits on the pivot
    this.root.add(this.rig);
    this.bones = BONES.map(([, , , material, taper]) => this.addMesh(cylinder(taper), material));
    this.balls = BALLS.map(([, radius, material]) => {
      const mesh = this.addMesh(SPHERE, material);
      mesh.scale.setScalar(radius);
      return mesh;
    });
    this.kettlebell = exercise.equipment === 'kettlebell' ? this.buildKettlebell() : null;

    this.measure();
    this.update(0);
  }

  addMesh(geometry, material) {
    const mesh = new THREE.Mesh(geometry, this.materials[material]);
    mesh.castShadow = true;
    this.rig.add(mesh);
    return mesh;
  }

  buildKettlebell() {
    const metal = new THREE.MeshStandardMaterial({ color: 0x2f3a37, roughness: 0.35, metalness: 0.35 });
    const bell = new THREE.Mesh(SPHERE, metal);
    bell.scale.setScalar(0.14);
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.018, 10, 24), metal);
    handle.position.y = 0.19;
    const group = new THREE.Group();
    group.add(bell, handle);
    group.traverse(o => { o.castShadow = true; });
    this.rig.add(group);
    return group;
  }

  /** Work out the extents of the whole movement so the camera can frame it. */
  measure() {
    const b = poseBounds([this.start, this.end]);
    this.halfWidth = ((b.maxX - b.minX) / 2) * SCALE;
    this.height = Math.max((ORIGIN.y - b.minY) * SCALE, 0.4);
    this.rig.position.x = -((b.minX + b.maxX) / 2 - ORIGIN.x) * SCALE;
  }

  get floorRadius() {
    return Math.max(this.halfWidth + 0.25, 1.1);
  }

  frameCamera(camera, elevation) {
    const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    // Fit the floor disc, not just the body, so its near edge isn't cropped by the camera tilt.
    const distance = Math.max(
      (this.height + 0.35 + 3 * this.floorRadius * Math.sin(elevation)) / (2 * tan),
      (this.floorRadius * 2 * 1.12) / (2 * tan * camera.aspect),
      2.6,
    );
    const targetY = this.height / 2;
    camera.position.set(0, targetY + distance * Math.sin(elevation), distance * Math.cos(elevation));
    camera.lookAt(0, targetY, 0);
  }

  rotate(delta) {
    this.yaw += delta;
    this.dirty = true;
  }

  resetView() {
    this.yaw = DEFAULT_YAW;
    this.dirty = true;
  }

  update(time) {
    const weight = this.frozen ? 1 : cycleWeight((time / this.cycle) % 1);
    blendPoses(this.start, this.end, weight, this.pose);
    this.placeNodes(weight);
    this.placeBones();
    this.applyGlow(weight, time);
    this.root.rotation.y = this.yaw;
  }

  placeNodes(weight) {
    const q = this.pose;
    for (const [name, joint, z] of NODES) setJointWorld(this.nodes[name], q, J[joint], z);

    // The spine is a quadratic curve from shoulder to hip; cat-cow bends its control point.
    const sx = q[3 * J.shoulder], sy = q[3 * J.shoulder + 1], sz = q[3 * J.shoulder + 2];
    const hx = q[3 * J.hip], hy = q[3 * J.hip + 1], hz = q[3 * J.hip + 2];
    const bend = this.bend[0] + (this.bend[1] - this.bend[0]) * weight;
    const cx = (sx + hx) / 2, cy = (sy + hy) / 2 + bend;
    const cz = (sz + hz) / 2;
    SPINE.forEach((name, i) => {
      const s = i / 5, a = (1 - s) * (1 - s), b = 2 * s * (1 - s), c = s * s;
      this.nodes[name].set(
        (a * sx + b * cx + c * hx - ORIGIN.x) * SCALE,
        (ORIGIN.y - (a * sy + b * cy + c * hy)) * SCALE,
        (a * sz + b * cz + c * hz) * SCALE,
      );
    });
  }

  placeBones() {
    BONES.forEach(([a, b, radius], i) => {
      const mesh = this.bones[i];
      from.copy(this.nodes[a]);
      dir.copy(this.nodes[b]).sub(from);
      const length = dir.length() || 1e-4;
      mesh.position.copy(from).addScaledVector(dir, 0.5);
      mesh.scale.set(radius, length, radius);
      mesh.quaternion.setFromUnitVectors(UP, dir.divideScalar(length));
    });
    BALLS.forEach(([node], i) => this.balls[i].position.copy(this.nodes[node]));
    if (this.kettlebell) {
      this.kettlebell.position.copy(this.nodes.wristN);
      this.kettlebell.position.y -= 0.12;
    }
  }

  /** Worked regions blush red and glow hardest at the peak of each rep. */
  applyGlow(weight, time) {
    const level = Math.min(1, 0.3 + 0.5 * weight + 0.1 * Math.sin(time * 5.5));
    for (const [name, material] of Object.entries(this.materials)) {
      const spec = MATERIAL_SPECS[name];
      const amount = spec.regions.some(region => this.glow.has(region)) ? level : 0;
      material.color.copy(spec.base).lerp(HOT, amount);
      material.emissive.copy(HOT).multiplyScalar(amount * 0.3);
    }
  }
}
