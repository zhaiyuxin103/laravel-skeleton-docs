# Laravel Telescope

[Laravel Telescope](https://laravel.com/docs/telescope) 是一个优雅的调试助手，为 Laravel 应用程序提供了深度的调试和监控能力。

## 为什么选择 Telescope？

- 🔍 全方位监控：请求、异常、日志、数据库查询等全面监控
- 🚀 实时调试：实时查看应用运行状态，快速定位问题
- 📊 性能分析：数据库查询、缓存操作、队列任务性能追踪
- 🎯 精准定位：异常堆栈、SQL 语句、请求参数等详细信息
- 📱 优雅界面：清晰直观的界面展示，支持多维度数据筛选
- 🛠 开发利器：加速开发调试效率，提升代码质量
- 🔒 安全可控：严格的访问控制，保护敏感信息

## 快速开始

Laravel Skeleton 已经内置了 Telescope，使用前请确认：

1. 确保数据库配置正确
2. 验证基础配置
   ```env
   TELESCOPE_ENABLED=true
   ```
3. 配置访问权限（见[访问控制](#访问控制)）
4. 访问仪表板
   - 访问 `/telescope` 查看监控面板
   - 确认数据是否正常采集
   - 检查各项指标是否显示

::: warning 注意
必须正确配置访问权限，否则将无法访问 Telescope 仪表板。
:::

## 访问控制

Telescope 仪表板的访问权限需要在 `App\Providers\AppServiceProvider` 中的 `boot` 方法中定义：

```php
use Illuminate\Support\Facades\Gate;

public function boot(): void
{
    Gate::define('viewTelescope', function ($user) {
        return in_array($user->email, [
            'zhaiyuxin103@hotmail.com',
        ]);
    });
}
```

::: tip 提示
只有邮箱在允许列表中的用户才能访问 Telescope 仪表板，请确保将需要访问的用户邮箱添加到列表中。
:::

## 功能与配置

### 监控功能

Telescope 提供以下核心监控功能：

- 📥 请求监控：HTTP 请求、响应、会话数据
- ⚡ 性能分析：
  - 数据库查询及其执行时间
  - 慢查询识别（默认 > 100ms）
  - 模型事件和关联加载
- 🎯 异常追踪：
  - 异常详情和堆栈信息
  - 上下文数据分析
- 📨 邮件监控：预览邮件内容和发送状态
- 📝 日志查看：应用日志实时查看和搜索
- 🔄 队列任务：任务执行状态和性能追踪
- 🔐 权限检查：Gate 和 Policy 授权记录
- 🗄️ 缓存操作：缓存读写和清理记录
- ⏰ 调度任务：计划任务执行状态监控

### 基础配置

```env
# 是否启用 Telescope
TELESCOPE_ENABLED=true

# 仪表板域名
TELESCOPE_DOMAIN=telescope.localhost

# 仪表板路径
TELESCOPE_PATH=/telescope

# 驱动类型
TELESCOPE_DRIVER=database
```

::: tip 提示

- 完整的配置选项请参考 [Laravel Skeleton Telescope 配置](https://github.com/zhaiyuxin103/laravel-skeleton/blob/main/config/telescope.php)
- 可以通过环境变量 `TELESCOPE_*_WATCHER` 来控制各个监控模块的开启状态
  :::

## 数据管理

### 数据清理

1. 配置自动清理调度任务：

在 `routes/console.php` 文件中添加：

```php
use Illuminate\Support\Facades\Schedule;

Schedule::command('telescope:prune')->daily();
```

::: tip 提示

- 可以根据数据量调整清理频率，如 `hourly()`、`twiceDaily()`、`weekly()` 等
- 建议在数据量较大时增加清理频率，避免数据库占用过多空间
- 生产环境建议配置监控告警，及时发现数据量异常
  :::

3. 手动清理数据：

```bash
php artisan telescope:prune
```

### 性能优化

1. 使用专用数据库存储监控数据
2. 合理配置数据保留时间
3. 按需启用监控功能
4. 生产环境谨慎使用

## 使用建议

### 开发环境

- 启用所有监控功能，加速调试
- 保留较短数据周期（24-48 小时）
- 重点关注异常和性能问题

### 生产环境

- 仅启用必要的监控功能
- 严格控制访问权限
- 使用专用数据库
- 合理设置数据保留时间

## 常见问题

### 1. 访问权限问题

- **问题描述**：无法访问仪表板
- **解决方案**：
  1. 检查用户邮箱是否在允许列表
  2. 确认 `AppServiceProvider` 中的权限配置
  3. 清除路由缓存：`php artisan route:clear`

### 2. 数据量过大

- **问题描述**：数据库占用空间快速增长
- **解决方案**：
  1. 减少数据保留时间
  2. 增加清理任务频率
  3. 只记录必要的监控项

### 3. 性能影响

- **问题描述**：监控影响系统性能
- **解决方案**：
  1. 使用专用数据库
  2. 禁用不必要的监控项
  3. 适当增加清理频率
  4. 考虑在生产环境关闭部分功能

## 更多资源

- [Laravel Telescope 官方文档](https://laravel.com/docs/telescope)
- [Laravel Telescope GitHub](https://github.com/laravel/telescope)
- [Laravel Skeleton Telescope 配置](https://github.com/zhaiyuxin103/laravel-skeleton/blob/main/config/telescope.php)
