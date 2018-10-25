// pages/uclickSecTab/finishDetail/index.js
var serverUrl = require('../../../lib/js/main.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultheaderImg: "../../images/default/mrtx@2x.png", //默认图片
    defaultScrollImg: "../../images/default/690-460.png", //默认图片
    token: '110'
    // token: wx.getStorageSync("token"),
  },
  completedErrorFunction: function (e) {
    if (e.type == "error") {
      var finishOrderInfo = this.data.finishOrderInfo; 　　　　　　　//将图片列表数据绑定到变量
      finishOrderInfo.recommendImg = this.data.defaultScrollImg; //错误图片替换为默认图片
      this.setData({
        finishOrderInfo: finishOrderInfo
      })
    }
  },
  headerErrorFunction: function (e) {
    if (e.type == "error") {
      var errorImgIndex = e.target.dataset.errorimg; //获取错误图片循环的下标
      var finishOrderInfo = this.data.finishOrderInfo; 　　　　　　　//将图片列表数据绑定到变量
      finishOrderInfo.groupMembers[errorImgIndex].memberIconUrl = this.data.defaultheaderImg; //错误图片替换为默认图片
      this.setData({
        finishOrderInfo: finishOrderInfo
      })
    }
  },
  requestNetWork: function (orderId) {
    var that = this;
    wx.showLoading({
      title: '正在加载',
    }),
      wx.request({
        url: serverUrl.serverUrl + 'mini/program/order/info?token=' + that.data.token + '&orderId=' + orderId,
        data: {},
        method: 'GET',
        success: function (res) {
          wx.hideLoading();

          if (res.data.status == 200) {
            that.setData(
              {
                finishOrderInfo: res.data.data,
              }
            )


          }
          else {
            wx.showToast({
              title: res.data.errorMsg,
              icon: 'none',

            })
          }

        },
        fail: function (res) {
          wx.hideLoading();
          wx.showToast({
            title: '网络错误，请稍后重试',
            icon: 'none',
          })
        }
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      token:wx.getStorageSync('token')
    })
    this.requestNetWork(options.orderId);

  },
  expClick: function (event) {

    wx.navigateTo({
      url: '../../uclickFirTab/experience/index?experId=' + this.data.finishOrderInfo.recommendId,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})