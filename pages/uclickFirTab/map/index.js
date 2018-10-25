// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../../lib/js/bmap-wx.min.js');
var serverUrl = require('../../../lib/js/main.js');

var wxMarkerData = [];
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    rgcData: {},
    clientHeight: 0,
    expNum: 0,  //活动数量
    address:'',
    iconPath:'',
    newlatitude: '',
    newlongitude: '',
    id :'',
    addressName:'',  //点击后图片
    iconPathImg:'',    // 点击后体验地点
    showView:false,
  },
  makertap: function (e) {
    var that = this;
    console.log(e)
    var id = e.markerId;
    that.showSearchInfo(id);
  },
  onLoad: function () {
    var that = this;
    // 新建百度地图对象 
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          //计算相关宽度
          clientHeight: res.windowHeight,
        });
      }
    });

    var BMap = new bmap.BMapWX({
      ak: '3cmQZvu49EvgdePdyf6oZ0n335aHQCOU'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {

      wxMarkerData = data.wxMarkerData;
      
      // that.setData({
      //   markers: that.data.markers_new
      // });
      // console.log(that.data.markers_new)
      that.setData({
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude
      });
      //首页获取多少个体验
      wx.request({
        url: serverUrl.serverUrl + 'home/index/nearbyRecommends',
        data: {
          userLng: wxMarkerData[0].latitude,
          userLat: wxMarkerData[0].longitude
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
        // header: {}, // 设置请求的 header  

        success: function (res) {
          console.log(res)
          var newMarkers = [];
          for(var i = 0; i< res.data.data.length;i++){
            var maskerObj = {};
            maskerObj.address = res.data.data[i].recommendTitle;
            maskerObj.iconPath = res.data.data[i].addressImgUrl;
            maskerObj.latitude = res.data.data[i].addressLat;
            maskerObj.longitude = res.data.data[i].adressLng;
            maskerObj.id = res.data.data[i].recommendId;
            newMarkers.push(maskerObj);
            that.setData({
              expNum: res.data.data.length,
              markers: newMarkers,
              address: res.data.data[i].recommendTitle,
              iconPath: res.data.data[i].addressImgUrl,
              newlatitude: res.data.data[i].addressLat,
              newlongitude: res.data.data[i].adressLng,
              id: res.data.data[i].recommendId,
            });
            console.log(that.data.markers)
            wx.hideLoading();
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
    }
    // 发起regeocoding检索请求 
    BMap.regeocoding({
      fail: fail,
      success: success,
      iconPath: '../../images/home/gd.png',
      iconTapPath: '../../images/home/xz@2x.png'
    });
  },

  showSearchInfo: function (id) {
    var that = this;
    console.log(id);
    for (var i = 0; i < that.data.markers.length;i++){
      if (id == that.data.markers[i].id){
        that.setData({
          addressName: that.data.markers[i].address,
          iconPathImg: that.data.markers[i].iconPath,
          showView:true
        });
        
      }
    }
  }

})