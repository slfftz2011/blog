---
title: Hello World!
date: 2025-12-21 16:30
tag: essay
---
# 说在前面

大家好！这是我的第一篇博客。

欢迎各位访问本站，目前本站仍在装修中。如有问题，请发邮箱至[slfftz502@163.com](mailto:slfftz520@163.com)。

我将会持续更新包括但不限于以下内容：

- 日常随笔
- 技术博客
- 产品介绍&使用说明
- 习题题解
- 编程、游戏教程
- 其他

本人初中生，存在不足敬请见谅。

# 你好，世界！

对于每个编程语言的初学者来说，输出 `Hello World!` 永远是他们踹开这扇大门的第一步。

第一篇博客写什么令人头疼。当看到 Hexo 默认的第一篇博客时，我突发奇想：为何不用我迄今所学所有编程语言来个 **Hello World! 大汇总** ?

于是，你便看到了这篇博客。

## Scratch （图形化编程）

[Scratch](https://scratch.mit.edu/) 是世界上最大的儿童编码社区，是一种具有简单视觉界面的编码语言。（该资料及以下资料均来自 [百度百科](https://baike.baidu.com/)）

如果你和我一样，在小学时参加信息素养提升比赛，你可能曾用它写了一个不错的小游戏。巧了，我也是。你也许没拿上一等奖。巧了，我也是。这不是偶然，由于 Scratch 奇特的政治背景，这会给无辜的你的作品降档，所以建议你参赛还是用其他语言吧。

### Hello World! （Scratch 版）

<div align="center">
    <img src="/blog/img/2025/12/21/hello-world_1.png" alt="Hello World! - Scratch">
</div>

## Python

[Python](https://www.python.org/) 由荷兰国家数学与计算机科学研究中心的吉多·范罗苏姆于1990年代初设计，作为一门叫做 ABC 语言的替代品。 Python 提供了高效的高级数据结构，还能简单有效地面向对象编程。

那还说啥啦， Python YYDS！

### Hello World! （Python 版）

```python
print("Hello World!")
```

## c++

C++ 是一种计算机高级程序设计语言，由C语言扩展升级而产生，最早于1979年由本贾尼·斯特劳斯特卢普在 AT&T 贝尔工作室研发。

C++ 既可以进行 C 语言的过程化程序设计，又可以进行以抽象数据类型为特点的基于对象的程序设计，还可以进行以继承和多态为特点的面向对象的程序设计。 C++ 擅长面向对象程序设计的同时，还可以进行基于过程的程序设计。

我的评价是：一门竞赛语言，其他时候一无是处。

请参阅：[cpp 基金会](https://isocpp.org/)

### Hello World! （C++ 版）

```cpp
#include <iostream>
using namespace std;
int main()
{
    cout << "Hello World!" << endl;
    return 0;
}
```

## Java

[Java](https://www.java.com/) 是一门面向对象的编程语言，不仅吸收了C++语言的各种优点，还摒弃了 C++ 里难以理解的多继承、指针等概念，因此 Java 语言具有功能强大和简单易用两个特征。 Java 语言作为静态面向对象编程语言的代表，极好地实现了面向对象理论，允许程序员以优雅的思维方式进行复杂的编程。

对于初学的你，只需要知道我们伟大的 Minecraft 是用 Java 写的即可。

### Hello World! （Java 版）

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

## C#

[C#](https://dotnet.microsoft.com/zh-cn/languages/csharp) 是面向对象的、面向组件的编程语言。

C# 使用了 .NET 框架作为运行环境，源于 C 语言系列，继承了 C 和 C++ 强大功能的同时去掉了一些它们的复杂特性。 C# 综合了 VB 简单的可视化操作和 C++ 的高运行效率，以其强大的操作能力、优雅的语法风格、创新的语言特性和便捷的面向组件编程的支持成为 .NET 开发的首选语言。是由 C 和 C++ 衍生出来的一种安全的、稳定的、简单的、优雅的面向对象编程语言。

我很少接触 C# ，对其也不甚了解。

### Hello World! （C# 版）

```csharp
using System;
class Program {
    static void Main() {
        Console.WriteLine("Hello World!");
    }
}
```

## HTML + CSS + JavaScript

因为它们通常一起出现于网页，我就一起拎出来讲了。

HTML（超文本标记语言） 是构成网页的标准标记语言，可以使用它来创建自己的网站。

CSS（层叠样式表） 是一种用于描述 HTML 或 XML 文档样式的语言。它允许开发者控制网页的外观和布局，提升网页的视觉效果和用户体验。

JavaScript 是一种轻量级、解释型的编程语言，广泛应用于网页开发中，主要用于增强网页的交互性和动态性。开发者可以利用 JavaScript 进行事件处理、表单验证、动画创建等多种功能。 JavaScript 可以实现复杂的功能，如实时内容更新、交互式地图和动画等。

接下来一段时间我可能会详细讲解如何构建一个自己的网站。

可尝试： [我闲暇时捣鼓的 HTML编辑器](https://slfftz2011.github.io/html-edit/)

### Hello World! （HTML 版）

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <title>Show Hello World</title>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>
```

## Batch

批处理 (Batch)，也称为批处理脚本。顾名思义，批处理就是对某对象进行批量的处理，通常被认为是一种简化的脚本语言，它应用于 DOS 和 Windows 系统中。

这里以 Windows 的 Shell 为例。

### Hello World! （Batch 版）

```shell
@echo off
echo hello world!
pause & exit
```

## 其他

自然，世界上的编程语言不计其数。诚个人精力之有限，能掌握几门到底要看造化。

我这里举例的都是近年来常见的。像有些冷门的或者是像 Qt 一样包含在其他语言中的语言我就略过了，有时间专门再唠。

# 结尾

第一篇博客就这样结束了，目前博客仍在装修，我会不断更进的。٩(๑>◡<๑)۶ 