//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    components:[
      {
        icon:'icon-all',
        name:'基础组件',
        page:'/pages/base/base'
      },
      {
        icon: 'icon-cascades',
        name: '布局组件',
        page: '/pages/base/base'
      },
      {
        icon: 'icon-circle',
        name: '视图组件',
        page: '/pages/base/base'
      }
    ]
  },
  onLoad: function () {
    
  },
  goPage(e){
    let {
      page
    } = e.currentTarget.dataset;
    wx.navigateTo({
      url: page,
    })
  }
})
