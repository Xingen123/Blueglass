
//http://localhost:8080/home/index/banners 主页banner轮播图
var index_banners = {
  "token": "token1",
  "status": 200,
  "errorMsg": "请求成功",
  "data": [
    {
    "bannerImgUrl": "https://123.57.210.220/images/orig/2,24aac206a765",
    "seqNo": 1,
    "actionUrl": "http://www.baidu.com"
  }, 
  {
    "bannerImgUrl": "https://123.57.210.220/images/orig/3,24a9ede02dca",
    "seqNo": 1,
    "actionUrl": "http://www.baidu.com"
  },
   {
     "bannerImgUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532600023911&di=567ac32025d13f760e5c56578309727b&imgtype=0&src=http%3A%2F%2Fpic36.nipic.com%2F20131227%2F6608733_141304247000_2.jpg",
    "seqNo": 1,
     "actionUrl": "http://www.baidu.com"
  }]
}


//http://localhost:8080/home/index/homeTypes 首页活动分类信息
var index_homeTypes = {
  "token": "token1",
  "status": 200,
  "errorMsg": "请求成功",
  "data": [{
    "typeId": "E38399BD3B044FEEB2247E5C9CAF7348",
    "typeName": "摄影",
    "bgImgUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532600550660&di=4f0b3df485cced6b8cc2776f762bdec6&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F908fa0ec08fa513de6a83efa376d55fbb2fbd990.jpg",
    "seqNo": 2,
    "recommendBaseInfoList": [{
      "id": "01670F4807474110978B84203C401DB8",
      "title": "摄影体验标题",
      "homeImgUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533192852&di=00d6fd1c336a9dd34b10752389749579&imgtype=jpg&er=1&src=http%3A%2F%2Fpic31.photophoto.cn%2F20140413%2F0049045698345890_b.jpg",
      "authorName": "摄影师1",
      "authorIconUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532598133730&di=4068e083e946f8a8e8dc261c7687d66f&imgtype=0&src=http%3A%2F%2Fpic31.photophoto.cn%2F20140413%2F0008020224865544_b.jpg",
      "price": 100.00,
      "collagePrice": 88,
    }]
  }, {
    "typeId": "656FB2612AE241C89FB54984F765AF07",
    "typeName": "交通",
      "bgImgUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532600584547&di=8486e3c210f7fe5b37fa9e0aaca31b8a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F38dbb6fd5266d016c173a0b69d2bd40734fa35c1.jpg",
    "seqNo": 12,
      "recommendBaseInfoList": [{
        "id": "01670F4807474110978B84203C401DB8",
        "title": "交通标题1",
        "homeImgUrl": "https://123.57.210.220/images/orig/4,1cab407b76f4",
        "authorName": "交通作者1",
        "authorIconUrl": "https://123.57.210.220/images/orig/3,4015aa43cf1e",
        "price": 200.00,
        "collagePrice": 188
      },
        {
          "id": "01670F4807474110978B84203C401DB8",
          "title": "交通标题",
          "homeImgUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532598133730&di=f370130e9fa1a83bff7c480605bdda43&imgtype=0&src=http%3A%2F%2Fimg05.tooopen.com%2Fimages%2F20150116%2Fsy_79272265131.jpg",
          "authorName": "交通作者2",
          "authorIconUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532598133730&di=429413a237b4e757c2e847f976c032c7&imgtype=0&src=http%3A%2F%2Fimg3.redocn.com%2F20100621%2F20100621_150784c0e1a37d71779dtpTBpK1iWosX.jpg",
          "price": 400.00,
          "collagePrice": 388
        }]
  }, {
    "typeId": "25EF8E97D5E74490A42FEDEF36DE2224",
    "typeName": "餐饮",
      "bgImgUrl": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1685604668,1712690717&fm=27&gp=0.jpg",
    "seqNo": 15,
    "recommendBaseInfoList": [{
      "id": "01670F4807474110978B84203C401DB8",
      "title": "餐饮体验标题",
      "homeImgUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532598133730&di=1fcac611c145074013572462f22e8744&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F24%2F54%2F36E58PICexR_1024.jpg",
      "authorName": "地方",
      "authorIconUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532598133729&di=c0797c3cf89212f989089659df6a14de&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20140228%2Fsy_55908467389.jpg",
      "price": 300.00,
      "collagePrice": 188
    }]
  },
    {
      "typeId": "E38399BD3B044FEEB2247E5C9CAF7348",
      "typeName": "摄影",
      "bgImgUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532600550660&di=4f0b3df485cced6b8cc2776f762bdec6&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F908fa0ec08fa513de6a83efa376d55fbb2fbd990.jpg",
      "seqNo": 2,
      "recommendBaseInfoList": [{
        "id": "01670F4807474110978B84203C401DB8",
        "title": "摄影体验标题",
        "homeImgUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533192852&di=00d6fd1c336a9dd34b10752389749579&imgtype=jpg&er=1&src=http%3A%2F%2Fpic31.photophoto.cn%2F20140413%2F0049045698345890_b.jpg",
        "authorName": "摄影师1",
        "authorIconUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532598133730&di=4068e083e946f8a8e8dc261c7687d66f&imgtype=0&src=http%3A%2F%2Fpic31.photophoto.cn%2F20140413%2F0008020224865544_b.jpg",
        "price": 100.00,
        "collagePrice": 88,
      }]
    },
    {
      "typeId": "E38399BD3B044FEEB2247E5C9CAF7348",
      "typeName": "摄影",
      "bgImgUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532600550660&di=4f0b3df485cced6b8cc2776f762bdec6&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F908fa0ec08fa513de6a83efa376d55fbb2fbd990.jpg",
      "seqNo": 2,
      "recommendBaseInfoList": [{
        "id": "01670F4807474110978B84203C401DB8",
        "title": "摄影体验标题",
        "homeImgUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533192852&di=00d6fd1c336a9dd34b10752389749579&imgtype=jpg&er=1&src=http%3A%2F%2Fpic31.photophoto.cn%2F20140413%2F0049045698345890_b.jpg",
        "authorName": "摄影师1",
        "authorIconUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532598133730&di=4068e083e946f8a8e8dc261c7687d66f&imgtype=0&src=http%3A%2F%2Fpic31.photophoto.cn%2F20140413%2F0008020224865544_b.jpg",
        "price": 100.00,
        "collagePrice": 88,
      }]
    },
  ]

 
}










module.exports = {
  indexBanners: index_banners,
  indexHometypeDataList: index_homeTypes,
}