// pages/mychange/mychange.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        "myname": "",
        "myphone": "",
        "myemail": "",
        "mycar": "",
        "srcImage": ""
        /*
        "nameplaceholder": "",
        "phoneplaceholder": "",
        "emailplaceholder": "",
        "carplaceholder": ""
        */
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
    //发给服务端处理
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
        if(!checkphone(myphone)) {
            Dialog.alert({
                message: '电话号码格式错误',
              }).then(() => {
                // on close
              });
        } else if(!checkemail(myemail)){
            Dialog.alert({
                message: '邮箱格式错误',
              }).then(() => {
                // on close
              });
        } else if(!checkcar(mycar)) {
            Dialog.alert({
                message: '车牌格式错误',
              }).then(() => {
                // on close
              });
        } else {
            wx.request({
            url: 'url',
            data: {

            },
            method: 'post',
            success: function(res) {
                //如果成功，修改全局值
                //失败返回对应原因
            }

            })
        }
    },

    /**
     * 
     * 几个检验格式是否正确的函数
     */

    checkphone: function(str) {
        if(str.length !== 11) return false;
        if(str[0] !== '1') return false;
        return true;
    },

    checkemail: function(str) {
        for(let i = 0; i < str.lenghh; i ++ ) {
            if(str[i] === '@' && i !== str.length) {
                return true;
            }
        }
        return false;
    },

    checkcar: function(str) {
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
            mycar: app.globalData.dd_carnumber
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