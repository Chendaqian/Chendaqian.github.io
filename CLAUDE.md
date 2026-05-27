# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog (chendaqian.github.io) built with Jekyll, hosted on GitHub Pages. It uses the "onepage" single-page blog theme. The author is a .NET engineer based in Beijing.

## Commands

```bash
# Local development (requires Ruby + Jekyll installed)
run.bat              # Shortcut to start Jekyll server (content: "Jekyll server")
bundle exec jekyll serve   # Standard local build & serve

# Site builds automatically on push to master via GitHub Actions
# See .github/workflows/jekyll-gh-pages.yml
```

## Architecture

### Layouts & Includes

- `_layouts/default.html` — Main shell: left sidebar (profile, skills, imprint) + right blog column. All pages inherit from this.
- `_layouts/post.html` — Blog post template. Extends `default`. Adds Mermaid diagram auto-rendering (client-side via mermaid.min.js) and Utteranc comments.
- `_includes/head.html` — HTML `<head>`: CSS (main, syntax, gridism, ionicons, topCat), jQuery, OG meta tags.
- `_includes/foot.html` — Footer scripts: canvas ribbon background animation, console ASCII art.
- `_includes/skill.html` — Tech stack sidebar, driven by `_data/skill.yml`.
- `_includes/utteranc.html` — GitHub Issues-based comments via utteranc.es.

### Posts

- Location: `_posts/YYYY-MM-DD-title.md`
- Frontmatter fields:
  - `layout: post` (always)
  - `title`, `date`, `author`
  - `modifyTime` — last update date, shown in post footer
  - `isDisplay: true` — **required** for the post to appear on the homepage, RSS/Atom feeds, and sitemap. Set to `false` to hide.
  - `excerpt` — short summary shown on the homepage card
- Code blocks with `language-mermaid` or `lang-mermaid` are auto-rendered as diagrams.

### Feeds & SEO

- `feed.xml` (RSS 2.0), `atom.xml` (Atom), `sitemap.xml` — all generated from Liquid templates, filtering on `isDisplay == true`.
- `robots.txt` at root.

### Other Directories

- `tree/` — Standalone static pages (love letters, holiday surprises, etc.), not part of the blog. These are self-contained HTML with their own CSS/JS.
- `bak/` — Archived/backup content.
- `images/` — Site images and SVG icons.
- `assets/css/` — Stylesheets: `main.css` (primary), `syntax.css` (code highlighting), `topCat.css` (custom overrides).
- `_data/skill.yml` — Defines the tech stack sidebar categories and icons.

### Deployment

GitHub Actions (`.github/workflows/jekyll-gh-pages.yml`): on push to `master`, builds with `actions/jekyll-build-pages` and deploys to GitHub Pages.

## Conventions

- Language: Chinese (zh). Blog posts are written in Chinese.
- The `.csproj` file in root is for Visual Studio solution support only — this is a static site, not a .NET project.
- `_site/` and `obj/` are build artifacts (gitignored).
