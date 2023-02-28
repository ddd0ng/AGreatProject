// pages/charge/charge.js
var app = getApp();
import Dialog from '@vant/weapp/dialog/dialog';

Page({

    /**
     * 页面的初始数据
     */
    data: {

        dd : 2,
        //控制弹窗内容
        dddialog : false,
        times: ['请选择','1小时', '2小时', '3小时', '4小时', '5小时'],
        chargeid : -1,
        chargetime : 0,
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
                "isfree" : true,
                "isbusy" : false,
                "time" : 0
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
            }

            /*
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
            },*/
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
                //chargetime: event.detail.value[0] * 60 * 60 * 1000
                chargetime: event.detail.value[0]
                //小时制
            })
        }
      },

      //点击充电按钮，
    ddpay : function(event) {
        //console.log(event);
        //对应的编号
        //console.log(event.currentTarget.dataset.value);

        if(app.globalData.dd_islogin === false) {
            wx.switchTab({
              url: '/pages/login/login',
            })
        } else {
            this.setData({
                dddialog : true,
                chargeid : event.currentTarget.dataset.value
            })
            //console.log(this.data.chargeid);
        }
    },

    //点击确认和取消按钮，
    ddcancle : function(res) {
        let that = this;
        this.setData({
            dddialog : false
        })
        //console.log("au");
        //console.log(res);
        if(res.detail === "confirm") {
            console.log(this.data.chargeid);
            console.log(this.data.chargetime);
            //发送给后端，等后面再写
            wx.request({
              url: app.globalData.ddurl + '/api/v1/user/change',
              header: { 'Authorization': app.globalData.token },      
              data : {
                id : this.data.chargeid,
                time : this.data.chargetime,
              },
              method : 'post',
              success : function (res) {
                  //如果成功
                Dialog.alert({
                    message: "充电成功",
                  }).then(() => {
                    // on close
                  });
                that.ddupdate();
              }
            })
        }
    },
    /*好像没什么用，没看懂
    ddconfirm : function() {
        console.log("fas");
    },*/

    //更新充电桩信息
    ddupdate : function () {
        let that = this;
        wx.request({
          //url: 'http://3xb7ny.natappfree.cc/api/v1/show',
          url: app.globalData.ddurl + "/api/v1/show",
          method: 'get',
          success : function(res) {
              console.log("update!!!");
              console.log(res);
              console.log(res.data.data);
              //console.log(that.data);
              //console.log(new Date().getTime());
              let nowtime = new Date().getTime();
              //console.log(nowtime);
              
              for(let i = 0; i < 5; i ++ ) {
                  if(res.data.data[i].status === 1) {
                      //占用状态
                      let tt = res.data.data[i].end_time - nowtime;
                      that.setData({
                         [`alls[${i}].isfree`] : false,
                         [`alls[${i}].isbusy`] : true,
                         [`alls[${i}].time`] : tt
                      })
                  } else if(res.data.data[i].status === 0) {
                      //空闲状态
                        that.setData({
                            //'alls[i].name' : res.data.data[i].id,
                            [`alls[${i}].isfree`] : true,
                            [`alls[${i}].isbusy`] : false,
                            [`alls[${i}].time`] : 0
                        })
                  }
                  //console.log(that.data.tt);
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
    //    if(app.globalData.dd_islogin === false) {
    //         wx.switchTab({
    //         url: '/pages/login/login',
    //         })
    //     }

        // this.ddupdate();
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