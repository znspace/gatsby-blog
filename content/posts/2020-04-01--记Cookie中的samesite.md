---
title: 记 Cookie 的 SameSite 属性
date: 2020-03-30T02:51:34.772Z
template: post
draft: false
slug: /posts/the-trick-to-use-cookie-on-chrome/
category: 技术
tags:
  - technology
  - chrome
description: 'Chrome 51 开始，浏览器的 Cookie 新增加了一个 SameSite 属性，用来防止 CSRF 攻击和用户追踪。Chrome 80 又会有什么改变呢？'
socialImage: 'https://images-1300591223.cos.ap-beijing.myqcloud.com/20200402142058.png'
---

![bg](https://images-1300591223.cos.ap-beijing.myqcloud.com/20200402142058.png)

最近有个老系统接口改造升级，踩到了 Chrome 版本升级的坑，在此记录一下。

### 场景复现

首先说一下这个系统如何验证用户登陆状态，是采用 Cookie 和 Session 的方式，具体流程如下：

1. 客户端会发起获取用户信息的请求，服务端接收到后会检查请求上携带的 `Cookie`，此时如果没有 Cookie 或者 Cookie 过期，`HTTP status code` 就会返回 `401`。
2. 客户端接收到 `401` 状态码之后会重定向到 `CAS` 系统进行认证。
3. 认证通过后会带着 `CAS` 下发的 `ticket` 重定向回到之前的页面。
4. 客户端就可以使用 `ticket` 调用登陆接口，服务端验证 `ticket` 有效之后，使用 setCookie 向客户端发送 cookie，并告诉客户端登陆成功。
5. 客户端登陆成功后会再次发起获取用户信息的请求。

讲完登陆流程，再来说一下当时的场景，进入系统后，系统跳转到 `CAS` 鉴权，鉴权回来后再次鉴权……

### 寻找原因

在调试后发现，原因是发送请求时并没有携带  `Cookie`，这个很好解决啊，无非是服务端 `Domain` 设置有误， 或者跨域导致的。

首先看看是不是 `Domain` 设置问题，用 `devtools` 查看 `Application` 是否设置成功，调用登陆接口后，发现 `Cookie` 已经有了。

接下来继续排查，是不是 `CORS` 导致的。

默认情况下浏览器对跨域请求不会携带 Cookie，但鉴于 Cookie 在身份验证等方面的重要性，CORS 推荐使用额外的响应头字段来允许跨域发送 Cookie。

客户端设置 `withCredentials: true`，服务器同时设置 `Access-Control-Allow-Credentials` 响应头为 `true`， 即可允许跨域请求携带 Cookie。

排查下来发现设置也没问题……

之后我猜想会不会是浏览器的问题呢，于是我就打开了 Firefox，嗯，一切正常，果然是 Chrome 的坑。

### 解决方式

到底是什么原因导致 Chrome 发送跨域请求的时候没有携带 Cookie 呢，经过一番 Google 之后，看到了 Chrome 的[更新记录](https://www.chromium.org/updates/same-site)。

在 Chrome 80 版本中，会给没有设置 SameSite 属性的 Cookie 强制设定为 Lax。

这里介绍下 Cookie 的 SameSite 属性。

它可以设置成三个值：`Strict` 、 `Lax`  、`None`。

- Strict最为严格，完全禁止第三方 Cookie，跨站点时，任何情况下都不会发送 Cookie。换言之，只有当前网页的 URL 与请求目标一致，才会带上 Cookie。
- Lax规则稍稍放宽，大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。
- None 就是允许向第三方发送，不过，前提是必须同时设置Secure属性（Cookie 只能通过 HTTPS 协议发送），否则无效。

这里给出一个解决的 trick，在地址栏输入 [chrome://flags/](chrome://flags/), 打开页面之后搜索 `same-site-by-default-cookies`，把这项改成 `Disabled` 状态就可以了。





