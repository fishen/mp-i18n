const { i18n } = require('mp-i18n');

App({
  onLaunch(options) {
    const baseUrl = 'https://raw.githubusercontent.com/fishen/assets/master/wx-i18n';
    const version = '1.0.0';
    i18n.config({
      debug: true,
      lang: 'zh',
      indexUrl: () => `${baseUrl}/${version}/index.json`,
      textsUrl: (hash) => `${baseUrl}/${version}/${hash}.json`
    })
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});
