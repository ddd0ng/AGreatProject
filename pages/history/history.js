// pages/history/history.js

var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        
        alls : [
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}, 
            {"id" : "-1", "stime": "1970.1.1 00:00","dtime": "0h", is : false}
        ]
    },

    ddget() {
        var that = this;
        wx.request({
            url : app.globalData.ddurl + "/api/v1/user/history",
            header: { 'Authorization': app.globalData.token },
            method : 'get',
            success : function (res) {
                console.log(res);
                for(var i = 0; res.data.data !== null &&  i < res.data.data.length && i < 29; i ++ ) {
                    that.setData({
                        [`alls[${i}].id`] : res.data.data[i].pile_id,
                        [`alls[${i}].stime`] : res.data.data[i].date,
                        [`alls[${i}].dtime`] : res.data.data[i].time,
                        [`alls[${i}].is`] : true
                    })
                }
            }
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
        this.ddget();
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