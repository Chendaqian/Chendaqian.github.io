---
layout: post
title: "从 Harness Engineering 到 OpenSpec"
date: 2026-05-06
author: D.Q
modifyTime: 2026-05-06 11:00:00
isDisplay: true
excerpt: >-
  OpenSpec 是 AI-Native 的规范驱动开发系统，为 AI 提供轻量级规范层。先与 AI 对齐需求，让开发过程更可预测、更高效。


---

> 让 Agent 真正理解你的意图

OpenSpec 是 AI-Native 的规范驱动开发系统，为 AI 提供轻量级规范层。先与 AI 对齐需求，让开发过程更可预测、更高效。

**核心理念：**
- 流动而非僵化
- 迭代而非瀑布
- 简单而非复杂
- 存量项目优先
- 从个人项目扩展到企业级

---

## 安装指南

需要 Node.js 20.19.0 或更高版本。

### npm

```bash
npm install -g @fission-ai/openspec@latest
```

### pnpm

```bash
pnpm add -g @fission-ai/openspec@latest
```

### yarn

```bash
yarn global add @fission-ai/openspec@latest
```

### bun

```bash
bun add -g @fission-ai/openspec@latest
```

> **注意：** Bun 可以全局安装 OpenSpec，但 OpenSpec 当前仍在 Node.js 上运行。PATH 上仍需有 Node.js 20.19.0 或更高版本。

### Nix

```bash
# 直接运行（无需安装）
nix run github:Fission-AI/OpenSpec -- init

# 安装到 profile
nix profile install github:Fission-AI/OpenSpec
```

### 验证安装

```bash
openspec --version
```

---

## 快速开始

### 第一步：初始化项目

进入你的项目目录，运行初始化命令。这将创建 OpenSpec 目录结构并为你的 AI 工具生成配置文件。

```bash
cd your-project-directory
openspec init
```

### 第二步：创建你的第一个变更

在 AI 对话窗口中，使用 `/opsx:propose` 命令描述你想要构建的功能。AI 会自动创建所有必要的规划产物。

```
/opsx:propose split-reporting-line
```

### 第三步：实现任务

规划产物生成完毕后，运行 `/opsx:apply` 让 AI 按照任务清单逐步实现代码。

```
/opsx:apply
```

### 第四步：归档变更

完成实现后，运行 `/opsx:archive` 将 Delta 规范合并到主规范，并将变更文件夹移至归档目录。

```
/opsx:archive
```

### 工作流配置

如需更细粒度的控制（`/opsx:new`、`/opsx:ff`、`/opsx:verify` 等），运行 `openspec config profile` 选择工作流，然后执行 `openspec update` 更新配置。

- **Core 模式**（默认）：propose / apply / archive / explore
- **Expanded 模式**：额外显示 new / continue / ff / verify 等命令

### 初始化后的目录结构

```
openspec/
├── config.yaml                        # 项目全局配置文件
└── changes/                           # 活跃变更目录
    └── split-reporting-line           # 具体变更名称目录
        ├── .openspec.yaml             # 变更元数据配置
        ├── design.md                  # 技术设计方案文档，如何实现
        ├── proposal.md                # 变更提案文档，为什么做、做什么
        ├── tasks.md                   # 任务拆分和执行计划
        └── specs/                     # 变更相关的规范文档
            ├── dotted-line-manag/
            │   └── spec.md
            ├── dotted-subordina/
            │   └── spec.md
            ├── line-manag/
            │   └── spec.md
            └── subordina/
                └── spec.md
```

---

## 核心概念：设计哲学

OpenSpec 围绕四个核心原则构建：

### 流动而非僵化

传统规范系统将你锁定在阶段中：先规划，再实现，然后完成。OpenSpec 更灵活——你可以调整符合实际情况的顺序。

### 迭代而非瀑布

需求会变化，理解会复杂。不断迭代，拥抱变化。OpenSpec 支持持续改进和快速反馈循环。

### 简单而非复杂

一些规范框架需要大量设置、严格格式或繁重流程。OpenSpec 不挡你的路。即开即用。

