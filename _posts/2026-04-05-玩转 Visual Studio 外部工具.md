---
layout: post
title: "玩转 Visual Studio 外部工具"
date: 2026-04-05
author: D.Q
modifyTime: 2026-04-05 11:00:00
isDisplay: true
excerpt: >-
  「外部工具」是 Visual Studio 内置的一个扩展机制，允许你把任意可执行程序（exe、PowerShell 脚本等）挂载到「工具」菜单下，直接在 IDE 内触发，并可以读取当前项目的上下文变量。

---

## 起因

某天需要在代码里插入一个 GUID，习惯性地去网上搜生成工具，结果突然发现 Visual Studio 的菜单栏里藏着一个「工具 → 创建 GUID」——它一直都在，只是没人注意。

这个发现让我开始重新审视 VS 的「外部工具」功能，最终整理出了一套提升日常开发效率的工具链。

---

## 什么是 VS 外部工具

「外部工具」是 Visual Studio 内置的一个扩展机制，允许你把任意可执行程序（exe、PowerShell 脚本等）挂载到「工具」菜单下，直接在 IDE 内触发，并可以读取当前项目的上下文变量。

**入口：** 菜单栏 → 工具 → 外部工具

配置项说明：

| 字段 | 说明 |
|------|------|
| 标题 | 菜单中显示的名称，`&X` 表示该字母为快捷键 |
| 命令 | 可执行文件路径，如 `powershell.exe` |
| 参数 | 传给命令的参数，支持宏变量 |
| 初始目录 | 脚本的工作目录，支持宏变量 |
| 使用输出窗口 | 勾选后将输出重定向到 VS 输出面板，无需弹出额外控制台 |

常用宏变量：

| 变量 | 含义 |
|------|------|
| `$(ProjectDir)` | 当前项目目录 |
| `$(SolutionDir)` | 解决方案目录 |
| `$(TargetPath)` | 编译输出文件完整路径（.exe / .dll） |
| `$(TargetDir)` | 编译输出目录 |
| `$(ItemPath)` | 当前选中文件完整路径 |

---

## 内置工具：创建 GUID

VS 自带的 GUID 工具（`工具 → 创建 GUID`）可以生成多种格式：注册表格式、`static const struct`、C++ 宏等，并支持直接复制到剪贴板。

适合偶尔需要一个 GUID 的场景，但每次都要打开窗口手动选格式再复制，稍显繁琐——这也是后续自定义工具的出发点。

---

## 从内置工具引申：自定义外部工具

### 1. Gen GUID — 生成 GUID 并写入剪贴板

**VS 配置：**

| 字段 | 值 |
|------|----|
| 命令 | `powershell.exe` |
| 参数 | `-ExecutionPolicy Bypass -File "D:\OneDrive\Scripts\PS1\InsertGuid.ps1"` |
| 初始目录 | `$(ProjectDir)` |
| 使用输出窗口 | √ |

**脚本内容：**

```powershell
$guid = [guid]::NewGuid().ToString("D")

$guid | Set-Clipboard
Write-Output "生成 GUID: $guid"
```

**效果：** 点击菜单后，生成标准连字符格式的 GUID（如 `a1b2c3d4-e5f6-7890-abcd-ef1234567890`），自动写入剪贴板并在 VS 输出窗口打印，直接 `Ctrl+V` 粘贴即用。

---

### 2. Gen GuidAttribute — 生成 `[Guid("...")]` 特性

**VS 配置：**

| 字段 | 值 |
|------|----|
| 命令 | `powershell.exe` |
| 参数 | `-ExecutionPolicy Bypass -File "D:\OneDrive\Scripts\PS1\InsertGuidAttribute.ps1"` |
| 初始目录 | _(留空)_ |
| 使用输出窗口 | √ |

**脚本内容：**

```powershell
param()

Add-Type -AssemblyName System.Windows.Forms

# 生成 GUID 并格式化为特性字符串
$guid = [guid]::NewGuid().ToString("D")
$guidAttribute = "[Guid(`"$guid`")]"

Write-Output "生成的 GUID: $guidAttribute"

