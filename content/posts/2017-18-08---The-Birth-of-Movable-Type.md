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
### 先期准备
- 备份数据，具体可以使用 adb 命令，见后文
- 开启开发者模式，Settings -> About Phone -> 点击 Build Number 7 次
- 调试模式，Settings -> Developer option -> Enable USB Debugging
- 开启 OEM Unlocking，Settings -> Developer options -> OEM Unlocking 开启
- PC 上安装 fastboot 工具，这里我使用的是Mac, 打开终端，输入`brew cask install android-platform-tools`即可。

### Unlock Bootloader
首先用数据线连接电脑，打开终端输入`adb devices`确认连接成功，
