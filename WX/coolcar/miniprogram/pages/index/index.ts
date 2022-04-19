import { routing } from "../../utils/routing"

Page({
data:{
  
  setting:{
    skew: 0,
    rotate: 0,
    showLocation: true,
    showScale: true,
    subKey: '',
    layerStyle: 1,
    enableZoom: true,
    enableScroll: true,
    enableRotate: false,
    showCompass: false,
    enable3D: false,
    enableOverlooking: false,
    enableSatellite: false,
    enableTraffic: false,
  },
  location:{
    latitude:28,
    longitude:113,
  },
  scale:10,
  markers:[{
    iconPath:"/resources/Car.jpg",
    id:0,
    latitude:23.099994,
    longitude:113.324520,
    width:50,
    height:50,
  },
  {
    iconPath:"/resources/Car.jpg",
    id:1,
    latitude:24.099994,
    longitude:114.324520,
    width:50,
    height:50,      
  }],
  showCancel:true,
  showModal:false,
},
    
  moMyLocationTap(){
    wx.getLocation({
      type:'gcj02',
      success:res=>{
        this.setData({
          location:{
          latitude:res.latitude,
          longitude: res.longitude,
          }
        })
      },
      fail:()=>{
        wx.showToast({
          icon:'none',//不限制title的字数
          title:'可以右上角设置授权哦！'
        })
      }
    })
  },
  onScanTap(){
    wx.scanCode({
      success:async()=>{
          
            await this.selectComponent('#licModal').showModal()
            const carID='car123'
            const redirectURL=routing.lock({
              car_id:carID
            })
            wx.navigateTo({
              url:routing.register({
                redirectURL:redirectURL
              })
            })
          
        
          },
        fail:res=>console.log(res),
    }) 
  },
  onMyTripsTap(){
    wx.navigateTo({
      url:routing.mytrips(),
    })
  },
})