# 复制到剪贴板
[System.Windows.Forms.Clipboard]::SetText($guidAttribute)
```

**效果：** 生成完整的 `[Guid("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx")]` 字符串并写入剪贴板，粘贴到类定义上方即可。COM 互操作或需要固定类型标识时常用。

> 与 Gen GUID 的区别：改用 `System.Windows.Forms.Clipboard` 写剪贴板，兼容性更好（管道写法在部分环境下可能失效）。

---

### 3. EnvDev / EnvTest — 一键切换环境配置

这是使用频率最高的两个工具。项目里连接字符串、API 地址等配置分 Dev / Test 两套，每次手动改 `app.config` / `web.config` 既容易出错，也容易忘记改回来。

**VS 配置（EnvDev）：**

| 字段 | 值 |
|------|----|
| 命令 | `powershell.exe` |
| 参数 | `-ExecutionPolicy Bypass -File "D:\OneDrive\Scripts\PS1\Environment.ps1" "$(ProjectDir)" "Dev"` |
| 初始目录 | `$(ProjectDir)` |
| 使用输出窗口 | √ |

**VS 配置（EnvTest）：**

| 字段 | 值 |
|------|----|
| 命令 | `powershell.exe` |
| 参数 | `-ExecutionPolicy Bypass -File "D:\OneDrive\Scripts\PS1\Environment.ps1" "$(ProjectDir)" "Test"` |
| 初始目录 | `$(ProjectDir)` |
| 使用输出窗口 | √ |

两个工具共用同一个脚本，通过第二个参数区分环境。

**脚本内容：**

```powershell
param(
    [string]$TargetDir,       # 由 VS 的 $(ProjectDir) 传入
    [string]$TargetEnv = "Dev"  # "Dev" 或 "Test"
)

# 校验项目路径
if ([string]::IsNullOrEmpty($TargetDir)) {
    Write-Host "错误：未检测到项目路径。请在VS中选中项目运行。" -ForegroundColor Red
    exit 1
}

$TargetDir = $TargetDir.TrimEnd('\') + '\'

# 查找 app.config 或 web.config
$configFiles = @("app.config", "web.config")
$foundFile = $null

foreach ($file in $configFiles) {
    $path = Join-Path $TargetDir $file
    if (Test-Path $path) {
        $foundFile = $path
        break
    }
}

if (-not $foundFile) {
    Write-Host "未在当前目录找到 app.config 或 web.config。"
    exit 0
}

Write-Host "找到配置文件: $foundFile"
Write-Host "目标环境值: $TargetEnv"

try {
    $xml = New-Object System.Xml.XmlDocument
    $xml.Load($foundFile)

    # 定位 appSettings 下的 environment 键
    $node = $xml.SelectSingleNode("//configuration/appSettings/add[@key='environment']")

    if ($null -eq $node) {
        Write-Host "未找到 <add key='environment' ... /> 节点，无需更改。"
    } else {
        $oldValue = $node.GetAttribute("value")

        if ($oldValue.ToLower() -eq $TargetEnv.ToLower()) {
            Write-Host "值已经是 '$TargetEnv'，无需更改。"
        } else {
            $node.SetAttribute("value", $TargetEnv)
            $xml.Save($foundFile)
            Write-Host "成功：已将 environment 的值从 '$oldValue' 修改为 '$TargetEnv'。"
        }
    }
}
catch {
    Write-Host "处理文件时出错: $_" -ForegroundColor Red
}
```

**效果：** 脚本自动在项目根目录找到 `app.config` 或 `web.config`，定位 `appSettings` 下的 `environment` 键并更新值。输出窗口打印变更前后的结果，方便确认。

**使用前提：** 配置文件中需要有如下节点，其余配置项在代码里按 `environment` 值做分支：

```xml
<appSettings>
  <add key="environment" value="Dev" />
</appSettings>
```

---

### 4. IL Disassembler — 直接反编译当前项目

**VS 配置：**

| 字段 | 值 |
|------|----|
| 命令 | `C:\Program Files (x86)\Microsoft SDKs\Windows\v10.0A\bin\NETFX 4.8 Tools\ildasm.exe` |
| 参数 | `$(TargetPath)` |
| 初始目录 | `$(TargetDir)` |
| 使用输出窗口 | X |

**效果：** 编译完成后点击菜单，直接打开 `ildasm.exe` 并加载当前项目的输出程序集。排查 COM 互操作、泛型展开、值类型装箱等底层行为时，看 IL 是最准确的方式，不用再手动定位 `.dll` 路径。

---

## SSMS 外部工具：堡垒机上的实用补丁

外部工具机制不只 VS 有，SQL Server Management Studio（SSMS）同样支持，入口在 `Tools → External Tools`。

在堡垒机环境里，任务栏受限、快捷方式不能随便创建，打开一个文件管理器或者查密码文件都要绕很多弯。把这两个工具挂进 SSMS 菜单，点一下就能用。

### Pwd — 用记事本打开密码文件

**配置：**

| 字段 | 值 |
|------|----|
| 命令 | `notepad.exe` |
| 参数 | `pwd.txt` |
| 初始目录 | `E:\Username` |
| Use Output window | X |

**效果：** 直接用记事本打开 `E:\pwd.txt`。堡垒机上连接数据库时，各环境的账号密码存在这个文件里，不用切出 SSMS 去找，点菜单就能看。

### Explorer — 打开工作目录

**配置：**

| 字段 | 值 |
|------|----|
| 命令 | `explorer.exe` |
| 参数 | `E:\Usename` |
| 初始目录 | _(留空)_ |
| Use Output window | X |

**效果：** 直接打开 `E:\Username` 文件夹。堡垒机桌面通常是裁剪过的，无法像本地一样随手打开资源管理器，挂进菜单后一步到位。



---