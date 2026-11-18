// HeroTop — a small pencil-sketch spinning top, drawn in raw WebGL2.
//
// The construction is the same idea as a hand-drawn study: a lathe surface
// built from a 2D silhouette, shaded entirely by short graphite strokes in
// the fragment shader, and a motion model that only needs to *look* physical
// (spin, precession, tilt, fall, rest). No dependencies, no textures, no
// meshes on disk.
//
// Behaviour: it spins on its own and slowly runs down, falls onto its rim and
// rests. Hovering re-spins it, holding the pointer down brakes it. Motion is
// disabled under `prefers-reduced-motion` — the top is then drawn once, at
// rest.

const TAU = Math.PI * 2;

/** Page background and graphite, matching --color-bg / --color-text. */
const PAPER: RGB = [244 / 255, 243 / 255, 236 / 255];
const INK: RGB = [0.1, 0.094, 0.104];

type RGB = [number, number, number];
type Pt = [number, number];

/** Half of the silhouette: bottom tip, dish, rim, stem, knob. */
const PROFILE: Pt[] = (
  [
    [0, 0],
    [0.1, 0.16],
    [0.26, 0.4],
    [0.44, 0.67],
    [0.69, 0.88],
    [1, 1.02],
    [1, 1.12],
    [0.79, 1.21],
    [0.52, 1.38],
    [0.32, 1.58],
    [0.21, 1.78],
    [0.17, 1.92],
    [0.13, 2.0],
    [0.07, 2.05],
    [0, 2.06],
  ] as Pt[]
).map(([x, y]) => [x * 1.15, y] as Pt);

const HEIGHT = PROFILE[PROFILE.length - 1][1];
const RADIAL = 56;

/* ------------------------------------------------------------------ */
/* Geometry                                                            */
/* ------------------------------------------------------------------ */

/** Chaikin corner cutting: smooth the polyline without overshooting. */
function smooth(points: Pt[], iterations: number): Pt[] {
  let out = points;
  for (let k = 0; k < iterations; k++) {
    const next: Pt[] = [out[0]];
    for (let i = 0; i < out.length - 1; i++) {
      const [x0, y0] = out[i];
      const [x1, y1] = out[i + 1];
      next.push([x0 * 0.75 + x1 * 0.25, y0 * 0.75 + y1 * 0.25]);
      next.push([x0 * 0.25 + x1 * 0.75, y0 * 0.25 + y1 * 0.75]);
    }
    next.push(out[out.length - 1]);
    out = next;
  }
  return out;
}

type Mesh = {
  position: Float32Array;
  normal: Float32Array;
  uv: Float32Array;
  index: Uint16Array;
};

/** Revolve the silhouette around Y and derive normals from the faces. */
function lathe(profile: Pt[]): Mesh {
  const position: number[] = [];
  const uv: number[] = [];
  const index: number[] = [];
  const rings = profile.length;
  const stride = RADIAL + 1;

  for (let i = 0; i < rings; i++) {
    const [x, y] = profile[i];
    for (let j = 0; j <= RADIAL; j++) {
      const a = (j / RADIAL) * TAU;
      position.push(x * Math.sin(a), y, x * Math.cos(a));
      uv.push(j / RADIAL, y / HEIGHT);
    }
  }

  for (let i = 0; i < rings - 1; i++) {
    for (let j = 0; j < RADIAL; j++) {
      const a = i * stride + j;
      index.push(a, a + stride, a + 1, a + 1, a + stride, a + stride + 1);
    }
  }

  const count = position.length / 3;
  const normal = new Float32Array(position.length);
  const p = (i: number): RGB => [
    position[i * 3],
    position[i * 3 + 1],
    position[i * 3 + 2],
  ];
  for (let i = 0; i < index.length; i += 3) {
    const [ax, ay, az] = p(index[i]);
    const [bx, by, bz] = p(index[i + 1]);
    const [cx, cy, cz] = p(index[i + 2]);
    const ux = bx - ax,
      uy = by - ay,
      uz = bz - az;
    const vx = cx - ax,
      vy = cy - ay,
      vz = cz - az;
    const nx = uy * vz - uz * vy;
    const ny = uz * vx - ux * vz;
    const nz = ux * vy - uy * vx;
    for (let k = 0; k < 3; k++) {
      const t = index[i + k] * 3;
      normal[t] += nx;
      normal[t + 1] += ny;
      normal[t + 2] += nz;
    }
  }
  for (let i = 0; i < count; i++) {
    const t = i * 3;
    const len = Math.hypot(normal[t], normal[t + 1], normal[t + 2]) || 1;
    normal[t] /= len;
    normal[t + 1] /= len;
    normal[t + 2] /= len;
  }

  return {
    position: new Float32Array(position),
    normal,
    uv: new Float32Array(uv),
    index: new Uint16Array(index),
  };
}

