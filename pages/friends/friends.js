// pages/friends/friends.js

import Toast from '@vant/weapp/toast/toast';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        istrue : true,
        columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    },

    dd_send : function() {
        console.log(this.data.information);
        wx.request({
          url: 'https://api.chatgpt.com/v1/query',
          header : {
            Authorization : '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'
          },
          data: {
              model : 'text-davinci-003',
              prompt : this.data.information
          },
          method : 'post',
          success : function(res) {
              console.log("abc");
              console.log(res);
          }
        })
    },

    InformationChange(event) {
        // event.detail 为当前输入的值
        //console.log(event);
        this.setData({
            information:event.detail
        })
        console.log(this.data.information);
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