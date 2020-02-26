const cnchar = require('cnchar')
const db = wx.cloud.database()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    didian:{
      type:String
    },
    input:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    output:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  lifetimes: {
    attached: function () {
      var didian = cnchar.spell(this.properties.didian)
      console.log(didian)
      var input = this.properties.input
      const col = db.collection(didian)
      col.where({uid:input}).get().then(res => {
        this.triggerEvent("out", res.data),
        this.setData({
          output: res.data,
        })
      })
    }
  }

})
