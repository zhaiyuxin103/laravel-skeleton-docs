# Log Viewer

[Laravel Log Viewer](https://github.com/opcodesio/log-viewer) 是一个优雅的 Laravel 日志查看器，提供了一个漂亮的用户界面来查看和管理你的 Laravel 应用日志。本项目已经集成了这个扩展包，让你可以更方便地查看和管理日志。

## 功能特点 {#features}

- 📂 **查看所有 Laravel 日志**：轻松浏览 `storage/logs` 目录中的所有日志文件
- 📂 **支持多种日志类型**：支持 Horizon、Apache、Nginx、Redis、Supervisor、Postgres 等日志
- 🔍 **强大的搜索功能**：快速搜索和定位日志内容
- 🎚 **日志级别过滤**：按照日志级别（error、info、debug 等）进行筛选
- 🔗 **可分享的链接**：支持生成指向特定日志条目的链接
- 🌑 **暗黑模式**：支持明暗主题切换
- 📱 **移动端适配**：完美支持移动设备访问
- 🖥️ **多主机支持**：可以查看多个服务器的日志
- ⌨️ **键盘快捷键**：支持键盘操作，提高使用效率
- 💾 **文件管理**：支持在界面中下载和删除日志文件
- ☑️ **Horizon 集成**：支持 Horizon 日志（支持到 Horizon v9.20）
- ☎️ **API 支持**：提供文件夹、文件和日志条目的 API 访问
- 💌 **邮件预览**：支持预览发送到日志的邮件内容

## 配置说明 {#configuration}

本项目已经预配置了 Log Viewer，你可以通过以下环境变量来控制其行为：

```ini
LOG_VIEWER_ENABLED=true
LOG_VIEWER_PATH=log-viewer    # 访问路径
LOG_VIEWER_HIDE_ENVIRONMENT=false
LOG_VIEWER_MAX_DAYS=7        # 保留天数
```

### 访问控制

默认情况下，Log Viewer 的访问是受限的。在本项目中，只有特定邮箱的用户才能访问日志查看器。这是通过 `app/Providers/AppServiceProvider.php` 中的 `boot` 方法配置的：

```php
use Opcodes\LogViewer\Facades\LogViewer;

public function boot()
{
    LogViewer::auth(function ($request) {
        return $request->user()
            && in_array($request->user()->email, [
                'zhaiyuxin103@hotmail.com',
            ]);
    });
}
```

这段配置确保只有指定的邮箱用户可以访问日志查看器，提供了额外的安全保护。如果需要添加其他授权用户，只需在数组中添加相应的邮箱地址。

## 使用方法 {#usage}

### 访问日志查看器

安装完成后，你可以通过访问以下 URL 来查看日志：

```
https://laravel.test/log-viewer
```

### 基本操作

1. **查看日志文件**

   - 在左侧边栏选择日志文件
   - 使用文件筛选器快速定位文件

2. **搜索日志**

   - 使用顶部搜索框搜索日志内容
   - 支持正则表达式搜索

3. **过滤日志级别**
   - 点击顶部的日志级别标签进行筛选
   - 可以组合多个级别进行过滤

### 高级功能

1. **分享日志条目**

   ```
   https://laravel.test/log-viewer/logs/laravel.log?id=12345
   ```

2. **下载日志文件**

   - 点击文件列表中的下载按钮
   - 支持单文件和多文件下载

3. **实时日志监控**
   - 启用自动刷新功能
   - 设置刷新间隔时间

## 安全建议 {#security}

1. **访问控制**

   - 限制只有管理员可以访问
   - 在生产环境中谨慎配置权限

2. **日志清理**

   - 定期清理旧日志文件
   - 配置合适的日志保留时间

3. **敏感信息保护**
   - 确保日志中不包含敏感信息
   - 使用日志脱敏功能

## 最佳实践 {#best-practices}

1. **日志管理**

   - 合理设置日志级别
   - 定期检查和清理日志
   - 配置日志轮转策略

2. **性能优化**

   - 避免保留过多历史日志
   - 使用适当的日志驱动
   - 配置合理的刷新间隔

3. **团队协作**
   - 统一日志记录规范
   - 建立日志查看流程
   - 及时响应异常日志

## 故障排除 {#troubleshooting}

1. **日志不显示**

   - 检查文件权限设置
   - 验证日志文件路径
   - 确认日志格式正确

2. **访问权限问题**
   - 检查中间件配置
   - 验证用户权限设置
   - 确认路由是否正确

## 参考资源 {#references}

- [官方文档](https://log-viewer.opcodes.io/)
- [GitHub 仓库](https://github.com/opcodesio/log-viewer)
- [Laravel 文档](https://laravel.com/docs/logging)
- [示例视频](https://log-viewer.opcodes.io/)
