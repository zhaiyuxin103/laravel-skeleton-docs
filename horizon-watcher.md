# Laravel Horizon Watcher

[Laravel Horizon Watcher](https://github.com/spatie/laravel-horizon-watcher) 是一个由 Spatie 开发的 Laravel 扩展包，它可以在本地 PHP 文件发生变化时自动重启 Horizon。这对于本地开发环境特别有用，可以避免因忘记重启 Horizon 而导致的调试问题。

## 为什么需要 Horizon Watcher？

在开发 Laravel 应用时，我们经常需要处理队列任务。当修改了队列任务的代码后，需要重启 Horizon 才能使更改生效。然而，在开发过程中很容易忘记这一步，导致：

- 修改后的代码没有生效
- 浪费时间调试看似正确但未生效的代码
- 队列任务执行的仍是旧版本的代码

Horizon Watcher 正是为了解决这个问题而生，它会自动监控代码变化并重启 Horizon，让您专注于开发而不是记住重启服务。

## 功能特点 {#features}

- 🔄 **自动监控文件变化**：实时监控 PHP 文件的创建、更新和删除
- ⚡ **即时重启 Horizon**：文件变化时自动重启 Horizon 进程
- 🎯 **可配置监控路径**：灵活设置需要监控的文件和目录
- 🛠️ **开发环境友好**：专为本地开发环境设计
- 📝 **简单易用**：最小化配置，即装即用
- 🔧 **可自定义命令**：支持自定义 Horizon 启动命令
- 🎨 **优雅的输出**：清晰的命令行输出和状态提示

## 安装说明 {#installation}

该扩展包已经包含在 Laravel Skeleton 项目中。如果您需要在其他项目中手动安装：

```bash
composer require spatie/laravel-horizon-watcher --dev
```

### 依赖安装 {#dependencies}

本工具依赖 `chokidar` 来监控文件变化，您需要通过包管理器安装它：

```bash
# 使用 pnpm（推荐）
pnpm add -D chokidar

# 或使用 npm
npm install chokidar --save-dev

# 或使用 yarn
yarn add chokidar --dev
```

## 配置说明 {#configuration}

### 发布配置文件

```bash
php artisan vendor:publish --tag="horizon-watcher-config"
```

### 配置选项

配置文件位于 `config/horizon-watcher.php`：

```php
return [
    /*
     * Horizon 将在这些目录中的任何 PHP 文件被创建、更新或删除时重启。
     * 你也可以在这里指定其他类型的文件。
     */
    'paths' => [
        app_path(),
        config_path(),
        database_path(),
        resource_path('views'),
        base_path('.env'),
        base_path('composer.lock'),
    ],

    /*
     * 这个命令将被用来启动 Horizon
     */
    'command' => 'php artisan horizon',
];
```

::: warning 注意
建议只监控必要的目录，避免监控 `vendor` 等大型目录，以免影响性能。
:::

## 使用方法 {#usage}

### 开发环境使用

在开发环境中，您可以通过以下方式使用 Horizon Watcher：

1. **直接启动**

   ```bash
   php artisan horizon:watch
   ```

2. **使用 Laravel Sail**

   ```bash
   sail artisan horizon:watch
   ```

   ::: tip 提示
   如果您使用 Laravel Sail，建议在 `docker-compose.yml` 中为 Horizon Watcher 添加单独的服务：

   ```yaml
   horizon-watcher:
     build:
       context: ./vendor/laravel/sail/runtimes/8.2
       dockerfile: Dockerfile
       args:
         WWWGROUP: '${WWWGROUP}'
     image: sail-8.2/app
     command: php artisan horizon:watch
     depends_on:
       - mysql
       - redis
     volumes:
       - '.:/var/www/html'
     networks:
       - sail
   ```

   :::

3. **通过 VS Code 任务**

   在 `.vscode/tasks.json` 中添加任务：

   ```json
   {
     "version": "2.0.0",
     "tasks": [
       {
         "label": "Start Horizon Watcher",
         "type": "shell",
         "command": "php artisan horizon:watch",
         "problemMatcher": [],
         "presentation": {
           "reveal": "always",
           "panel": "new",
           "clear": true
         },
         "runOptions": {
           "runOn": "folderOpen"
         }
       }
     ]
   }
   ```

4. **配合其他开发工具**

   如果您使用了其他开发工具，可以在相应的配置文件中添加启动命令：

   ```bash
   # 例如在 package.json 中添加脚本
   {
       "scripts": {
           "horizon:watch": "php artisan horizon:watch"
       }
   }
   ```

   或者在 `composer.json` 中：

   ```json
   {
     "scripts": {
       "horizon:watch": "@php artisan horizon:watch"
     }
   }
   ```

当您的项目中的 PHP 文件发生变化时，Horizon 将自动重启，无需手动干预。

## 最佳实践 {#best-practices}

1. **仅在开发环境使用**

   - 将包安装为开发依赖（`--dev`）
   - 不要在生产环境中使用此功能

2. **合理配置监控路径**

   - 只监控必要的目录
   - 避免监控大型目录（如 `vendor`）
   - 考虑添加特定的配置文件

3. **与其他工具集成**
   - 配合 IDE 使用
   - 与 Laravel Sail 集成
   - 与其他开发工具协同工作

## 故障排除 {#troubleshooting}

### 常见问题

1. **文件监控不工作**

   - 检查 `chokidar` 是否正确安装
   - 验证监控路径配置是否正确
   - 检查文件权限设置

2. **Horizon 重启过于频繁**

   - 调整监控路径配置
   - 排除不需要监控的文件类型
   - 使用 `.gitignore` 样式的排除规则

3. **性能问题**
   - 减少监控的目录数量
   - 排除临时文件和缓存文件
   - 适当调整监控配置

## 安全建议 {#security}

1. **环境限制**

   - 仅在开发环境中启用
   - 在生产环境中禁用此功能

2. **权限控制**
   - 限制文件监控范围
   - 确保只监控项目相关文件
   - 避免监控敏感文件

## 参考资源 {#references}

- [官方文档](https://github.com/spatie/laravel-horizon-watcher)
- [Laravel Horizon 文档](https://laravel.com/docs/horizon)
- [Spatie Packages](https://spatie.be/open-source)
- [Laravel 文档](https://laravel.com/docs)