### 存量项目优先

大多数软件工作不是从零开始，而是在已有系统上迭代改造。OpenSpec 可以基于现有系统进行增量改进。

---

## 核心概念：规范 (Specs)

规范使用结构化文档来描述系统行为。

### 规范示例

```markdown
## ADDED Requirements

### Requirement: 查询虚线上级存储过程
系统 SHALL 提供存储过程 `DAL_Query_GetDottedLineManagersByUserId`，接收 `@userId` 和 `@tenantId` 参数，从 `ReportingLine` 表查询
`ReportingType=1` 且 `IsDelete=0` 的记录，返回多行 `ManagerId`。

#### Scenario: 用户有多个虚线上级
- **WHEN** 调用存储过程传入存在虚线关系的 userId
- **THEN** 返回所有虚线上级的 ManagerId，每行一个

#### Scenario: 用户无虚线上级
- **WHEN** 调用存储过程传入不存在虚线关系的 userId
- **THEN** 返回空结果集
```

### 规范元素说明

| 元素 | 用途 |
|------|------|
| `## 目的` | 该规范领域的高层描述 |
| `### 需求：` | 系统必须具备的具体行为 |
| `#### 场景：` | 需求的具体示例（可验证的） |
| SHALL / MUST / SHOULD | RFC 2119 关键词，表示需求强度 |

> **规范的本质**：规范是**行为契约**，而非实现计划。好的规范内容包括可观察行为、输入/输出/错误条件、外部约束。避免在规范中写内部类名、库或框架选择、逐步实现细节。

---

## 核心概念：变更 (Changes)

变更是对系统的提议修改，打包为一个包含理解和实现所需一切的文件夹：

```
openspec/changes/split-reporting-line/
├── proposal.md           # 为什么做、做什么
├── design.md             # 如何实现（技术方案）
├── tasks.md              # 实现任务清单（带复选框）
├── .openspec.yaml        # 变更元数据（可选）
└── specs/                # Delta 规范
    └── line-manag/
        └── spec.md       # 正在变化的内容
```

### 变更的特点

- **一切在一起**：提案、设计、任务和规范都在一处。无需在不同位置寻找信息。
- **并行工作**：多个变更可以同时存在而不冲突。在修复 bug 的同时开发新功能。
- **清晰历史**：归档时，变更移至 archive/ 并保留完整上下文，方便日后追溯原因。
- **便于审查**：变更文件夹易于审查——打开它，阅读提案，检查设计，查看规范 Delta。

---

## 核心概念：产物 (Artifacts)

产物是变更中指导工作的文档，它们相互构建，每个产物为下一个提供上下文：

```
proposal.md → specs/ → design.md → tasks.md
为什么做+范围   变化的内容   技术方案     实现步骤
```

### Proposal — 提案文档

提案文档说明"为什么做"和"做什么"：

```markdown
## Why
原始存储过程 `DAL_Query_GetReportingLineByUserId` 将四种汇报关系查询合并为一个 SP，通过逗号拼接字符串返回所有结果。调用方即使只需要其中一种数据，也必须执行全部查询并解析整个结果集。

## What Changes
- 新增 4 个存储过程，分别对应虚线上级、虚线下级、直线上级链路、直线下级查询
- 新增独立的 Service / Provider 服务链，不修改原有代码
- 新方法返回多行结果集，替代原有逗号拼接字符串解析方式

## Capabilities

### New Capabilities
- `dotted-line-manager`: 查询指定用户的虚线上级
- `dotted-subordinate`: 查询以指定用户为虚线上级的所有下级
- `line-manager`: 解析直线上级链路
- `subordinate`: 查询直线汇报下属

## Impact
- 新增 SQL 文件、DTO、Args、Options、Criteria、Service、Provider
- 新增单元测试
- 不涉及原始方法和类的修改
```

### Design — 设计文档

设计文档说明"如何实现"：

