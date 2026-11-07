/* ===== 完整替换第 4 块的 volcanoPath() ===== */
function volcanoPath() {
  const { baseL, baseR, baseY, craterCX, craterCY, craterRX, craterRY } = VOLCANO;
  const topL = craterCX - craterRX;      // 火山口左缘
  const topR = craterCX + craterRX;      // 火山口右缘

  /* 上陡下缓：控制点贴着火山口的 x、贴着山脚的 y。
     → 山脚处切线接近水平（缓），火山口处切线接近垂直（陡）。 */
  const ctrlLy = baseY - (baseY - craterCY) * 0.12;
  const ctrlLx = topL - (topL - baseL) * 0.16;
  const ctrlRy = baseY - (baseY - craterCY) * 0.12;
  const ctrlRx = topR + (baseR - topR) * 0.16;

  ctx.beginPath();
  ctx.moveTo(baseL, baseY);
  ctx.quadraticCurveTo(ctrlLx, ctrlLy, topL, craterCY);
  // 火山口上沿：椭圆上半弧（π → 2π），起点正好接住左坡终点
  ctx.ellipse(craterCX, craterCY, craterRX, craterRY, 0, Math.PI, Math.PI * 2, false);
  ctx.quadraticCurveTo(ctrlRx, ctrlRy, baseR, baseY);
  ctx.closePath();
}
  
  /* ---------- 预生成山体岩石纹理线（固定种子，只跑一次） ---------- */
  const ridges = [];
  (function buildRidges() {
    const V = VOLCANO;
    for (let i = 0; i < 32; i++) {
      const t = Math.random();
      ridges.push({
        topX: V.craterCX - V.craterRX + t * V.craterRX * 2,
        botX: V.baseL + t * (V.baseR - V.baseL),
        bend: (Math.random() - 0.5) * 70,
        w: 1 + Math.random() * 2,
        a: 0.05 + Math.random() * 0.12,
      });
    }
  })();
  
  /* ---------- 绘制整座火山 ---------- */
