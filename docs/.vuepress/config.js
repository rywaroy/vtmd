const path = require("path");

module.exports = {
  title: "Hello VuePress",
  description: "Just playing around",
  port: 8090,
  // base: './',
  // dest: 'doc/dist',
  themeConfig: {
    // 所有页面全部开启自动生成侧边栏
    sidebar: ["account-enterprise-detail.md", "account-enterprise-order.md", "account-enterprise.md", "account-gasStation.md", "components-basic-CertificateUpload.md", "components-basic-CurrencyFormatter.md", "components.md", "/", "\u53F8\u673A.md"]
  }
};