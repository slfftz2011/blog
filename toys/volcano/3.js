/* ---------- 粒子池 ---------- */
const particles = [];

/* ---------- 生成火星 ---------- */
function spawnSpark(x, y, z, vx, vy, vz, size, life) {
  if (particles.length >= MAX_PARTICLES) return;
  particles.push({
    type: 'spark',
    x, y, z, vx, vy, vz,
    size, life, maxLife: life,
    grav: 1,        // 重力系数
    drag: 0.16,     // 空气阻力系数
  });
}

function spawnBomb(x, y, z, vx, vy, vz, size, life) {
  if (particles.length >= MAX_PARTICLES) return;
  particles.push({
    type: 'bomb',
    x, y, z, vx, vy, vz,
    size: size * 1.3,        // 初始尺寸 +30%
    life, maxLife: life,
    grav: 1.05,
    drag: 0.10,
    trail: [],
    trailMax: 24,            // 拖尾点数 16 → 24
  });
}

/* ---------- 生成火山灰 ---------- */
function spawnAsh(boost) {
  if (particles.length >= MAX_PARTICLES) return;
  const a = Math.random() * Math.PI * 2;
  const rr = Math.sqrt(Math.random());      // 在圆内均匀取点
  const life = (6 + Math.random() * 4) * (boost ? 0.85 : 1);
  particles.push({
    type: 'ash',
    x: Math.cos(a) * rr * 80,
    y: -Math.random() * 30,
    z: Math.sin(a) * rr * 40,
    vx: (Math.random() - 0.5) * 50,
    vy: -60 - Math.random() * 100,
    vz: (Math.random() - 0.5) * 35,
    size: 18 + Math.random() * 16,           // 世界半径
    grow: 6 + Math.random() * 8,             // 每秒膨胀量
    life, maxLife: life,
    grav: -0.045,   // 负重力 = 浮力（缓慢上升）
    drag: 0.5,
  });
}

/* ---------- 粒子物理更新 ---------- */
function updateParticles(dt) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];

    p.life -= dt;
    if (p.life <= 0) { particles.splice(i, 1); continue; }

    // 重力 / 浮力
    p.vy += GRAVITY * p.grav * dt;

    // 空气阻力（指数衰减，与帧率无关）
    const damp = Math.exp(-p.drag * dt);
    p.vx *= damp; p.vy *= damp; p.vz *= damp;

    // 位移积分
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.z += p.vz * dt;

    // 限制 z 范围，防止投影失真
    p.z = clamp(p.z, -240, 520);

    // 火山灰持续膨胀
    if (p.grow) p.size += p.grow * dt;

    // 熔岩弹记录拖尾
    if (p.type === 'bomb') {
      p.trail.push({ x: p.x, y: p.y, z: p.z });
      if (p.trail.length > (p.trailMax || 16)) p.trail.shift();
    }

    // 掉出画面下方就回收
    if (p.type !== 'ash' && p.y > 240) { particles.splice(i, 1); continue; }
  }
}

/* ---------- 单个粒子绘制（核心：近大远小、近亮远暗） ---------- */
function drawParticle(p) {
  if (p.type === 'ash') { drawAsh(p); return; }

  const pr = project(p.x, p.y, p.z);
  const s  = pr.s;                                   // 透视缩放

  // 深度因子：0 = 最远，1 = 最近
  const depth = clamp((s - 0.62) / 1.05, 0, 1);

  const lifeK = p.life / p.maxLife;                  // 1 → 0
  const heat  = Math.pow(lifeK, 0.85);               // 温度衰减曲线

  // ---- 近大远小：世界尺寸 × 透视缩放 ----
  const shrink = 0.55 + 0.45 * heat;
  const r = p.size * s * shrink;
  if (r < 0.6) return;

  // ---- 近亮远暗：深度 + 温度共同决定亮度 ----
  const alpha = clamp((0.18 + 0.82 * depth) * (0.25 + 0.75 * heat), 0, 1);
  if (alpha < 0.01) return;

  // ---- 温度决定颜色：白热 → 橙焰 → 暗红余烬 ----
  let sprite = SPR.hot;
  if (heat < 0.68) sprite = SPR.fire;
  if (heat < 0.38) sprite = SPR.ember;

  // ---- 熔岩弹拖尾：从尾到头宽度/亮度差距拉大 ----
  if (p.type === 'bomb' && p.trail.length > 1) {
    setOp('lighter');
    const n = p.trail.length;
    for (let t = 0; t < n; t++) {
      const tp  = p.trail[t];
      const tpr = project(tp.x, tp.y, tp.z);
      const k   = t / (n - 1);                 // 0 = 最旧，1 = 最新
      const kk  = k * k;                       // 平方 → 新旧差距更明显
      const rr  = p.size * tpr.s * (0.10 + 0.95 * kk);  // 尾细头粗
      if (rr < 0.5) continue;
      ctx.globalAlpha = alpha * (0.06 + 0.62 * kk);     // 尾淡头亮
      ctx.drawImage(SPR.ember, tpr.x - rr, tpr.y - rr, rr * 2, rr * 2);
    }
  }

  // ---- 主体（叠加发光） ----
  setOp('lighter');
  ctx.globalAlpha = alpha;
  ctx.drawImage(sprite, pr.x - r, pr.y - r, r * 2, r * 2);
}

function drawAsh(p) {
  const pr = project(p.x, p.y, p.z);
  const lifeK = p.life / p.maxLife;                 // 1 → 0

  const fadeIn  = Math.min(1, (1 - lifeK) * 8);
  const fadeOut = Math.min(1, lifeK * 2.0);
  // 整体 alpha 0.30 → 0.20；刚出生时略微更实，快速成形
  const alpha = 0.20 * fadeIn * fadeOut * (0.6 + 0.4 * pr.s) * (0.85 + 0.15 * fadeIn);
  if (alpha < 0.005) return;

  const r = p.size * pr.s;
  setOp('source-over');          // 普通混合才能真正"压住"背景
  ctx.globalAlpha = alpha;
  ctx.drawImage(SPR.ash, pr.x - r, pr.y - r, r * 2, r * 2);
}