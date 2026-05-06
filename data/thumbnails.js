// Procedural SVG thumbnails — one per project, each interpreting its generation prompt.
// Pure JS, no deps. Returns SVG string.

(function () {
  function seedRand(seed) {
    let h = 2166136261;
    for (let i = 0; i < seed.length; i++) {
      h ^= seed.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return function () {
      h += 0x6D2B79F5;
      let t = h;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // ─────────── Bazodiac ───────────
  // Dark luxury cosmic, 12-sector radial Fusion Ring, Western + BaZi marks, Wu-Xing traces.
  function bazodiac(rng, w, h) {
    const cx = w / 2, cy = h / 2;
    const R = Math.min(w, h) * 0.42;
    let g = `<rect width="${w}" height="${h}" fill="#0a0810"/>`;
    // ambient cosmic gradient
    g += `<circle cx="${cx}" cy="${cy}" r="${R * 1.4}" fill="url(#bazoCosm)"/>`;
    // 12 sectors
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const x2 = cx + Math.cos(a) * R;
      const y2 = cy + Math.sin(a) * R;
      g += `<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="rgba(212,175,55,0.35)" stroke-width="0.8"/>`;
      // sector glyph
      const gx = cx + Math.cos(a + Math.PI / 12) * (R * 0.92);
      const gy = cy + Math.sin(a + Math.PI / 12) * (R * 0.92);
      g += `<circle cx="${gx}" cy="${gy}" r="${1.2 + rng() * 1.2}" fill="rgba(212,175,55,${0.3 + rng() * 0.5})"/>`;
    }
    // outer rings
    for (let i = 0; i < 4; i++) {
      const r = R * (0.55 + i * 0.14);
      const op = 0.15 + i * 0.1;
      g += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(212,175,55,${op})" stroke-width="${i === 3 ? 1.2 : 0.6}"/>`;
    }
    // BaZi pillar marks (4 columns at compass)
    [0, 0.25, 0.5, 0.75].forEach((p, i) => {
      const a = p * Math.PI * 2 - Math.PI / 2;
      const x = cx + Math.cos(a) * (R * 1.05);
      const y = cy + Math.sin(a) * (R * 1.05);
      g += `<rect x="${x - 4}" y="${y - 12}" width="8" height="24" transform="rotate(${(p * 360)} ${x} ${y})" fill="rgba(155,89,182,0.5)"/>`;
    });
    // Wu-Xing inner pentagram
    let pts = "";
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
      const x = cx + Math.cos(a) * R * 0.32;
      const y = cy + Math.sin(a) * R * 0.32;
      pts += `${x},${y} `;
    }
    g += `<polygon points="${pts}" fill="none" stroke="rgba(0,200,200,0.55)" stroke-width="0.8"/>`;
    // core
    g += `<circle cx="${cx}" cy="${cy}" r="${R * 0.08}" fill="#d4af37"/>`;
    g += `<circle cx="${cx}" cy="${cy}" r="${R * 0.18}" fill="none" stroke="#d4af37" stroke-opacity="0.4"/>`;
    // distant stars
    for (let i = 0; i < 60; i++) {
      const x = rng() * w, y = rng() * h;
      const inner = Math.hypot(x - cx, y - cy) < R * 0.5;
      if (inner) continue;
      g += `<circle cx="${x}" cy="${y}" r="${rng() * 1.3}" fill="rgba(255,255,255,${0.15 + rng() * 0.45})"/>`;
    }
    return `<defs><radialGradient id="bazoCosm" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stop-color="#1a0d24" stop-opacity="0.9"/><stop offset="100%" stop-color="#0a0810" stop-opacity="0"/></radialGradient></defs>` + g;
  }

  // ─────────── FuFirE API ───────────
  // Astronomical API console, orbital curves, JSON schema panels, Four Pillars columns.
  function fufire(rng, w, h) {
    let g = `<rect width="${w}" height="${h}" fill="#0e0e0c"/>`;
    const cx = w * 0.35, cy = h / 2;
    // orbit ellipses
    for (let i = 0; i < 4; i++) {
      const rx = 60 + i * 50;
      const ry = (60 + i * 50) * 0.45;
      const ang = -10 - i * 5;
      g += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="rgba(239,233,220,${0.18 + i * 0.08})" stroke-width="0.8" transform="rotate(${ang} ${cx} ${cy})"/>`;
    }
    // sun
    g += `<circle cx="${cx}" cy="${cy}" r="6" fill="#d8572a"/>`;
    g += `<circle cx="${cx}" cy="${cy}" r="14" fill="none" stroke="#d8572a" stroke-opacity="0.4"/>`;
    // planets
    for (let i = 0; i < 5; i++) {
      const a = rng() * Math.PI * 2;
      const r = 70 + i * 48;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r * 0.45;
      g += `<circle cx="${x}" cy="${y}" r="${2.5 + rng() * 2}" fill="${i === 2 ? "#d8572a" : "#efe9dc"}"/>`;
    }
    // JSON schema panel (right)
    const px = w * 0.66, py = 50, pw = w - px - 30, ph = h - 100;
    g += `<rect x="${px}" y="${py}" width="${pw}" height="${ph}" fill="rgba(239,233,220,0.04)" stroke="rgba(239,233,220,0.25)" stroke-width="0.8" rx="3"/>`;
    g += `<text x="${px + 12}" y="${py + 18}" font-family="JetBrains Mono, monospace" font-size="9" fill="rgba(239,233,220,0.5)">{ "engine": "FuFirE",</text>`;
    const lines = [
      '  "bazi": { … },',
      '  "western": { … },',
      '  "wuxing": [ … ],',
      '  "transits": [ … ],',
      '  "fusion": { … }',
      '}'
    ];
    lines.forEach((l, i) => {
      g += `<text x="${px + 12}" y="${py + 36 + i * 14}" font-family="JetBrains Mono, monospace" font-size="9" fill="rgba(239,233,220,${0.4 + (i === 4 ? 0.3 : 0)})">${l.replace(/</g, "&lt;")}</text>`;
    });
    // Four Pillars columns (bottom-left)
    const cols = ["年", "月", "日", "時"];
    cols.forEach((c, i) => {
      const x = 30 + i * 38;
      const y = h - 80;
      g += `<rect x="${x}" y="${y}" width="28" height="60" fill="rgba(239,233,220,0.05)" stroke="rgba(239,233,220,0.25)" stroke-width="0.6" rx="2"/>`;
      g += `<text x="${x + 14}" y="${y + 22}" text-anchor="middle" font-family="serif" font-size="14" fill="rgba(216,87,42,${i === 1 ? 0.95 : 0.55})">${c}</text>`;
      g += `<text x="${x + 14}" y="${y + 42}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" fill="rgba(239,233,220,0.45)">P${i + 1}</text>`;
    });
    return g;
  }

  // ─────────── What's in it? ───────────
  // Repo lens — code tree fragments + lens of clarity + label chips.
  function whatsinit(rng, w, h) {
    let g = `<rect width="${w}" height="${h}" fill="#0e0e0c"/>`;
    // code tree (left)
    const tx = 40, ty = 50;
    const tree = [
      "├ src/", "│  ├ index.ts", "│  ├ lib/", "│  │  ├ parse.ts", "│  │  └ cache.ts",
      "│  └ ui/", "├ README.md", "├ package.json", "└ .github/"
    ];
    tree.forEach((l, i) => {
      g += `<text x="${tx}" y="${ty + i * 16}" font-family="JetBrains Mono, monospace" font-size="10" fill="rgba(239,233,220,${0.35 + (i === 6 ? 0.4 : 0)})">${l}</text>`;
    });
    // big lens circle in middle/right
    const cx = w * 0.62, cy = h / 2;
    const R = Math.min(w, h) * 0.32;
    g += `<defs><radialGradient id="lensG"><stop offset="0%" stop-color="rgba(216,87,42,0.18)"/><stop offset="100%" stop-color="rgba(216,87,42,0)"/></radialGradient></defs>`;
    g += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#lensG)" stroke="rgba(216,87,42,0.7)" stroke-width="1.4"/>`;
    g += `<circle cx="${cx}" cy="${cy}" r="${R - 8}" fill="none" stroke="rgba(216,87,42,0.25)" stroke-width="0.6"/>`;
    // lens handle
    g += `<line x1="${cx + R * 0.7}" y1="${cy + R * 0.7}" x2="${cx + R * 1.2}" y2="${cy + R * 1.2}" stroke="rgba(216,87,42,0.7)" stroke-width="3" stroke-linecap="round"/>`;
    // chips inside lens
    const chips = ["USEFUL?", "FOR WHOM", "START HERE"];
    chips.forEach((c, i) => {
      const cw = 78, ch = 18;
      const x = cx - cw / 2;
      const y = cy - 30 + i * 24;
      g += `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" fill="rgba(14,14,12,0.85)" stroke="rgba(239,233,220,0.4)" rx="3"/>`;
      g += `<text x="${cx}" y="${y + 12}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9" fill="${i === 0 ? "#d8572a" : "rgba(239,233,220,0.85)"}">${c}</text>`;
    });
    // README block (bottom-left small)
    g += `<rect x="40" y="${h - 60}" width="120" height="36" fill="rgba(239,233,220,0.05)" stroke="rgba(239,233,220,0.2)" rx="3"/>`;
    g += `<text x="48" y="${h - 46}" font-family="JetBrains Mono, monospace" font-size="9" fill="rgba(239,233,220,0.6)">README.md</text>`;
    [0,1,2].forEach((i) => {
      g += `<rect x="48" y="${h - 38 + i * 5}" width="${80 - i * 10}" height="2" fill="rgba(239,233,220,0.3)"/>`;
    });
    return g;
  }

  // ─────────── WhatsOrga ───────────
  // Abstract chat bubbles, semantic memory graph, calendar blocks, sentiment waves.
  function whatsorga(rng, w, h) {
    let g = `<rect width="${w}" height="${h}" fill="#0e0e0c"/>`;
    // chat bubbles (left)
    const bubbles = [
      { x: 40, y: 60, w: 110, h: 24, side: "L" },
      { x: 80, y: 100, w: 90, h: 24, side: "R" },
      { x: 40, y: 140, w: 130, h: 32, side: "L" },
      { x: 90, y: 188, w: 70, h: 22, side: "R" }
    ];
    bubbles.forEach((b, i) => {
      const fill = b.side === "L" ? "rgba(239,233,220,0.08)" : "rgba(0,180,120,0.18)";
      const stroke = b.side === "L" ? "rgba(239,233,220,0.3)" : "rgba(0,180,120,0.6)";
      g += `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="${b.h / 2}" fill="${fill}" stroke="${stroke}" stroke-width="0.6"/>`;
      g += `<rect x="${b.x + 12}" y="${b.y + b.h / 2 - 1}" width="${b.w * 0.6}" height="2" fill="rgba(239,233,220,0.4)"/>`;
    });
    // memory graph (right)
    const nodes = [];
    for (let i = 0; i < 8; i++) {
      nodes.push({ x: w * 0.55 + rng() * (w * 0.4 - 60) + 30, y: 60 + rng() * (h - 180) });
    }
    nodes.forEach((n, i) => {
      const k = 1 + Math.floor(rng() * 2);
      for (let j = 0; j < k; j++) {
        const t = nodes[(i + 1 + Math.floor(rng() * 6)) % nodes.length];
        g += `<line x1="${n.x}" y1="${n.y}" x2="${t.x}" y2="${t.y}" stroke="rgba(0,180,120,${0.25 + rng() * 0.4})" stroke-width="0.7"/>`;
      }
    });
    nodes.forEach((n, i) => {
      const accent = i === 2;
      g += `<circle cx="${n.x}" cy="${n.y}" r="${accent ? 5 : 3}" fill="${accent ? "#00b478" : "#efe9dc"}"/>`;
      if (accent) g += `<circle cx="${n.x}" cy="${n.y}" r="9" fill="none" stroke="#00b478" stroke-opacity="0.4"/>`;
    });
    // calendar blocks (bottom)
    const cy = h - 60;
    for (let i = 0; i < 7; i++) {
      const x = 40 + i * 38;
      const filled = i === 2 || i === 4;
      g += `<rect x="${x}" y="${cy}" width="30" height="28" fill="${filled ? "rgba(0,180,120,0.4)" : "rgba(239,233,220,0.05)"}" stroke="rgba(239,233,220,0.3)" stroke-width="0.6" rx="2"/>`;
      g += `<text x="${x + 15}" y="${cy + 18}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9" fill="rgba(239,233,220,${filled ? 0.95 : 0.5})">${["M","T","W","T","F","S","S"][i]}</text>`;
    }
    // sentiment wave under bubbles
    let path = `M 30 ${h - 100}`;
    for (let i = 1; i <= 30; i++) {
      const x = 30 + (i * (w * 0.45 - 30) / 30);
      const y = h - 100 + Math.sin(i * 0.4) * 6 + (rng() - 0.5) * 4;
      path += ` L ${x} ${y}`;
    }
    g += `<path d="${path}" fill="none" stroke="rgba(0,180,120,0.5)" stroke-width="0.8"/>`;
    return g;
  }

  // ─────────── CoupleTime ───────────
  // Two balanced timer circles, structured dialogue marks, off-white calm.
  function coupletime(rng, w, h) {
    let g = `<rect width="${w}" height="${h}" fill="#f4eee2"/>`;
    // grid
    for (let x = 0; x < w; x += 60) g += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="rgba(14,14,12,0.04)"/>`;
    for (let y = 0; y < h; y += 60) g += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="rgba(14,14,12,0.04)"/>`;
    // two timer circles
    const r = Math.min(w, h) * 0.22;
    const c1x = w / 2 - r * 1.2;
    const c2x = w / 2 + r * 1.2;
    const cy = h / 2 - 10;
    [c1x, c2x].forEach((cx, i) => {
      g += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(14,14,12,0.2)" stroke-width="1"/>`;
      g += `<circle cx="${cx}" cy="${cy}" r="${r - 8}" fill="none" stroke="rgba(14,14,12,0.12)" stroke-width="0.6"/>`;
      // tick marks
      for (let t = 0; t < 12; t++) {
        const a = (t / 12) * Math.PI * 2 - Math.PI / 2;
        const x1 = cx + Math.cos(a) * (r - 4);
        const y1 = cy + Math.sin(a) * (r - 4);
        const x2 = cx + Math.cos(a) * r;
        const y2 = cy + Math.sin(a) * r;
        g += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(14,14,12,0.5)" stroke-width="${t % 3 === 0 ? 1.4 : 0.6}"/>`;
      }
      // active arc (different on each)
      const arcEnd = i === 0 ? 0.6 : 0.35;
      const a0 = -Math.PI / 2;
      const a1 = a0 + arcEnd * Math.PI * 2;
      const lx = cx + Math.cos(a1) * r;
      const ly = cy + Math.sin(a1) * r;
      const large = arcEnd > 0.5 ? 1 : 0;
      g += `<path d="M ${cx} ${cy - r} A ${r} ${r} 0 ${large} 1 ${lx} ${ly}" stroke="${i === 0 ? "#d8572a" : "#7a7b58"}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
      // hub
      g += `<circle cx="${cx}" cy="${cy}" r="3" fill="rgba(14,14,12,0.7)"/>`;
      // sound rings
      for (let s = 1; s <= 2; s++) {
        g += `<circle cx="${cx}" cy="${cy}" r="${r + s * 12}" fill="none" stroke="rgba(14,14,12,${0.06 - s * 0.02})" stroke-width="0.8"/>`;
      }
      // label
      g += `<text x="${cx}" y="${cy + r + 28}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" letter-spacing="2" fill="rgba(14,14,12,0.6)">${i === 0 ? "PARTNER A" : "PARTNER B"}</text>`;
    });
    // phase timeline
    const ty = h - 40;
    g += `<line x1="40" y1="${ty}" x2="${w - 40}" y2="${ty}" stroke="rgba(14,14,12,0.2)"/>`;
    const phases = ["PREP", "SPEAK A", "TRANSITION", "SPEAK B", "CLOSE", "COOLDOWN"];
    phases.forEach((p, i) => {
      const x = 40 + i * ((w - 80) / (phases.length - 1));
      g += `<line x1="${x}" y1="${ty - 4}" x2="${x}" y2="${ty + 4}" stroke="rgba(14,14,12,0.5)"/>`;
      g += `<text x="${x}" y="${ty + 18}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" letter-spacing="1.5" fill="rgba(14,14,12,${i === 1 ? 1 : 0.5})">${p}</text>`;
    });
    return g;
  }

  // ─────────── Augmented_Ops ───────────
  // Four sub-agency nodes orbiting central human-gate, command-center mood.
  function augmentedops(rng, w, h) {
    let g = `<rect width="${w}" height="${h}" fill="#08110d"/>`;
    const cx = w / 2, cy = h / 2;
    const R = Math.min(w, h) * 0.32;
    // background grid
    for (let x = 0; x < w; x += 40) g += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="rgba(0,255,180,0.04)"/>`;
    for (let y = 0; y < h; y += 40) g += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="rgba(0,255,180,0.04)"/>`;
    // outer scope rings
    for (let i = 0; i < 3; i++) {
      g += `<circle cx="${cx}" cy="${cy}" r="${R + i * 26}" fill="none" stroke="rgba(0,255,180,${0.18 - i * 0.05})" stroke-dasharray="${i === 1 ? "4 4" : ""}"/>`;
    }
    // central human gate (hexagon)
    const hex = [];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
      hex.push([cx + Math.cos(a) * 28, cy + Math.sin(a) * 28]);
    }
    g += `<polygon points="${hex.map(p => p.join(",")).join(" ")}" fill="rgba(0,255,180,0.12)" stroke="#00ffb4" stroke-width="1.4"/>`;
    g += `<text x="${cx}" y="${cy + 4}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9" fill="#00ffb4" letter-spacing="2">HUMAN</text>`;
    // 4 sub-agency nodes
    const labels = ["VSA", "CSA", "MSA", "RSA"];
    labels.forEach((l, i) => {
      const a = (i / 4) * Math.PI * 2 - Math.PI / 4;
      const x = cx + Math.cos(a) * R;
      const y = cy + Math.sin(a) * R;
      // connection
      g += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="rgba(0,255,180,0.4)" stroke-width="0.8"/>`;
      // node
      g += `<rect x="${x - 26}" y="${y - 14}" width="52" height="28" fill="rgba(0,255,180,0.06)" stroke="rgba(0,200,255,0.7)" stroke-width="1" rx="2"/>`;
      g += `<text x="${x}" y="${y + 4}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="#bff7e8" letter-spacing="2">${l}</text>`;
      // small mesh dots around each node
      for (let j = 0; j < 5; j++) {
        const ja = rng() * Math.PI * 2;
        const jr = 22 + rng() * 12;
        g += `<circle cx="${x + Math.cos(ja) * jr}" cy="${y + Math.sin(ja) * jr}" r="1.2" fill="rgba(0,255,180,${0.4 + rng() * 0.4})"/>`;
      }
    });
    // status readout (bottom)
    g += `<text x="40" y="${h - 30}" font-family="JetBrains Mono, monospace" font-size="9" fill="rgba(0,255,180,0.55)" letter-spacing="2">MESH · 4 AGENCIES · GATE OPEN · v0.4</text>`;
    g += `<text x="${w - 40}" y="${h - 30}" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="9" fill="rgba(0,200,255,0.55)" letter-spacing="2">AUGMENTED_OPS.INC</text>`;
    return g;
  }

  // ─────────── Frame ───────────
  function frame(w, h, light) {
    const c = light ? "rgba(14,14,12,0.5)" : "rgba(239,233,220,0.45)";
    const tick = (x, y, dir) => {
      if (dir === "h") return `<line x1="${x}" y1="${y}" x2="${x + 8}" y2="${y}" stroke="${c}" stroke-width="1"/>`;
      return `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 8}" stroke="${c}" stroke-width="1"/>`;
    };
    return `<g>${tick(8,8,"h")}${tick(8,8,"v")}${tick(w-16,8,"h")}${tick(w-1,8,"v")}${tick(8,h-1,"h")}${tick(8,h-16,"v")}${tick(w-16,h-1,"h")}${tick(w-1,h-16,"v")}</g>`;
  }

  const renderers = {
    Bazodiac: bazodiac,
    FuFirE: fufire,
    WhatsInIt: whatsinit,
    WhatsOrga: whatsorga,
    CoupleTime: coupletime,
    AugmentedOps: augmentedops
  };

  window.makeProjectThumbnail = function (project, opts = {}) {
    const w = opts.width || 800;
    const h = opts.height || 500;
    const rng = seedRand(project.thumbnailSeed || project.slug || project.id || "x");
    const renderer = renderers[project.thumbnailCategory] || bazodiac;
    const isLight = project.thumbnailCategory === "CoupleTime";
    return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${renderer(rng, w, h)}${frame(w, h, isLight)}</svg>`;
  };
})();
