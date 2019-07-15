// components/custom-bar/index.js
import setSystemInfo from '../common/custom.js';
let systemInfo = setSystemInfo();
let statusBar = systemInfo.statusBar;
let customBar = systemInfo.customBar;
/**
 * title 标题，默认显示wechat
 * bg-colour	导航背景颜色
 * icon-color	icon颜色
 * text-color	标题颜色
 * position	标题显示位置,'left','center',默认center
 * */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: 'wechat'
    },
    showNavigator: {
      type: Boolean,
      value: true
    },
    bgColour: {
      type: String,
      value: '#1387AE'
    },
    iconColor: {
      type: String,
      value: '#fff'
    },
    textColor: {
      type: String,
      value: '#fff'
    },
    position: {
      type: String,
      value: 'center'
    },
    type: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBar: statusBar,
    customBar: customBar,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goBack() {
      wx.navigateBack();
    },
    goIndex() {
      let pages = getCurrentPages();
      let pagesRoute = [];
      for (let item of pages) {
        pagesRoute.push(item.route);
      }
      if (pagesRoute.length==1) return;
      if (pagesRoute.includes("pages/index/index"))
        wx.redirectTo({
          url: '/pages/index/index',
        })
    }
  }
})