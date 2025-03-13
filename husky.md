# Husky

[Husky](https://typicode.github.io/husky/) 是一个现代化的 Git Hooks 工具，用于在 Git 事件触发时执行脚本。Laravel Skeleton 集成了 Husky 来确保代码质量和提交规范。

## 为什么选择 Husky？

- 🎯 自动化代码检查：在提交前自动运行代码检查
- 📝 规范提交信息：强制执行统一的提交信息格式
- 🔄 简单易用：零配置安装，开箱即用
- 🛠️ 高度可定制：支持自定义 Git Hooks 和脚本
- 🚀 提升团队效率：自动化流程，减少人为错误
- 💪 稳定可靠：广泛使用的工具，社区活跃

## 环境要求

- Node.js >= 16
- Git >= 2.13.0
- pnpm >= 8.0

## 快速开始

Laravel Skeleton 已经预配置了 Husky，包含以下**自动化**功能：

1. 提交前代码检查：

   - 使用 ESLint 检查 JS 文件中可能存在的错误并自动修复
   - 使用 Prettier 格式化所有非 PHP 文件
   - 使用 Pint 格式化所有 PHP 文件
   - 所有格式化操作都是自动的，无需再次手动执行 `git add`

2. 提交信息格式验证：

   - 使用 Commitlint 统一团队成员的 Git 提交信息格式
   - 自动检查提交信息是否符合规范
   - 提供清晰的错误提示

3. 推送前的测试运行：
   - 确保代码质量
   - 防止错误代码进入仓库

## 配置详解

### Git Hooks 配置

Laravel Skeleton 使用了以下 Git Hooks：

1. **pre-commit**：

   ```bash
   #!/bin/sh
   . "$(dirname "$0")/_/husky.sh"

   pnpm lint-staged
   ```

2. **commit-msg**：

   ```bash
   #!/bin/sh
   . "$(dirname "$0")/_/husky.sh"

   pnpm commitlint --edit $1
   ```

### Lint Staged 配置

[Lint Staged](https://github.com/lint-staged/lint-staged) 用于在 Git 暂存区文件上运行 linters，在 [`lint-staged.config.mjs`](https://github.com/zhaiyuxin103/laravel-skeleton/blob/main/lint-staged.config.mjs) 中定义了提交前的代码检查规则。

### Commitlint 配置

[Commitlint](https://commitlint.js.org/) 用于检查提交信息是否符合规范，在 [`commitlint.config.mjs`](https://github.com/zhaiyuxin103/laravel-skeleton/blob/main/commitlint.config.mjs) 中定义了提交信息格式规范。

## 使用指南

### 提交代码

1. 暂存更改：

   ```bash
   git add .
   ```

2. 提交代码：
   ```bash
   git commit -m "type(scope): commit message"
   ```

提交类型说明：

| 类型       | 说明         | 使用场景                                       |
| ---------- | ------------ | ---------------------------------------------- |
| `feat`     | 新功能       | 添加新功能、新特性、新模块                     |
| `fix`      | 修复问题     | 修复 bug、解决错误、处理异常                   |
| `docs`     | 文档更新     | 更新文档、注释、README、CHANGELOG              |
| `style`    | 代码格式调整 | 代码格式化、调整代码风格、不影响代码逻辑的修改 |
| `refactor` | 代码重构     | 重构代码、优化代码结构、提取公共方法           |
| `perf`     | 性能优化     | 提升性能、优化加载速度、减少资源消耗           |
| `test`     | 测试相关     | 添加测试、修改测试用例、更新测试配置           |
| `build`    | 构建相关     | 修改构建工具、更新依赖配置、调整构建流程       |
| `ci`       | 持续集成     | 更新 CI 配置、修改部署流程、调整自动化脚本     |
| `chore`    | 其他修改     | 更新依赖、清理临时文件、修改配置文件           |
| `revert`   | 回退提交     | 回退代码、撤销错误修改、恢复之前的版本         |

::: tip 提示

- 类型和说明之间使用冒号加空格分隔
- 说明部分应该简洁明了，不超过 50 个字符
- 如果需要在说明中添加更多信息，可以使用括号补充
- scope 是可选的，用于说明 commit 影响的范围
- scope 通常是一个名词，例如：auth、user、api、db 等
  :::

### 跳过检查

在特殊情况下，可以跳过 Husky 检查：

```bash
git commit -m "message" --no-verify
# 或使用简写
git commit -m "message" -n
```

::: warning 注意
不建议经常跳过检查，这可能导致代码质量问题。
:::

## 最佳实践

### 开发工作流

1. 保持小型提交：

   - 每次提交专注于单一改动
   - 便于代码审查和回滚

2. 编写清晰的提交信息：

   ```bash
   git commit -m "feat(auth): 添加用户认证功能"
   ```

3. 定期推送代码：
   - 确保本地代码与远程同步
   - 避免大量积压的提交

### IDE 集成

#### PhpStorm 用户

1. 安装 [Git Commit Message Helper](https://plugins.jetbrains.com/plugin/13477-git-commit-message-helper) 插件
   - 提供可视化的提交信息编辑界面
   - 自动生成符合规范的提交信息
   - 支持自定义提交类型和模板
2. 配置 ESLint 和 Prettier 插件
3. 使用内置的 Git 功能

#### VSCode 用户

1. 安装 [Git Commit Plugin](https://marketplace.visualstudio.com/items?itemName=redjue.git-commit-plugin)
   - 支持可视化提交信息编辑
   - 自动生成符合规范的提交信息
   - 支持表情符号和自定义模板
   - 多语言支持（包括中文）
2. 配置 ESLint 和 Prettier 插件
3. 使用内置的 Git 功能

## 常见问题

### 1. Husky 钩子未执行

- **问题描述**：提交时没有触发检查
- **解决方案**：
  1. 检查 `.husky` 目录权限
  2. 重新安装 Husky：`pnpm husky install`
  3. 确认 Git Hooks 路径：`git config core.hooksPath`

### 2. Lint 检查失败

- **问题描述**：代码格式检查不通过
- **解决方案**：
  1. 运行 `pnpm lint` 修复格式
  2. 检查 ESLint 和 Prettier 配置
  3. 手动修复报错的文件

### 3. Commitlint 失败

- **问题描述**：提交信息格式不符合要求
- **解决方案**：
  1. 检查提交类型是否正确
  2. 确保冒号后有空格
  3. 使用正确的提交格式

## 更多资源

- [Husky 官方文档](https://typicode.github.io/husky/)
- [Commitlint 文档](https://commitlint.js.org/)
- [Lint Staged 文档](https://github.com/okonet/lint-staged)
- [Laravel Skeleton 配置](https://github.com/zhaiyuxin103/laravel-skeleton)
