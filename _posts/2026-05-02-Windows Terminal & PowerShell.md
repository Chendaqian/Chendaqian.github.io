---
layout: post
title: "Windows Terminal & PowerShell"
date: 2026-05-02
author: D.Q
modifyTime: 2026-05-02 11:00:00
isDisplay: true
excerpt: >-
  基于向量语义搜索的 WCF ServiceContract 接口发现工具链，供大模型调用以查询"某业务应调用哪个接口/方法"。


---

在Windows开发环境中，PowerShell 7作为新一代命令行工具，凭借其强大的功能和跨平台支持，已成为开发者的首选。本文将手把手教你安装PowerShell 7，并通过自定义profile文件应用美化配置，让你的终端界面焕然一新，同时提升操作效率。

推荐使用最新的 PowerShell 7 可以跨平台，基于.NET8。系统自带的是 PowerShell 5

PowerShell 牛逼之处在于使用.NET下的技术栈，能直接操作 BCL 等，相比传统的 Shell 他管道传递的是对象

另外推荐使用 [windows terminal](https://learn.microsoft.com/zh-cn/windows/terminal/install)

## 安装PowerShell 7

 **下载安装包**
访问`PowerShell`官方[install-powershell-on-windows?view=powershell-7.6)](https://learn.microsoft.com/zh-cn/powershell/scripting/install/install-powershell-on-windows?view=powershell-7.6)
打开新的PowerShell 7终端窗口，执行命令：

```shell
$PSVersionTable.PSVersion

Major  Minor  Patch  PreReleaseLabel BuildLabel
-----  -----  -----  --------------- ----------
7      6      0
```

若显示版本号（如`7.x.x`），说明安装成功。

## 快捷键

虽然 `WinTerminal` 没有 `tmux` 分屏好用，但是还是支持了很多操作

ALT + SHIFT + ‘+’ 左右分屏

ALT + SHIFT + ’-‘ 上下分屏

ALT + 箭头（↑ ↓ ← →）不同分屏之间切换

ALT + SHIFT + 箭头（↑ ↓ ← →）调整分屏大小

CTRL + SHIFT + w 关闭一个分屏 

WIN + TILDA（~）显示隐藏 quake 窗口

## 配置美化：应用自定义profile文件


### 准备工作：安装必要模块


```shell
# 安装oh-my-posh（美化主题必备）
Install-Module oh-my-posh -Scope CurrentUser -Force

# 安装posh-git（Git集成增强）
Install-Module posh-git -Scope CurrentUser -Force

# 安装Terminal-Icons（文件图标支持）
Install-Module Terminal-Icons -Scope CurrentUser -Force
```

### 创建或编辑PowerShell Profile文件

PowerShell的profile文件用于保存个性化配置。执行以下命令打开或创建profile：

```shell
notepad $PROFILE
```

若提示文件不存在，会自动创建。profile文件默认路径为：


### 完整配置

#### $PROFILE

```shell
# ===== Fast Profile =====

# 基础编辑体验
Set-PSReadLineOption -PredictionViewStyle ListView -BellStyle None -EditMode Windows
Set-PSReadLineKeyHandler -Key 'Ctrl+z' -Function Undo
Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete

# 安全导入函数
function Import-ModuleSafe {
    param([string]$ModuleName)
    if (Get-Module -ListAvailable -Name $ModuleName -ErrorAction SilentlyContinue) {
        Import-Module $ModuleName -ErrorAction SilentlyContinue
    }
}

Import-ModuleSafe 'CompletionPredictor'
Import-ModuleSafe 'PSCompletions'   # 先注释，按需再开
if (Get-Command carapace -ErrorAction SilentlyContinue) {
     carapace _carapace | Out-String | Invoke-Expression
 }

# 5) 主题：直接固定路径，避免每次 scoop prefix
$omp = Get-Command oh-my-posh -ErrorAction SilentlyContinue
$themeFile = "$env:USERPROFILE\scoop\apps\oh-my-posh\current\themes\jtracey93.omp.json"
if ($omp) {
    if (Test-Path $themeFile) {
        & $omp.Source init pwsh --config $themeFile | Invoke-Expression
    } else {
        & $omp.Source init pwsh --config "builtin:agnoster" | Invoke-Expression
    }
}

Import-ModuleSafe 'posh-git'
Import-ModuleSafe 'Terminal-Icons'

```


#### Setting.json

字体推荐使用 `MesloLGS NF`

```json
{
    "$help": "https://aka.ms/terminal-documentation",
    "$schema": "https://aka.ms/terminal-profiles-schema",
    "actions": [],
    "copyFormatting": "none",
    "copyOnSelect": false,
    "defaultProfile": "{574e775e-4f2a-5b96-ac1e-a2962a402336}",
    "keybindings":
    [
        {
            "id": "Terminal.CopyToClipboard",
            "keys": "ctrl+c"
        },
        {
            "id": "Terminal.PasteFromClipboard",
            "keys": "ctrl+v"
        },
        {
            "id": "Terminal.FindText",
            "keys": "ctrl+shift+f"
        },
        {
            "id": "Terminal.DuplicatePaneAuto",
            "keys": "alt+shift+d"
        }
    ],
    "newTabMenu":
    [
        {
            "type": "remainingProfiles"
        }
    ],
    "profiles":
    {
        "defaults":
        {
            "backgroundImage": "D:\\OneDrive\\ApplicationData\\Themes\\2560x1440.jpg",
            "backgroundImageOpacity": 0.3,
            "font":
            {
                "face": "MesloLGS NF"
            }
        },
        "list":
        [
            {
                "commandline": "C:\\Program Files\\PowerShell\\7\\pwsh.exe -NoExit -Command \"cd 'D:\\Source\\Beisen\\Beisen.UserFramework'; claude --verbose\"",
                "guid": "{a0a0a0a0-a0a0-4a0a-8a0a-a0a0a0a0a0a0}",
                "icon": "D:\\OneDrive\\ApplicationData\\icon\\Claude.png",
                "name": "Claude Beisen.AppFSystem",
                "suppressApplicationTitle": true
            },
            {
                "backgroundImage": "D:\\OneDrive\\ApplicationData\\Themes\\2560x1440.jpg",
                "backgroundImageOpacity": 0.4,
                "commandline": "C:\\Program Files\\PowerShell\\7\\pwsh.exe",
                "guid": "{574e775e-4f2a-5b96-ac1e-a2962a402336}",
                "hidden": false,
                "name": "PowerShell7",
                "source": "Windows.Terminal.PowershellCore",
                "suppressApplicationTitle": true
            },
            {
                "commandline": "%USERPROFILE%\\scoop\\apps\\git\\current\\usr\\bin\\bash.exe --login -i",
                "guid": "{d15b228a-05d7-50d1-8472-f60aaba86efc}",
                "icon": "%USERPROFILE%\\scoop\\apps\\git\\current\\usr\\share\\git\\git-for-windows.ico",
                "name": "Git Bash",
                "startingDirectory": "%USERPROFILE%"
            },
            {
                "commandline": "%SystemRoot%\\System32\\cmd.exe",
                "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
                "hidden": false,
                "name": "\u547d\u4ee4\u63d0\u793a\u7b26"
            }
      
        ]
    },
    "schemes": [],
    "themes": []
}
```

---

**参考资料**：

- PowerShell官网：https://docs.microsoft.com/powershell
- oh-my-posh文档：https://ohmyposh.dev/docs
- posh-git仓库：https://github.com/dahlbyk/posh-git


---
