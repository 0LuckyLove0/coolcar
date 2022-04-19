import { routing } from "../../utils/routing"

// pages/register/register.ts
Page({
    /**
     * 页面的初始数据
     */
     redirectURL:'',
     data: {
         licNo:'',
         name:'',
         birthDate:'2003-05-08',
         genderIndex:0,
         genders:['未知','男','女','想什么呢?'],
         licImgURL:'',
         state:'UNSUBMITTED' as 'UNSUBMITTED'|'PENDING'|'VERIFIED'
    },

    onUploadLic(){
        wx.chooseImage({
            success:res=>{
                if(res.tempFilePaths.length>0){              
                    this.setData({
                        licImgURL:res.tempFilePaths[0]
                    })
                    // TODO upload image
                    setTimeout(()=>{
                        this.setData({
                            licNo:'24135355648',
                            name:'Jarvis',
                            genderIndex:1,
                            birthDate:'2003-05-08'
                        })
                    })
                }   
            }
        })
    },
    onLoad(opt:Record<'redirect',string>) {
        const o:routing.RegisterOpts=opt
        if(o.redirect){
            this.redirectURL=decodeURIComponent(o.redirect)
        }
    },
    onGenderChange(e:any){
        this.setData({
            genderIndex:e.detail.value,
        })
    },    
    onBirthDateChange(e:any){
        this.setData({
            birthDate:e.detail.value,
        })
    },
    onSubmit(){
        //TODO:submit the server 
        this.setData({
            state:'PENDING'
        })
        setTimeout(()=>{
        this.onLicVerified()
        },3000);
    },
    onResubmit(){
        this.setData({
            state:'UNSUBMITTED',
            licImgURL:' ',
        })
    },
    onLicVerified(){
        this.setData({
            state:'VERIFIED',
        })
        if(this.redirectURL){
            wx.redirectTo({
                url:this.redirectURL,
            })
        }

    },

    /**
     * 生命周期函数--监听页面加载
     */


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