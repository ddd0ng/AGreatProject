// pages/login/login.js
import Dialog from '@vant/weapp/dialog/dialog';
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        "username":"",
        "password":""
    },

    /**
     * 点击按钮跳转注册页面
     */
    TapButToReg() {
        wx.navigateTo({
          url: '/pages/register/register',
        })
    },

    dd_login() {
        console.log(this.data);
        if(this.data.username === "" || this.data.password === "") {
            Dialog.alert({
                message: '表格未填写完整， 请填写',
              }).then(() => {
                // on close
              });
        } else {
            console.log("denglu");
            //如果登录成功
            app.globalData.dd_islogin = true;
            //token也需要记录
            
        }
        
        //像后端发送账号密码，会获取一个token
        //成功时，记录全局变量token与dd_islogin，跳转到首页
        //失败时，显示原因
        
    },

    UserChange(event) {
        // event.detail 为当前输入的值
        //console.log(event);
        this.setData({
            username:event.detail
        })
      },
      PassChange(event) {
        // event.detail 为当前输入的值
        //console.log(event);
        this.setData({
            password:event.detail
        })
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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