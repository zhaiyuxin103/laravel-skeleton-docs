# Laravel Horizon

[Laravel Horizon](https://laravel.com/docs/horizon) 为 Laravel 的 Redis 队列提供了一个漂亮的仪表板和代码驱动的配置。Horizon 允许你轻松监控队列系统的关键指标，如任务吞吐量、运行时间和失败任务。

## 快速开始

Laravel Skeleton 已经内置了 Horizon，你可以直接使用：

1. 确保 Redis 服务已启动
2. 访问 `/horizon` 查看仪表板
3. 运行 `php artisan horizon` 启动队列处理

## 为什么选择 Horizon？

- 📊 实时监控队列状态和性能
- 🔄 自动平衡队列负载
- 📈 详细的性能指标分析
- 🚨 完善的失败任务处理机制
- 📱 美观的响应式界面
- 🔒 灵活的访问控制策略

## 项目配置

Laravel Skeleton 已经预配置了 Horizon，主要配置文件位于 `config/horizon.php`。你可以在 [GitHub 仓库](https://github.com/zhaiyuxin103/laravel-skeleton/blob/main/config/horizon.php) 中查看完整配置。

### 配置重点

1. **基础设置**

   - 支持自定义访问域名和路径
   - 使用 Redis 作为队列驱动
   - 可配置 Redis 键前缀，避免多应用冲突

2. **队列配置**

   - 默认队列等待时间阈值为 60 秒
   - 任务保留时间可按类型单独配置
   - 支持静默任务配置

3. **性能优化**

   - 内存限制和快速终止选项
   - 指标快照保留策略
   - 队列任务修剪时间设置

4. **环境适配**
   - 针对 production/staging/local 环境的差异化配置
   - 自动负载均衡策略
   - 进程数量和内存限制的环境特定设置

### 环境适配

Laravel Skeleton 为不同环境配置了不同的工作进程策略：

```php
'environments' => [
    'production' => [
        'supervisor-1' => [
            'maxProcesses' => 10,      // 最大进程数
            'balanceMaxShift' => 1,    // 负载均衡时单次最大调整进程数
            'balanceCooldown' => 3,    // 负载均衡冷却时间（秒）
        ],
    ],
    'staging' => [
        'supervisor-1' => [
            'maxProcesses' => 10,
            'balanceMaxShift' => 1,
            'balanceCooldown' => 3,
        ],
    ],
    'local' => [
        'supervisor-1' => [
            'maxProcesses' => 3,
        ],
    ],
],
```

::: tip 配置说明

- **生产环境**：配置更多进程和更严格的限制，确保服务性能和稳定性
- **预发环境**：与生产环境配置相同，用于完整模拟生产环境
- **本地环境**：配置较少进程，避免占用过多开发机资源

配置参数说明：

- `maxProcesses`: 决定每个队列最多可以运行多少个进程
- `balanceMaxShift`: 控制自动负载均衡时每次最多可以增减多少个进程
- `balanceCooldown`: 两次负载均衡操作之间的最小间隔时间
  :::

## 使用方法

### 开发环境

我们推荐使用 [Laravel Horizon Watcher](./horizon-watcher.md) 实现开发环境下的自动重载。它能监控文件变化并自动重启 Horizon，极大提升开发效率。

### 生产环境

生产环境使用 Supervisor 管理 Horizon 进程，确保服务稳定运行。配置和部署说明请参考 [Laravel 官方文档](https://laravel.com/docs/horizon#deploying-horizon)。

::: warning 注意事项

- 确保 Supervisor 配置了正确的用户权限
- 建议启用快速终止选项，优化部署流程
- 根据服务器资源调整进程数和内存限制
  :::

## 访问控制

Horizon 仪表板的访问权限通过 `App\Providers\HorizonServiceProvider` 中的 `gate` 方法控制：

```php
protected function gate(): void
{
    Gate::define('viewHorizon', function ($user) {
        return in_array($user->email, [
            'admin@example.com',
        ]);
    });
}
```

::: tip 环境说明

- 本地环境（local）：所有用户都可以访问仪表板
- 其他环境：仅允许列表中的用户访问
  :::

如需添加新的管理员用户，只需将其邮箱添加到数组中即可。

## 常用命令

Horizon 提供了一系列命令来管理队列处理：

```bash
# 启动 Horizon
php artisan horizon

# 暂停队列处理（维护时使用）
php artisan horizon:pause

# 恢复队列处理
php artisan horizon:continue

# 优雅终止进程（等待当前任务完成）
php artisan horizon:terminate

# 删除失败任务（支持指定 ID）
php artisan horizon:forget-failed [id]
php artisan horizon:forget-failed --all  # 删除所有失败任务

# 清理已完成任务
php artisan horizon:clear
```

::: warning 注意
使用 `horizon:terminate` 时，确保 `stopwaitsecs` 配置足够长，以允许当前任务完成。
:::

## 监控指标

Horizon 提供了丰富的监控指标：

1. **队列监控**

   - 实时任务状态
   - 处理时间统计
   - 失败任务追踪

2. **性能指标**

   - 任务吞吐量
   - 内存使用情况
   - 等待时间分析

3. **标签管理**
   - 任务标签系统
   - 按标签筛选和监控

### 指标采集配置

为确保监控数据实时更新，需要配置定时任务。在 Laravel 的 `routes/console.php` 中添加：

```php
use Illuminate\Support\Facades\Schedule;

Schedule::command('horizon:snapshot')->everyFiveMinutes();
```

::: tip 提示

- 监控数据每 5 分钟更新一次，可以根据需要调整采集频率
- 可以通过运行 `php artisan schedule:list` 查看定时任务是否配置成功
- 使用 `php artisan horizon:snapshot` 可以手动触发数据采集
  :::

## 常见问题

### 队列任务未执行

- 检查 Redis 连接是否正常
- 确认 Horizon 进程是否正在运行
- 验证队列配置是否正确

### 监控数据不更新

- 确保已配置定时任务运行 `horizon:snapshot`
- 检查 Redis 存储空间是否充足
- 验证指标采集配置是否正确

### 内存占用过高

- 调整 `memory_limit` 配置
- 检查任务是否存在内存泄漏
- 考虑增加队列进程数而不是单进程内存

### 任务调试技巧

- 使用 `php artisan queue:work --once` 单次执行任务进行调试
- 在任务中使用 `Log::info()` 记录关键信息
- 通过 Horizon 仪表板查看任务执行状态和日志

### 任务重复执行

- 检查任务是否实现了 `ShouldBeUnique` 接口
- 确认 Redis 连接稳定，避免任务重新入队
- 适当增加任务超时时间，避免过早重试

### 任务超时处理

- 在任务类中设置 `$timeout` 属性
- 使用 `retry_after` 配置控制失败重试时间
- 对于长时间任务，考虑拆分为多个小任务

## 更多资源

- [Laravel Horizon 官方文档](https://laravel.com/docs/horizon)
- [Laravel Horizon Watcher 使用指南](./horizon-watcher.md)
- [Laravel 队列文档](https://laravel.com/docs/queues)
- [Laravel Skeleton Horizon 配置](https://github.com/zhaiyuxin103/laravel-skeleton/blob/main/config/horizon.php)
