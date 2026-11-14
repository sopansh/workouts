import { THREE } from './three.js';

const FOV = 32;
const ELEVATION = THREE.MathUtils.degToRad(12);
const FLOOR_Y = -0.04; // lowest toe/elbow spheres dip slightly below the authored floor line

function radialFade() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,0.95)');
  gradient.addColorStop(0.6, 'rgba(255,255,255,0.55)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

/**
 * One shared WebGL renderer and scene for every exercise card. Browsers cap live WebGL
 * contexts (~16), so instead of one context per canvas we render the active figure here
 * and copy the result into that card's 2D canvas.
 */
export class Stage {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.size = { width: 0, height: 0 };

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(FOV, 16 / 10, 0.1, 50);
    this.figures = [];

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x5d6d69, 0.95));
    const key = new THREE.DirectionalLight(0xffffff, 0.8);
    key.position.set(2, 7, 3);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    Object.assign(key.shadow.camera, { left: -3.5, right: 3.5, top: 3.5, bottom: -3.5, near: 0.5, far: 20 });
    key.shadow.bias = -0.002;
    this.scene.add(key);
    const rim = new THREE.DirectionalLight(0xbfe9dc, 0.35);
    rim.position.set(-3, 2.5, -3);
    this.scene.add(rim);

    this.floorMaterial = new THREE.MeshBasicMaterial({ map: radialFade(), transparent: true, depthWrite: false });
    this.ringMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.5, depthWrite: false });
    this.shadowMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    this.floorGeometry = new THREE.CircleGeometry(1, 64).rotateX(-Math.PI / 2);
    this.ringGeometry = new THREE.RingGeometry(0.975, 1, 96).rotateX(-Math.PI / 2);
    this.shadowGeometry = new THREE.PlaneGeometry(14, 14).rotateX(-Math.PI / 2);
  }

  setFloorColor(color) {
    this.floorMaterial.color.set(color);
    this.ringMaterial.color.set(color);
  }

  attach(figure) {
    const floor = new THREE.Mesh(this.floorGeometry, this.floorMaterial);
    const ring = new THREE.Mesh(this.ringGeometry, this.ringMaterial);
    floor.scale.setScalar(figure.floorRadius);
    ring.scale.setScalar(figure.floorRadius);
    floor.position.y = ring.position.y = FLOOR_Y;
    const shadow = new THREE.Mesh(this.shadowGeometry, this.shadowMaterial);
    shadow.position.y = FLOOR_Y + 0.002;
    shadow.receiveShadow = true;
    figure.root.add(floor, ring, shadow);
    figure.root.visible = false;
    this.scene.add(figure.root);
    this.figures.push(figure);
  }

  render(figure, canvas, ctx) {
    const { width, height } = canvas;
    if (!width || !height) return;
    if (width !== this.size.width || height !== this.size.height) {
      this.renderer.setSize(width, height, false);
      this.size = { width, height };
    }
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    figure.frameCamera(this.camera, ELEVATION);
    for (const f of this.figures) f.root.visible = f === figure;
    this.renderer.render(this.scene, this.camera);
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(this.renderer.domElement, 0, 0);
  }
}
