// pages/home/home.js

const app = getApp();
const amapApiKey = "248918796a6f528ac721bccb95d785b9";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        weather: null,
        location: null
    },

    getWeather: function () {
        const that = this;
        wx.getLocation({
          type: "gcj02",
          success(res) {
            const latitude = res.latitude;
            const longitude = res.longitude;
            that.requestWeatherData(latitude, longitude);
          },
          fail(err) {
            console.error("获取位置信息失败：", err);
          }
        });
      },
      requestWeatherData: function (latitude, longitude) {
        const that = this;
        wx.request({
          url: `https://restapi.amap.com/v3/geocode/regeo?key=${amapApiKey}&location=${longitude},${latitude}`,
          success(res) {
            if (res.data.status === "1") {
              const adcode = res.data.regeocode.addressComponent.adcode;
              const location = res.data.regeocode.formatted_address;
              that.getWeatherByAdcode(adcode, location);
            } else {
              console.error("获取城市信息失败：", res.data);
            }
          },
          fail(err) {
            console.error("请求城市数据失败：", err);
          }
        });
      },
      getWeatherByAdcode: function (adcode, location) {
        const that = this;
        wx.request({
          url: `https://restapi.amap.com/v3/weather/weatherInfo?key=${amapApiKey}&extensions=base&city=${adcode}`,
          success(res) {
            if (res.data.status === "1") {
              that.setData({
                weather: res.data.lives[0].weather,
                location: location
              });
            } else {
              console.error("获取天气信息失败：", res.data);
            }
          },
          fail(err) {
            console.error("请求天气数据失败：", err);
          }
        });
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getWeather();
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