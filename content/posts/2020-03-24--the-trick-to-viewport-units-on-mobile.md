---
title: 移动端页面中使用vh的技巧
date: 2019-12-07T01:19:18.088Z
template: post
draft: false
slug: /posts/the-trick-to-viewport-units-on-mobile/
category: 技术
tags:
  - technology'
  - css'
description: '社区中移动端布局方案百花齐放，其中比较流行的应该是以使用视口单位 vh 进行布局，本文介绍实际使用 vh 时遇到的问题及解决方法。'
socialImage: ''
---

最近在做一个移动端的活动，布局方案选用了 [vh](https://www.w3.org/TR/css-values-3/#vh) 单位定义来元素的高度，在真机测试中发现，将根元素 height 设置成 **100vh** 在 Chrome 和 Firefox 等浏览器中并不是正好显示一屏。

下方这张图可以说明这种现象:

<img src='https://unpkg.com/vh-check@2.0.5/issue-schema.svg' height='350'/>
<figcaption>
  <font style="font-size: .7rem;color: #767676;display: block;width: 80%;padding-top: .5rem;">当地址栏处于视图中时，元素底部被裁剪（右），但我们想要的是元素能完整的占据一屏（左）。</font>
</figcaption>

造成这种现象的原因就在于移动端浏览器对于 vh 单位的计算，是不包含地址栏的，也就是说 **100vh** 的高度会使带有地址栏的视图溢出。

对此，可参考[Google 官方说明](https://developers.google.com/web/updates/2016/12/url-bar-resizing)。

---

#### 解决方法

问题描述完了，接下来讲一下解决的方法。

我们都知道在 JavaScript 中，使用 **window.innerHeight** 可以获取当前视口的的高度，那我们能不能利用这个方法来动态的修改页面高度呢，答案是可以的。

这里我们利用 CSS 自定义变量来解决。

首先我们需要定义一个变量并在 CSS 中使用它。

```css
.my-element {
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
}
```

之后我们再使用 JS 来获取视口的真实高度，将获取的高度按 100 份等分，这时我们将得到视口的单位高度,然后我们通过 JS 设置 CSS 的变量 **(--vh): root**。

```js
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
```

最后，我们可以使用新得到的视口单位 **--vh**，和正常 vh 一样使用，将其乘以 100，就可以得到所需的屏高。

#### 补充

尽管我们根据页面视口真实大小设置了高度，但大家会发现新的问题，当视口高度变化的时候，并不会更新我们定义的 **--vh** 变量。

其实解决这个问题也很简单，我们可以通过对 **window resize** 事件的监听，来动态修改我们定义的视口单位，代码如下。

```js
// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
```
