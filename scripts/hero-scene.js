// HeroScene — Three.js wireframe orb + halo + scroll-driven camera
// Self-contained class; mount with new HeroScene(canvas).start();

(function () {
  class HeroScene {
    constructor(canvas) {
      this.canvas = canvas;
      this.scrollProgress = 0; // 0..1 across hero block
      this.mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      this.density = 1;
      this.motion = 1;
      this.accent = 0xd8572a;
      this._raf = null;
    }

    setAccent(hex) {
      this.accent = hex;
      if (this.orbMat) this.orbMat.color.setHex(hex);
      if (this.haloMat) this.haloMat.color.setHex(hex);
    }

    setDensity(d) {
      this.density = d;
      this._rebuildParticles();
    }

    setMotion(m) {
      this.motion = m;
    }

    start() {
      const THREE = window.THREE;
      const { width, height } = this.canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });
      this.renderer.setPixelRatio(dpr);
      this.renderer.setSize(width, height, false);

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      this.camera.position.set(0, 0, 8);

      // Group for the AI core
      this.core = new THREE.Group();
      this.scene.add(this.core);

      // Inner solid sphere (very dim, gives mass)
      const innerGeom = new THREE.IcosahedronGeometry(1.05, 2);
      this.innerMat = new THREE.MeshBasicMaterial({ color: 0x1a1815, transparent: true, opacity: 0.6 });
      this.innerMesh = new THREE.Mesh(innerGeom, this.innerMat);
      this.core.add(this.innerMesh);

      // Outer wireframe sphere — primary
      const orbGeom = new THREE.IcosahedronGeometry(1.5, 3);
      this.orbMat = new THREE.MeshBasicMaterial({
        color: this.accent, wireframe: true, transparent: true, opacity: 0.85
      });
      this.orbMesh = new THREE.Mesh(orbGeom, this.orbMat);
      this.core.add(this.orbMesh);

      // Secondary subdivided wireframe (cream)
      const orb2Geom = new THREE.IcosahedronGeometry(1.65, 4);
      this.orb2Mat = new THREE.MeshBasicMaterial({
        color: 0xefe9dc, wireframe: true, transparent: true, opacity: 0.18
      });
      this.orb2Mesh = new THREE.Mesh(orb2Geom, this.orb2Mat);
      this.core.add(this.orb2Mesh);

      // Outer ring/torus (very thin)
      const ringGeom = new THREE.TorusGeometry(2.4, 0.005, 8, 200);
      this.ringMat = new THREE.MeshBasicMaterial({ color: 0xefe9dc, transparent: true, opacity: 0.35 });
      this.ringMesh = new THREE.Mesh(ringGeom, this.ringMat);
      this.ringMesh.rotation.x = Math.PI / 2.4;
      this.core.add(this.ringMesh);

      const ring2Geom = new THREE.TorusGeometry(2.9, 0.003, 8, 200);
      this.ring2Mat = new THREE.MeshBasicMaterial({ color: this.accent, transparent: true, opacity: 0.5 });
      this.ring2Mesh = new THREE.Mesh(ring2Geom, this.ring2Mat);
      this.ring2Mesh.rotation.x = Math.PI / 1.6;
      this.ring2Mesh.rotation.z = Math.PI / 6;
      this.core.add(this.ring2Mesh);

      // Halo points around the orb (close)
      this._buildHalo();

      // Particle dust (far)
      this._buildParticles();

      // Resize
      this._onResize = () => {
        const r = this.canvas.getBoundingClientRect();
        this.renderer.setSize(r.width, r.height, false);
        this.camera.aspect = r.width / r.height;
        this.camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", this._onResize);

      // Pointer parallax
      this._onMove = (e) => {
        const r = this.canvas.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        this.mouse.tx = ((e.clientX - cx) / r.width) * 2;
        this.mouse.ty = ((e.clientY - cy) / r.height) * 2;
      };
      window.addEventListener("pointermove", this._onMove);

      this._t0 = performance.now();
      this._loop = this._loop.bind(this);
      this._raf = requestAnimationFrame(this._loop);
    }

    _buildHalo() {
      const THREE = window.THREE;
      if (this.haloPoints) {
        this.core.remove(this.haloPoints);
        this.haloPoints.geometry.dispose();
        this.haloPoints.material.dispose();
      }
      const N = Math.floor(800 * this.density);
      const pos = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        // points on a sphere shell
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = 1.7 + Math.random() * 0.8;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      this.haloMat = new THREE.PointsMaterial({
        color: this.accent, size: 0.018, transparent: true, opacity: 0.85, sizeAttenuation: true
      });
      this.haloPoints = new THREE.Points(g, this.haloMat);
      this.core.add(this.haloPoints);
    }

    _buildParticles() {
      const THREE = window.THREE;
      if (this.particles) {
        this.scene.remove(this.particles);
        this.particles.geometry.dispose();
        this.particles.material.dispose();
      }
      const N = Math.floor(2200 * this.density);
      const pos = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        // bias near orb but spread
        const r = 3 + Math.random() * 9;
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6; // squash vertically
        pos[i * 3 + 2] = r * Math.cos(phi);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const m = new THREE.PointsMaterial({
        color: 0xefe9dc, size: 0.012, transparent: true, opacity: 0.45, sizeAttenuation: true
      });
      this.particles = new THREE.Points(g, m);
      this.scene.add(this.particles);
    }

    _rebuildParticles() {
      this._buildHalo();
      this._buildParticles();
    }

    _loop(now) {
      this._raf = requestAnimationFrame(this._loop);
      const t = (now - this._t0) / 1000;
      const m = this.motion;
      // smooth scroll progress for buttery dolly/parallax
      this._spEased = this._spEased == null ? this.scrollProgress : this._spEased;
      this._spEased += (this.scrollProgress - this._spEased) * 0.09;
      const sp = this._spEased;
      // ease curve for non-linear scroll mapping (slow start, accelerate, settle)
      const spE = sp < 0.5
        ? 2 * sp * sp
        : 1 - Math.pow(-2 * sp + 2, 2) / 2;

      // mouse easing — slightly snappier
      this.mouse.x += (this.mouse.tx - this.mouse.x) * 0.075;
      this.mouse.y += (this.mouse.ty - this.mouse.y) * 0.075;

      // core rotation: layered figure-eight feel
      this.core.rotation.y = t * 0.12 * m + spE * 1.6 + this.mouse.x * 0.25;
      this.core.rotation.x = Math.sin(t * 0.18 * m) * 0.16 + this.mouse.y * 0.22 - spE * 0.18;
      this.core.rotation.z = Math.sin(t * 0.11 * m) * 0.06;
      // multi-axis spin on inner orbs
      this.orbMesh.rotation.y = -t * 0.28 * m + spE * 0.8;
      this.orbMesh.rotation.x = Math.sin(t * 0.17 * m) * 0.12;
      this.orb2Mesh.rotation.y = t * 0.22 * m;
      this.orb2Mesh.rotation.z = -t * 0.07 * m + spE * 0.4;
      this.ringMesh.rotation.z = t * 0.09 * m + spE * 0.6;
      this.ringMesh.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.22 * m) * 0.18;
      this.ring2Mesh.rotation.x = Math.PI / 1.6 + Math.sin(t * 0.3 * m) * 0.42;
      this.ring2Mesh.rotation.z = Math.PI / 6 - t * 0.12 * m;

      // breathing scale: pulse with scroll energy
      const breath = 1 + Math.sin(t * 0.8 * m) * 0.015 + Math.sin(spE * Math.PI) * 0.04;
      this.core.scale.setScalar(breath);

      // wireframe expansion mid-scroll (sphere "breathes open")
      const expand = 1 + Math.sin(spE * Math.PI) * 0.06;
      this.orb2Mesh.scale.setScalar(expand);

      // halo float — counter-rotate
      if (this.haloPoints) {
        this.haloPoints.rotation.y = -t * 0.05 * m + spE * 0.3;
        this.haloPoints.rotation.x = Math.sin(t * 0.13 * m) * 0.2;
      }
      if (this.particles) {
        this.particles.rotation.y = t * 0.018 * m;
        this.particles.rotation.x = -t * 0.008 * m;
      }

      // scroll-driven camera: dolly + arc + tilt with eased curve
      const dolly = 8 - spE * 4.2;
      const arcX = Math.sin(spE * Math.PI) * 0.6;
      const lift = -spE * 0.7 + Math.sin(spE * Math.PI * 2) * 0.15;
      this.camera.position.x = this.mouse.x * 0.45 + arcX;
      this.camera.position.y = this.mouse.y * -0.32 + lift;
      this.camera.position.z = dolly;
      this.camera.lookAt(0, spE * -0.15, 0);
      // subtle FOV breathing — feels like a zoom-in on key beat
      this.camera.fov = 38 - Math.sin(spE * Math.PI) * 4;
      this.camera.updateProjectionMatrix();

      // accent intensity peaks mid-scroll, fades toward end
      const peak = Math.sin(spE * Math.PI);
      this.orbMat.opacity = 0.55 + peak * 0.42;
      this.haloMat.opacity = 0.4 + peak * 0.55;
      this.ring2Mat.opacity = 0.4 + peak * 0.45;
      this.orb2Mat.opacity = 0.14 + peak * 0.18;

      this.renderer.render(this.scene, this.camera);
    }

    setScrollProgress(p) {
      this.scrollProgress = Math.max(0, Math.min(1, p));
    }

    destroy() {
      cancelAnimationFrame(this._raf);
      window.removeEventListener("resize", this._onResize);
      window.removeEventListener("pointermove", this._onMove);
      this.renderer && this.renderer.dispose();
    }
  }

  window.HeroScene = HeroScene;
})();
