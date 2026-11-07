/* ---------- 全局特效状态 ---------- */
let flash = 0;          // 火山口闪光强度 0~1
let shake = 0;          // 画布震动幅度（像素）
const shockwaves = [];  // 冲击波列表

/* ---------- 冲击波更新 ---------- */
function updateShockwaves(dt) {
  for (let i = shockwaves.length - 1; i >= 0; i--) {
    const s = shockwaves[i];
    s.r += s.speed * dt;             // 半径扩散
    s.life -= dt / s.duration;       // 生命递减
    if (s.life <= 0) shockwaves.splice(i, 1);
  }
}

function drawShockwaves() {
  ctx.globalAlpha = 1;
  if (!shockwaves.length) return;
  setOp('lighter');
  for (const s of shockwaves) {
    const k  = clamp(s.life, 0, 1);              // 1 → 0
    const rk = clamp(1 - s.r / 400, 0, 1);       // 半径衰减：越接近 400 越淡
    const a  = 0.42 * k * k * rk * rk;           // 双重平方 → 快速消失
    if (a < 0.005) continue;

    ctx.beginPath();
    ctx.ellipse(VOLCANO.craterCX, VOLCANO.craterCY,
                s.r, s.r * 0.40, 0, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,${(120 + 80 * k) | 0},${(50 * k) | 0},${a})`;
    ctx.lineWidth = 1 + 6 * k * rk;              // 线宽也随半径收细
    ctx.stroke();
  }
}

/* ---------- 火山口强闪光 ---------- */
function drawCraterFlash() {
  ctx.globalAlpha = 1;      
  if (flash < 0.01) return;
  const R = 120 + flash * 320;
  setOp('lighter');
  const g = ctx.createRadialGradient(
    VOLCANO.craterCX, VOLCANO.craterCY, 0,
    VOLCANO.craterCX, VOLCANO.craterCY, R
  );
  g.addColorStop(0.00, `rgba(255,255,230,${0.90 * flash})`);
  g.addColorStop(0.15, `rgba(255,200,110,${0.55 * flash})`);
  g.addColorStop(0.50, `rgba(255,110,30,${0.18 * flash})`);
  g.addColorStop(1.00, 'rgba(255,60,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(VOLCANO.craterCX - R, VOLCANO.craterCY - R, R * 2, R * 2);
}