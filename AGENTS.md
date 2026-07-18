# AGENTS.md

本文件为 Claude Code (claude.ai/code) 在此仓库中工作时提供指导。入口文件为 `CLAUDE.md`（通过 `@AGENTS.md` 引用本文件）。

## 项目概述

这是一个基于 Jekyll 构建的个人技术博客 (chendaqian.github.io)，托管在 GitHub Pages 上。基于 "onepage" 单页博客主题深度定制。作者是一名 .NET 工程师，坐标北京。

## 常用命令

```bash
# 本地开发（需要安装 Ruby + Jekyll）
run.bat              # 启动 Jekyll 服务器的快捷方式（内容：bundle exec jekyll serve）
bundle exec jekyll serve   # 标准本地构建与服务

# 推送到 master 分支后，GitHub Actions 自动构建
# 参见 .github/workflows/jekyll-gh-pages.yml
```

## 架构

### 布局与包含文件

- `_layouts/default.html` — 主框架：左侧栏（个人资料、技能、版权）+ 右侧博客列 + 固定控制按钮栏。所有页面继承此布局。
- `_layouts/post.html` — 博客文章模板。继承自 `default`。包含 Mermaid 图表自动渲染、LIKE 飘心彩蛋、SHARE 复制链接、Utteranc 评论。
- `_includes/head.html` — HTML `<head>`：CSS（main、syntax、gridism、ionicons）、jQuery 3.7.0、OG 元标签、RSS/Atom 链接。
- `_includes/foot.html` — 页脚脚本：Ribbons.js canvas 飘带背景动画、控制台 ASCII 艺术、百度统计（已注释）。
- `_includes/skill.html` — 技术栈侧边栏，由 `_data/skill.yml` 驱动。
- `_includes/imprint.html` — 页脚信息：RSS/Atom 订阅链接、站点地图、访客计数 badge。
- `_includes/utteranc.html` — 基于 GitHub Issues 的评论系统（通过 utteranc.es）。

### UI 功能

以下功能在 `_layouts/default.html` 的内联脚本中实现：

- **固定控制栏** (`#fixed-controls`)：位于页面右下角的浮动按钮组
  - 侧边栏切换 — 展开/折叠左侧栏
  - 返回首页 — 链接到 `/`
  - 文章目录 — 仅在文章页显示，切换目录面板
  - 返回顶部 — 滚动超过 400px 后自动显示
- **侧边栏自动折叠**：文章页（`.post-page`）默认折叠侧边栏，扩大阅读区域
- **目录面板** (`#toc-panel`)：
  - 自动提取 `.post-content` 中的 h1-h4 标题生成目录链接
  - 默认自动展开，手动关闭后记录状态（localStorage）
  - 支持拖拽定位，位置持久化到 localStorage
- **代码块增强**：每个 `.highlighter-rouge` 代码块自动包装为：
  - macOS 风格工具栏（红/黄/绿圆点 + 语言标签 + 复制/折叠按钮）
  - 行号列，与代码区域滚动同步
  - 一键复制（优先 Clipboard API，降级 execCommand）
  - 代码折叠/展开
- **表格圆角**：自动为 `.post-content` 中的 `<table>` 添加 `.table-wrapper` 包裹层
- **LIKE 按钮**：点击后飘出 8 颗随机颜色/大小/延迟的 ❤️ 粒子动画
- **SHARE 按钮**：一键复制当前页面 URL，显示"已复制!"反馈
- **Canvas 飘带背景**：Ribbons.js 在全屏 canvas 上绘制动态彩色飘带（`#bgCanvas`，z-index: -1）

### 文章

- 存放位置：`_posts/YYYY-MM-DD-title.md`
- Frontmatter 字段：
  - `layout: post`（固定值）
  - `title`、`date`、`author`
  - `modifyTime` — 最后更新日期，显示在文章页脚
  - `isDisplay: true` — **必填**，文章才会出现在首页、RSS/Atom 订阅和站点地图中。设为 `false` 则隐藏。
  - `excerpt` — 简短摘要，显示在首页卡片上
- 使用 `language-mermaid` 或 `lang-mermaid` 的代码块会自动渲染为 Mermaid 图表。

### 订阅源与 SEO

- `feed.xml`（RSS 2.0）、`atom.xml`（Atom）、`sitemap.xml` — 均由 Liquid 模板生成，过滤条件为 `isDisplay == true`。
- `robots.txt` 位于根目录。
- 百度统计：`_config.yml` 中 `bd_analytics` 配置 ID，foot.html 中已注释，按需启用。

### 其他目录

- `tree/` — 独立静态页面（情书、节日惊喜等），不属于博客部分。这些是自带 CSS/JS 的独立 HTML。
- `bak/` — 归档/备份内容。
- `images/` — 站点图片和 SVG 图标。
- `assets/css/` — 样式表：`main.css`（主样式）、`syntax.css`（代码高亮）、`gridism.css`（栅格布局）、`ionicons.css`（图标字体）。
- `_data/skill.yml` — 定义技术栈侧边栏的分类和图标。

### 部署

GitHub Actions（`.github/workflows/jekyll-gh-pages.yml`）：推送到 `master` 分支后，使用 `actions/jekyll-build-pages` 构建并部署到 GitHub Pages。

## 约定

- 语言：中文（zh）。博客文章使用中文撰写。
- 根目录的 `.csproj` 文件仅用于 Visual Studio 解决方案支持 — 这是一个静态站点，不是 .NET 项目。
- `_site/` 和 `obj/` 是构建产物（已 gitignore）。
- 修改 `_layouts/default.html` 的内联脚本时，注意它同时服务于首页和文章页，需做条件判断（如 `isPostPage`）。
