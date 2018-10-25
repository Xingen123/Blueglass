//3.活动详情接口 请求地址：http://localhost:8080/recommend/index?recommendId=01670F4807474110978B84203C401DB8
var recommend_Detail = {
  "token": "token1",
  "status": 200,
  "errorMsg": "请求成功",
  "data": {
    "recommendId": "01670F4807474110978B84203C401DB8",
    "imgsUrl": ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532600607957&di=20b8d4257cffa1696792297aba05d0c6&imgtype=0&src=http%3A%2F%2Fwww.wangyanyu.com%2Fuploads%2Fimage%2F20170129%2F1485686606.jpg","https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532600607956&di=6e5d261ea62ea4d10db6092874d9ff56&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a00558cc90cca801219c7708cb5d.png%401280w_1l_2o_100sh.png"],
    "title": "体验标题1",
    "subTitle": "餐饮1",
    "recommendAddress": {
      "recommendId": "01670F4807474110978B84203C401DB8",
      "addressDetail": "大望路",
      "adressLng": "116.487496",
      "addressLat": "39.914787",
      "addressImgUrl": "null"
    },
    "timeInfos": [{
      "timeId": "0819BABA-C84A-454A-96B1-0DEA9B7DD4C6",
      "timeInfo": "2018/07/28 14:00-14:00"
    }, {
      "timeId": "0E3F1764-E5D8-4F61-A3BF-E749F503AAD7",
      "timeInfo": "2018/07/28 14:00-14:00"
    }, {
      "timeId": "1873839E-6F8A-4A4A-AE9C-26E0B6E287EF",
      "timeInfo": "2018/07/28 14:00-14:00"
    }],
    "detailInfo": "这里是简介",
    "authorInfo": {
      "authorId": "5E2EBC3987F14A7493420A5EDA8CA9CF",
      "authorName": "地方",
      "authorIconUrl": "https://123.57.210.220/images/orig/3,4015aa43cf1e",
      "introduction": "个人简介这个地方是个人简介我是来自北方的姑娘，90后，你可以叫我明月。和大部分的90后人生轨迹是一样的，读书写字，但没有结婚生子。学业结束之后接触过很多，一路辗转，跌跌撞撞",
      "purpose": "体验传递2拥有有趣的灵魂，享受美食的色香味形，也探索更有意思的分秒生活，去和有意思的人成为朋友",
      "relateTitle": ["灵魂歌者", "有才", "这是个标签啊", "天才歌后", "firend", "傻X"]
    },
    "commentFullInfo": {
      "totalCount": 7,
      "totalStars": 4.0,
      "commentInfos": []
    }
  }
}
module.exports = {
  recommendDetail: recommend_Detail,
}