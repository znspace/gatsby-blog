---
title: 使用 git-crypt 保护项目中的数据
date: '2019-11-19T20:40:32.169Z'
template: 'post'
draft: false
slug: '/posts/securing-data-in-your-repository-with-git-crypt/'
category: '技术'
tags:
  - 'technology'
  - 'git'
description: '项目中经常会存在一些敏感信息，类似的如服务的 secrets, ids, API keys 等不希望公开。为了方便起见，会将这些数据存储在 git 中，本文将介绍使用 git-crypt 加密所选数据的方法，保证数据安全。'
socialImage: ''
---

- [安装 git-crypt](#%e5%ae%89%e8%a3%85-git-crypt)
- [生成密钥](#%e7%94%9f%e6%88%90%e5%af%86%e9%92%a5)
- [配置 git 项目](#%e9%85%8d%e7%bd%ae-git-%e9%a1%b9%e7%9b%ae)
- [更换机器](#%e6%9b%b4%e6%8d%a2%e6%9c%ba%e5%99%a8)

## 安装 git-crypt

1. 使用 mac 可以直接使用 [homebrew](https://brew.sh/) 安装
2. 运行命令

```zsh
	$ brew install git-crypt
	$ brew install gpg
```

## 生成密钥

在使用 git-crypt 之前我们还需要使用 gpg 生成密钥

```zsh
$ gpg --gen-key # 生成密钥（公钥和私钥），按照流程提示进行

$ gpg --list-keys # 会列出当前所有的密钥
```

## 配置 git 项目

1. 进入到你的 git 项目中  
   `cd yourRepo`
2. 生成对称主密钥并将其提交到自动创建的 .git-crypt 文件夹
   `git-crypt init`
3. 添加一个主密钥副本，该副本已使用您的公共 GPG 密钥加密 (只有这样才能解密)  
   `git-crypt add-gpg-user --trusted your.email@domain.com`
4. 确保你要加密的文件在项目中并且未被忽略
5. 准备配置文件，在项目根目录创建 .gitattributes 文件
6. 以下为配置示例：

```bash
# 需要被加密🔐的文件，配置方式和 .gitignore 类似
config/*.yml filter=git-crypt diff=git-crypt
*.config filter=git-crypt diff=git-crypt

# Making sure that .gitattributes is never encrypted. DON'T TOUCH THAT LINE AND ONE BELOW
.gitattributes !filter !diff
```

7. 将修改的文件上传到暂存区  
   `git add .`
8. 查看要加密到文件  
   `git-crypt status -e`  
   **如果在未成功加密之前就进行了提交，需要运行 `git-crypt status -f`** 
9.  提交并 push 远端

```zsh
	$ git commit
	$ git push
```

## 更换机器

如果你碰巧需要更换电脑而又不添加新的 user，则可以导出密钥，然后将其导入新计算机。
以下是导出密钥的方法：

```zsh
$ gpg --export *your key-ID* > path/to/public/key/backup/file
$ gpg --export-secret-keys *your key-ID* > path/to/secret/key/backup/file
```

之后导入到新计算机中

```zsh
$ gpg --import path/to/public/key/backup/file
$ gpg --import path/to/secret/key/backup/file
```
