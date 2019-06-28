const path = require('path');

module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  port: 8090,
  themeConfig: {
    // 所有页面全部开启自动生成侧边栏
    sidebar: [
      '/Example',
    ],
  },
}