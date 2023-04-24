// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    dd_islogin: false,
    token: "",
    dd_username: "",
    dd_phonenumber: "",
    dd_carnumber: "",
    dd_email: "",
    ddurl: "https://www.cardd.fun",
    dd_balance : 0
  }
  /*,

  updateGlobalData: function (newData) {
    // 更新 globalData 的值
    this.globalData = {
      ...this.globalData,
      ...newData
    };
  }*/
})
