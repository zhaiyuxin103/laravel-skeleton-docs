import { defineConfig } from 'vitepress';
import tailwindcss from '@tailwindcss/vite';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Laravel skeleton',
  description: 'Laravel Application skeleton for YouTeacher Team.',
  base: '/laravel-skeleton-docs/',

  vite: {
    plugins: [tailwindcss()],
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '文档', link: '/installation' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: {
      '/': [
        {
          text: '前言',
          items: [{ text: '贡献导引', link: '/contributing' }],
        },
        {
          text: '入门指南',
          items: [{ text: '安装', link: '/installation' }],
        },
        {
          text: '开发工具',
          items: [
            { text: 'PHPStan', link: '/phpstan' },
            { text: 'Pint', link: '/pint' },
          ],
        },
        {
          text: '监控和调试',
          items: [
            { text: 'Horizon', link: '/horizon' },
            { text: 'Horizon Watcher', link: '/horizon-watcher' },
            { text: 'Log Viewer', link: '/log-viewer' },
            { text: 'Pulse', link: '/pulse' },
          ],
        },
        {
          text: '功能增强',
          items: [{ text: 'Login Link', link: '/login-link' }],
        },
      ],
      '/markdown-examples': [
        { text: 'Markdown Examples', link: '/markdown-examples' },
        { text: 'Runtime API Examples', link: '/api-examples' },
      ],
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/zhaiyuxin103/laravel-skeleton-docs',
      },
    ],
  },
});