/** Construction lines: meridians and latitude rings, as in a pencil study. */
function sketchLines(profile: Pt[], meridians: number, rings: number): Float32Array {
  const out: number[] = [];
  const at = (i: number, a: number): [number, number, number] => {
    const [x, y] = profile[i];
    const r = x * 1.012;
    return [r * Math.sin(a), y, r * Math.cos(a)];
  };
  for (let k = 0; k < meridians; k++) {
    const a = (k / meridians) * TAU;
    for (let i = 0; i < profile.length - 1; i++) {
      const p = at(i, a);
      const q = at(i + 1, a);
      out.push(p[0], p[1], p[2], q[0], q[1], q[2]);
    }
  }
  for (let r = 1; r <= rings; r++) {
    const i = Math.round((r / (rings + 1)) * (profile.length - 1));
    if (profile[i][0] < 0.025) continue;
    const segments = 64;
    for (let s = 0; s < segments; s++) {
      const p = at(i, (s / segments) * TAU);
      const q = at(i, ((s + 1) / segments) * TAU);
      out.push(p[0], p[1], p[2], q[0], q[1], q[2]);
    }
  }
  return new Float32Array(out);
}

/* ------------------------------------------------------------------ */
/* Matrices (column-major, WebGL order)                                */
/* ------------------------------------------------------------------ */

type Mat4 = Float32Array;

function perspective(fovDeg: number, aspect: number, near: number, far: number): Mat4 {
  const f = 1 / Math.tan((fovDeg * Math.PI) / 360);
  const nf = 1 / (near - far);
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, 2 * far * near * nf, 0,
  ]);
}

function lookAt(eye: RGB, target: RGB, up: RGB): Mat4 {
  let zx = eye[0] - target[0],
    zy = eye[1] - target[1],
    zz = eye[2] - target[2];
  let len = Math.hypot(zx, zy, zz) || 1;
  zx /= len;
  zy /= len;
  zz /= len;
  let xx = up[1] * zz - up[2] * zy,
    xy = up[2] * zx - up[0] * zz,
    xz = up[0] * zy - up[1] * zx;
  len = Math.hypot(xx, xy, xz) || 1;
  xx /= len;
  xy /= len;
  xz /= len;
  const yx = zy * xz - zz * xy,
    yy = zz * xx - zx * xz,
    yz = zx * xy - zy * xx;
  return new Float32Array([
    xx, yx, zx, 0,
    xy, yy, zy, 0,
    xz, yz, zz, 0,
    -(xx * eye[0] + xy * eye[1] + xz * eye[2]),
    -(yx * eye[0] + yy * eye[1] + yz * eye[2]),
    -(zx * eye[0] + zy * eye[1] + zz * eye[2]),
    1,
  ]);
}

function multiply(a: Mat4, b: Mat4): Mat4 {
  const out = new Float32Array(16);
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      let sum = 0;
      for (let k = 0; k < 4; k++) sum += a[k * 4 + r] * b[c * 4 + k];
      out[c * 4 + r] = sum;
    }
  }
  return out;
}

function rotY(a: number): Mat4 {
  const c = Math.cos(a),
    s = Math.sin(a);
  return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
}

function rotZ(a: number): Mat4 {
  const c = Math.cos(a),
    s = Math.sin(a);
  return new Float32Array([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}

function translate(y: number): Mat4 {
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, y, 0, 1]);
}

/** Upper-left 3×3 of a model matrix, for normals. */
function normalMatrix(m: Mat4): Float32Array {
  return new Float32Array([
    m[0], m[1], m[2],
    m[4], m[5], m[6],
    m[8], m[9], m[10],
  ]);
}

/* ------------------------------------------------------------------ */
/* Shaders                                                             */
/* ------------------------------------------------------------------ */

const BODY_VERT = `#version 300 es
in vec3 aPos;
in vec3 aNrm;
in vec2 aUv;
uniform mat4 uMvp;
uniform mat4 uModel;
uniform mat3 uNMat;
out vec2 vUv;
out vec3 vNrm;
out float vGround;
void main() {
  vec4 world = uModel * vec4(aPos, 1.0);
  vUv = aUv;
  vNrm = uNMat * aNrm;
  vGround = world.y;
  gl_Position = uMvp * vec4(aPos, 1.0);
}`;

