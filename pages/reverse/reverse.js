// pages/reverse/reverse.js
var app = getApp();
import Dialog from '@vant/weapp/dialog/dialog';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        times: ['请选择','1小时', '2小时', '3小时', '4小时', '5小时'],
        durtime : 0,
        begintime : 0,
        minHour : new Date().getHours(),
        maxHour : 23,
        dddialog1 : false,
        dddialog2 : false,
        alls : [
            {
                "name" : "0",
                "isfree" : true,
                "isbusy" : false,
                "time" : 0
            }, {
                "name" : "1",
                "isfree" : true,
                "isbusy" : false,
                "time" : 0
            }, {
                "name" : "2",
                "isfree" : false,
                "isbusy" : true,
                "time" : 3000000
            }, {
                "name" : "3",
                "isfree" : true,
                "isbusy" : false,
                "time" : 0
            }, {
                "name" : "4",
                "isfree" : true,
                "isbusy" : false,
                "time" : 0
            }]
    },

    //时长选择框
    onChange(event) {
        //const { picker, value, index } = event.detail;
        //Toast(`当前值：${value}, 当前索引：${index}`);
        console.log(event);
        //console.log(event.detail.value);
        if(event.detail.index === 0) {
            this.setData({
                durtime: 0
            })
        } else {
            this.setData({
                durtime: event.detail.value[0]
                //小时制
            })
            //获取起始时间和充电时长，发送给后端预约
        }
        
        console.log(this.data.begintime);
        console.log(this.data.durtime);
      },

    //直接预约按钮
    dddirect : function (event) {
        this.setData({
            dddialog1 : true
        })
    },

    //点击确认和取消按钮，
    ddcancle1 : function(res) {
        let that = this;
        this.setData({
            dddialog1 : false
        })
        //console.log("au");
        console.log(res);
        if(res.detail === "confirm") {
            //弹窗显示时长选择
           this.setData({
               dddialog2 : true
           })
        }
    },

    //修改起始时间
    begininput(event) {
        this.setData({
          begintime: event.detail,
        });
        console.log(this.data.begintime);
        //console.log(new Date().getHours());
      },

      ddcancle2 : function(res) {
        let that = this;
        this.setData({
            dddialog2 : false
        })

        console.log(res);
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