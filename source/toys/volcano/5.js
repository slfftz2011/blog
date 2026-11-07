/* ---------- 爆发计时器 ---------- */
let eruptionTimer = 1.2;                 // 首帧后 1.2 秒就喷第一次
let ashAccum = 0;                        // 火山灰生成累加器
const ASH_RATE = 16;                     // 每秒生成多少团火山灰

/* ---------- 触发一次猛烈爆发 ---------- */
function erupt() {
  const C = VOLCANO;

  /* ---- ① 主爆发：大量高速火星（伞状扩散） ---- */
  const sparkCount = 150 + ((Math.random() * 60) | 0);
  for (let i = 0; i < sparkCount; i++) {
    const a  = Math.random() * Math.PI * 2;
    const rr = Math.sqrt(Math.random());
    const px = Math.cos(a) * rr * C.craterRX * 0.9;
    const pz = Math.sin(a) * rr * C.craterRY * 0.9;
    const py = -rr * 6;

    /* 关键改动：horiz 用 pow(·,0.6) 让分布偏向大值
       → 大多数粒子斜向外抛（伞面），少数 horiz≈0 的居中直冲（伞柄） */
    const horiz = Math.pow(Math.random(), 0.6) * 0.92;
    const speed = 430 + Math.random() * 640;

    const angH    = Math.random() * Math.PI * 2;
    const lateral = speed * horiz * 1.20;                          // 横向速度加大
    const vx = Math.cos(angH) * lateral;
    const vz = Math.sin(angH) * lateral * 0.80;
    const vy = -speed * Math.sqrt(Math.max(0.08, 1 - horiz * horiz)); // 居中仍冲得高

    spawnSpark(px, py, pz, vx, vy, vz,
               rand(3, 8),
               rand(2.4, 4.4));
  }

  /* ---- ② 少量带拖尾的熔岩弹 ---- */
  const bombCount = 6 + ((Math.random() * 4) | 0);
  for (let i = 0; i < bombCount; i++) {
    const a  = Math.random() * Math.PI * 2;
    const rr = Math.sqrt(Math.random());
    const speed = 820 + Math.random() * 620;
    const angH  = Math.random() * Math.PI * 2;
    const horiz = Math.random() * 0.5;
    const vx = Math.cos(angH) * speed * horiz;
    const vz = Math.sin(angH) * speed * horiz * 0.8;
    const vy = -speed * Math.sqrt(Math.max(0.1, 1 - horiz * horiz));

    spawnBomb(Math.cos(a) * rr * 70, -4, Math.sin(a) * rr * 20,
              vx, vy, vz,
              rand(8, 15),          // 熔岩弹更大
              rand(3.2, 4.8));
  }

  /* ---- ③ 爆发瞬间多喷一些火山灰 ---- */
  for (let i = 0; i < 14; i++) spawnAsh(true);

  /* ---- ④ 闪光 / 冲击波 / 画布震动 ---- */
  flash = 1;
  shake = 18;
  // 半径上限：30 + 330×1.05 ≈ 377，18 + 250×1.50 ≈ 393，均 < 400
  shockwaves.push({ r: 30, speed: 330, life: 1, duration: 1.05 });
  shockwaves.push({ r: 18, speed: 250, life: 1, duration: 1.50 });
}