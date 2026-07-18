---
layout: post
title: "copilot-api：让 ClaudeCode 接入 Github Copilot"
date: 2026-03-25
author: D.Q
modifyTime: 2026-03-31 11:00:00
isDisplay: true
excerpt: >-
  在业务日志上报场景里，入参通常有“必填且有顺序”的要求：必须先给 `TenantId`，再给 `OperatorId`，再给 `TraceId`，最后补充动态字段并 `Build()`。
  如果调用顺序错了，运行时才报错会比较晚；如果能在编译期就约束顺序，体验会更好。

---

`Claude Code` 只接受 `Anthropic API` 格式，而 `GitHub Copilot` 提供的是 `OpenAI` 格式

目前已经有很多工具实现了这个转换，比如：
Aider：原生支持 `GitHub Copilot`
Cline：`VS Code` 插件，通过 `VSCode` 内置功能同样支持。

`copilot-api` 这个工具的厉害之处在于：
双格式支持：同时提供 `OpenAI` 和 `Anthropic` 兼容的 `API` 端点
`Claude Code` 专用优化：专门为 `Claude Code` 做了适配
https://github.com/ericc-ch/copilot-api


```shell
hiwor  ~  18:14:38  1.228s  0   hiwor  ~  18:46:51  0s  0 
❯  copilot-api start
[18:49:50] ℹ Using VSCode version: 1.115.0
[18:49:51] ℹ Logged in as muxiang
[18:49:53] ℹ Available models:
- claude-opus-4.7
- claude-sonnet-4.6
- gemini-3.1-pro-preview
- gpt-5.2-codex
- gpt-5.3-codex
- gpt-5.4-mini
- gpt-5.4

- gpt-4-o-preview
- text-embedding-ada-002

 ╭────────────────────────────────────────────────────────────────────────────────────────────────╮
 │                                                                                                │
│   Usage Viewer: https://ericc-ch.github.io/copilot-api?endpoint=http://localhost:4141/usage  │
 │                                                                                                │
 ╰────────────────────────────────────────────────────────────────────────────────────────────────╯

➜ Listening on: http://localhost:4141/ (all interfaces)
<-- POST /v1/messages?beta=true
<-- POST /v1/messages?beta=true
--> POST /v1/messages?beta=true 200 3s
--> POST /v1/messages?beta=true 200 4s
```

通过 [localhost:4141/usage](https://ericc-ch.github.io/copilot-api/?endpoint=http://localhost:4141/usage) 可以查看服务状态

[![peROaGT.png](https://s41.ax1x.com/2026/04/23/peROaGT.png)](https://imgchr.com/i/peROaGT)

## Claude 配置

```json 

{
    "env": {
        "ANTHROPIC_AUTH_TOKEN": "dummy",
        "ANTHROPIC_BASE_URL": "http://localhost:4141",
        "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-4.5",
        "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-4.7",
        "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-4.6",
        "ANTHROPIC_MODEL": "claude-opus-4.7",
        "ANTHROPIC_REASONING_MODEL": "claude-opus-4.7",
        "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
        "DISABLE_NON_ESSENTIAL_MODEL_CALLS": "1"
    }
} 

```

enjoy using (*´・ω・`)⊃