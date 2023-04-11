// pages/mychange/mychange.js
var app = getApp();
import Dialog from '@vant/weapp/dialog/dialog';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        "myname": "",
        "myphone": "",
        "myemail": "",
        "mycar": "",
        "srcImage": "",
        "ddname" : "",
        "ddphone" : "",
        "ddemail" : "",
        "ddcar" : "",
        "sms" : "",
        smsshow : false
        /*
        "nameplaceholder": "",
        "phoneplaceholder": "",
        "emailplaceholder": "",
        "carplaceholder": ""
        */
    },

    //发送短信验证码
    SmsVerification() {
        //内容无修改不需发验证码
        //console.log(this.data.sms);
        if(this.data.myphone !== this.data.ddphone) {
            //调出验证码
            this.setData({
                smsshow : true
            });
        }
    },

    showPopup() {
        this.setData({ smsshow: true });
      },
    
      onClose() {
        this.setData({ smsshow: false });
      },
    
      onInput(event) {
        this.setData({ sms: event.detail.value });
      },

      onSubmit() {
        const { sms } = this.data;
        if (sms.length === 6) {
          // 处理验证码的逻辑
          console.log("验证码：", sms);
    
          // 验证码处理完毕后关闭弹出框
          this.onClose();
        } else {
          wx.showToast({
            title: "请输入6位验证码",
            icon: "none",
          });
        }
      },

    //拍照上传功能，返回车牌号存下
    ClickImage() {
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: ['album'],
            maxDuration: 30,
            camera: 'back',
            success: res=>{
                this.setData({
                    srcImage:res.tempFiles[0].tempFilePath
                })
                console.log(this.data.srcI)
                console.log(res.tempFiles[0].tempFilePath)
                this.up();
            }
        })
    },
    //发给服务端处理图片
    up() {
        wx.uploadFile({
          filePath: this.data.srcImage,
          name: 'file',
          url: 'url',

          success: function(res) {
              //将返回值写入mycar
          }
        })
    },

    /**
     * 向后端请求修改信息
     */
    tapchange() {
        //console.log(this.data.myname);
        //console.log(this.data.myphone);
        //console.log(this.data.myemail);
        //console.log(this.data.mycar);
        if(!this.checkphone(this.data.myphone)) {
            Dialog.alert({
                message: '电话号码格式错误',
              }).then(() => {
                // on close
              });
        } else if(!this.checkemail(this.data.myemail)){
            Dialog.alert({
                message: '邮箱格式错误',
              }).then(() => {
                // on close
              });
        } else if(!this.checkcar(this.data.mycar)) {
            Dialog.alert({
                message: '车牌格式错误',
              }).then(() => {
                // on close
              });
        } else {
            // 判断哪一位需要修改
            /*
            名字先不允许修改
            if(this.data.myname !== this.data.ddname) {
                wx.request({
                  url: 'http://sm788v.natappfree.cc/api/v1/user/eamil',
                  header: { 'Authorization': app.globalData.token },
                  data: {

                  },
                  method: 'post',
                  success: function(res) {
                    //修改当前存储变量
                  }
                })
            }
            */
            if(this.data.myphone !== this.data.ddphone) {
                var that = this;
                wx.request({
                    //url: 'http://sm788v.natappfree.cc/api/v1/user/xxxx',
                    url : app.globalData.ddurl + '/api/v1/user/phone',
                    header: { 'Authorization': app.globalData.token },
                    data: {
                        phone : this.data.myphone
                    },
                    method: 'post',
                    success: function(res) {
                        //console.log("ok");
                        console.log(res);
                      //修改当前存储变量
                      app.globalData.dd_phonenumber = that.data.myphone;
                    }
                  })
            }

            if(this.data.myemail !== this.data.ddemail) {
                var that = this;
                wx.request({
                    //url: 'http://sm788v.natappfree.cc/api/v1/user/xxxx',
                    url : app.globalData.ddurl + '/api/v1/user/email',
                    header: { 'Authorization': app.globalData.token },
                    data: {
                        email : this.data.myemail
                    },
                    method: 'post',
                    success: function(res) {
                        //console.log("ok");
                        console.log(res);
                      //修改当前存储变量
                      app.globalData.dd_email = that.data.myemail;
                      //console.log(app.globalData);
                    }
                  })
            }
            if(this.data.mycar !== this.data.ddcar) {
                var that = this;
                wx.request({
                    //url: 'http://sm788v.natappfree.cc/api/v1/user/xxxx',
                    url : app.globalData.ddurl + '/api/v1/user/carnumber',
                    header: { 'Authorization': app.globalData.token },
                    data: {
                        car : this.data.mycar
                    },
                    method: 'post',
                    success: function(res) {
                        //console.log("ok");
                        console.log(res);
                      //修改当前存储变量
                      app.globalData.dd_carnumber = that.data.mycar;
                      //console.log(app.globalData);
                    }
                  })
            }
        }
    },

    /**
     * 
     * 几个检验格式是否正确的函数
     */

    checkphone: function(str) {
        return true;
        if(str.length !== 11) return false;
        if(str[0] !== '1') return false;
        return true;
    },

    checkemail: function(str) {
        for(let i = 0; i < str.lenghh; i ++ ) {
            if(str[i] === "@" && i !== str.length) {
                return true;
            }
        }
        return true;
    },

    checkcar: function(str) {
        return true;
        if(str.length !== 5) return false;
        return true;
    },

    

    /**
     * 用input值修改data
     */
    NameChange(event) {
        // event.detail 为当前输入的值
        //console.log(event);
        this.setData({
            myname:event.detail
        })
      },
    PhoneChange(event) {
        // event.detail 为当前输入的值
        //console.log(event);
        this.setData({
            myphone:event.detail
        })
      },
      EmailChange(event) {
        // event.detail 为当前输入的值
        //console.log(event);
        this.setData({
            myemail:event.detail
        })
      },
      CarChange(event) {
        // event.detail 为当前输入的值
        //console.log(event);
        this.setData({
            mycar:event.detail
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
        this.setData({
            myname: app.globalData.dd_username,
            myphone: app.globalData.dd_phonenumber,
            myemail: app.globalData.dd_email,
            mycar: app.globalData.dd_carnumber,
            ddname: app.globalData.dd_username,
            ddphone: app.globalData.dd_phonenumber,
            ddemail: app.globalData.dd_email,
            ddcar: app.globalData.dd_carnumber
            /*
            nameplaceholder: this.data.myname,
            phoneplaceholder: this.data.myphone,
            emailplaceholder: this.data.myemail,
            carplaceholder: this.data.mycar
            */
        })
        console.log(this.data);
        
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