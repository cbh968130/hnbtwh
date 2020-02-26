const cnchar = require('cnchar')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    didian:{
      type:String
    },
    didian2:{
      type:String
    },
    ipa:{
      type:String
    },
    pinyin:{
      type:String
    },
    beizhu:{
      type:String
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
    playVoice(){
      var didian = cnchar.spell(this.properties.didian2)
      var pinyin = this.properties.pinyin
      var innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.autoplay = true
      innerAudioContext.src = "cloud://wugniu-n4jmh.7775-wugniu-n4jmh-1301204702/"+didian+"/"+pinyin+".wav"
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })

    }
  }
})
/**
 *   <text class="beizhu">{{tools.filter_N(beizhu)}}</text>
 */
