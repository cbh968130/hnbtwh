// components/alist/alist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    input:{
      type:Object
    },
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
    forDetail(){
      this.triggerEvent("show",this.data.input)
    }
  }
})
