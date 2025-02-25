# 快速登录链接

[Laravel Login Link](https://github.com/spatie/laravel-login-link) 是一个由 Spatie 开发的 Laravel 扩展包，它提供了一种在开发环境中快速登录的方式，无需输入用户名和密码。

## 功能特点 {#features}

- 🔑 **通过 URL 快速登录系统**：无需输入用户名和密码
- 🛠️ **仅在开发环境中可用**：确保生产环境的安全性
- 🌐 **支持域名白名单配置**：精确控制允许使用的域名
- 🔒 **安全且易于使用**：自动禁用生产环境访问
- 👤 **支持自动创建用户**：可选功能，方便测试
- 🛡️ **支持自定义守卫**：灵活的认证机制
- ⚛️ **支持 Vue 和 React 组件**：提供前端框架集成

## 安装说明 {#installation}

该扩展包已经包含在 Laravel Skeleton 项目中。如果您需要在其他项目中手动安装：

```bash
composer require spatie/laravel-login-link
```

## 配置说明 {#configuration}

### 域名配置 {#domain-setup}

要使用快速登录功能，您需要在 `config/login-link.php` 配置文件中添加允许使用此功能的域名：

```php
return [
    'allowed_hosts' => [
        'localhost',
        'laravel.test',
        // 添加您的本地开发域名
    ],
];
```

::: warning 安全提示
请注意，此功能仅供开发环境使用。在生产环境中，该功能将自动禁用。
:::

### 环境配置 {#environment}

该扩展包仅在配置文件中指定的环境下工作：

```php
'allowed_environments' => ['local', 'staging'],
```

## 使用方法 {#usage}

### 基本用法

在视图中添加登录链接组件：

```blade
@env('local')
    <x-login-link />
@endenv
```

### 自定义登录链接

1. **指定用户邮箱**：

```blade
<x-login-link email="admin@example.com" />
```

2. **指定用户主键**：

```blade
<x-login-link key="123" />
```

3. **指定用户属性**：

```blade
<x-login-link :user-attributes="['role' => 'admin']" />
```

4. **自定义链接文本**：

```blade
<x-login-link label="点击此处登录" />
```

5. **自定义样式类**：

```blade
<x-login-link class="underline text-red-500" />
```

6. **指定登录后重定向地址**：

```blade
<x-login-link redirect-url="{{ route('dashboard') }}" />
```

## 高级用法 {#advanced-usage}

### 1. 指定守卫

```blade
<x-login-link guard="admin" />
```

### 2. 自定义用户模型

```blade
<x-login-link user_model="App\\Models\\Customer" email="customer@example.com" />
```

### 3. 自动用户创建

如果指定的用户不存在，系统会自动创建用户。可以在配置文件中控制此行为：

```php
'automatically_create_missing_users' => true,
```

## 前端框架集成 {#frontend-integration}

### Vue 集成

1. **基本用法**：

```vue
<template>
  <login-link v-if="$page.props.environment === 'local'" />
</template>

<script>
import LoginLink from '@/../../vendor/spatie/laravel-login-link/resources/js/login-link.vue';

export default {
  components: { LoginLink },
};
</script>
```

2. **高级用法**：

```vue
<template>
  <login-link
    v-if="$page.props.environment === 'local'"
    label="以管理员身份登录"
    class="pb-3 text-red-500"
    :redirect-url="route('dashboard')"
  />
</template>
```

### React 集成

1. **基本用法**：

```jsx
import LoginLink from '@/../../vendor/spatie/laravel-login-link/resources/js/LoginLink';
// TypeScript 版本
// import LoginLink from '@/../../vendor/spatie/laravel-login-link/resources/ts/LoginLink'

function App() {
  return page.props.environment === 'local' && <LoginLink />;
}
```

2. **高级用法**：

```jsx
{
  page.props.environment === 'local' && (
    <LoginLink
      label="以管理员身份登录"
      className="pb-3 text-red-500"
      redirectUrl={route('dashboard')}
    />
  );
}
```

### 其他框架集成

对于其他前端框架，可以通过发送 POST 请求到 `/laravel-login-link-login` 实现登录：

```javascript
// 请求参数选项
{
    email: 'user@example.com',        // 用户邮箱
    key: 'user-id',                   // 用户主键
    redirect_url: '/dashboard',        // 重定向地址
    user_attributes: {                 // 用户属性
        role: 'admin'
    }
}
```

::: warning 注意
发送请求时需要包含 CSRF Token。
:::

## 最佳实践 {#best-practices}

1. 仅在开发环境中启用此功能
2. 始终配置允许的域名白名单
3. 不要在生产环境中使用此功能
4. 定期检查和更新域名白名单
5. 使用环境变量进行敏感配置
6. 实施适当的日志记录以进行安全跟踪

## 故障排除 {#troubleshooting}

### 常见问题

1. **链接不工作**

   - 检查您的域名是否在允许的主机列表中
   - 验证您是否在正确的环境中
   - 确保用户存在或启用了自动创建功能

2. **安全性问题**
   - 该扩展包在生产环境中会自动禁用
   - 所有链接都是一次性使用
   - 链接会在可配置的时间后过期

## 参考资源 {#references}

- [官方文档](https://github.com/spatie/laravel-login-link)
- [Spatie 包列表](https://spatie.be/open-source)
- [Laravel 文档](https://laravel.com/docs)
- [安全最佳实践](https://laravel.com/docs/security)
