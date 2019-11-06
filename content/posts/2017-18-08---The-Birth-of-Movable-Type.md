---
template: post
title: OnePlus 7 Pro 折腾记
slug: /posts/use-twrp-recovery-for-oneplus-7-pro/
draft: false
date: 2019-11-01T10:12:03.284Z
description: OnePlus 7 Pro OxygenOS 10，刷入TWRP、Magisk教程。
category: 经验总结
tags:
  - android
  - TWRP
  - Magisk
---

- [The first transition](#先期准备)
- [Unlock Bootloader](#unlock-bootloader)
- [TWRP](#TWRP)
- [Magisk](#Magisk)
- [一些问题](#一些问题)

## 先期准备
- 备份数据，具体可以使用 adb 命令，见后文
- 开启开发者模式，Settings -> About Phone -> 点击 Build Number 7 次
- 调试模式，Settings -> Developer option -> Enable USB Debugging
- 开启 OEM Unlocking，Settings -> Developer options -> OEM Unlocking 开启
- PC 上安装 fastboot 工具，这里我使用的是Mac, 打开终端，输入`brew cask install android-platform-tools`即可。

## Unlock Bootloader
首先用数据线连接电脑，打开终端输入`adb devices`确认连接成功，

## TWRP

## Magisk

## 一些问题
#### GM 版本问题
氧系统有好几个版本的全量 ROM， GM21AA，GM21BA。这两个版本的含义是：
- 标记有 GM21AA 的包适用于印度、全球（不含欧洲）、美国的无锁版 Model
````bash
  - GM1911: India
  - GM1917: Global/US Unlocked (?)
````
- GM21BA 欧洲销售版本
````bash
   - GM1913: EU
````






