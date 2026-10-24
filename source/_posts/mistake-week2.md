---
title: 数学整理-第 2 周
date: 2025-12-31 15:50
tag: maths
mathjax: true
---

*第 2 周的数学错题整理...*

<div align="center">
    <h1>I. 专项突破一 - T4</h1>
    <p>截长补短的辅助线作法</p>
</div>

## &zwnj;题目描述&zwnj; *Description*

如图， $ 在 \triangle ABC 中 $， $ AB=AC $， $ AD 是 BC 边上的高线 $， $ EF 垂直平分 AB $， $ 分别交 AB，AC，AD 于点 E,F,G $。 $ 若 \angle BAC=45^{\circ}， EG=1 $， $ 则 CF 长为 \underline{\ \ \ \ \ \ }$。

<div align="right">
    <img src="/blog/img/2025/12/31/mistake-week2_0.png" alt="图1">
</div>

## &zwnj;题目分析&zwnj; *Analysis*

**第一种思路：**

$$ 题目要求 CF 的长。而已知 EG 的长。$$
$$ \Downarrow $$
$$ 可以转移 CF 到 EG 或其所在线段上。 $$
$$ \Downarrow $$
$$ 可以尝试使用相似三角形求。 $$
$$ \Downarrow $$
$$ 构造包含这两条边的相似三角形 $$

---

**第二种思路：**

$$ 有等腰和高线。$$
$$ \Downarrow $$
$$ 三线合一得到角平分线。 $$
$$ \Downarrow $$
$$ 角平分线基本性质：其上点到角两边距离相等。 $$
$$ \Downarrow $$
$$ 转移 EG 到 \triangle AGF 内。$$

## &zwnj;解体步骤&zwnj; *Solution*

### $ 法1_{ \ \ Function 1}$

<div align="right">
    <img src="/blog/img/2025/12/31/mistake-week2_1.png" alt="图1">
</div>

$$作 GH \perp AF$$
$$\because 在 \triangle ABC 中，AB=AC，AD 为 BC 边上的高线$$
$$\therefore \angle BAD = \angle CAD$$
$$\because EF 垂直平分 AB$$
$$\therefore EF \perp AB， 即 \angle AEF = 90^{\circ}$$
$$\because GH \perp AF，EG = 1$$
$$\therefore GF = EG = 1$$
$$\because \angle BAC = 45^{\circ}$$
$$\therefore \angle AFE = 180^{\circ} - \angle BAC - \angle AEF = 45^{\circ}$$
$$\therefore \triangle FGH 为等腰直角三角形$$
$$\therefore FG = \sqrt{2}$$
$$\therefore EF = \sqrt{2} + 1$$
$$\therefore AC = AB = 2 \sqrt{2} + 2，AE = \sqrt{2} + 2$$
$$\therefore CF = \sqrt{2} （勾股，这里不过多赘述）$$

---

### $ 法2_{ \ \ Function 2}$

<div align="right">
    <img src="/blog/img/2025/12/31/mistake-week2_2.png" alt="图1">
</div>

$$连结 BF$$
$$\because EF 垂直平分 AB$$
$$\therefore \angle AEF = 90^{\circ}，EF 平分 \angle AFB$$
$$\because \angle BAC = 45^{\circ}$$
$$\therefore \angle BFC = 2 \angle AFE = 90^{\circ}$$
$$\because AB = AC$$
$$\therefore \angle ABD = \angle C$$
$$\because AD 为高线$$
$$\therefore \angle BAD + \angle ABD = \angle FBC + \angle C = 90^{\circ}$$
$$\therefore \angle BAD = \angle FBC$$
$$在 \triangle AEG 和 \triangle BFC 中$$
$$
\begin{cases}
\angle BAD = \angle FBC\\\\
\angle ABD = \angle C
\end{cases}
$$
$$\therefore \triangle AEG \sim \triangle BFC$$
$$\therefore \frac{CF}{EG} = \frac{BF}{AE} = \frac{\sqrt{2}}{1}$$
$$\because EG = 1$$
$$\therefore CF = \sqrt{2}$$

---

答案如下：

$$\boxed{CF = \sqrt{2}}$$

<br><br>

<div align="center">
    <h1>II. U1 复习 - T10</h1>
</div>

## &zwnj;题目描述&zwnj; *Description*

如图， $ 在 \triangle ABC 中 $， $ \angle ABC = 60^{\circ} $， $ AD，CE分别平分 \angle BAC 和 \angle ACB。 下列说法正确的有 $

1. $\angle AFC = 120^{\circ}$
2. $S_{\triangle ABD} = S_{\triangle ADC}$
3. $若 AB = 2AE， 则 CE \perp AB$
4. $CD + AE = AC$
5. $S_{\triangle AEF} : S_{\triangle FDC} = AF : FC$

<div align="right">
    <img src="/blog/img/2025/12/31/mistake-week2_3.png" alt="图1">
</div>

## &zwnj;题目分析&zwnj; *Analysis*

1. $\frac{1}{2} \angle ABC + 90^{\circ}$ ，过。
2. 瞪眼法，这并不是等边三角形。
3. 三线合一，过。
4. $作 DH \perp CE， DH 交 AC 于 H$， 两个等腰，过。
5. 其实可以排除了。硬要做就是往两边作高.

## &zwnj;解体步骤&zwnj; *Solution*

略

答案如下：

$$\boxed{1,2,4,5}$$