```markdown
## Context
当前存储过程将四种汇报关系查询合为一个 SP。C# 调用链遵循 Provider → Service → Query 模式。

## Goals / Non-Goals
**Goals:**
- 为四种查询各提供独立的存储过程和 C# 方法
- 创建独立的 Service / Provider 链
- 复用现有查询框架和缓存机制

**Non-Goals:**
- 不修改或废弃原始方法
- 不优化存储过程本身的查询性能

## Decision
1. 独立 Service / Provider，不污染原有代码
2. 各层类按功能子目录分组
3. 方法命名简洁清晰
4. 缓存策略复用现有模式

## Risks / Trade-off
- 调用方需适配 → 新方法是独立接口，不影响已有调用方
- 缓存粒度变化 → 各自独立缓存，可接受
```

### Tasks — 任务清单

任务是带复选框的具体实现步骤：

```markdown
## 1. 存储过程 (SQL)
- [x] 1.1 创建虚线上级查询 SP
- [x] 1.2 创建虚线下级查询 SP
- [x] 1.3 创建直线上级链路查询 SP
- [x] 1.4 创建直线下级查询 SP

## 2. DTO 层
- [x] 2.1 创建内部 DTO
- [x] 2.2 创建外部 DTO

## 3. Service 层
- [x] 3.1 创建 Service 接口
- [x] 3.2 创建 Service 实现

## 4. Provider 层
- [x] 4.1 创建 Provider 接口
- [x] 4.2 创建 Provider 实现

## 5. 缓存配置
- [x] 5.1 注册 CacheItem 和 CacheDependency

## 6. 单元测试
- [x] 6.1 创建测试项目
- [x] 6.2 编写对比测试
```

---

## 核心概念：归档机制

### 整体架构

OpenSpec 将你的工作组织为两个主要区域：

- **specs/**：权威基准，包含当前一致同意的行为
- **changes/**：提议中的修改，每个变更 = 一个文件夹

这种分离是关键：你可以并行处理多个变更而不发生冲突，在变更影响主规范之前先进行审查，归档时 Delta 会干净地合并回主规范。

### Schema 机制

Schema 定义工作流的产物类型及其依赖关系。默认 Schema 为 `spec-driven`：

```yaml
name: spec-driven
artifacts:
  - id: proposal
    generates: proposal.md
    requires: []              # 无依赖，可以先创建

  - id: specs
    generates: specs/**/*.md
    requires: [proposal]      # 需要提案后才能创建

  - id: design
    generates: design.md
    requires: [proposal]      # 可与 specs 并行创建

  - id: tasks
    generates: tasks.md
    requires: [specs, design] # 需要 specs 和 design 都完成
```

依赖关系：
```
proposal (根节点)
├── specs (依赖: proposal)
├── design (依赖: proposal)
└── tasks (依赖: specs + design)
```

### 完整工作流程

1. **启动变更**：`/opsx:propose` 或 `/opsx:new`
2. **创建产物**：proposal → specs → design → tasks
3. **实现任务**：`/opsx:apply`
4. **验证工作（可选）**：`/opsx:verify`
5. **归档变更**：Delta 合并入主规范，变更文件夹移至 archive/

---

## 术语表

| 术语 | 定义 |
|------|------|
| **产物 (Artifact)** | 变更中的文档（proposal、design、tasks 或 Delta 规范） |
| **归档 (Archive)** | 完成变更并将其 Delta 合并到主规范的过程 |
| **变更 (Change)** | 打包为带有产物的文件夹的系统提议修改 |
| **Delta 规范** | 描述变化（ADDED/MODIFIED/REMOVED）的规范 |
| **领域 (Domain)** | 规范的逻辑分组（如 auth/、payments/） |
| **需求 (Requirement)** | 系统必须具备的具体行为 |
| **场景 (Scenario)** | 需求的具体示例，通常采用 Given/When/Then 格式 |
| **Schema** | 产物类型及其依赖关系的定义 |
| **规范 (Spec)** | 描述系统行为的规格说明 |
| **权威基准** | openspec/specs/ 目录，包含当前一致同意的行为，是所有规范的最终依据 |




