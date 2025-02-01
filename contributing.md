# 贡献导引

## 简介

首先，感谢您考虑为 [Laravel Skeleton](https://github.com/zhaiyuxin103/laravel-skeleton) 项目做出贡献！[Laravel Skeleton](https://github.com/zhaiyuxin103/laravel-skeleton) 的目标是为 [Laravel](https://laravel.com/) 开发者提供一个功能完备、结构清晰的项目骨架，让开发者能够快速启动新项目。本指南将帮助您了解如何为项目做出贡献。

## 行为准则

[Laravel Skeleton](https://github.com/zhaiyuxin103/laravel-skeleton) 的行为准则源自 [Ruby](https://www.ruby-lang.org/) 的行为准则。为了营造一个开放和友好的环境，我们希望所有参与者都能遵守以下准则：

- 使用友好和包容的语言
- 包容并尊重不同的观点和经验
- 耐心地接受建设性的批评
- 关注对社区最有利的事情
- 对其他社区成员表示同理心
- 确保语言和行为不包含人身攻击和贬低性的个人言论
- 在理解他人的言行时，始终假定他人是出于好意
- 不容忍任何形式的骚扰行为

如果发现任何违反行为准则的情况，请发送邮件至 [zhaiyuxin103@hotmail.com](mailto:zhaiyuxin103@hotmail.com) 进行举报。我们会认真对待每一个报告。

## 漏洞报告

如果您发现了安全漏洞，请不要在 [GitHub Issues](https://github.com/zhaiyuxin103/laravel-skeleton/issues) 中公开报告。相反，请发送电子邮件至 [zhaiyuxin103@hotmail.com](mailto:zhaiyuxin103@hotmail.com)。我们会优先处理所有的安全漏洞。

对于非安全性漏洞，请通过 [GitHub Issues](https://github.com/zhaiyuxin103/laravel-skeleton/issues) 进行报告。在报告问题时，请：

1. 描述问题发生的环境（PHP 版本、Laravel 版本等）
2. 详细说明复现问题的步骤
3. 提供相关的错误信息和日志
4. 如果可能，提供修复建议

## 功能建议

如果您有新功能的建议，我们同样欢迎您通过 [GitHub Issues](https://github.com/zhaiyuxin103/laravel-skeleton/issues) 提出。在提出功能建议时，请：

1. 详细描述这个功能将解决什么问题
2. 说明这个功能如何帮助其他用户
3. 提供可能的实现方案
4. 考虑这个功能是否应该作为一个独立的包发布

## Pull Request 指南

在提交 Pull Request 之前，请确保：

1. Fork 项目并创建您的分支
2. 如果您添加了代码，请添加相应的测试
3. 如果您修改了 API，请更新相关文档
4. 确保所有测试都能通过
5. 确保您的代码符合项目的编码规范

### 开发流程

1. Fork 项目到您的 GitHub 账号
2. 克隆您的 Fork 到本地：

   ```bash
   git clone git@github.com:zhaiyuxin103/laravel-skeleton.git
   ```

3. 添加上游仓库：

   ```bash
   git remote add upstream git@github.com:zhaiyuxin103/laravel-skeleton.git
   ```

4. 创建新分支：

   ```bash
   git checkout -b feature-name
   ```

### 编译资源

如果你正在提交将影响编译文件的更改，例如 `resources/css` 或 `resources/js` 中的大多数文件，请不要提交编译文件。由于它们的尺寸较大，维护者无法实际审核它们。这可以被利用作为将恶意代码注入 [Laravel Skeleton](https://github.com/zhaiyuxin103/laravel-skeleton) 的方法。为了防御性地防止这种情况，所有编译文件将由 [Laravel Skeleton](https://github.com/zhaiyuxin103/laravel-skeleton) 维护者生成和提交。

### 编码规范

- 遵循 [PSR-12](https://www.php-fig.org/psr/psr-12/) 编码规范
- 使用 [Laravel Pint](https://github.com/laravel/pint) 进行代码格式化
- 使用 [PHPStan](https://phpstan.org/) 进行静态代码分析
- 所有新代码都必须有单元测试
- 所有方法都必须有 DocBlock 注释
- 提交信息必须清晰明了，建议使用中文

### 测试

在提交 PR 之前，请运行以下测试：

```bash
composer test
composer analyze
composer format
```

确保所有测试都通过，且没有代码风格问题。

## 支持问题

Laravel Skeleton 的 GitHub 问题追踪器并非用于提供 Laravel Skeleton 相关的帮助或支持。请使用以下渠道之一获取帮助：

- [GitHub Discussions](https://github.com/zhaiyuxin103/laravel-skeleton/discussions)
- [StackOverflow](https://stackoverflow.com/)
- [Discord](https://discord.gg/JP2H5ZQM)
- [Larachat](https://larachat.co/)
- [IRC](https://web.libera.chat/?nick=artisan&channels=#laravel-skeleton)

## 文档贡献

如果您想改进文档，请注意：

1. 文档使用 Markdown 格式编写
2. 新功能必须包含文档
3. 文档应该清晰易懂，包含示例
4. 中文文档使用中文标点符号
5. 代码示例需要遵循项目编码规范

## 发布周期

[Laravel Skeleton](https://github.com/zhaiyuxin103/laravel-skeleton) 遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范：

- 修订号：向下兼容的问题修正
- 次版本号：向下兼容的功能性新增
- 主版本号：不向下兼容的变更

## 开源协议

通过为 [Laravel Skeleton](https://github.com/zhaiyuxin103/laravel-skeleton) 做出贡献，您同意将您的代码按照 [MIT 许可证](https://github.com/zhaiyuxin103/laravel-skeleton-docs/blob/main/LICENSE) 授权。

## 参考资源

- [如何给开源项目贡献源码](https://zhaiyuxin103.github.io/vitepress/life/%E5%A6%82%E4%BD%95%E7%BB%99%E5%BC%80%E6%BA%90%E9%A1%B9%E7%9B%AE%E8%B4%A1%E7%8C%AE%E6%BA%90%E7%A0%81)
- [软件版本命名规则](https://zhaiyuxin103.github.io/vitepress/other/%E8%BD%AF%E4%BB%B6%E7%89%88%E6%9C%AC%E5%91%BD%E5%90%8D%E8%A7%84%E8%8C%83)
