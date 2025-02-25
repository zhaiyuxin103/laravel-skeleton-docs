# 安装指南

[Laravel Skeleton](https://github.com/zhaiyuxin103/laravel-skeleton) 是一个功能完备的 Laravel 项目骨架，集成了常用开发工具和最佳实践。本指南将帮助您快速搭建开发环境并开始使用。

## 环境要求 {#requirements}

- PHP >= 8.3
- Composer >= 2.0
- Node.js >= 18.0
- MySQL >= 8.0 / MariaDB >= 10.3
- Redis >= 6.0

::: tip 开发环境推荐
我们推荐使用 [Laravel Herd](https://herd.laravel.com/) 作为本地开发环境，它提供了最佳的开发体验。如果您还未安装 Herd，请参考[官方文档](https://herd.laravel.com/docs)进行安装。
:::

## 快速开始 {#quick-start}

### 创建项目 {#create-project}

使用 Composer 从模板创建新项目：

```sh
composer create-project zhaiyuxin103/laravel-skeleton
```

进入项目目录：

```sh
cd laravel-skeleton
```

::: tip 自动配置
项目会自动执行以下操作：

1. 复制环境配置文件（.env.example → .env）
2. 生成应用密钥（APP_KEY）
   :::

### 配置环境 {#configuration}

根据您的实际环境修改 `.env` 文件：

::: warning 重要提示
请务必正确配置 `APP_URL`，这将影响路由生成和资源访问。
:::

::: tip 开发登录提示
本项目集成了 [Laravel Login Link](https://github.com/spatie/laravel-login-link) 扩展包用于开发环境快速登录。如果您需要在本地开发环境中使用此功能，请在 `config/login-link.php` 中的 `allowed_hosts` 数组中添加您配置的域名：

```php
'allowed_hosts' => [
    'localhost',
    'laravel.test', // 添加您的本地开发域名
],
```

:::

::: details 环境变量配置参考

```ini
# 基础配置
APP_NAME=Laravel
APP_ENV=local
APP_DEBUG=true
APP_URL=https://laravel.test
APP_HTTPS=true

# 区域设置
APP_LOCALE=zh_CN
APP_FALLBACK_LOCALE=zh_CN
APP_FAKER_LOCALE=zh_CN

# 数据库配置
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=password

# Redis 配置
REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# 队列配置
QUEUE_CONNECTION=redis

# Octane 配置
OCTANE_SERVER=roadrunner
OCTANE_HTTPS=true
```

:::

### 初始化数据库 {#database-setup}

创建数据库表结构：

```sh
php artisan migrate
```

填充初始测试数据：

```sh
php artisan db:seed
```

### 前端资源 {#frontend-assets}

项目使用 PNPM 作为包管理器，提供更快的安装速度和更好的磁盘空间利用率。

全局安装 PNPM 包管理器：

```sh
npm install -g pnpm
```

安装项目所需的 NPM 依赖包：

```sh
pnpm install
```

启动开发服务器（支持热重载）：

```sh
pnpm dev
```

构建生产环境的前端资源：

```sh
pnpm build
```

## 开发环境配置 {#development-setup}

### Herd 设置 {#herd-setup}

将项目链接到 Herd 环境：

```sh
herd link
```

设置项目使用的 PHP 版本：

```sh
herd isolate 8.3
```

为项目启用 HTTPS 支持：

```sh
herd secure
```

在浏览器中打开项目：

```sh
herd open
```

### Octane 服务 {#octane-service}

::: tip 性能提示
我们使用 RoadRunner 作为 Octane 服务器，它提供了优秀的性能和稳定性。
:::

1. **安装配置**

   安装并配置 Laravel Octane：

   ```sh
   php artisan octane:install
   ```

2. **配置 Nginx**

   - 通过 Herd 菜单打开配置文件目录
   - 参考 [Nginx 配置文档](https://laravel.com/docs/11.x/octane#serving-your-application-via-nginx)

3. **启动服务**

   启动开发环境（支持代码更改自动重载）：

   ```sh
   php artisan octane:start --watch
   ```

   启动生产环境服务：

   ```sh
   php artisan octane:start
   ```

### 权限系统 {#permissions}

生成所有权限配置：

```sh
php artisan shield:generate --option=permissions --all
```

创建并设置超级管理员账号：

```sh
php artisan shield:super-admin
```

## 开发工具 {#development-tools}

### IDE 支持 {#ide-support}

生成 Laravel Facades 的 IDE 提示：

```sh
php artisan ide-helper:generate
```

生成数据库模型的 PHPDoc 注释：

```sh
composer ide-helper:models
```

生成 PHPStorm 的高级元数据：

```sh
php artisan ide-helper:meta
```

### 代码质量 {#code-quality}

使用 Laravel Pint 修复代码风格：

```sh
composer format
```

运行 PHPStan 静态代码分析：

```sh
composer analyze
```

## 生产环境部署 {#production-deployment}

部署到生产环境前，请执行以下优化：

优化 Composer 自动加载器：

```sh
composer install --optimize-autoloader --no-dev
```

优化应用程序（缓存配置、事件、路由和视图）：

```sh
php artisan optimize
```

构建并优化前端资源：

```sh
pnpm build
```

## 常见问题 {#troubleshooting}

### 权限问题 {#permission-issues}

修复存储目录和缓存目录的权限：

```sh
chmod -R 775 storage bootstrap/cache
```

### 性能优化建议 {#performance-tips}

1. 启用 Redis 缓存
2. 使用 Octane 服务
3. 优化数据库查询
4. 配置队列处理

## 参考资源 {#references}

- [Laravel 文档](https://laravel.com/docs)
- [Herd 文档](https://herd.laravel.com/docs)
- [项目源码](https://github.com/zhaiyuxin103/laravel-skeleton)
- [贡献指南](/contributing)
