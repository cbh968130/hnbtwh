
const db = wx.cloud.database()

Component({
  /**
   * 组件的属性列表
   */
  
  properties: {
    input:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    adjInput:"",
    shiyi:"",
    list: ["硤石","鹽官"],
    point:{
      "硤石": [30.527770, 120.695320],
      "鹽官": [30.406155, 120.545125]
      },
    color:{
      "硤石":"red",
      "鹽官":"blue"   
    },
    markers: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setMarkers(e){
      var len = e.detail.length
      var didian = e.target.id
      
      if (len > 0){
        var alabel = didian + "："
        for(var i=0; i<len; i++){
          alabel = alabel + e.detail[i].pinyin
          if (i < len-1){
            alabel = alabel + "/"
          }
        }

        var position = this.data.point[didian]
        var icon = "../../image/"+this.data.color[didian]+".jpg"
        this.setData({
          markers:[...this.data.markers,{
            latitude: position[0],
            longitude: position[1],
            iconPath: icon,
            width: 5,
            height: 5,
            label: {
              content: alabel,
              anchorX:position[2],
              anchorY:position[3],
              fontSize: 10,
              bgColor: "#fff",
              borderWidth: 1,
              borderColor: "#000000",
              borderRadius: 5,
              padding: 3
          }
          }]
        })
        

      }
    }
  },

  lifetimes: {
    attached: function () {
      var hanzi = this.properties.input
      const col = db.collection("ShiYi")
      col.where({ uid: hanzi }).get().then(res => {
        if (typeof (res.data[0]) == "undefined") {
          this.setData({
            adjInput: hanzi
          })
        }
        else {
          this.setData({
            adjInput: res.data[0].cha,
            shiyi:res.data[0].shiyi
          })
        }
      })
    }

  }

})

