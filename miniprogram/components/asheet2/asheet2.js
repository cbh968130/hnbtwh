const cnchar = require('cnchar')
const db = wx.cloud.database()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    didian: {
      type: String
    },
    input: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    output: []
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  lifetimes: {
    attached: function () {
      var didian = cnchar.spell(this.properties.didian)
      var input = this.properties.input
      const col = db.collection(didian)
      /**
       * 判断是否包含数字，如果包含数字则搜pinyin，反之搜pinyin2
       */
      var con = /[0-9]/
      var res = con.test(input)
      if (res){
        col.where({ pinyin: input}).get().then(res => {
            this.setData({
              output: res.data,
            })
        })
      }
      else{
        col.where({ pinyin2: input }).get().then(res => {
          this.setData({
            output: res.data,
          })
        })
      }
    }
  }

})
