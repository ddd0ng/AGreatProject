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
        //console.log(this.data);
        if(this.data.username === "" || this.data.password === "") {
            Dialog.alert({
                message: '表格未填写完整， 请填写',
              }).then(() => {
                // on close
              });
        } else {
            //console.log("denglu");
            wx.request({
              //url: 'http://3xb7ny.natappfree.cc/api/v1/user/login',
              url: app.globalData.ddurl + "/api/v1/user/login",
              data: {
                user_name: this.data.username,
                password:this.data.password,
              },
              method: 'post',
              success: function(res) {
                  //console.log("okkk");
                  //console.log(res);
                  if(res.data.status === 200) {
                    app.globalData.dd_islogin = true;
                    app.globalData.token = res.data.data.token;
                    //console.log(app.globalData.token);
                    
                    //保存下个人信息
                    wx.request({
                      //url: 'http://3xb7ny.natappfree.cc/api/v1/user/show',
                      url: app.globalData.ddurl + "/api/v1/user/show",
                      header: { 'Authorization': app.globalData.token },
                      method: 'get',
                      success: function(rr) {
                        console.log(rr);
                        app.globalData.dd_username = rr.data.data.user_name;
                        app.globalData.dd_phonenumber = rr.data.data.phone;
                        app.globalData.dd_email = rr.data.data.email;
                        app.globalData.dd_carnumber = rr.data.data.car_number;
                        console.log(app.globalData);
                      }
                    })
                    
                    Dialog.alert({
                        message: res.data.msg,
                      }).then(() => {
                        // on close
                      });
                        //wx.switchTab({
                        //    url: '/pages/home/home',
                        //})
                  } else {
                    Dialog.alert({
                        message: res.data.msg,
                      }).then(() => {
                        // on close
                      });
                  }
              }
            })
        }
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