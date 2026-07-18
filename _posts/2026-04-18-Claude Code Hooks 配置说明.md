---
layout: post
title: "Claude Code Hooks 配置说明"
date: 2026-04-18
author: D.Q
modifyTime: 2026-04-18 11:00:00
isDisplay: true
excerpt: >-
  本配置使用 Windows Toast 通知系统，在 Claude Code 执行关键事件时发送桌面通知，让你无需盯着终端即可了解任务状态。



---

## 概述

本配置使用 Windows Toast 通知系统，在 Claude Code 执行关键事件时发送桌面通知，让你无需盯着终端即可了解任务状态。

## 前置依赖

- **PowerShell 5+** (pwsh)
- **BurntToast 模块** - Windows 原生通知库

安装命令：
```powershell
Install-Module -Name BurntToast -Force -Scope CurrentUser
```

## 完整配置示例

以下是 `~/.claude/settings.json` 中的 hooks 配置：

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "pwsh -ExecutionPolicy RemoteSigned -Command \"Import-Module BurntToast; New-BurntToastNotification -Text (Split-Path -Leaf (Get-Location)), '√ 任务已完成，请检查结果' -AppLogo D:\\OneDrive\\ApplicationData\\icon\\Claude.png -Sound Default\""
          }
        ]
      }
    ],
    "Notification": [
      {
        "matcher": "permission_prompt",
        "hooks": [
          {
            "type": "command",
            "command": "pwsh -ExecutionPolicy RemoteSigned -Command \"Import-Module BurntToast; New-BurntToastNotification -Text (Split-Path -Leaf (Get-Location)), '! 需要你审批权限' -Sound Default\""
          }
        ]
      },
      {
        "matcher": "idle_prompt",
        "hooks": [
          {
            "type": "command",
            "command": "pwsh -ExecutionPolicy RemoteSigned -Command \"Import-Module BurntToast; New-BurntToastNotification -Text (Split-Path -Leaf (Get-Location)), '+ 正在等待你的输入' -Sound Default\""
          }
        ]
      }
    ]
  }
}
```

---

## Hooks 详解

### 1. Stop Hook - 任务完成通知

**触发时机**：Claude Code 完成任务并停止响应时

**配置**：
```json
{
  "Stop": [
    {
      "matcher": "",
      "hooks": [
        {
          "type": "command",
          "command": "pwsh -ExecutionPolicy RemoteSigned -Command \"Import-Module BurntToast; New-BurntToastNotification -Text (Split-Path -Leaf (Get-Location)), '√ 任务已完成，请检查结果' -AppLogo D:\\OneDrive\\ApplicationData\\icon\\Claude.png -Sound Default\""
        }
      ]
    }
  ]
}
```

**通知效果**：
- 标题：当前工作目录名称
- 消息：√ 任务已完成，请检查结果
- 声音：默认提示音
- 图标：自定义 Claude 图标（D:\OneDrive\ApplicationData\icon\Claude.png）

---

### 2. Notification Hook - 权限审批通知

**触发时机**：Claude Code 需要执行权限时弹出审批提示

**配置**：
```json
{
  "Notification": [
    {
      "matcher": "permission_prompt",
      "hooks": [
        {
          "type": "command",
          "command": "pwsh -ExecutionPolicy RemoteSigned -Command \"Import-Module BurntToast; New-BurntToastNotification -Text (Split-Path -Leaf (Get-Location)), '！ 需要你审批权限' -Sound Default\""
        }
      ]
    }
  ]
}
```

**通知效果**：
- 标题：当前工作目录名称
- 消息：！ 需要你审批权限
- 声音：默认提示音

---

### 3. Notification Hook - 空闲输入通知

**触发时机**：Claude Code 等待用户输入时

**配置**：
```json
{
  "Notification": [
    {
      "matcher": "idle_prompt",
      "hooks": [
        {
          "type": "command",
          "command": "pwsh -ExecutionPolicy RemoteSigned -Command \"Import-Module BurntToast; New-BurntToastNotification -Text (Split-Path -Leaf (Get-Location)), '+ 正在等待你的输入' -Sound Default\""
        }
      ]
    }
  ]
}
```

**通知效果**：
- 标题：当前工作目录名称
- 消息：+ 正在等待你的输入
- 声音：默认提示音

---

## 工作流程

```
Claude Code 执行中
       ↓
  ┌────┴────┐
  ↓         ↓
需要权限   等待输入
  ↓         ↓
！ 通知    + 通知
  ↓         ↓
用户审批   用户输入
  ↓         ↓
  └────┬────┘
       ↓
    任务完成
       ↓
    √ 通知
```

---

## 自定义修改指南

### 更换通知图标

修改 `-AppLogo` 参数路径：
```powershell
-AppLogo "D:\你的图标路径.png"
```

### 关闭声音

移除 `-Sound Default` 参数或改为：
```powershell
-Sound None
```

### 更换通知文本

直接修改单引号内的中文消息内容，例如：
```powershell
'你的自定义消息'
```

### 修改通知标题

当前标题是动态获取的工作目录名：
```powershell
(Split-Path -Leaf (Get-Location))
```

可改为固定标题：
```powershell
'我的项目'
```

---

## BurntToast 常用参数

| 参数 | 说明 | 示例 |
|------|------|------|
| `-Text` | 标题和消息 | `-Text '标题', '内容'` |
| `-AppLogo` | 图标路径 | `-AppLogo 'C:\icon.png'` |
| `-Sound` | 提示音 | `-Sound Default` / `-Sound None` |
| `-ExpirationTime` | 通知过期时间 | `-ExpirationTime (Get-Date).AddMinutes(5)` |

---

## 调试命令

测试 BurntToast 是否正常工作：
```powershell
Import-Module BurntToast
New-BurntToastNotification -Text '测试', '通知正常工作' -Sound Default
```

---

## 参考链接

- [BurntToast 模块文档](https://github.com/Windos/BurntToast)
- [Claude Code Hooks 官方文档](https://docs.anthropic.com/claude-code/hooks)





