---
title: 数学整理-第 1 周
date: 2025-12-26 21:15
tag: mistake
cover: /img/tag-mistake.jpg
mathjax: true
---

*第 1 周的数学错题整理...*

<div align="center">
    <h1>I. 被压一头的一次函数</h1>
    <p>根据不等式求一次函数参数取值范围</p>
</div>

## &zwnj;题目描述&zwnj; *Description*

如图， $ y1=-x+2 $， $ y2=kx-1 (k \neq 0, k为常数) $， 为使 $ \forall x<1, y1 > y2 恒成立$, 求 $ k $ 的取值范围。

<div align="right">
    <img src="/blog/img/2025/12/26/mistake-week1_0.png" alt="图1">
</div>

## &zwnj;题目分析&zwnj; *Analysis*

思路如下：

$$求交点坐标（有交点时）$$
$$\Downarrow$$
$$联立两个解析式，得 -x+2=kx-1$$
$$\Downarrow$$
$$解得 (\frac{3}{k+1}, \frac{2k-1}{k+1})$$

画图...

<div align="center">
    <img src="/blog/img/2025/12/26/mistake-week1_1.png" alt="图2">
    <img src="/blog/img/2025/12/26/mistake-week1_2.png" alt="图3">
</div>

两图为满足要求的临界。图1的斜率再高就会与 $ y1 $ 交于 $x < 1$ 的位置，不满足条件；图2同理。

因此 $ y2 $ 应绘制于实线圆弧内。

<div align="center">
    <img src="/blog/img/2025/12/26/mistake-week1_3.png" alt="图4">
</div>

$$求图1临界， 观察到交点横坐标为1$$
$$\Downarrow$$
$$得：\frac{3}{k+1}=1$$
$$\Downarrow$$
$$解得：k=2$$

---

$$求图2临界， 观察到无交点$$
$$\Downarrow$$
$$得：k+1=0$$
$$\Downarrow$$
$$解得：k=-1$$

---

$$注意到题目要求k\neq0， 记得写上$$

## &zwnj;解体步骤&zwnj; *Solution*

见分析。

答案如下：

$$\boxed{-1\leq k \leq 2 且 k \neq 0}$$

<br><br>

