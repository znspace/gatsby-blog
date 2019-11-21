---
title: beancount 入门实践
date: '2019-11-20T20:40:32.169Z'
template: 'post'
draft: false
slug: '/posts/beancount-start/'
category: '理财'
tags:
  - 'financial'
description: ''
socialImage: ''
---

- [开始使用](#%e5%bc%80%e5%a7%8b%e4%bd%bf%e7%94%a8)
    - [安装](#%e5%ae%89%e8%a3%85)
    - [使用 git 管理](#%e4%bd%bf%e7%94%a8-git-%e7%ae%a1%e7%90%86)
    - [目录结构](#%e7%9b%ae%e5%bd%95%e7%bb%93%e6%9e%84)

# 开始使用

### 安装

使用 Beancount 之前首先需要 Python 3 运行环境。之后使用 pip 即可安装，运行以下命令。

```zsh
$ pip3 install beancount fava
```

上面的命令其中 beancount 是核心包，包括了命令行工具，fava 是网页可视化工具。这里是一个[示例账本](https://fava.pythonanywhere.com/huge-example-file/balance_sheet/)。示例文件可以在 Beancount 的 [Bitbucket](https://bitbucket.org/blais/beancount/src/default/examples/) 上下载。

文本编辑器推荐 VSCode，再配合语法高亮插件 [vscode-beancount](https://github.com/Lencerf/vscode-beancount) 即可

下载之后可以在命令行中运行：

```zsh
$ fava example.beancount
```

可以看到

```zsh
Running Fava on http://localhost:5000
```

如果顺利，在浏览器打开 [http://localhost:5000](http://localhost:8000) 可看到以下界面，

![beancount-example](/media/beancount-example.jpg)

### 使用 git 管理

在 github 创建仓库，用于保存账本文件，使用 git 进行版本管理

> 注意：请一定创建私密仓库，账单信息量巨大，属于很隐私的东西，避免泄露，可搭配 git-crypt 食用。

### 目录结构

```zsh
├── README.md
├── accounts              # 账号管理
│   ├── Assets.bean
│   ├── Equity.bean
│   ├── Expenses.bean
│   ├── Income.bean
│   ├── Liabilities.bean
│   └── index.bean
├── books                 # 按日期划分账单
│   ├── 2019
│   │   ├── 01-spdb.bean
│   │   ├── 02-spdb.bean
│   │   ├── 03-spdb.bean
│   │   └── 04-spdb.bean
│   └── index.bean
├── category              # 按类别划分账单
│   ├── index.bean
│   └── salary.bean
├── csv.import
├── documents             # 归档目录
├── importers
│   └── __init__.py
└── main.bean             # 账单入口
```

其中：

`main.bean`：为账单入口文件，该文件只用来 **include** 其他文件；

`account`：账户目录，文件可按类型划分为收入、资产、负债、消费、初始权益；

`books`：存放交易，可以按年、月管理，方便记录和查找账单；

每个大目录下都创建 `index.bean` 文件，作为目录入口来 **include** 其他文件

<!-- # 基本语法

> 以下只是一些经常使用到基本语法，完整语法查看文档：[Beancount Language Syntax](https://docs.google.com/document/d/1wAMVrKIA2qtRGmoVDSUBJGmYZSygUaR0uOMW1GV3YE0/edit) -->
