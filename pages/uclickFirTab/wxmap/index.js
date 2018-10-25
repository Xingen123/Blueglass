// map.js
var serverUrl = require('../../../lib/js/main.js');

var QQMapWX = require('../../../lib/js/qqmap-wx-jssdk.js');

var qqmapsdk;

var index;

var newMarkers = [];


Page({
  data: {
    clientHeight: 0,
    latitude: '',
    longitude: '',
    markers: [{
      iconPath: "../../images/home/gd.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 10,
      height: 10,
      callout: {
        content: "语言：珊珊是不是傻    \n    预计到达时间：10分钟    \n    车牌号：12345",
        color: "#ff0000",
        fontSize: 16,
        borderRadius: 10,
        bgColor: "#ff0000",
        padding: 100,
        display: "ALWAYS"
      },
      label: {
        content: "语言：珊珊是不是傻    \n    预计到达时间：10分钟    \n    车牌号：12345",
        color: "#ff0000",
        fontSize: 16,
        borderRadius: 10,
        bgColor: "#ffffff",
        padding: 100,
        display: "ALWAYS",
        borderWidth: 1,
        borderColor: 'red',
      }
    }],
  },


  onLoad: function() {
    var that = this;
    qqmapsdk = new QQMapWX({
      key: 'JJOBZ-MLT6P-E3WDJ-LDZ42-5FEAS-BHFS5'
    });
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        that.setData({
          //计算相关宽度
          clientHeight: res.windowHeight,
        });
      }
    });
    var latitude = wx.getStorageSync('latitude');
    var longitude = wx.getStorageSync('longitude');
    if (!latitude && !longitude) {
      that.getLocation();
    } else {
      that.setData({
        latitude: latitude,
        longitude: longitude
      })
      that.nearbyRecommends();
    }

  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e)
    console.log(e.markerId)

  },
  controltap(e) {
    console.log(e.controlId)
  },
  //点击气泡文字
  bindcallouttap: function(e) {
    console.log(e);
    var experId = e.markerId;
    wx.navigateTo({
      url: '../experience/index?experId=' + experId,
    })
  },
  getLocation: function() {
    var that = this;
    // 获取地理位置
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        // console.log(that.data.markers)
        // wx.setStorageSync('latitude', res.latitude);
        // wx.setStorageSync('longitude', res.longitude);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        that.nearbyRecommends();
      },
      fail: function(res) {
        console.log('拒绝授权')

      }
    })
  },
  setTenMarker: function(res) {
    var that = this;
    newMarkers = [];
    for (var i = 0; i < res.data.data.length; i++) {
      var maskerObj = {};
      var callout = {};
      callout.content = res.data.data[i].recommendTitle;
      callout.bgColor = '#000000';
      callout.fontSize = 14;
      callout.borderRadius = 10;
      callout.bgColor = "#ffffff";
      callout.padding = 5, 10;
      callout.borderWidth = 1;
      callout.borderColor = "#dcdcdc";
      callout.display = 'BYCLICK';
      maskerObj.callout = callout;
      maskerObj.iconPath = res.data.data[i].addressImgUrl;
      maskerObj.latitude = res.data.data[i].addressLat;
      maskerObj.longitude = res.data.data[i].adressLng;
      maskerObj.id = res.data.data[i].recommendId;
      newMarkers.push(maskerObj);
      that.setData({
        expNum: res.data.data.length,
        markers: newMarkers,
        // address: res.data.data[i].addressDetail,
        iconPath: res.data.data[i].addressImgUrl,
        // newlatitude: res.data.data[i].addressLat,
        // newlongitude: res.data.data[i].adressLng,
        // id: res.data.data[i].recommendId,
      });
      console.log(that.data.markers)
      wx.hideLoading();
    }

  },
  changelat: function(res) {
    var that = this;
    if (index >= res.data.data.length) {
      clearInterval(that.timer)
      that.setTenMarker(res)
    }
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: res.data.data[index].addressLat,
        longitude: res.data.data[index].adressLng
      },
      coord_type: 3, //baidu经纬度
      success: function(resp) {
        var location = resp.result.location;
        res.data.data[index].addressLat = location.lat
        res.data.data[index].adressLng = location.lng
        if (index < res.data.data.length) {
          index++;
        }
      },
      fail: function(resp) {
        console.log(resp);
      },
      complete: function(resp) {
        console.log(resp);
      }
    })
  },
  nearbyRecommends: function() {
    var that = this;
    // 获取多少体验
    wx.showLoading()
    wx.request({
      url: serverUrl.serverUrl + 'home/index/nearbyRecommends',
      data: {
        userLng: that.data.longitude,
        userLat: that.data.latitude
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
      // header: {}, // 设置请求的 header  

      success: function(res) {
        console.log(res)

        index = 0;
        that.timer = setInterval(function() {
          that.changelat(res);
        }, 300) //延迟时间 这里是1秒

      },
      fail: function(res) {
        wx.hideLoading();
        wx.showToast({
          title: '网络错误，请稍后重试',
          icon: 'none',
        })
      }
    });
  }
})