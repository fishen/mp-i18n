//logs.js
const util = require('../../utils/util.js')
const { i18n } = require('mp-i18n');

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    i18n.getTexts({ path: 'pages/index/index' }).then(console.log).catch(console.error);
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
