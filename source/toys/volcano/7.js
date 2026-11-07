/* ---------- 火山灰持续生成 ---------- */
function updateAsh(dt) {
    ashAccum += ASH_RATE * dt;
    while (ashAccum >= 1) { ashAccum -= 1; spawnAsh(false); }
  }
  
  /* ---------- 天空 + 远处热霾 ---------- */
  function drawSky() {
    // 夜空渐变
    const g = ctx.createLinearGradient(0, -40, 0, H + 40);
    g.addColorStop(0.00, '#04050a');
    g.addColorStop(0.45, '#0b0713');
    g.addColorStop(0.75, '#1b0d13');
    g.addColorStop(1.00, '#33130f');
    ctx.fillStyle = g;
    ctx.fillRect(-40, -40, W + 80, H + 80);
  
    // 火山背后的环境热霾（爆发时更亮）
    const haze = ctx.createRadialGradient(480, 320, 20, 480, 320, 620);
    haze.addColorStop(0.00, `rgba(120,40,14,${0.28 + flash * 0.25})`);
    haze.addColorStop(0.50, 'rgba(70,20,10,0.12)');
    haze.addColorStop(1.00, 'rgba(20,5,5,0)');
    ctx.fillStyle = haze;
    ctx.fillRect(-40, -40, W + 80, H + 80);
  }
  
  /* ---------- 地面 ---------- */
  function drawGround() {
    // 柔和过渡的地面
    const g = ctx.createLinearGradient(0, 430, 0, H + 40);
    g.addColorStop(0.00, 'rgba(26,13,10,0)');
    g.addColorStop(0.35, 'rgba(22,11,9,0.85)');
    g.addColorStop(1.00, '#050304');
    ctx.fillStyle = g;
    ctx.fillRect(-40, 430, W + 80, H - 430 + 60);
  
    // 山脚环境红光：大幅减弱并收窄，只在地面留下一层极淡的暖底
    setOp('lighter');
    const gg = ctx.createRadialGradient(480, 470, 10, 480, 470, 290);
    gg.addColorStop(0.00, 'rgba(110,36,10,0.13)');
    gg.addColorStop(0.55, 'rgba(90,28,8,0.05)');
    gg.addColorStop(1.00, 'rgba(90,28,8,0)');
    ctx.fillStyle = gg;
    ctx.fillRect(-40, 300, W + 80, 300);
    setOp('source-over');
  }