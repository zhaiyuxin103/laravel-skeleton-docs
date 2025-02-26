# Laravel Pint

[Laravel Pint](https://laravel.com/docs/pint) 是一个基于 PHP-CS-Fixer 的代码风格修复工具，它可以帮助你保持代码风格的一致性。Pint 默认使用 Laravel 的代码风格规范，但你也可以自定义规则。

## 为什么需要 Pint？

在团队开发中，保持一致的代码风格非常重要：

- 提高代码可读性
- 减少代码审查中的风格讨论
- 自动化代码格式化，提高开发效率
- 确保项目遵循统一的编码标准

Laravel Skeleton 项目默认集成了 Pint，并配置了符合项目需求的代码风格规则。

## 功能特点 {#features}

- 🎨 **自动代码格式化**：一键修复代码风格问题
- 🔧 **可配置的代码风格规则**：支持自定义规则和预设
- 🚀 **快速执行**：高效的代码分析和修复
- 📝 **详细的输出信息**：清晰展示修改内容
- 🔍 **支持预览模式**：可以查看将要进行的更改
- 🎯 **支持指定文件或目录**：灵活的检查范围
- 🔒 **保持代码风格一致性**：自动化的风格检查

## 项目配置 {#configuration}

### Pint 配置文件

项目的 Pint 配置文件位于 `pint.json`，你可以在 [项目仓库](https://github.com/zhaiyuxin103/laravel-skeleton/blob/main/pint.json) 中查看完整配置。

### 配置说明

1. **预设（Preset）**

   - 使用 `laravel` 预设作为基础
   - 其他可用预设：`psr12`、`symfony`、`per` 和 `empty`

2. **代码质量规则**

   - `array_push`: 优化数组添加元素的方式，使用 `[]` 而不是 `array_push()`
   - `backtick_to_shell_exec`: 将反引号（\`）替换为 `shell_exec()`
   - `declare_strict_types`: 强制添加 `declare(strict_types=1)`
   - `fully_qualified_strict_types`: 使用完全限定的类型声明
   - `protected_to_private`: 将可能的 `protected` 属性转换为 `private`
   - `strict_comparison`: 使用严格比较（`===` 和 `!==`）

3. **导入和命名空间规则**

   - `global_namespace_import`: 自动导入全局命名空间的类、常量和函数
   - `ordered_interfaces`: 按字母顺序排序接口
   - `ordered_traits`: 按字母顺序排序 trait

4. **类结构规则**

   - `ordered_class_elements`: 按指定顺序排列类元素
     - Traits 的使用
     - Case 语句
     - 常量（按访问修饰符排序）
     - 属性（按访问修饰符排序）
     - 构造和析构方法
     - 魔术方法
     - PHPUnit 相关方法
     - 其他方法（按访问修饰符和静态性排序）
   - `single_trait_insert_per_statement`: 每个 trait 使用单独的 use 语句

5. **格式化规则**
   - `concat_space`: 字符串连接时在 `.` 运算符周围添加空格
   - `binary_operator_spaces`: 对齐赋值运算符和箭头运算符
     - 使用最小化的单空格对齐
     - 适用于 `=` 和 `=>` 运算符

### 规则效果示例

1. **字符串连接格式化**

```php
// 修改前
$name='Hello'.'World';
// 修改后
$name = 'Hello' . 'World';
```

2. **运算符对齐**

```php
// 修改前
$array = [
    'short'=>'value',
    'very_long_key'=>'value',
];
// 修改后
$array = [
    'short'         => 'value',
    'very_long_key' => 'value',
];
```

3. **类结构排序**

```php
// 修改前
class Example
{
    private function privateMethod() {}
    use SomeTrait;
    public const CONSTANT = 'value';
    protected static function staticMethod() {}
}
// 修改后
class Example
{
    use SomeTrait;

    public const CONSTANT = 'value';

    protected static function staticMethod() {}

    private function privateMethod() {}
}
```

## 使用方法 {#usage}

### 1. 使用 Composer 脚本

项目在 `composer.json` 中定义了以下便捷脚本：

```bash
# 格式化所有文件
composer format

# 预览模式：查看将要进行的更改（不实际修改文件）
composer format:test

# 仅格式化已修改的文件
composer format:dirty
```

### 2. 直接使用 Pint

如果你想直接使用 Pint 命令：

```bash
# 使用项目自带的 Pint
./vendor/bin/pint

# 使用详细输出模式
./vendor/bin/pint -v
```

### 3. 格式化指定文件或目录

```bash
# 格式化单个文件
./vendor/bin/pint app/Models/User.php

# 格式化指定目录
./vendor/bin/pint app/Models
```

### 4. 预览模式

```bash
# 查看将要进行的更改（不实际修改文件）
./vendor/bin/pint --test
```

### 5. 仅检查已修改的文件

```bash
# 检查与主分支的差异
./vendor/bin/pint --diff=main

# 检查未提交的更改
./vendor/bin/pint --dirty
```

## 持续集成 {#ci}

本项目使用了 [Laravel Skeleton](https://github.com/zhaiyuxin103/laravel-skeleton) 的代码风格检查配置。在 Laravel Skeleton 项目中，通过 husky 和 lint-staged 实现了自动的代码风格检查。

如果你想了解完整的配置细节，可以参考：

- [pint.json](https://github.com/zhaiyuxin103/laravel-skeleton/blob/main/pint.json) - Pint 配置文件
- [.husky](https://github.com/zhaiyuxin103/laravel-skeleton/tree/main/.husky) - Git hooks 配置
- [lint-staged.config.mjs](https://github.com/zhaiyuxin103/laravel-skeleton/blob/main/lint-staged.config.mjs) - Lint Staged 配置
- [GitHub Actions 工作流](https://github.com/zhaiyuxin103/laravel-skeleton/blob/main/.github/workflows/lint.yml) - CI 工作流配置

建议参考 Laravel Skeleton 项目的配置来设置你的项目的代码风格检查。

## 最佳实践 {#best-practices}

1. **提交前格式化**

   - 在提交代码前运行 Pint
   - 使用 Git hooks 自动化这个过程

2. **配置编辑器**

   - 设置保存时自动格式化
   - 使用编辑器插件实时提示

3. **团队协作**
   - 统一使用项目的 Pint 配置
   - 在 CI/CD 中强制执行代码风格检查

## 故障排除 {#troubleshooting}

1. **格式化失败**

   - 检查 PHP 版本兼容性
   - 验证配置文件语法
   - 确认文件权限正确

2. **与其他工具冲突**
   - 检查是否与其他代码格式化工具冲突
   - 确保配置文件优先级正确

## 参考资源 {#references}

- [Laravel Pint 官方文档](https://laravel.com/docs/pint)
- [PHP-CS-Fixer 文档](https://github.com/PHP-CS-Fixer/PHP-CS-Fixer)
- [Laravel 编码规范](https://laravel.com/docs/contributions#coding-style)
- [PSR-12 编码规范](https://www.php-fig.org/psr/psr-12/)
