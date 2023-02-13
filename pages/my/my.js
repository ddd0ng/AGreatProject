// pages/my/my.js

var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        myname: "",
        myphone: "",
        myemail: "",
        mycar: ""
    },
    //点击按钮去修改用户信息
    taptochange() {
        wx.navigateTo({
          url: '/pages/mychange/mychange',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if(app.globalData.dd_islogin === false) {
            wx.switchTab({
              url: '/pages/login/login',
            })
        } else {
            console.log(app.globalData.dd_islogin);
            console.log("ok");
            this.setData({
                myname: app.globalData.dd_username,
                myphone: app.globalData.dd_phonenumber,
                myemail: app.globalData.dd_email,
                mycar: app.globalData.dd_carnumber
            })
            console.log(this.data.myname);
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.setData({
            myname: app.globalData.dd_username,
            myphone: app.globalData.dd_phonenumber,
            myemail: app.globalData.dd_email,
            mycar: app.globalData.dd_carnumber
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})