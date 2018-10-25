var app = getApp();
var indexData = require('../../myJsonData/myJsonData.js')
var serverUrl = require('../../../lib/js/main.js');
var utils = require('../../../utils/util.js');
var bmap = require('../../../lib/js/bmap-wx.min.js');
var originalData = []; //定位成功回调对象
var wxMarkerData = [];

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    indicatorColor: 'rgba(255, 255, 255, 0.8)',
    indicatorActiveColor: '#0082bf',
    circular: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    previousMargin: "40px",
    nextMargin: "30px",
    navScrollLeft: 0,
    address: '选择位置',
    ak: "3cmQZvu49EvgdePdyf6oZ0n335aHQCOU",
    markers: [],
    longitude: '', //经度
    latitude: '', //纬度
    expNum: '',
    ldata: false,
    defaultScrollImg: "../../images/default/690-460.png", //默认图片
    typeBgDefaultImg: "../../images/default/180-120.png", //默认图片
    canIUse: false,
    curcolor: '0'
  },
  
  onShareAppMessage: function (res) {
      return {
        //
        title: '北京居然有这么酷的体验，拼团价最高省328元！快来！',
        path: 'pages/uclickFirTab/uclickHomePage/index',
        desc: 'Blueglass体验',
        imageUrl: "/pages/images/default/homepageshare.jpg",
      };
  },
  onLoad: function(options) {
    var that = this;

    // var address = wx.getStorageSync('address');
    // var expNum = wx.getStorageSync('expNum');
    // if ((!address || address == "选择位置") && (!expNum)) {
    if (that.data.ldata == false) {
      that.getlLocation();
    }
    // else{
    //   that.setData({
    //     address: address,
    //     expNum: expNum
    //   })
    // }

    // that.getlLocation();

    console.log('app start ');
    // this.setData({
    //   indexbanners: indexData.indexBanners.data,
    //   indexHometypeDataList: indexData.indexHometypeDataList,
    //   recommendBaseInfoList: indexData.indexHometypeDataList.data[0].recommendBaseInfoList,
    // });

    wx.showLoading({
        title: '正在加载',
      }),

      wx.request({
        url: serverUrl.serverUrl + 'home/index/banners',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
        // header: {}, // 设置请求的 header  

        success: function(res) {
          wx.hideLoading();
          if (res.data.status == 200) {
            that.setData({
              indexbanners: res.data.data,
            })
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

    wx.request({
      url: serverUrl.serverUrl + 'home/index/homeTypes',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
      // header: {}, // 设置请求的 header  

      success: function(res) {
        wx.hideLoading();

        if (res.data.status == 200) {
          that.setData({
            indexHometypeDataList: res.data,
            recommendBaseInfoList: res.data.data[0].recommendBaseInfoList,

          })
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
  onShow: function() {
    // var that = this;
    // that.getlLocation();
  },
  changeDataSoureAction: function(event) {
    console.log(event)
    var typeId = event.currentTarget.dataset.typeid;
    for (var i = 0; i < this.data.indexHometypeDataList.data.length; i++) {
      // console.log(typeId);
      // console.log(this.data.indexHometypeDataList.data[i].typeId);
      if (this.data.indexHometypeDataList.data[i].typeId == typeId) {
        this.setData({
          recommendBaseInfoList: this.data.indexHometypeDataList.data[i].recommendBaseInfoList,
          curcolor: event.currentTarget.dataset.index
        })
      }
    }
  },
  expClick: function(event) {
    var experId = event.currentTarget.dataset.experid;

    wx.navigateTo({
      url: '../experience/index?experId=' + experId,
    })
    // wx.navigateTo({
    //   url: '../../uclickSecTab/share/index?experId=' + experId,
    // })
  },
  clickScroll: function(event) {
    var experId = event.currentTarget.dataset.recommendid;

    if(experId){
      wx.navigateTo({
        url: '../experience/index?experId=' + experId,
      })
    }
  },
  scrollErrorFunction: function(e) {

    if (e.type == "error") {
      var errorImgIndex = e.target.dataset.errorimg; //获取错误图片循环的下标
      var indexbanners = this.data.indexbanners;　　　　　　　 //将图片列表数据绑定到变量

      indexbanners[errorImgIndex].bannerImgUrl = this.data.defaultScrollImg; //错误图片替换为默认图片
      this.setData({
        indexbanners: indexbanners
      })
    }
  },
  typeErrorFunction: function(e) {

    if (e.type == "error") {
      var errorImgIndex = e.target.dataset.errorimg; //获取错误图片循环的下标
      var indexHometypeDataList = this.data.indexHometypeDataList;　　　　　　　 //将图片列表数据绑定到变量

      indexHometypeDataList.data[errorImgIndex].bgImgUrl = this.data.typeBgDefaultImg; //错误图片替换为默认图片
      this.setData({
        indexHometypeDataList: indexHometypeDataList
      })
    }
  },
  recommendErrorFunction: function(e) {

    if (e.type == "error") {
      var errorImgIndex = e.target.dataset.errorimg; //获取错误图片循环的下标
      var recommendBaseInfoList = this.data.recommendBaseInfoList;　　　　　　　 //将图片列表数据绑定到变量

      recommendBaseInfoList[errorImgIndex].homeImgUrl = this.data.defaultScrollImg; //错误图片替换为默认图片
      this.setData({
        recommendBaseInfoList: recommendBaseInfoList
      })
    }
  },
  BaiduMap: function(e) {
    console.log(e)
    var that = this;
    // var address = wx.getStorageSync('address');
    // var expNum = wx.getStorageSync('expNum');
    // if ((!address || address == "选择位置") && (!expNum)) {
    if (that.data.ldata == false) {
      that.getlLocation();
    } else {
      wx.navigateTo({
        url: '../wxmap/index',
      })
    }
  },
  getlLocation: function() {
    var that = this;
    // 获取地理位置
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        // wx.setStorageSync('latitude', latitude);
        // wx.setStorageSync('longitude', longitude);

        that.setData({
          ldata: true
        })
        /* 获取定位地理位置 */
        // 新建bmap对象 
        var BMap = new bmap.BMapWX({
          ak: that.data.ak
        });
        var fail = function(data) {
          console.log(data);
        };
        var success = function(data) {
          //返回数据内，已经包含经纬度
          console.log(data);
          //使用originalData获取数据
          wxMarkerData = data.wxMarkerData;
          originalData = data.originalData.result.addressComponent;
          //把所有数据放在初始化data内
          that.setData({
            latitude: wxMarkerData[0].latitude,
            longitude: wxMarkerData[0].longitude,
            address: originalData.district,
          });
          console.log(originalData.district)
          // wx.setStorageSync('address', originalData.district);

        }
        // 首页获取多少个体验
        wx.request({
          url: serverUrl.serverUrl + 'home/index/nearbyRecommends',
          data: {
            userLng: that.data.latitude,
            userLat: that.data.longitude
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
          // header: {}, // 设置请求的 header  

          success: function(res) {
            console.log(res)
            // wx.setStorageSync('expNum', res.data.data.length);
            that.setData({
              expNum: res.data.data.length
            });
            wx.hideLoading();

          },
          fail: function(res) {
            wx.hideLoading();
            wx.showToast({
              title: '网络错误，请稍后重试',
              icon: 'none',
            })
          }
        });
        // 发起regeocoding检索请求 
        BMap.regeocoding({
          fail: fail,
          success: success
        });
      },
      fail: function(res) {
        console.log('拒绝授权')
        that.setData({
          ldata: false
        })
      }
    })

  }
})