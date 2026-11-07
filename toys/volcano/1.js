'use strict';

/* ---------- 画布与 DPR ---------- */
const W = 960, H = 540;
const canvas = document.getElementById('volcano');
const ctx = canvas.getContext('2d', { alpha: false });

let DPR = 1;
function resizeCanvas() {
  // 后备缓冲按 devicePixelRatio 放大，绘制坐标始终是 960×540
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width  = Math.round(W * DPR);
  canvas.height = Math.round(H * DPR);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

/* ---------- 伪 3D 投影 ---------- */
const OX = 480, OY = 300;      // z=0 平面上的投影原点 = 火山口中心
const FOCAL = 620;             // 焦距：越大透视越弱

// 世界坐标 (x, y, z) → 屏幕坐标；y 向下为正，z 越大越远
function project(x, y, z) {
  const s = FOCAL / (FOCAL + z);            // 透视缩放系数
  return { x: OX + x * s, y: OY + y * s, s };
}

/* ---------- 物理与全局配置 ---------- */
const GRAVITY = 800;           // 重力加速度（世界单位/秒²）
const MAX_PARTICLES = 800;     // 粒子数量上限，保护性能

/* ===== 替换第 1 块里的 VOLCANO 常量 ===== */
const VOLCANO = {
  baseL: 40,   baseR: 920, baseY: 512,   // 山脚扩到画布两侧
  craterCX: 490, craterCY: 296,          // 火山口中心右移 10px（原 480）
  craterRX: 96,  craterRY: 26,
};

/* ---------- 混合模式切换守卫（避免每帧反复设置状态） ---------- */
let currentOp = 'source-over';
function setOp(op) {
  if (op !== currentOp) { ctx.globalCompositeOperation = op; currentOp = op; }
}

/* ---------- 小工具 ---------- */
const clamp = (v, a, b) => v < a ? a : (v > b ? b : v);
const rand  = (a, b) => a + Math.random() * (b - a);