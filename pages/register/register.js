// pages/register/register.js
import Dialog from '@vant/weapp/dialog/dialog';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        "uesrname": '',
        "password": '',
        "phonenumber": ''
    },

    /** 
     * 点击注册函数逻辑
    */
    dd_register:function() {
        console.log(this.data); 
        if(this.data.uesrname === "" || this.data.password === "" || this.data.phonenumber === "") {
            console.log("need more");
            //输入不完整，需要弹窗提醒
            Dialog.alert({
                message: '表格未填写完整， 请填写',
              }).then(() => {
                // on close
              });
        } else {
            //注册
            console.log("send");
            /*
                
            */
        }
    },

    /**
     * 用input值修改data
     */
    UserChange(event) {
        // event.detail 为当前输入的值
        //console.log(event);
        this.setData({
            uesrname:event.detail
        })
      },
      PassChange(event) {
        // event.detail 为当前输入的值
        //console.log(event);
        this.setData({
            password:event.detail
        })
      },
      NumChange(event) {
        // event.detail 为当前输入的值
        //console.log(event);
        this.setData({
            phonenumber:event.detail
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