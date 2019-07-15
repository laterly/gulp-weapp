// components/button/button.js
/*
*支持primary、info、warning、danger四类型
*plain 镂空按钮
*square 方形按钮 round圆型按钮
*size 按钮尺寸
*shadow 阴影
*onClick 派发点击事件
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type:{
      type:String,
      value:''
    },
    plain:{
      type:Boolean,
      value:false
    },
    round:{
      type: Boolean,
      value: false
    },
    square:{
      type: Boolean,
      value: false
    },
    size:{
      type:String,
      value:''
    },
    disabled:{
      type: Boolean,
      value: false
    },
    shadow:{
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    click(e){
      this.triggerEvent("onClick",e)
    }
  }
})
