// pages/uclickSecTab/haveInHand/index.js
var serverUrl = require('../../../lib/js/main.js');

var QQMapWX = require('../../../lib/js/qqmap-wx-jssdk.js');

var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultheaderImg: "../../images/default/mrtx@2x.png", //默认图片
    defaultScrollImg: "../../images/default/690-460.png", //默认图片
    token: '110',
    backlevel: 0
    // token: wx.getStorageSync("token"),
  },
  completedErrorFunction: function (e) {
    if (e.type == "error") {
      var haveInhandOrderInfo = this.data.haveInhandOrderInfo; 　　　　　　　//将图片列表数据绑定到变量
      haveInhandOrderInfo.recommendImg = this.data.defaultScrollImg; //错误图片替换为默认图片
      this.setData({
        haveInhandOrderInfo: haveInhandOrderInfo
      })
    }
  },
  headerErrorFunction: function (e) {
    if (e.type == "error") {
      var errorImgIndex = e.target.dataset.errorimg; //获取错误图片循环的下标
      var haveInhandOrderInfo = this.data.haveInhandOrderInfo; 　　　　　　　//将图片列表数据绑定到变量
      haveInhandOrderInfo.groupMembers[errorImgIndex].memberIconUrl = this.data.defaultheaderImg; //错误图片替换为默认图片
      this.setData({
        haveInhandOrderInfo: haveInhandOrderInfo
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
                haveInhandOrderInfo: res.data.data,
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

    qqmapsdk = new QQMapWX({
      key: 'JJOBZ-MLT6P-E3WDJ-LDZ42-5FEAS-BHFS5'
    });

    this.setData({
      token:wx.getStorageSync('token')
    })
    this.setData({
      backlevel: options.backlevel
    })

    console.log(options.backlevel);
    this.requestNetWork(options.orderId);

  },
  openMap: function () {
    // var that = this;
    // wx.openLocation({
    //   latitude: that.data.haveInhandOrderInfo.recommendAddress.addressLat * 1, // 纬度，范围为-90~90，负数表示南纬
    //   longitude: that.data.haveInhandOrderInfo.recommendAddress.adressLng * 1, // 经度，范围为-180~180，负数表示西经
    //   scale: 28, // 缩放比例
    // })
    var that = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: that.data.haveInhandOrderInfo.recommendAddress.addressLat,
        longitude: that.data.haveInhandOrderInfo.recommendAddress.adressLng
      },
      coord_type: 3, //baidu经纬度
      success: function (resp) {
        var location = resp.result.location;
        wx.openLocation({
          latitude: location.lat * 1, // 纬度，范围为-90~90，负数表示南纬
          longitude: location.lng * 1, // 经度，范围为-180~180，负数表示西经
          scale: 28, // 缩放比例
        })
      },
      fail: function (resp) {
        console.log(resp);
      },
      complete: function (resp) {
        console.log(resp);
      }
    })
  },
  expClick: function (event) {

    wx.navigateTo({
      url: '../../uclickFirTab/experience/index?experId=' + this.data.haveInhandOrderInfo.recommendId,
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
    var back = parseInt(this.data.backlevel)

    if (back > 0) {
      wx.navigateBack({
        delta: back
      })
    }
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