// Every tone is a set of short strokes: the surface is never shaded, only
// hatched. Stroke spacing, pressure and survival all follow the local tone,
// so the shading reads as graphite rather than a lit object.
const BODY_FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
in vec3 vNrm;
in float vGround;
uniform float uPhase;
uniform float uHatch;
uniform vec3 uPaper;
uniform vec3 uInk;
out vec4 outColor;

float hash(float x) { return fract(sin(x * 127.1 + 31.7) * 43758.5453); }

float hatch(vec2 uv, float dir, float shade) {
  float q = uv.x * 22.0 + dir * uv.y * 34.0;
  float id = floor(q);
  float seed = hash(id + dir * 17.0);
  q += 0.12 * sin(uv.y * 48.0 + seed * 12.0) + 0.055 * sin(uv.y * 133.0 + seed * 27.0);
  float d = abs(fract(q) - 0.5);
  float along = uv.y * (10.0 + seed * 6.0) + seed * 7.0;
  float segment = floor(along);
  float tone = smoothstep(0.12, 0.92, shade);
  float pressure = mix(0.022, 0.11, tone) * (0.7 + 0.45 * hash(id * 7.0 + segment));
  float aa = max(fwidth(q), 0.018);
  float line = 1.0 - smoothstep(max(0.0, pressure - aa * 0.5), pressure + aa * 0.5, d);
  float ends = smoothstep(0.04, 0.19, fract(along)) * (1.0 - smoothstep(0.77, 0.98, fract(along)));
  float keep = smoothstep(seed * 0.8 + 0.1, seed * 0.8 + 0.24, shade);
  float grain = 0.65 + 0.35 * hash(id * 13.0 + segment * 3.0);
  return line * ends * keep * grain * mix(0.18, 1.0, tone);
}

