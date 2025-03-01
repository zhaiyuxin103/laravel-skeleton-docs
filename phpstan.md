# PHPStan 静态分析工具

[PHPStan](https://phpstan.org/) 是一个强大的 PHP 静态分析工具，它可以通过分析代码来发现潜在的错误，而无需实际运行代码。[Laravel Skeleton](https://github.com/zhaiyuxin103/laravel-skeleton) 项目集成了 PHPStan 及其 Laravel 专用扩展 [Larastan](https://github.com/larastan/larastan)，以提高代码质量和可靠性。

## 为什么使用 PHPStan？

静态分析可以帮助你：

- 在代码运行前发现潜在错误
- 提高代码质量和可维护性
- 减少生产环境中的意外行为
- 强制执行团队的编码标准
- 在不编写测试的情况下捕获许多常见错误

## Laravel Skeleton 中的配置

Laravel Skeleton 项目使用 [Larastan](https://github.com/larastan/larastan)，这是一个专为 Laravel 设计的 PHPStan 扩展包，它理解 Laravel 的魔术方法和动态特性。

### 项目配置文件

项目的 PHPStan 配置文件位于 `phpstan.neon.dist`，你可以在 [Laravel Skeleton 项目仓库](https://github.com/zhaiyuxin103/laravel-skeleton/blob/main/phpstan.neon.dist) 中查看完整配置。

### 分析级别

PHPStan 最新版本支持 11 个分析级别（0-10），级别越高，分析越严格。根据 [PHPStan 官方文档](https://phpstan.org/user-guide/rule-levels)，各级别检查内容如下：

- **级别 0**：基本检查，未知类、未知函数、调用的未知方法等
- **级别 1**：可能未定义的变量，带有 `__call` 和 `__get` 的类上的未知魔术方法和属性
- **级别 2**：所有表达式上的未知方法检查（不仅仅是 `$this`），验证 PHPDocs
- **级别 3**：返回类型，分配给属性的类型
- **级别 4**：基本死代码检查 - 始终为 false 的 `instanceof` 和其他类型检查，死 `else` 分支等
- **级别 5**：检查传递给方法和函数的参数类型
- **级别 6**：报告缺少类型提示
- **级别 7**：报告部分错误的联合类型
- **级别 8**：报告在可空类型上调用方法和访问属性
- **级别 9**：严格处理显式 `mixed` 类型
- **级别 10**：对 `mixed` 类型更加严格，报告隐式混合类型错误

Laravel Skeleton 项目使用了较高级别的分析，以确保代码质量。

## 自动化与工作流集成

Laravel Skeleton 项目通过多种方式将 PHPStan 分析集成到开发工作流中，使代码质量检查自动化：

### 1. Git 提交前检查

项目使用 husky 和 lint-staged 在提交代码前自动运行 PHPStan 分析：

- 当你执行 `git commit` 时，pre-commit hook 会触发
- 系统会自动对修改的文件运行 PHPStan 分析
- 如果发现问题，提交会被阻止，你需要修复问题后再次提交

这确保了所有提交到仓库的代码都通过了静态分析检查。

### 2. CI/CD 自动检查

项目配置了 GitHub Actions 工作流，在以下情况自动运行 PHPStan 分析：

- 每次推送代码到仓库时
- 创建或更新 Pull Request 时

你可以在 [GitHub Actions 工作流配置](https://github.com/zhaiyuxin103/laravel-skeleton/blob/main/.github/workflows/lint.yml) 中查看完整配置。

### 3. 手动运行分析

如果需要手动运行分析，Laravel Skeleton 项目在 `composer.json` 中定义了便捷的脚本：

```bash
# 运行静态分析
composer analyze

# 生成基线文件
composer analyze:baseline
```

这些自动化配置确保了：

- **编写新代码前**：CI/CD 已经确保现有代码库通过了分析
- **提交代码时**：Git hooks 自动验证你的更改不会引入新问题
- **代码审查时**：GitHub Actions 自动检查 PR 中的代码，确保符合标准

## Larastan 特性

Larastan 扩展了 PHPStan，添加了对 Laravel 特定功能的支持：

### 1. 模型属性和关系

Larastan 理解 Eloquent 模型的属性和关系：

```php
// Larastan 能够理解这些属性和方法
$user->id;
$user->email;
$user->posts()->where('active', true)->get();
```

### 2. 门面（Facades）

正确分析 Laravel 门面：

```php
// Larastan 知道这是有效的方法调用
Cache::get('key');
Route::get('/home', [HomeController::class, 'index']);
```

### 3. 辅助函数

支持 Laravel 的全局辅助函数：

```php
// Larastan 理解这些辅助函数的返回类型
$value = old('key', 'default');
$path = app_path('Http/Controllers');
```

### 4. 集合方法

正确分析 Laravel 集合的方法链：

```php
// Larastan 能够跟踪集合中的类型
$names = User::all()->map(fn ($user) => $user->name)->toArray();
```

## 最佳实践

### 1. 类型注释

为变量和返回值添加类型注释，帮助 PHPStan 更准确地分析：

```php
/**
 * @param Collection<int, User> $users
 * @return Collection<int, string>
 */
public function getUserNames(Collection $users): Collection
{
    return $users->map(fn (User $user) => $user->name);
}
```

### 2. 模型注释

为模型添加属性和关系的类型注释：

```php
/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property Carbon $created_at
 * @property-read Collection<int, Post> $posts
 */
class User extends Model
{
    // ...
}
```

### 3. 渐进式采用

如果你的项目有大量遗留代码，可以：

1. 从较低级别开始（如级别 0 或 1）
2. 使用基线功能忽略现有错误
3. 逐步提高分析级别

```bash
# 生成基线文件
composer analyze:baseline

# 使用基线运行分析
./vendor/bin/phpstan analyse --baseline=phpstan-baseline.neon
```

### 4. 处理常见错误

#### 未定义属性

当 PHPStan 报告"Access to an undefined property"时：

```php
// 错误：Access to an undefined property App\Models\User::$settings
$user->settings;
```

解决方法：

- 添加 `@property` 注释
- 使用 `@mixin` 注释混入特性
- 对于动态属性，使用 `__get` 方法并添加适当的 PHPDoc

```php
/**
 * @property array $settings
 */
class User extends Model
{
    // 或者实现 __get 方法
    public function __get($key)
    {
        if ($key === 'settings') {
            return $this->getSettings();
        }

        return parent::__get($key);
    }

    /**
     * @return array<string, mixed>
     */
    protected function getSettings(): array
    {
        // ...
    }
}
```

#### 可能未定义的变量

```php
// 错误：Variable $result might not be defined
if (someCondition()) {
    $result = 'success';
}
echo $result; // PHPStan 报错
```

解决方法：

- 始终初始化变量
- 使用空合并运算符
- 添加适当的条件检查

```php
// 初始化变量
$result = null;
if (someCondition()) {
    $result = 'success';
}
echo $result ?? 'default';
```

#### 类型不匹配

```php
// 错误：Parameter #1 $id of method Repository::find() expects int, string|null given
$repository->find($request->input('id'));
```

解决方法：

- 使用类型转换
- 添加类型检查
- 使用 Laravel 的验证器确保输入类型正确

```php
// 类型转换
$repository->find((int) $request->input('id'));

// 或者添加类型检查
$id = $request->input('id');
if (is_numeric($id)) {
    $repository->find((int) $id);
}
```

### 5. 使用 PHPDoc 泛型

为集合、数组和迭代器添加泛型类型信息：

```php
/**
 * @param array<string, mixed> $config 配置数组
 * @return array<int, User> 用户数组
 */
public function getUsers(array $config): array
{
    // ...
}

/**
 * @var Collection<int, Post> $posts
 */
$posts = $user->posts;

/**
 * @var array<string, array{id: int, name: string}> $data
 */
$data = [
    'user1' => ['id' => 1, 'name' => 'John'],
    'user2' => ['id' => 2, 'name' => 'Jane'],
];
```

### 6. 处理可空类型

明确处理可能为 null 的值：

```php
/**
 * @param User|null $user
 * @return string
 */
public function getUserName(?User $user): string
{
    // 错误：Method call on possibly null value
    // return $user->name;

    // 正确：添加 null 检查
    if ($user === null) {
        return 'Guest';
    }

    return $user->name;

    // 或者使用空合并运算符
    // return $user?->name ?? 'Guest';
}
```

### 7. 使用 PHPStan 忽略注释

对于特定情况下无法修复的错误，可以使用忽略注释：

```php
// 忽略下一行
/** @phpstan-ignore-next-line */
$result = $someComplexExpression;

// 忽略特定错误
/** @phpstan-ignore-line Method someMethod() is not found */
$object->someMethod();

// 在文件顶部忽略整个文件的特定错误
/**
 * @phpstan-ignore-next-line
 * @phpstan-ignore AccessToUndefinedProperty
 */
```

### 8. 创建自定义类型扩展

对于复杂的框架集成或特定的代码模式，可以创建自定义类型扩展：

1. 创建扩展类：

```php
namespace App\PHPStan;

use PHPStan\Reflection\MethodReflection;
use PHPStan\Type\DynamicMethodReturnTypeExtension;
use PHPStan\Type\Type;

class CustomExtension implements DynamicMethodReturnTypeExtension
{
    public function getClass(): string
    {
        return YourClass::class;
    }

    public function isMethodSupported(MethodReflection $methodReflection): bool
    {
        return $methodReflection->getName() === 'yourMethod';
    }

    public function getTypeFromMethodCall(/* ... */): Type
    {
        // 返回正确的类型
    }
}
```

2. 在 `phpstan.neon` 中注册扩展：

```neon
services:
    -
        class: App\PHPStan\CustomExtension
        tags:
            - phpstan.broker.dynamicMethodReturnTypeExtension
```

### 9. 使用 IDE 集成

将 PHPStan 与你的 IDE 集成，获得实时反馈：

- **PhpStorm**: 使用 PHPStan 插件
- **VS Code**: 使用 PHP Intelephense 或 PHP IntelliSense 插件
- **Sublime Text**: 使用 SublimeLinter-phpstan 插件

### 10. 处理第三方库

对于缺少类型信息的第三方库：

1. 使用 stub 文件提供缺失的类型信息：

```php
// stubs/SomeLibrary/SomeClass.stub
<?php

namespace SomeLibrary;

class SomeClass
{
    /**
     * @param string $key
     * @return mixed
     */
    public function get(string $key)
    {
    }
}
```

2. 在 `phpstan.neon` 中配置 stub 文件：

```neon
parameters:
    stubFiles:
        - stubs/SomeLibrary/SomeClass.stub
```

## 参考资源

- [PHPStan 官方文档](https://phpstan.org/user-guide/getting-started)
- [Larastan GitHub 仓库](https://github.com/larastan/larastan)
- [Laravel Skeleton 项目](https://github.com/zhaiyuxin103/laravel-skeleton)
