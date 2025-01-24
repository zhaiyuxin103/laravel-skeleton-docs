本项目代码使用 PHP 框架 [Laravel 11](https://laravel.com/) 开发，本地开发环境使用 [Herd](https://herd.laravel.com/)。

下文将在假定读者已经安装好了 [Herd](https://herd.laravel.com/) 的情况下进行说明。如果还未安装 [Herd](https://herd.laravel.com/)，请参考 [Herd](https://herd.laravel.com/) 官方文档进行安装。

## 基础安装

1. 创建项目

   ```bash
   composer create-project zhaiyuxin103/laravel-skeleton
   ```

2. 根据情况修改 `.env` 文件里的内容，如数据库连接、缓存、邮件设置等

   :::tip
   请确保 `.env` 文件里的 `APP_URL` 配置正确，否则可能会导致路由生成错误
   :::

   ::: details `.env` 参考配置

   ```dotenv
   APP_NAME=Laravel
   APP_ENV=local
   APP_KEY=base64:CwIXFZoR/22TRZMGU8n96Ar//mubrh2Kxa15UmkgPnE=
   APP_DEBUG=true
   APP_TIMEZONE=UTC
   APP_URL=https://laravel.test
   APP_HTTPS=true

   APP_LOCALE=ja
   APP_FALLBACK_LOCALE=ja
   APP_FAKER_LOCALE=ja_JP

   APP_MAINTENANCE_DRIVER=file
   APP_MAINTENANCE_STORE=database

   API_RATE_LIMITS=60,1
   API_SIGN_RATE_LIMITS=10,1
   API_DOMAIN=
   API_PREFIX=api

   ADMIN_DOMAIN=
   ADMIN_PATH=admin

   AUTH_VERIFICATION_CODE_TTL=5

   BCRYPT_ROUNDS=12

   LOG_CHANNEL=daily
   LOG_STACK=single
   LOG_DEPRECATIONS_CHANNEL=null
   LOG_LEVEL=debug
   LOG_DAILY_DAYS=14
   LOG_QUERY=true
   LOG_VIEWER_ENABLED=true
   LOG_VIEWER_API_ONLY=false
   LOG_VIEWER_API_STATEFUL_DOMAINS=

   QUERY_LOG_SLOWER_THAN=0
   QUERY_LOG_TRIGGER=false
   QUERY_LOG_CHANNEL=stack

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=laravel
   DB_USERNAME=root
   DB_PASSWORD=password

   SESSION_DRIVER=redis
   SESSION_LIFETIME=120
   SESSION_ENCRYPT=false
   SESSION_PATH=/
   SESSION_DOMAIN=null

   BROADCAST_CONNECTION=log
   FILESYSTEM_DISK=s3
   QUEUE_CONNECTION=redis

   CACHE_STORE=redis
   CACHE_PREFIX=

   MEMCACHED_HOST=127.0.0.1

   REDIS_CLIENT=phpredis
   REDIS_HOST=127.0.0.1
   REDIS_PASSWORD=null
   REDIS_PORT=6379

   MAIL_MAILER=log
   MAIL_HOST=127.0.0.1
   MAIL_PORT=2525
   MAIL_USERNAME=null
   MAIL_PASSWORD=null
   MAIL_ENCRYPTION=null
   MAIL_FROM_ADDRESS="hello@example.com"
   MAIL_FROM_NAME="${APP_NAME}"

   AWS_ACCESS_KEY_ID=
   AWS_SECRET_ACCESS_KEY=
   AWS_DEFAULT_REGION=us-east-1
   AWS_BUCKET=
   AWS_USE_PATH_STYLE_ENDPOINT=false

   VITE_APP_NAME="${APP_NAME}"

   SCOUT_DRIVER=meilisearch
   MEILISEARCH_HOST=http://meilisearch:7700
   MEILISEARCH_NO_ANALYTICS=false

   SCOUT_DRIVER=typesense
   TYPESENSE_HOST=typesense
   TYPESENSE_PORT=8108
   TYPESENSE_PROTOCOL=http
   TYPESENSE_API_KEY=xyz

   WWWGROUP=1000
   WWWUSER=1000

   TELESCOPE_ENABLED=false

   OCTANE_SERVER=roadrunner
   OCTANE_HTTPS=true

   SENTRY_LARAVEL_DSN=https://example@user.ingest.us.sentry.io/1
   # Specify a fixed sample rate
   SENTRY_TRACES_SAMPLE_RATE=1.0
   # Set a sampling rate for profiling - this is relative to traces_sample_rate
   SENTRY_PROFILES_SAMPLE_RATE=1.0
   ```

   :::

3. 执行数据库迁移

   ```bash
   php artisan migrate
   ```

4. 执行数据库填充

   ```bash
   php artisan db:seed
   ```

## 前端资源安装

1. 安装 pnpm

   :::info

   - 项目使用 pnpm 管理前端依赖，请先确保已经安装了 pnpm
   - 如未安装，参考 [Installation](https://pnpm.io/installation)
     :::

2. 安装依赖

   ```bash
   pnpm install
   ```

3. 编译前端资源

   :::tip
   开发环境请使用 `pnpm run dev` 命令，以便在修改代码后自动编译
   :::

   ```bash
   pnpm run build
   ```

## Herd 配置

1. 链接到域

   ```bash
   herd link
   ```

2. 指定 PHP 版本

   ```bash
   herd isolate 8.3
   ```

3. 启用 HTTPS 支持

   ```bash
   herd secure
   ```

4. 在浏览器中打开应用

   ```bash
   herd open
   ```

## 配置加速引擎

1. 安装 Octane

   :::info
   加速引擎请选择 roadrunner
   :::

   ```bash
   php artisan octane:install
   ```

2. 修改 Nginx 配置

   - 通过 Herd 的 Open configuration files 菜单打开配置文件目录
   - 根据 [Serving Your Application via Nginx](https://laravel.com/docs/11.x/octane#serving-your-application-via-nginx) 官方文档修改 Nginx 配置文件

3. 启动应用

   :::tip
   开发环境下，请添加 `--watch` 选项，以便在修改代码后自动重启服务
   :::

   ```bash
   php artisan octane:start
   ```

## 权限配置

1. 生成所有权限

   ```bash
   php artisan shield:generate --option=permissions --al
   ```

2. 将 1 号用户设为超级管理员

   ```bash
   php artisan shield:super-admin
   ```
