# Laravel Octane

[Laravel Octane](https://laravel.com/docs/octane) 是 Laravel 官方推出的应用加速引擎，通过使用高性能的应用服务器来提升应用性能，保持应用常驻内存，显著减少请求响应时间。

## 为什么选择 Octane？

- 🚀 极致性能：减少启动时间，显著提升请求处理速度
- 🔄 内存常驻：应用只需引导一次，持续驻留在内存中
- 🔌 兼容性强：支持多种高性能服务器（Swoole、RoadRunner、Open Swoole、FrankenPHP）
- 🚄 并发能力：强大的并发处理和协程支持（特别是 Swoole）
- 🧠 智能缓存：支持超高速内存表和缓存系统（Swoole）
- ⏰ 定时任务：支持高精度的定时器和间隔任务（Swoole）
- 🔍 开发友好：支持文件变更监控，实时重载应用

## 环境要求

- PHP >= 8.1
- Laravel >= 10.0
- RoadRunner 服务器（当前）
- Swoole 扩展（计划中）

## 快速开始

Laravel Skeleton 已经内置了 Octane，使用前请确认：

1. 安装 Octane 配置文件：

   ```bash
   php artisan octane:install
   ```

2. 启动 Octane 服务：

   ```bash
   php artisan octane:start
   ```

3. 使用监控模式（开发环境推荐）：
   ```bash
   php artisan octane:start --watch
   ```

::: tip 提示
Laravel Skeleton 支持在 PhpStorm 中直接运行 Octane，通过项目根目录下的 `.run/octane.run.xml` 配置文件，已预配置 `--watch` 选项。
:::

## 服务器选择

### 当前配置：RoadRunner

Laravel Skeleton 目前使用 RoadRunner 作为 Octane 服务器：

```env
OCTANE_SERVER=roadrunner
```

RoadRunner 是一个基于 Go 的高性能应用服务器，优势包括：

- 轻量级设计
- 内存占用低
- 跨平台支持良好
- 配置简单

### 未来规划：Swoole

Laravel Skeleton 计划在后期迁移到 Swoole：

```env
# 未来计划迁移
# OCTANE_SERVER=swoole
```

Swoole 的主要优势：

- 功能更加丰富（协程、内存表、定时器等）
- 更高的性能和并发处理能力
- 更成熟的生产环境应用案例
- 活跃的社区支持和维护

## 配置选项

### 基础配置

```env
# 服务器类型：roadrunner、swoole、frankenphp
OCTANE_SERVER=roadrunner

# 是否启用 HTTPS
OCTANE_HTTPS=false
```

::: warning 注意
在生产环境中，建议使用进程管理器（如 Supervisor）来管理 Octane 进程，并通过 Nginx 作为反向代理。
:::

::: tip 提示
更多配置选项请参考 [Laravel Skeleton Octane 配置](https://github.com/zhaiyuxin103/laravel-skeleton/blob/main/config/octane.php)。
:::

## PhpStorm 集成

Laravel Skeleton 提供了 PhpStorm 运行配置，可以直接在 IDE 中启动 Octane 服务：

1. 打开 PhpStorm
2. 在运行配置下拉菜单中选择 "Octane"
3. 点击运行按钮启动服务

运行配置文件 `.run/octane.run.xml` 已预先配置，支持文件变更监控（--watch）。

## 性能优化

### 状态管理

Octane 应用是常驻内存的，需要注意以下几点：

1. **避免静态/全局状态**：

   ```php
   // ❌ 不推荐 - 可能导致状态污染
   class Service {
       public static $data = [];
   }

   // ✅ 推荐 - 每个请求独立的状态
   class Service {
       private $data = [];

       public function getData() {
           return $this->data;
       }
   }
   ```

2. **容器绑定最佳实践**：

   ```php
   // ✅ 推荐 - 每个请求新实例
   $this->app->scoped(Service::class);

   // ✅ 推荐 - 显式声明单例
   $this->app->singleton(Service::class);
   ```

## 最佳实践

### 开发环境

- 使用 `--watch` 选项实现代码热重载
- 配合 Laravel Telescope 监控应用状态
- 定期检查内存使用情况
- 使用 PhpStorm 运行配置提升开发效率

### 生产环境

- 使用 Supervisor 管理 Octane 进程
- 配置 Nginx 作为反向代理
- 实施监控和告警机制
- 配置日志轮转策略
- 定期检查应用性能指标

### 迁移到 Swoole 的建议

1. 准备工作：

   - 安装并启用 Swoole 扩展
   - 确认服务器满足运行要求
   - 备份当前配置和代码

2. 迁移步骤：
   - 更新 Octane 服务器配置
   - 调整应用代码以适配 Swoole
   - 优化代码以利用 Swoole 特性
   - 全面测试功能和性能
   - 补充文档和测试用例
   - 准备回滚方案

::: tip 参与贡献
欢迎参与 Laravel Skeleton 的 Swoole 迁移工作！请参考[贡献导引](./contributing.md)了解详细流程。

主要工作包括：

1. 添加 Swoole 相关配置
2. 更新服务器配置
3. 优化性能和功能
4. 完善文档和测试
5. 确保平滑迁移
   :::

## 常见问题

### 1. 内存管理

- **问题描述**：应用内存使用异常
- **解决方案**：
  1. 避免使用静态属性存储状态
  2. 及时清理事件监听器
  3. 使用内存分析工具排查问题
  4. 定期重启应用进程

### 2. 第三方包兼容性

- **问题描述**：某些包在 Octane 环境中表现异常
- **解决方案**：
  1. 查看 [Octane 兼容性文档](https://laravel.com/docs/octane#dependency-injection-and-octane)
  2. 使用 `WithoutOverlapping` 中间件
  3. 在配置中添加到 `warm` 列表
  4. 联系包作者请求支持

### 3. 文件变更未生效

- **问题描述**：修改文件后变更未反映在应用中
- **解决方案**：
  1. 确认 `--watch` 选项已启用
  2. 手动重载：`php artisan octane:reload`
  3. 检查文件权限和监控路径
  4. 考虑直接重启服务

## 更多资源

- [Laravel Octane 官方文档](https://laravel.com/docs/octane)
- [RoadRunner 文档](https://roadrunner.dev/)
- [Swoole 文档](https://www.swoole.co.uk/)
- [Laravel Skeleton 配置](https://github.com/zhaiyuxin103/laravel-skeleton)
