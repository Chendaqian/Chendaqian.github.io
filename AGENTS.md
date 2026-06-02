# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此仓库中工作时提供指导。

## 项目概述

这是一个基于 Jekyll 构建的个人博客 (chendaqian.github.io)，托管在 GitHub Pages 上。使用 "onepage" 单页博客主题。作者是一名 .NET 工程师，坐标北京。

## 常用命令

```bash
# 本地开发（需要安装 Ruby + Jekyll）
run.bat              # 启动 Jekyll 服务器的快捷方式（内容："Jekyll server"）
bundle exec jekyll serve   # 标准本地构建与服务

# 推送到 master 分支后，GitHub Actions 自动构建
# 参见 .github/workflows/jekyll-gh-pages.yml
```

## 架构

### 布局与包含文件

- `_layouts/default.html` — 主框架：左侧栏（个人资料、技能、版权）+ 右侧博客列。所有页面继承此布局。
- `_layouts/post.html` — 博客文章模板。继承自 `default`。添加 Mermaid 图表自动渲染（客户端通过 mermaid.min.js）和 Utteranc 评论。
- `_includes/head.html` — HTML `<head>`：CSS（main、syntax、gridism、ionicons、topCat）、jQuery、OG 元标签。
- `_includes/foot.html` — 页脚脚本：canvas 飘带背景动画、控制台 ASCII 艺术。
- `_includes/skill.html` — 技术栈侧边栏，由 `_data/skill.yml` 驱动。
- `_includes/utteranc.html` — 基于 GitHub Issues 的评论（通过 utteranc.es）。

### 文章

- 存放位置：`_posts/YYYY-MM-DD-title.md`
- Frontmatter 字段：
  - `layout: post`（固定值）
  - `title`、`date`、`author`
  - `modifyTime` — 最后更新日期，显示在文章页脚
  - `isDisplay: true` — **必填**，文章才会出现在首页、RSS/Atom 订阅和站点地图中。设为 `false` 则隐藏。
  - `excerpt` — 简短摘要，显示在首页卡片上
- 使用 `language-mermaid` 或 `lang-mermaid` 的代码块会自动渲染为图表。

### 订阅源与 SEO

- `feed.xml`（RSS 2.0）、`atom.xml`（Atom）、`sitemap.xml` — 均由 Liquid 模板生成，过滤条件为 `isDisplay == true`。
- `robots.txt` 位于根目录。

### 其他目录

- `tree/` — 独立静态页面（情书、节日惊喜等），不属于博客部分。这些是自带 CSS/JS 的独立 HTML。
- `bak/` — 归档/备份内容。
- `images/` — 站点图片和 SVG 图标。
- `assets/css/` — 样式表：`main.css`（主样式）、`syntax.css`（代码高亮）、`topCat.css`（自定义覆盖）。
- `_data/skill.yml` — 定义技术栈侧边栏的分类和图标。

### 部署

GitHub Actions（`.github/workflows/jekyll-gh-pages.yml`）：推送到 `master` 分支后，使用 `actions/jekyll-build-pages` 构建并部署到 GitHub Pages。

## 约定

- 语言：中文（zh）。博客文章使用中文撰写。
- 根目录的 `.csproj` 文件仅用于 Visual Studio 解决方案支持 — 这是一个静态站点，不是 .NET 项目。
- `_site/` 和 `obj/` 是构建产物（已 gitignore）。