void main() {
  vec3 n = normalize(vNrm);

  // Dish and stem face up into the key light; the underside keeps a light
  // centre and goes dark at the rim and wherever the body meets the ground.
  float lower = 1.0 - smoothstep(0.399, 0.428, vUv.y);
  float upper = 1.0 - max(0.0, dot(n, normalize(vec3(-0.45, 0.82, 0.55))));
  float side = abs(n.x) / max(0.001, length(n.xz));
  float fill = max(0.0, dot(n, normalize(vec3(-0.9, 0.15, 1.0))));
  float lowerShade = 0.04 + 0.62 * (1.0 - fill) + 0.25 * pow(side, 1.4);
  float contact = (1.0 - smoothstep(0.015, 0.12, vGround)) * 0.75;
  float shade = clamp(max(mix(upper, lowerShade, lower), contact), 0.0, 1.0);
  shade = clamp(shade + 0.08 * smoothstep(0.18, 0.58, shade), 0.0, 1.0);

  // The hatch sits on the surface, so sliding it around the axis is what
  // makes the top look like it is spinning.
  vec2 uv = vec2(vUv.x + uPhase, vUv.y);
  float primary = hatch(uv, -1.0, shade);
  float cross = hatch(uv, 1.0, shade) * smoothstep(0.62, 0.92, shade);
  float infill = hatch(uv + vec2(0.0, 0.012), -1.0, shade) * smoothstep(0.6, 0.9, shade);
  float marks = clamp((primary + cross * 0.22 + infill * 0.3) * uHatch, 0.0, 0.96);

  outColor = vec4(mix(uPaper, uInk, marks), 1.0);
}`;

// A slightly inflated copy of the body drawn underneath it. Every face is
// pushed out along its normal, so the sliver that survives around the edge is
// an uneven pencil contour rather than a mathematical outline.
const OUTLINE_VERT = `#version 300 es
in vec3 aPos;
in vec3 aNrm;
uniform mat4 uMvp;
uniform float uWidth;
void main() {
  vec3 p = aPos + normalize(aNrm) * uWidth;
  gl_Position = uMvp * vec4(p, 1.0);
}`;

const OUTLINE_FRAG = `#version 300 es
precision highp float;
uniform vec3 uInk;
out vec4 outColor;
void main() { outColor = vec4(uInk, 1.0); }`;

const FLAT_VERT = `#version 300 es
in vec3 aPos;
uniform mat4 uMvp;
void main() { gl_Position = uMvp * vec4(aPos, 1.0); }`;

const FLAT_FRAG = `#version 300 es
precision highp float;
uniform vec4 uColor;
out vec4 outColor;
void main() { outColor = uColor; }`;

/* ------------------------------------------------------------------ */
/* Program plumbing                                                    */
/* ------------------------------------------------------------------ */

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("[hero-top]", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function program(gl: WebGL2RenderingContext, vert: string, frag: string) {
  const vs = compile(gl, gl.VERTEX_SHADER, vert);
  const fs = compile(gl, gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) return null;
  const p = gl.createProgram();
  if (!p) return null;
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.warn("[hero-top]", gl.getProgramInfoLog(p));
    return null;
  }
  return p;
}

/* ------------------------------------------------------------------ */
/* One instance                                                        */
/* ------------------------------------------------------------------ */

function mount(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl2", {
    antialias: true,
    alpha: true,
    premultipliedAlpha: false,
    powerPreference: "low-power",
  });
  if (!gl) return null;

  const bodyProgram = program(gl, BODY_VERT, BODY_FRAG);
  const outlineProgram = program(gl, OUTLINE_VERT, OUTLINE_FRAG);
  const flatProgram = program(gl, FLAT_VERT, FLAT_FRAG);
  if (!bodyProgram || !outlineProgram || !flatProgram) return null;

  const silhouette = smooth(PROFILE, 2);
  const mesh = lathe(silhouette);
  const triangleCount = mesh.index.length;

  const buffer = (data: Float32Array) => {
    const b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return b;
  };
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.index, gl.STATIC_DRAW);

  const bind = (prog: WebGLProgram, name: string, buf: WebGLBuffer | null, size: number) => {
    const loc = gl.getAttribLocation(prog, name);
    if (loc < 0 || !buf) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
  };

  const bodyPos = buffer(mesh.position);
  const bodyNrm = buffer(mesh.normal);
  const bodyUv = buffer(mesh.uv);
  const lineMesh = sketchLines(silhouette, 7, 3);
  const linePos = buffer(lineMesh);

  const u = (prog: WebGLProgram, name: string) => gl.getUniformLocation(prog, name);

  const bodyUniforms = {
    mvp: u(bodyProgram, "uMvp"),
    model: u(bodyProgram, "uModel"),
    nmat: u(bodyProgram, "uNMat"),
    phase: u(bodyProgram, "uPhase"),
    hatch: u(bodyProgram, "uHatch"),
    paper: u(bodyProgram, "uPaper"),
    ink: u(bodyProgram, "uInk"),
  };
  const outlineUniforms = {
    mvp: u(outlineProgram, "uMvp"),
    width: u(outlineProgram, "uWidth"),
    ink: u(outlineProgram, "uInk"),
  };
  const flatUniforms = {
    mvp: u(flatProgram, "uMvp"),
    color: u(flatProgram, "uColor"),
  };

  /* --- state ------------------------------------------------------- */

  let speed = 0.58;
  let phase = 0;
  let precession = 0;
  let tilt = 0.08;
  let hover = false;
  let brake = false;
  let running = false;
  let raf = 0;
  let last = 0;

  const reduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- sizing ------------------------------------------------------ */

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = Math.max(1, Math.round(canvas.clientWidth * dpr));
    if (canvas.width !== size || canvas.height !== size) {
      canvas.width = size;
      canvas.height = size;
      gl.viewport(0, 0, size, size);
    }
  };

  const projection = () => {
    const aspect = canvas.width / Math.max(1, canvas.height);
    const p = perspective(32, aspect, 0.1, 100);
    const v = lookAt([2.6, 2.6, 3.9], [0, 0.94, 0], [0, 1, 0]);
    return multiply(p, v);
  };

  /** Lift the body so its lowest point sits on the ground plane. */
  const groundOffset = () => {
    let highest = -Infinity;
    const s = Math.abs(Math.sin(tilt));
    const c = Math.cos(tilt);
    for (const [x, y] of silhouette) highest = Math.max(highest, x * s - y * c);
    return highest === -Infinity ? 0 : -highest + 0.012;
  };

  /* --- motion ------------------------------------------------------ */

  const step = (dt: number) => {
    if (reduced) return;

    // Keep the top in a perpetual, gentle motion. The old animation ran down,
    // fell onto its rim, and restarted on hover, which made the loop feel like
    // it was catching at its endpoints. Speed and tilt now ease continuously.
    const targetSpeed = brake ? 0.3 : hover ? 0.72 : 0.58;
    speed += (targetSpeed - speed) * (1 - Math.exp(-dt * 4));
    // Keep phase unbounded. Wrapping it back to zero changes the procedural
    // graphite pattern by one large texture step and creates a visible hitch.
    phase += speed * 0.4 * dt;
    precession += dt * (0.52 + speed * 0.16);
    const targetTilt = 0.08 + Math.sin(precession * 0.9) * 0.035;
    tilt += (targetTilt - tilt) * (1 - Math.exp(-dt * 3.5));
  };

  /* --- draw -------------------------------------------------------- */

  const draw = () => {
    resize();
    const vp = projection();
    const model = multiply(translate(groundOffset()), multiply(rotY(precession), rotZ(tilt)));
    const mvp = multiply(vp, model);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.depthMask(true);

    // Contour: the inflated shell, painted under the body without depth. What
    // survives around the edge is an uneven pencil line, not a mathematical
    // outline.
    gl.disable(gl.DEPTH_TEST);
    gl.depthMask(false);
    gl.useProgram(outlineProgram);
    gl.uniformMatrix4fv(outlineUniforms.mvp, false, mvp);
    gl.uniform1f(outlineUniforms.width, 0.1);
    gl.uniform3f(outlineUniforms.ink, INK[0], INK[1], INK[2]);
    bind(outlineProgram, "aPos", bodyPos, 3);
    bind(outlineProgram, "aNrm", bodyNrm, 3);
    gl.drawElements(gl.TRIANGLES, triangleCount, gl.UNSIGNED_SHORT, 0);

    // Body: opaque paper carved by the hatch, so the page shows through only
    // outside the silhouette.
    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(true);
    gl.useProgram(bodyProgram);
    gl.uniformMatrix4fv(bodyUniforms.mvp, false, mvp);
    gl.uniformMatrix4fv(bodyUniforms.model, false, model);
    gl.uniformMatrix3fv(bodyUniforms.nmat, false, normalMatrix(model));
    gl.uniform1f(bodyUniforms.phase, phase);
    gl.uniform1f(bodyUniforms.hatch, 0.6);
    gl.uniform3f(bodyUniforms.paper, PAPER[0], PAPER[1], PAPER[2]);
    gl.uniform3f(bodyUniforms.ink, INK[0], INK[1], INK[2]);
    bind(bodyProgram, "aPos", bodyPos, 3);
    bind(bodyProgram, "aNrm", bodyNrm, 3);
    bind(bodyProgram, "aUv", bodyUv, 2);
    gl.drawElements(gl.TRIANGLES, triangleCount, gl.UNSIGNED_SHORT, 0);

    // Construction lines last, floating a hair above the surface so they read
    // as graphite drawn over the hatch.
    gl.depthMask(false);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.useProgram(flatProgram);
    gl.uniformMatrix4fv(flatUniforms.mvp, false, mvp);
    gl.uniform4f(flatUniforms.color, INK[0], INK[1], INK[2], 0.55);
    bind(flatProgram, "aPos", linePos, 3);
    gl.drawArrays(gl.LINES, 0, lineMesh.length / 3);
    gl.disable(gl.BLEND);
    gl.depthMask(true);
  };

  /* --- loop -------------------------------------------------------- */

  const frame = (now: number) => {
    const dt = last ? Math.min(0.04, (now - last) / 1000) : 0.016;
    last = now;
    step(dt);
    draw();
    raf = requestAnimationFrame(frame);
  };

  const start = () => {
    if (running || reduced) return;
    running = true;
    last = 0;
    raf = requestAnimationFrame(frame);
  };

  const stop = () => {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
  };

  canvas.addEventListener("pointerenter", () => {
    hover = true;
  });
  canvas.addEventListener("pointerleave", () => {
    hover = false;
    brake = false;
  });
  canvas.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    brake = true;
    event.preventDefault();
  });
  window.addEventListener("pointerup", () => {
    brake = false;
  });

  let visible = true;

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else if (visible) start();
  });

  const io = new ResizeObserver(() => draw());
  io.observe(canvas);

  if (typeof IntersectionObserver === "function") {
    new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible) start();
      else stop();
    }).observe(canvas);
  }

  if (reduced) {
    // One still frame with the top upright and balanced.
    tilt = 0.08;
    precession = 0.6;
    resize();
    draw();
  } else {
    start();
  }

  return {
    dispose() {
      stop();
      io.disconnect();
    },
  };
}

/* ------------------------------------------------------------------ */

export function initHeroTops() {
  document.querySelectorAll<HTMLCanvasElement>("[data-top-canvas]").forEach((canvas) => {
    const host = canvas.closest<HTMLElement>("[data-top]");
    try {
      const instance = mount(canvas);
      if (instance) host?.classList.add("is-ready");
      else host?.classList.add("is-off");
    } catch (error) {
      console.warn("[hero-top] could not start", error);
      host?.classList.add("is-off");
    }
  });
}
