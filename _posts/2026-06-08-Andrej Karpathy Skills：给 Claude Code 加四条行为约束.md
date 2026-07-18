---
layout: post
title: "Andrej Karpathy Skills：给 Claude Code 加四条行为约束"
date: 2026-06-08
author: D.Q
modifyTime: 2026-06-08 11:00:00
isDisplay: true
excerpt: >-
  它做的事情很直接：把 Andrej Karpathy 对 LLM 编码常见问题的观察整理成 Claude Code 的行为约束，落成一份 `CLAUDE.md`，或者一个 skill。


---




# Andrej Karpathy Skills：给 Claude Code 加四条行为约束

---

发现了一个最近热度很高的仓库： [andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills)   129k star

它做的事情很直接：把 Andrej Karpathy 对 LLM 编码常见问题的观察整理成 Claude Code 的行为约束，落成一份 `CLAUDE.md`，或者一个 skill。

这哥们从特斯拉跳槽到 OpenAI ,这几天又跳槽到了 Anthropic

这些问题很多人都见过：
- 模型会替你做错误假设
- 自己困惑了也不说
- 明明应该先问一句，却直接开始写
- 很喜欢把简单问题做复杂
- 会顺手改掉它并不理解的旁边代码

这份仓库就是把这些常见问题先收进一组明确的行为规则里，只有四条规则。

## 四条规则分别在处理什么问题

对应关系很清楚：
- `Think Before Coding`：减少错误假设和隐藏的困惑
- `Simplicity First`：减少过度设计和膨胀抽象
- `Surgical Changes`：减少无关改动和“顺手优化”
- `Goal-Driven Execution`：减少目标模糊和无法验证的任务

这也解释了为什么这个仓库虽然很小，但很多人装完以后会觉得 Claude Code 的“手感”变了。  

## 核心只有四条规则

README 不复杂，核心就是四条原则：
1. `Think Before Coding`
2. `Simplicity First`
3. `Surgical Changes`
4. `Goal-Driven Execution`

这四条讲的是 agent 的行为方式，不是代码风格。

### 第一条：先想清楚，再开始写

`Think Before Coding` 对应的是一种很常见的情况：LLM 很容易先做一个假设，然后沿着这个假设一路往下跑。

仓库里给出的要求包括：
- 把假设说出来
- 有歧义时，不要自己默默选一个
- 如果有更简单的路，就主动指出来
- 真有困惑时，停下来问

这条规则放到 coding agent 里很重要。很多返工，往往出在前面这几步：
- 一开始就理解错了
- 需求边界没有说清
- 技术路线默认选错了

一旦起步错了，后面代码写得越快，返工也越大。

### 第二条：简单优先

`Simplicity First` 对应的是另一类问题：模型很容易过度设计。

仓库里写得很直接：
- 不要加没被要求的功能
- 不要为一次性代码抽象一层
- 不要为了“灵活性”提前做配置
- 不要为不可能发生的场景补一堆错误处理

这条规则很适合日常用 Claude Code 的场景。很多时候最烦的，是它写得太多：
- 多一层 abstraction
- 多一个 config
- 多一套并不必要的 wrapper
- 多一段以后没人敢删的“通用逻辑”

功能做出来了，代码库却更重了。

### 第三条：只改你该改的

`Surgical Changes` 对应的是“顺手改了一堆没让它改的东西”。

仓库里要求得很细：
- 不要顺手优化旁边的代码
- 不要改没坏的东西
- 不要顺手重写注释和格式
- 遇到无关死代码，可以提一下，但先别删

它唯一鼓励清理的是：
- 你的改动直接导致没用了的 import
- 你的改动直接导致没用了的变量
- 你的改动直接导致没用了的函数

这条很像 code review 的一条基本原则：
**每一行 diff 都应该能追溯回当前这个需求。**

对 Claude Code 来说，这一点尤其重要，因为它太容易“顺手帮你一起改了”。人类工程师看到这种提交，通常第一反应都是：
- 你为什么动这里？
- 这个跟需求有什么关系？
- 你怎么证明你没把别的东西弄坏？

### 第四条：不要只给命令，要给成功条件

`Goal-Driven Execution` 是这套规则里最有用的一条。

README 把问题讲得很清楚：
不要只给一句：
- `add validation`
- `fix the bug`
- `refactor X`

这种话对模型来说太模糊了。

更合适的写法，是把任务改成一个可验证的目标，比如：
- 给非法输入写测试，然后让测试通过
- 先写一个能复现 bug 的测试，再修到通过
- 重构前后测试都必须通过

两者的区别在于：
- 前者是命令式任务
- 后者是带校验标准的目标

这里有一句话写得很直接：
> Don't tell it what to do, give it success criteria and watch it go.

这很像写给 coding agent 的工作单：
- 先把事情交代清楚
- 再把“做到什么算完成”写清楚

成功标准清楚以后，模型更容易自己循环下去。