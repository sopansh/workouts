import { THREE } from './three.js';
import { PrototypeFigure } from './prototype-figure.js';
import { exercisePose, type AnimationConfig, type Prop } from './exercise-math';

export class ExerciseFigure extends PrototypeFigure {
  config?: AnimationConfig;
  equipmentParts: Array<{ mesh: ReturnType<PrototypeFigure['addBone']>; kind: Prop['kind'] }> = [];
  shoulders: Array<ReturnType<PrototypeFigure['addBone']>> = [];

  constructor(config: AnimationConfig) {
    super('squat');
    this.config = config;
    this.rig.remove(this.bar);
    this.cycle = config.tempo.reduce((sum, n) => sum + n, 0);
    this.yaw = config.yaw;
    this.height = 1.9;
    this.floorRadius = 1.5;
    this.shoulders = [this.addBone(0.055, this.bodyMaterial), this.addBone(0.055, this.bodyMaterial)];
    const pose = exercisePose(config, 0);
    this.equipmentParts = pose.props.map(p => {
      const mesh = this.addBone(p.width, p.kind === 'pad' ? this.benchMaterial : this.equipmentMaterial);
      if (p.kind === 'pad') {
        mesh.geometry.dispose();
        mesh.geometry = new THREE.BoxGeometry(1, 1, 1);
      }
      return { kind: p.kind, mesh };
    });
    this.update(0);
  }

  update(time: number) {
    if (!this.config) { super.update(time); return; }
    const pose = exercisePose(this.config, this.frozen ? 0 : (time / this.cycle) % 1);
    this.placeBone(this.torso, pose.hip, pose.shoulder);
    this.placeBone(this.neck, pose.shoulder, pose.head);
    pose.arms.forEach((arm, i) => {
      this.placeBone(this.shoulders[i], pose.shoulder, arm.start);
      this.placeBone(this.arms[i][0], arm.start, arm.joint);
      this.placeBone(this.arms[i][1], arm.joint, arm.end);
    });
    pose.legs.forEach((leg, i) => {
      this.placeBone(this.legs[i][0], leg.start, leg.joint);
      this.placeBone(this.legs[i][1], leg.joint, leg.end);
      this.placeBone(this.legs[i][2], leg.end, pose.feet[i]);
    });
    const points = [pose.head, pose.shoulder, pose.hip, ...pose.arms.flatMap(a => [a.joint, a.end]), ...pose.legs.flatMap(l => [l.joint, l.end]), ...pose.feet];
    points.forEach((point, i) => this.joints[i].position.set(...point));
    pose.props.forEach((p, i) => {
      const mesh = this.equipmentParts[i].mesh;
      this.placeBone(mesh, p.start, p.end);
      if (p.kind === 'pad') { mesh.scale.x = 0.08; mesh.scale.z = p.width; }
    });
    this.root.rotation.y = this.yaw;
    this.dirty = true;
  }

  resetView() {
    this.yaw = this.config?.yaw ?? 0.35;
    this.dirty = true;
  }
}
