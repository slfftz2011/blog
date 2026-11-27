---
title: Web 开发系列教程  第一章：HTML
date: 2026-11-07 20:10:00
tags: 
    - web
    - tutorial
    - html
    - css
    - contents
---

<div align=center>
  <h1>Web 开发系列教程：从入门到入土</h1>
  <h2>第一部：页面结构与样式基础</h2>
  <br>
  <h1>第一章：HTML</h1>
  <h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——结构、语义与常用标签</h2>
</div>

第零章把工具装好了，页面也能跑起来了。从这一章开始，正式写 HTML。

HTML 不负责好看，它只干一件事：**说清楚每块内容是什么**。哪段是标题，哪段是正文，哪块是导航，哪张是图片——浏览器、搜索引擎、屏幕阅读器，都靠 HTML 来理解你的页面。所以这一章不急着让你“做出一个漂亮的页面”，而是先把骨架搭对：一个 HTML 文件由哪几块组成，常用标签各管什么，怎么用语义化标签把结构写得清清楚楚。

只有在骨架搭好了，后续样式施工队才能进入装修。

<!-- more -->

- **1.1 一个 HTML 文件里到底有什么**
  - `&lt;!DOCTYPE html&gt;`、`&lt;html&gt;`、`&lt;head&gt;`、`&lt;body&gt;`：四块各管什么
  - `&lt;meta charset="UTF-8"&gt;`：中文乱码的根源
  - `&lt;title&gt;` 与 `&lt;meta name="viewport"&gt;`：标签页标题和手机适配的第一行

- **1.2 标题、段落与文本标签**
  - `&lt;h1&gt;`～`&lt;h6&gt;`：六级标题，别跳级用
  - `&lt;p&gt;`、`&lt;br&gt;`、`&lt;hr&gt;`：段落、换行、分割线
  - `&lt;strong&gt;`、`&lt;em&gt;`、`&lt;code&gt;`、`&lt;blockquote&gt;`：强调、代码与引用

- **1.3 列表与链接**
  - `&lt;ul&gt;`、`&lt;ol&gt;`、`&lt;li&gt;`：无序列表与有序列表
  - `&lt;a&gt;` 与 `href`：链接的核心
  - 相对路径与绝对路径：`./`、`../`、`/`、`https://`

- **1.4 图片与媒体**
  - `&lt;img&gt;` 的 `src` 和 `alt`：`alt` 为什么不是可选项
  - `&lt;figure&gt;`、`&lt;figcaption&gt;`：图文组合
  - `&lt;audio&gt;`、`&lt;video&gt;`：基础用法与 `controls`

- **1.5 语义化标签：让结构自己说话**
  - 为什么不用一堆 `&lt;div&gt;` 走天下
  - `&lt;header&gt;`、`&lt;nav&gt;`、`&lt;main&gt;`、`&lt;footer&gt;`：页面四大区
  - `&lt;section&gt;`、`&lt;article&gt;`、`&lt;aside&gt;`：内容分区怎么选

- **1.6 块级、行内与 div/span**
  - 块级元素与行内元素的区别
  - `&lt;div&gt;` 和 `&lt;span&gt;`：无语义的“万能容器”
  - 元素嵌套规则：`&lt;p&gt;` 里不能放 `&lt;div&gt;`，`&lt;a&gt;` 里能不能放按钮

- **1.7 综合实战：一篇结构清晰的文章页**
  - 先画结构草图，再写 HTML
  - 逐块实现，对照语义化标签选型
  - 用 DevTools 的 Elements 面板自查结构

> 本章目标：
>
> - 能写出一个完整的 HTML 文档骨架，无中文乱码现象
> - 掌握标题、段落、列表、链接、图片等常用标签的正确用法
> - 理解语义化标签的意义，能用 `&lt;header&gt;`、`&lt;main&gt;`、`&lt;footer&gt;` 组织页面
> - 独立完成一个结构清晰的文章页，通过 DevTools 检查层次是否合理
> - 养成“遇到不认识的标签先查 MDN”的习惯