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
        chargeid : 0,
        chargetime : 0,
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
        if(app.globalData.dd_islogin === false) {
            wx.navigateTo({
                url: '/pages/login/login',
            })
            return;
         }
        this.setData({
            dddialog1 : true,
            chargeid : event.currentTarget.dataset.value
        })
    },

    //提前预约按钮
    ddindirect : function (event) {
        if(app.globalData.dd_islogin === false) {
            wx.navigateTo({
                url: '/pages/login/login',
            })
            return;
         }
        this.setData({
            dddialog1 : true,
            chargeid : event.currentTarget.dataset.value
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

        if(res.detail === "confirm") {
            var MyData = new Date;
            var year = MyData.getFullYear();
            var mon = MyData.getMonth() + 1;
            var day = MyData.getDate();
            var now = year + "-" + mon + "-" + day + " " + this.data.begintime + ":00";
            var sendbegin = (new Date(now)).getTime();
            //发送预约
            wx.request({
                url: app.globalData.ddurl + '/api/v1/user/reserve',
                header: { 'Authorization': app.globalData.token },      
                data : {
                  id : parseInt(this.data.chargeid) + 1,
                  time : parseInt(this.data.durtime),
                  //start_time : this.data.begintime,
                  start_time : sendbegin.toString(),
                },
                method : 'post',
                success : function (res) {
                    //如果成功
                    console.log(res);
                    if(res.data.status === 200) {
                        Dialog.alert({
                            message: "预约成功",
                          }).then(() => {
                            // on close
                          });
                    }
                    else {
                        //var mes = res.data.msg;
                        Dialog.alert({
                            message: "预约失败，请勿重复预约" ,
                          }).then(() => {
                            // on close
                          });
                    }
                  
                  that.ddupdate();
                }
              })
        } 
      },

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
                  if(res.data.data[i].status !== 0) {
                      //占用状态
                      let t = res.data.data[i].end_time - nowtime;
                      let tt = res.data.data[i].reserve_end_time - nowtime;
                      if(isNaN(t)) t = -2;
                      if(isNaN(tt)) tt = -2;
                      that.setData({
                         [`alls[${i}].isfree`] : false,
                         [`alls[${i}].isbusy`] : true,
                         [`alls[${i}].time`] : Math.max(tt, t)
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
        //     if(app.globalData.dd_islogin === false) {
        //     wx.navigateTo({
        //         url: '/pages/login/login',
        //     })
        //  }
        this.ddupdate();
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