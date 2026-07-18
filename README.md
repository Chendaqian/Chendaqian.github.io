# Chendaqian's Blog

[![Jekyll](https://img.shields.io/badge/Jekyll-4.x-CC0000?logo=jekyll)](https://jekyllrb.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-222222?logo=github)](https://chendaqian.github.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

个人技术博客，基于 Jekyll + GitHub Pages 构建，onepage 主题深度定制。

🔗 **[chendaqian.github.io](https://chendaqian.github.io)**

## 关于作者

.NET 工程师，坐标北京。主要关注 C#、.NET 生态、WCF、微服务、中间件等技术领域。

- 📝 博客园：[CNBlogs/Chendaqian](https://www.cnblogs.com/Chendaqian/)
- 💻 GitHub：[@ChenDaqian](https://github.com/ChenDaqian)
- 📧 Email：hi.world@outlook.com

## 功能特性

- **响应式双栏布局** — 左侧个人资料 + 技能栈，右侧博客内容
- **侧边栏折叠** — 文章页默认折叠侧边栏，扩大阅读区域
- **文章目录面板** — 自动提取标题，支持拖拽定位，位置自动记忆
- **代码块增强** — macOS 风格工具栏、语言标签、行号、一键复制、折叠展开
- **Mermaid 图表** — 代码块中 `language-mermaid` 自动渲染为 SVG 图表
- **Canvas 飘带背景** — Ribbons.js 动态彩色背景动画
- **Utteranc 评论** — 基于 GitHub Issues 的轻量评论系统
- **RSS / Atom 订阅** — 自动生成订阅源和站点地图
- **LIKE / SHARE** — 飘心动画彩蛋 + 一键复制文章链接

## 本地开发

### 环境要求

- Ruby 3.x + DevKit
- Bundler

### 启动

```bash
# 安装依赖
bundle install

# 启动本地服务器
bundle exec jekyll serve

# 或使用快捷脚本
run.bat
```

浏览器打开 `http://localhost:4000` 即可预览。

## 写文章

在 `_posts/` 目录下创建 `YYYY-MM-DD-title.md`，frontmatter 示例：

```yaml
---
layout: post
title: "文章标题"
date: 2026-07-18
modifyTime: 2026-07-18
author: Chendaqian
isDisplay: true
excerpt: "文章摘要"
---
```

- `isDisplay: true` **必填**，否则文章不会出现在首页和 RSS/Atom 中
- 代码块标注 `language-mermaid` 即可渲染 Mermaid 图表

## 部署

推送到 `master` 分支后，GitHub Actions 自动构建并部署到 GitHub Pages。

## 致谢

- [onepage](https://github.com/lukas-h/onepage) — 原始 Jekyll 主题
- [Jekyll](https://jekyllrb.com/) — 静态站点生成器
- [GitHub Pages](https://pages.github.com/) — 托管平台