function drawVolcano() {
  /* ===== 关键修复：强制恢复不透明绘制 =====
     上一阶段粒子绘制会把 composite 改成 'lighter'、globalAlpha 改成 <1，
     不复位的话山体会半透明且每帧闪烁。 */
  ctx.globalCompositeOperation = 'source-over';
  currentOp = 'source-over';
  ctx.globalAlpha = 1;

  const { baseL, baseR, baseY, craterCX, craterCY, craterRX, craterRY } = VOLCANO;

  /* ---- ① 山脚投影（压扁的径向暗影） ---- */
  ctx.save();
  ctx.translate(craterCX, baseY + 6);
  ctx.scale(1, 0.15);
  const sg = ctx.createRadialGradient(0, 0, 30, 0, 0, 460);
  sg.addColorStop(0.00, 'rgba(0,0,0,0.90)');
  sg.addColorStop(0.50, 'rgba(0,0,0,0.45)');
  sg.addColorStop(1.00, 'rgba(0,0,0,0)');
  ctx.fillStyle = sg;
  ctx.beginPath();
  ctx.arc(0, 0, 460, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  /* ---- ② 主体基础色：左暖右冷的水平渐变 ---- */
  volcanoPath();
  const bodyGrad = ctx.createLinearGradient(baseL, 0, baseR, 0);
  bodyGrad.addColorStop(0.00, '#7d5c44');   // 左侧受光
  bodyGrad.addColorStop(0.10, '#664833');
  bodyGrad.addColorStop(0.30, '#422d20');
  bodyGrad.addColorStop(0.50, '#2a1b14');
  bodyGrad.addColorStop(0.70, '#190f0c');
  bodyGrad.addColorStop(0.88, '#0d0707');   // 右侧背光
  bodyGrad.addColorStop(1.00, '#060303');
  ctx.fillStyle = bodyGrad;
  ctx.fill();

  /* ---- ③ 体积光影层（全部裁剪在山体内） ---- */
  ctx.save();
  volcanoPath();
  ctx.clip();

  // 3a. 左侧球状受光：中心上移到坡面中上部，山脚自然落在衰减末端
  const litRadial = ctx.createRadialGradient(
    craterCX - 260, 360, 10,
    craterCX - 260, 360, 300
  );
  litRadial.addColorStop(0.00, 'rgba(255,212,162,0.40)');
  litRadial.addColorStop(0.30, 'rgba(255,182,122,0.19)');
  litRadial.addColorStop(0.62, 'rgba(200,120,70,0.05)');
  litRadial.addColorStop(1.00, 'rgba(200,120,70,0)');
  ctx.fillStyle = litRadial;
  ctx.fillRect(baseL - 20, craterCY - 40, craterCX - baseL + 60, baseY - craterCY + 60);

  // 3b. 右侧球状暗影：背光面压深，立体感的主要来源
  const darkRadial = ctx.createRadialGradient(
    craterCX + 320, 400, 10,
    craterCX + 320, 400, 360
  );
  darkRadial.addColorStop(0.00, 'rgba(0,0,0,0.68)');
  darkRadial.addColorStop(0.45, 'rgba(0,0,0,0.40)');
  darkRadial.addColorStop(0.80, 'rgba(0,0,0,0.12)');
  darkRadial.addColorStop(1.00, 'rgba(0,0,0,0)');
  ctx.fillStyle = darkRadial;
  ctx.fillRect(craterCX - 40, craterCY - 40, baseR - craterCX + 80, baseY - craterCY + 60);

  // 3c. 左坡轮廓高光：控制点与 volcanoPath() 一致，亮度沿高度渐变、到山脚归零
  const topL2   = craterCX - craterRX;
  const ctrlLx2 = topL2 - (topL2 - baseL) * 0.16;
  const ctrlLy2 = baseY - (baseY - craterCY) * 0.12;

  const edgeLGrad = ctx.createLinearGradient(0, craterCY, 0, baseY);
  edgeLGrad.addColorStop(0.00, 'rgba(255,232,200,0.22)');
  edgeLGrad.addColorStop(0.55, 'rgba(255,214,172,0.10)');
  edgeLGrad.addColorStop(1.00, 'rgba(255,200,150,0)');   // 到山脚完全消失

  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(topL2 + 2, craterCY + 2);
  ctx.quadraticCurveTo(ctrlLx2, ctrlLy2, baseL + 6, baseY - 2);
  ctx.lineWidth = 7;
  ctx.strokeStyle = 'rgba(255,215,170,0.05)';
  ctx.stroke();
  ctx.lineWidth = 3;
  ctx.strokeStyle = edgeLGrad;
  ctx.stroke();

  // 3d. 右坡熔岩反射轮廓光：同样到山脚淡出
  const topR2   = craterCX + craterRX;
  const ctrlRx2 = topR2 + (baseR - topR2) * 0.16;
  const ctrlRy2 = baseY - (baseY - craterCY) * 0.12;

  const edgeRGrad = ctx.createLinearGradient(0, craterCY, 0, baseY);
  edgeRGrad.addColorStop(0.00, 'rgba(255,140,60,0.18)');
  edgeRGrad.addColorStop(0.55, 'rgba(255,120,45,0.08)');
  edgeRGrad.addColorStop(1.00, 'rgba(255,100,35,0)');

  ctx.beginPath();
  ctx.moveTo(topR2 - 2, craterCY + 2);
  ctx.quadraticCurveTo(ctrlRx2, ctrlRy2, baseR - 6, baseY - 2);
  ctx.lineWidth = 8;
  ctx.strokeStyle = 'rgba(255,110,40,0.05)';
  ctx.stroke();
  ctx.lineWidth = 3;
  ctx.strokeStyle = edgeRGrad;
  ctx.stroke();

  // 3e. 火山口正下方的环境光遮蔽（AO）：凸出"火山口是凹陷"的感觉
  const aoGrad = ctx.createRadialGradient(
    craterCX, craterCY + craterRY + 6, 6,
    craterCX, craterCY + 50, 240
  );
  aoGrad.addColorStop(0.00, 'rgba(0,0,0,0.62)');
  aoGrad.addColorStop(0.45, 'rgba(0,0,0,0.26)');
  aoGrad.addColorStop(1.00, 'rgba(0,0,0,0)');
  ctx.fillStyle = aoGrad;
  ctx.fillRect(craterCX - 240, craterCY, 480, 280);

  // 3f. 火山口外圈熔岩光晕：口沿向四周辐射的橙光，爆发时更亮
  const haloGrad = ctx.createRadialGradient(
    craterCX, craterCY, craterRX * 0.6,
    craterCX, craterCY, craterRX * 2.6
  );
  haloGrad.addColorStop(0.00, `rgba(255,120,40,${0.20 + flash * 0.35})`);
  haloGrad.addColorStop(0.50, 'rgba(200,70,20,0.07)');
  haloGrad.addColorStop(1.00, 'rgba(120,30,0,0)');
  ctx.globalCompositeOperation = 'lighter';
  currentOp = 'lighter';
  ctx.fillStyle = haloGrad;
  ctx.fillRect(craterCX - craterRX * 2.6, craterCY - craterRX * 2.6,
               craterRX * 5.2, craterRX * 5.2);
  ctx.globalCompositeOperation = 'source-over';
  currentOp = 'source-over';

  // 3g. 岩石沟壑：左半用亮线、右半用暗线，强化光照方向
  for (const r of ridges) {
    ctx.beginPath();
    ctx.moveTo(r.topX, craterCY + 4);
    ctx.quadraticCurveTo(
      (r.topX + r.botX) / 2 + r.bend, (craterCY + baseY) / 2,
      r.botX, baseY
    );
    const isLit = r.topX < craterCX;
    ctx.strokeStyle = isLit
      ? `rgba(255,214,176,${r.a * 0.60})`
      : `rgba(0,0,0,${r.a * 1.10})`;
    ctx.lineWidth = r.w;
    ctx.stroke();
  }

  // 3h. 山脚压暗：山腰以下逐渐沉入背景色，彻底消除底部发亮
  const sinkGrad = ctx.createLinearGradient(0, craterCY + 90, 0, baseY + 8);
  sinkGrad.addColorStop(0.00, 'rgba(5,4,6,0)');
  sinkGrad.addColorStop(0.50, 'rgba(5,4,6,0.28)');
  sinkGrad.addColorStop(0.82, 'rgba(4,3,5,0.62)');
  sinkGrad.addColorStop(1.00, 'rgba(3,2,4,0.85)');   // 最底部几乎与地面同色
  ctx.fillStyle = sinkGrad;
  ctx.fillRect(baseL - 40, craterCY + 80, (baseR - baseL) + 80, (baseY - craterCY) + 30);

  ctx.restore();

  /* ---- ④ 火山口：透视椭圆（内壁凹陷 + 熔岩照亮） ---- */
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(craterCX, craterCY, craterRX, craterRY, 0, 0, Math.PI * 2);
  ctx.clip();

  // 4a. 内壁底色
  ctx.fillStyle = '#0a0505';
  ctx.fillRect(craterCX - craterRX, craterCY - craterRY, craterRX * 2, craterRY * 2);

  // 4b. 内壁明暗：远侧（上）更暗，近侧（下）被熔岩照亮 → 凹陷感
  const innerGrad = ctx.createLinearGradient(0, craterCY - craterRY, 0, craterCY + craterRY);
  innerGrad.addColorStop(0.00, 'rgba(6,2,2,1)');
  innerGrad.addColorStop(0.55, 'rgba(20,8,5,1)');
  innerGrad.addColorStop(0.85, 'rgba(52,20,10,1)');
  innerGrad.addColorStop(1.00, 'rgba(70,28,14,1)');
  ctx.fillStyle = innerGrad;
  ctx.fillRect(craterCX - craterRX, craterCY - craterRY, craterRX * 2, craterRY * 2);

  // 4c. 熔岩光（叠加发光）
  ctx.globalCompositeOperation = 'lighter';
  currentOp = 'lighter';
  const lavaGlow = 0.32 + flash * 0.68;
  const lg = ctx.createRadialGradient(
    craterCX, craterCY + craterRY * 0.25, 2,
    craterCX, craterCY + craterRY * 0.25, craterRX * 0.95
  );
  lg.addColorStop(0.00, `rgba(255,200,110,${0.90 * lavaGlow})`);
  lg.addColorStop(0.35, `rgba(255,120,40,${0.45 * lavaGlow})`);
  lg.addColorStop(0.70, `rgba(220,60,15,${0.15 * lavaGlow})`);
  lg.addColorStop(1.00, 'rgba(100,15,0,0)');
  ctx.fillStyle = lg;
  ctx.fillRect(craterCX - craterRX, craterCY - craterRY, craterRX * 2, craterRY * 2);

  // 4d. 口沿下缘的亮边：熔岩在近侧内壁的反射
  const rimGrad = ctx.createLinearGradient(0, craterCY, 0, craterCY + craterRY);
  rimGrad.addColorStop(0.0, 'rgba(255,150,60,0)');
  rimGrad.addColorStop(1.0, `rgba(255,190,100,${0.35 + flash * 0.45})`);
  ctx.fillStyle = rimGrad;
  ctx.fillRect(craterCX - craterRX, craterCY, craterRX * 2, craterRY);

  ctx.restore();

  /* restore 把 canvas 的 composite 还原成 source-over，
     但 currentOp 变量还停在 'lighter'，必须手动同步，否则后面 setOp 判断会失效 */
  ctx.globalCompositeOperation = 'source-over';
  currentOp = 'source-over';
  ctx.globalAlpha = 1;

  /* ---- ⑤ 火山口外沿描边（强调岩石厚度） ---- */
  ctx.beginPath();
  ctx.ellipse(craterCX, craterCY, craterRX, craterRY, 0, Math.PI, Math.PI * 2);
  ctx.strokeStyle = `rgba(255,175,120,${0.20 + flash * 0.35})`;
  ctx.lineWidth = 2.2;
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(craterCX, craterCY, craterRX + 1, craterRY + 1, 0, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(0,0,0,0.50)';
  ctx.lineWidth = 1;
  ctx.stroke();
}