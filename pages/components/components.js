// pages/components/components.js

import Dialog from '@vant/weapp/dialog/dialog';
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        balance: 0,
        cardialog : false,
        car : "",
        moneydialog : false,
        money : 0
    },

    allupdata() {
        //request请求更新整体余额数值
        wx.request({
            //url: 'http://3xb7ny.natappfree.cc/api/v1/user/show',
            url: app.globalData.ddurl + "/api/v1/user/show",
            header: { 'Authorization': app.globalData.token },
            method: 'get',
            success: function(res) {
              console.log(res);
              app.globalData.dd_balance = res.data.data.money;
              //app.updateGlobalData({ dd_balance: res.data.data.money });
            }
          })
          //wx.switchTab({
          //  url: '/pages/home/home',
          //})
          //console.log(app.globalData.dd_balance);
        //this.balanceupdate();
        //console.log(this.data.balance);
        //wx.switchTab({
        //    url: '/pages/components/components',
        //  })
    },
    balanceupdate() {
        //从app.js更新显示余额
        this.setData({
            balance : app.globalData.dd_balance
        })
    },

    recharge() {
        if(app.globalData.dd_islogin === false) {
            wx.navigateTo({
                 url: '/pages/login/login',
            })
        } else {
            this.setData({
                moneydialog : true,
            })
        }
    },
    onInput1(event) {
        console.log(event);
        this.setData({ money: event.detail.value });
      },
      onSubmit1() {
        let that = this;
        const { money } = this.data;
        wx.request({
            url: app.globalData.ddurl + "/api/v1/user/money",
            header: { 'Authorization': app.globalData.token },
            data : {
               money : parseInt(money)
            },
            method: 'post',
            success : function (res) {
                console.log(res);
                //成功以后更新余额
                if(res.data.status === 200) {
                    Dialog.alert({
                        message: "充值成功, 请下拉刷新",
                      }).then(() => {
                        // on close
                      });
                      that.allupdata();
                } else {
                    Dialog.alert({
                        message: res.data.msg,
                      }).then(() => {
                        // on close
                      });
                }
            }
        })
      },


    //取消充电
    cancelcharge() {
        wx.request({
            url: app.globalData.ddurl + "/api/v1/user/cancelpile",
            header: { 'Authorization': app.globalData.token },
            method: 'post',
            success : function (res) {
                console.log(res);
                if(res.data.status === 200) {
                    Dialog.alert({
                        message: "取消成功",
                      }).then(() => {
                        // on close
                      });
                } else {
                    Dialog.alert({
                        message: res.data.msg,
                      }).then(() => {
                        // on close
                      });
                }
            }
        })
    },
    //取消预约
    cancelreverse() {
        wx.request({
            url: app.globalData.ddurl + "/api/v1/user/cancelreserve",
            header: { 'Authorization': app.globalData.token },
            method: 'post',
            success : function (res) {
                console.log(res);
                if(res.data.status === 200) {
                    Dialog.alert({
                        message: "取消成功",
                      }).then(() => {
                        // on close
                      });
                } else {
                    Dialog.alert({
                        message: res.data.msg,
                      }).then(() => {
                        // on close
                      });
                }
            }
        })
    },

    //提醒挪车
    taptoremind() {
        if(app.globalData.dd_islogin === false) {
            //wx.navigateTo({
            //    url: '/pages/login/login',
            //})
            this.setData({
                cardialog : true,
            })
        } else {
            this.setData({
                cardialog : true,
            })
        }
    },
    onInput(event) {
        console.log(event);
        this.setData({ car: event.detail.value });
      },
      onSubmit() {
        const { car } = this.data;
        wx.request({
            url: app.globalData.ddurl + "/api/v1/remind",
            data : {
               car : car
            },
            method: 'post',
            success : function (res) {
                console.log(res);
                if(res.data.status === 400) {
                    Dialog.alert({
                        message: res.data.msg,
                      }).then(() => {
                        // on close
                      });
                } else {
                    Dialog.alert({
                        message: '提醒成功',
                      }).then(() => {
                        // on close
                      });
                }
            }
        })
      },

    //跳转去历史订单
    taptohistory() {
        if(app.globalData.dd_islogin === false) {
            Dialog.alert({
                message: '您暂未登录，请先登录',
              }).then(() => {
                // on close
              });
        } else {
            wx.navigateTo({
                    url: '/pages/history/history',
                })
        }
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
        //this.allupdata();
        this.balanceupdate();
        //console.log(app.globalData.dd_balance);
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
        this.balanceupdate();
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