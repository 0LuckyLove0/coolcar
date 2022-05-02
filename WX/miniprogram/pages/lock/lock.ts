// pages/lock/lock.ts
import { IAppOption } from "../../app"
import { routing } from "../../utils/routing"
const shareLocationKey = "share_location"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatarURL:'',
        shareLocation: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(opt:Record<'car_id',string>) {
        const o:routing.LockOpts=opt
        console.log('unlocking car',opt.car_id)
        const userInfo=await getApp<IAppOption>().globalData.userInfo
        this.setData({
            avatarURL:userInfo?.avatarUrl,
            shareLocation:wx.getStorageSync(shareLocationKey)
        })
    },

    getUserProfile() {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
          desc: '展示用户头像', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            console.log(res)
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      },   

      onGetUserInfo(e: any) {
        const userInfo: WechatMiniprogram.UserInfo = e.detail.userInfo
        if (userInfo) {
            getApp<IAppOption>().resolveUserInfo(userInfo)
            this.setData({
                shareLocation: true,
            })
            wx.setStorageSync(shareLocationKey, true)
        }
    },


    onUnlockTap(){
        wx.getLocation({
            type:'gcj02',
            success:loc=>{
                console.log('starting a trip',{
                    location:{
                        latitude:loc.latitude,
                        longitude:loc.longitude,
                    },
                    //To Do 双向绑定
                    avatarURL:this.data.shareLocation
                    ?this.data.avatarURL:'',

                })
                const tripID='trip456'

                wx.showLoading({
                    title:'开锁中',
                    mask:true,
                })
                setTimeout(() => {
                    wx.redirectTo({
                        url:routing.drving({
                            trip_id:tripID
                        }),
                        complete:()=>{
                            wx.hideLoading()
                        }
                    })
                }, 2000);
        }, 
    })
},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})