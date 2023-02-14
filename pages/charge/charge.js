// pages/charge/charge.js
var app = getApp();
import Dialog from '@vant/weapp/dialog/dialog';

Page({

    /**
     * 页面的初始数据
     */
    data: {

        dd : 2,
        dddialog : false,
        times: ['请选择','1小时', '2小时', '3小时', '4小时', '5小时'],
        chargetime : 0,
        alls : [
            {
                "name" : "1",
                "isfree" : true,
                "isbusy" : false,
                "time" : 3,
            },
            {
                "name" : "2",
                "isfree" : false,
                "isbusy" : true,
                "time" : 3000000
            },
            {
                "name" : "3",
                "isfree" : true,
                "isbusy" : false,
                "time" : 5
            },
            {
                "name" : "4",
                "isfree" : false,
                "isbusy" : true,
                "time" : 0
            },
            {
                "name" : "5",
                "isfree" : false,
                "isbusy" : true,
                "time" : 43252352345
            },
            {
                "name" : "6",
                "isfree" : true,
                "isbusy" : false,
                "time" : 231321312312
            },
            {
                "name" : "7",
                "isfree" : true,
                "isbusy" : false,
                "time" : 3456534
            },
            {
                "name" : "8",
                "isfree" : true,
                "isbusy" : false,
                "time" : 3465
            },
            {
                "name" : "9",
                "isfree" : true,
                "isbusy" : false,
                "time" : 342432
            },
            {
                "name" : "10",
                "isfree" : true,
                "isbusy" : false,
                "time" : 2344324
            },
            {
                "name" : "11",
                "isfree" : true,
                "isbusy" : false,
                "time" : 432423
            },
            {
                "name" : "12",
                "isfree" : true,
                "isbusy" : false,
                "time" : 3412412341
            },
        ]
    },

    onChange(event) {
        //const { picker, value, index } = event.detail;
        //Toast(`当前值：${value}, 当前索引：${index}`);
        console.log(event);
        //console.log(event.detail.value);
        if(event.detail.index === 0) {
            this.setData({
                chargetime: 0
            })
        } else {
            this.setData({
                chargetime: event.detail.value[0] * 60 * 60 * 1000
            })
        }
      },

      //点击充电按钮，
    ddpay : function() {
        this.setData({
            dddialog : true
        })
    },

    //点击确认和取消按钮，
    ddcancle : function(res) {
        this.setData({
            dddialog : false
        })
        //console.log("au");
        //console.log(res);
        if(res.detail === "confirm") {
            console.log(this.data.chargetime);
            //发送给后端，等后面再写
        }
    },
    /*好像没什么用，没看懂
    ddconfirm : function() {
        console.log("fas");
    },*/

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