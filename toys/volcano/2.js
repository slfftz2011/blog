/* ---------- 预渲染径向光斑精灵 ---------- */
function makeSprite(size, stops) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    for (const [pos, color] of stops) grad.addColorStop(pos, color);
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
    return c;
  }
  
  const SPR = {
    // 白热（刚喷出的高温粒子）
    hot: makeSprite(64, [
      [0.00, 'rgba(255,255,245,1)'],
      [0.25, 'rgba(255,228,150,0.85)'],
      [0.55, 'rgba(255,140,40,0.25)'],
      [1.00, 'rgba(255,80,0,0)'],
    ]),
    // 橙焰（中温）
    fire: makeSprite(64, [
      [0.00, 'rgba(255,235,180,1)'],
      [0.28, 'rgba(255,160,55,0.80)'],
      [0.60, 'rgba(230,70,10,0.22)'],
      [1.00, 'rgba(180,30,0,0)'],
    ]),
    // 暗红余烬（低温 / 熔岩弹拖尾）
    ember: makeSprite(64, [
      [0.00, 'rgba(255,180,110,1)'],
      [0.30, 'rgba(220,80,25,0.70)'],
      [0.65, 'rgba(140,25,0,0.18)'],
      [1.00, 'rgba(90,10,0,0)'],
    ]),
    // 火山灰：更暗、更灰、中心更实（遮挡感更强）
    ash: makeSprite(64, [
      [0.00, 'rgba(96,90,87,0.96)'],
      [0.40, 'rgba(74,69,67,0.55)'],
      [0.72, 'rgba(52,48,47,0.20)'],
      [1.00, 'rgba(36,33,32,0)'],
    ]),
  };