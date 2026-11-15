import { THREE } from './three.js';
import { movementCycle, prototypePose } from './prototype-math.js';

const UP = THREE ? new THREE.Vector3(0, 1, 0) : null;
const from = THREE ? new THREE.Vector3() : null;
const direction = THREE ? new THREE.Vector3() : null;

export class PrototypeFigure {
  constructor(movement) {
    if (!THREE) throw new Error('Three.js is unavailable; the animation preview cannot start.');
    this.movement = movement;
    this.cycle = movementCycle(movement);
    this.floorRadius = movement === 'bench' ? 1.45 : 1.2;
    this.height = movement === 'bench' ? 1.45 : 1.65;
    this.yaw = 0.35;
    this.frozen = false;
    this.dirty = true;
    this.root = new THREE.Group();
    this.rig = new THREE.Group();
    this.root.add(this.rig);
    this.parts = [];
    this.joints = [];
    this.bodyMaterial = new THREE.MeshStandardMaterial({ roughness: 0.5 });
    this.farMaterial = new THREE.MeshStandardMaterial({ roughness: 0.58 });
    this.equipmentMaterial = new THREE.MeshStandardMaterial({ roughness: 0.38, metalness: 0.25 });
    this.benchMaterial = new THREE.MeshStandardMaterial({ roughness: 0.7 });

    this.makeBody();
    if (movement === 'bench') this.makeBench();
    this.makeBar();
    this.frameCamera = this.frameCamera.bind(this);
    this.update(0);
  }

  makeBody() {
    this.torso = this.addBone(0.11, this.bodyMaterial);
    this.neck = this.addBone(0.05, this.bodyMaterial);
    this.arms = Array.from({ length: 2 }, () => [
      this.addBone(0.055, this.bodyMaterial),
      this.addBone(0.045, this.bodyMaterial),
    ]);
    this.legs = Array.from({ length: 2 }, () => [
      this.addBone(0.08, this.bodyMaterial),
      this.addBone(0.06, this.bodyMaterial),
      this.addBone(0.04, this.bodyMaterial),
    ]);
    this.joints = Array.from({ length: 13 }, (_, index) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(index === 0 ? 0.12 : 0.055, 18, 14),
        index > 5 && index < 10 ? this.farMaterial : this.bodyMaterial,
      );
      mesh.castShadow = true;
      this.rig.add(mesh);
      return mesh;
    });
  }

  makeBench() {
    this.bench = new THREE.Group();
    this.rig.add(this.bench);
    const seat = new THREE.Mesh(new THREE.BoxGeometry(1.38, 0.09, 0.3), this.benchMaterial);
    seat.position.set(-0.2, 0.7, 0);
    seat.castShadow = true;
    this.bench.add(seat);
    for (const x of [-0.72, 0.34]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.695, 0.1), this.benchMaterial);
      leg.position.set(x, 0.3075, 0);
      leg.castShadow = true;
      this.bench.add(leg);
    }
  }

  makeBar() {
    this.bar = new THREE.Group();
    this.rig.add(this.bar);
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.5, 16), this.equipmentMaterial);
    shaft.rotation.x = Math.PI / 2;
    shaft.castShadow = true;
    this.bar.add(shaft);
    for (const z of [-0.56, 0.56]) {
      const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.09, 24), this.equipmentMaterial);
      plate.rotation.x = Math.PI / 2;
      plate.position.z = z;
      plate.castShadow = true;
      this.bar.add(plate);
    }
  }

  addBone(radius, material) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 1, 1, 14), material);
    mesh.userData.radius = radius;
    mesh.castShadow = true;
    this.rig.add(mesh);
    this.parts.push(mesh);
    return mesh;
  }

  placeBone(mesh, start, end) {
    if (!UP || !from || !direction) {
      throw new Error('Three.js is unavailable; the animation preview cannot start.');
    }
    from.set(...start);
    direction.set(...end).sub(from);
    const length = direction.length();
    if (!Number.isFinite(length) || length <= 0) {
      throw new RangeError('Prototype rig received a zero-length or invalid segment.');
    }
    mesh.position.copy(from).addScaledVector(direction, 0.5);
    mesh.scale.set(mesh.userData.radius, length, mesh.userData.radius);
    mesh.quaternion.setFromUnitVectors(UP, direction.divideScalar(length));
  }

  update(time) {
    const progress = this.frozen ? 0 : (time / this.cycle) % 1;
    const pose = prototypePose(this.movement, progress);
    this.placeBone(this.torso, pose.hip, pose.shoulder);
    this.placeBone(this.neck, pose.shoulder, pose.head);
    pose.arms.forEach((arm, index) => {
      this.placeBone(this.arms[index][0], arm.start, arm.joint);
      this.placeBone(this.arms[index][1], arm.joint, arm.end);
    });
    pose.legs.forEach((leg, index) => {
      this.placeBone(this.legs[index][0], leg.start, leg.joint);
      this.placeBone(this.legs[index][1], leg.joint, leg.end);
      this.placeBone(this.legs[index][2], leg.end, pose.feet[index]);
    });

    const points = [
      pose.head,
      pose.shoulder,
      pose.hip,
      ...pose.arms.flatMap(arm => [arm.joint, arm.end]),
      ...pose.legs.flatMap(leg => [leg.joint, leg.end]),
      ...pose.feet,
    ];
    points.forEach((position, index) => this.joints[index].position.set(...position));
    this.bar.position.set(...pose.bar);
    this.root.rotation.y = this.yaw;
    this.dirty = true;
  }

  setPalette(body, equipment, bench) {
    this.bodyMaterial.color.set(body);
    this.farMaterial.color.set(body);
    this.equipmentMaterial.color.set(equipment);
    this.benchMaterial.color.set(bench);
    this.dirty = true;
  }

  rotate(delta) {
    this.yaw += delta;
    this.dirty = true;
  }

  resetView() {
    this.yaw = 0.35;
    this.dirty = true;
  }

  frameCamera(camera, elevation) {
    const tangent = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const distance = Math.max(
      (this.height + 0.35 + 3 * this.floorRadius * Math.sin(elevation)) / (2 * tangent),
      (this.floorRadius * 2.24) / (2 * tangent * camera.aspect),
      2.6,
    );
    const targetY = this.height / 2;
    camera.position.set(0, targetY + distance * Math.sin(elevation), distance * Math.cos(elevation));
    camera.lookAt(0, targetY, 0);
  }
}
