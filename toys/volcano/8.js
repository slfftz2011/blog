/* ---------- 每帧更新 ---------- */
function update(dt) {
    // ① 爆发计时：3~5 秒一次
    eruptionTimer -= dt;
    if (eruptionTimer <= 0) {
      erupt();
      eruptionTimer = rand(3, 5);
    }
  
    // ② 火山灰持续生成
    updateAsh(dt);
  
    // ③ 粒子物理
    updateParticles(dt);
  
    // ④ 闪光 / 震动指数衰减（与帧率无关）
    flash *= Math.exp(-3.0 * dt);
    if (flash < 0.002) flash = 0;
    shake *= Math.exp(-6.0 * dt);
    if (shake < 0.1) shake = 0;
  
    // ⑤ 冲击波扩散
    updateShockwaves(dt);
  }
  
  /* ---------- 每帧绘制 ---------- */
  function render() {
    // 重置基础变换（DPR 缩放），保证逻辑坐标始终 960×540
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    currentOp = 'source-over';
  
    // ---- 画布震动：整体平移 ----
    const shX = (Math.random() * 2 - 1) * shake;
    const shY = (Math.random() * 2 - 1) * shake;
  
    ctx.save();
    ctx.translate(shX, shY);
  
    // 1. 背景
    drawSky();
    drawGround();
  
    // 2. 按 z 排序：z 越大越远 → 先画
    particles.sort((a, b) => b.z - a.z);
  
    // 3. 山体"后面"的粒子（z > 0）
    let i = 0;
    while (i < particles.length && particles[i].z > 0) {
      drawParticle(particles[i++]);
    }
  
    // 4. 山体（位于 z = 0 平面）
    drawVolcano();
  
    // 5. 山体"前面"的粒子（z <= 0）
    while (i < particles.length) {
      drawParticle(particles[i++]);
    }
  
    // 6. 叠加特效（发光层）
    drawShockwaves();
    drawCraterFlash();
  
    ctx.restore();
  }
  
  /* ---------- requestAnimationFrame 主循环 ---------- */
  let lastTime = 0;
  function frame(now) {
    if (!lastTime) lastTime = now;
  
    // deltaTime 换算成秒，并钳制上限：切标签页回来时避免"时间跳跃"
    let dt = (now - lastTime) / 1000;
    lastTime = now;
    dt = Math.min(dt, 0.05);
  
    update(dt);
    render();
  
    requestAnimationFrame(frame);
  }
  
  requestAnimationFrame(frame);

  /* ===== 加分项：点击画布触发一次小爆发（主爆发的 40% 粒子量） ===== */
function eruptSmall() {
  const C = VOLCANO;

  // 火星：数量 = 主爆发（150~210）× 0.4 ≈ 60~84
  const sparkCount = Math.round((150 + Math.random() * 60) * 0.4);
  for (let i = 0; i < sparkCount; i++) {
    const a  = Math.random() * Math.PI * 2;
    const rr = Math.sqrt(Math.random());
    const px = Math.cos(a) * rr * C.craterRX * 0.9;
    const pz = Math.sin(a) * rr * C.craterRY * 0.9;
    const py = -rr * 6;

    // 沿用伞状分布，但整体速度略降，符合"小"爆发
    const horiz = Math.pow(Math.random(), 0.6) * 0.92;
    const speed = (430 + Math.random() * 640) * 0.72;

    const angH    = Math.random() * Math.PI * 2;
    const lateral = speed * horiz * 1.20;
    const vx = Math.cos(angH) * lateral;
    const vz = Math.sin(angH) * lateral * 0.80;
    const vy = -speed * Math.sqrt(Math.max(0.08, 1 - horiz * horiz));

    spawnSpark(px, py, pz, vx, vy, vz, rand(3, 8), rand(2.0, 3.6));
  }

  // 熔岩弹：数量 = 主爆发（6~10）× 0.4 ≈ 2~4
  const bombCount = Math.round((6 + Math.random() * 4) * 0.4);
  for (let i = 0; i < bombCount; i++) {
    const a  = Math.random() * Math.PI * 2;
    const rr = Math.sqrt(Math.random());
    const speed = (820 + Math.random() * 620) * 0.70;
    const angH  = Math.random() * Math.PI * 2;
    const horiz = Math.random() * 0.5;
    const vx = Math.cos(angH) * speed * horiz;
    const vz = Math.sin(angH) * speed * horiz * 0.8;
    const vy = -speed * Math.sqrt(Math.max(0.1, 1 - horiz * horiz));

    spawnBomb(Math.cos(a) * rr * 70, -4, Math.sin(a) * rr * 20,
              vx, vy, vz, rand(8, 15), rand(3.2, 4.8));
  }

  // 轻量反馈：小闪光 + 轻微震动（取 max，避免打断正在进行的强爆发表现）
  flash = Math.max(flash, 0.45);
  shake = Math.max(shake, 7);
}

canvas.addEventListener('pointerdown', () => { eruptSmall(); });