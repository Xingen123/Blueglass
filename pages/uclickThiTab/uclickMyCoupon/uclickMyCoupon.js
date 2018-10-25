// pages/uclickThiTab/uclickMyCoupon/uclickMyCoupon.js
var serverUrl = require('../../../lib/js/main.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '110',
    background:'#0080ba',
    // token: wx.getStorageSync("token"),
  },
  
  jumpCouponRule:function(){

    wx.navigateTo({
      url: 'couponRule/couponRule',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    });
  },
  fuzhiAction:function(event)
  {
    var couponid = event.currentTarget.dataset.couponid;
    var self = this;
    wx.setClipboardData({
      data: couponid,
      success: function (res) {
        // self.setData({copyTip:true}),
        // wx.showModal({
        //   title: '提示',
        //   content: '复制成功',
        //   success: function (res) {
        //     if (res.confirm) {
        //       console.log('确定')
        //     } else if (res.cancel) {
        //       console.log('取消')
        //     }
        //   }
        // })
      }
    });

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      token:wx.getStorageSync('token')
    })
    wx.showLoading({
      title: '正在加载',
    }),

      wx.request({
      url: serverUrl.serverUrl + 'mini/program/user/coupons?token='+this.data.token,
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
        // header: {}, // 设置请求的 header  

        success: function (res) {
          wx.hideLoading();
          if (res.data.status == 200) {
            that.setData({
              couponList: res.data.data,
            })

          } else {
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