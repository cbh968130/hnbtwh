
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    didian: {
      type: String
    },
    fanti: {
      type: String
    },
    jianti: {
      type: String
    },
    ipa: {
      type: String
    },
    pinyin: {
      type: String
    },
    beizhu: {
      type: String
    },
    fayin: {
      type: String
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
    playVoice() {
      var innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.autoplay = true
      innerAudioContext.src = "cloud://wugniu-n4jmh.7775-wugniu-n4jmh-1301204702/XiaShi/" + this.properties.pinyin + ".wav"
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })

    }
  }
})
/**
 *   <text class="beizhu">{{tools.filter_N(beizhu)}}</text>
 */
