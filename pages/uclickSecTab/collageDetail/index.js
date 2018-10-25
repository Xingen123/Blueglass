// pages/uclickSecTab/collage/index.js
var serverUrl = require('../../../lib/js/main.js');


/* 毫秒级倒计时 */
function countdown(that) {
  // 渲染倒计时时钟
  that.setData({
    clock: dateformat(that.data.total_micro_second)
  });

  if (that.data.total_micro_second <= 0) {
    that.setData({
      clock: "已经截止",
      isHiddenShare:true
    });
    // timeout则跳出递归
    return;
  }
  setTimeout(function () {
    // 放在最后--
    that.data.total_micro_second -= 1;
    countdown(that);
  }
    , 1000)
}

// 时间格式化输出，如3:25:19 86。每10ms都会调用一次
function dateformat(micro_second) {
  // 秒数
  var second = Math.floor(micro_second );
  // 小时位
  var hr = Math.floor(second / 3600);
  if (parseInt(hr)<10){
    hr = '0'+hr
  }
  // 分钟位
  var min = Math.floor((second - hr * 3600) / 60);
  if (parseInt(min) < 10) {
    min = '0' + min
  }
  // 秒位
  var sec = (second - hr * 3600 - min * 60);// equal to => var sec = second % 60;
  if (parseInt(sec) < 10) {
    sec = '0' + sec
  }
  // 毫秒位，保留2位
  var micro_sec = Math.floor((micro_second % 1000) / 10);
  return hr + ":" + min + ":" + sec ;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultheaderImg: "../../images/default/mrtx@2x.png", //默认图片
    defaultSamllScrollImg: "../../images/default/180-120.png", //默认图片
    token: '110',
    isHiddenShare:false,
    backlevel:0,
    ifshowShare:true,
    shareCount:0
    // token: wx.getStorageSync("token"),
  },

  completedErrorFunction: function (e) {
    if (e.type == "error") {
      var collagingOrderInfo = this.data.collagingOrderInfo; 　　　　　　　//将图片列表数据绑定到变量
      collagingOrderInfo.recommendImg = this.data.defaultSamllScrollImg; //错误图片替换为默认图片
      this.setData({
        collagingOrderInfo: collagingOrderInfo
      })
    }
  },
  headerErrorFunction: function (e) {
    if (e.type == "error") {
      var errorImgIndex = e.target.dataset.errorimg; //获取错误图片循环的下标
      var collagingOrderInfo = this.data.collagingOrderInfo; 　　　　　　　//将图片列表数据绑定到变量
      collagingOrderInfo.groupMembers[errorImgIndex].memberIconUrl = this.data.defaultheaderImg; //错误图片替换为默认图片
      this.setData({
        collagingOrderInfo: collagingOrderInfo
      })
    }
  },
  requestNetWork: function(orderId) {
    var that = this;
    wx.showLoading({
        title: '正在加载',
      }),
      wx.request({
        url: serverUrl.serverUrl + 'mini/program/order/info?token=' + that.data.token + '&orderId=' + orderId,
        data: {},
        method: 'GET',
        success: function(res) {
          wx.hideLoading();

          if (res.data.status == 200) {
            that.setData({
              collagingOrderInfo: res.data.data,
              total_micro_second: res.data.data.remainSencods,
              orderId:orderId
            })
            countdown(that);


          } else {
            wx.showToast({
              title: res.data.errorMsg,
              icon: 'none',
            })
          }

        },
        fail: function(res) {
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
  onLoad: function(options) {
    this.setData({
      token:wx.getStorageSync('token')
    })
    this.requestNetWork(options.orderId);
    this.setData({
      backlevel: options.backlevel
    })

    console.log(options.backlevel);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {


    var back = parseInt(this.data.backlevel)

    if(back >0){
      wx.navigateBack({
        delta: back
      })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  closeView:function(){
    this.setData({
      ifshowShare: true
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var that =this;
    if (this.data.shareCount == 0 && !wx.getStorageSync(this.data.orderId)) {
      this.setData({
        ifshowShare: false
      })
    }
    else
    {
      this.setData({
        ifshowShare: true
      })
    }
    if (res.from == "button") {
      //分享为按键中的求助即id=1
      return {
        title: this.data.collagingOrderInfo.recommendTitle,
        path: 'pages/uclickSecTab/share/index?orderId=' + this.data.orderId,
        desc: this.data.collagingOrderInfo.authorName,
        imageUrl: this.data.collagingOrderInfo.recommendImg,
        success: function (res) {
          wx.setStorageSync(that.data.orderId, true)
          that.data.shareCount++;
          console.log('that.data.shareCount++' + that.data.shareCount)
          if (this.data.savedId === this.data.orderId) {
            return;
          }

          this.saveData().then(() => {
            this.setData({
              savedId: this.data.orderId
            });
            // todo 如果跳转到其他页面，删除this.data.id
          });
        }
      };
    } else {
      return {
        title: this.data.collagingOrderInfo.recommendTitle,
        path: 'pages/uclickSecTab/share/index?orderId=' + this.data.orderId,
        desc: this.data.collagingOrderInfo.authorName,
        imageUrl: this.data.collagingOrderInfo.recommendImg,
        success: function (res) {
          wx.setStorageSync(that.data.orderId, true)
          that.data.shareCount++;
          console.log('that.data.shareCount++' + that.data.shareCount)
          if (this.data.savedId === this.data.orderId) {
            return;
          }

          this.saveData().then(() => {
            this.setData({
              savedId: this.data.orderId
            });
            // todo 如果跳转到其他页面，删除this.data.id
          });
        }
      };
    }


  },
  // share: function() {
  //   wx.navigateTo({
  //     url: '../share/index',
  //   })
  // }
})