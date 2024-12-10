import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Laravel skeleton',
  description: 'Laravel Application skeleton for YouTeacher Team.',
  base: '/laravel-skeleton-docs/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '文档', link: '/installation' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: {
      '/': {
        items: [
          {
            text: '入门指南',
            items: [{ text: '安装', link: '/installation' }],
          },
        ],
      },
      '/markdown-examples': {
        base: '/markdown-examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/zhaiyuxin103/laravel-skeleton-docs',
      },
    ],
  },
});
