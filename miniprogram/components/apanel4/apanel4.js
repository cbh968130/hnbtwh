
const db = wx.cloud.database()

Component({
  /**
   * 组件的属性列表
   */

  properties: {
    input: {
      type: String
    },
    adjInput:{
      type:String
    },
    shiyi:{
      type:String
    },
    liju:{
      type:String
    },
    ifimg:{
      type:Number
    },
    img:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    adjInput: "",
    list: ["硖石"]
  },

  /**
   * 组件的方法列表
   */
  methods: {
  },

  lifetimes: {
  }

})

