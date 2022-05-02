import { routing } from "../../utils/routing"

interface Trip{
    id:string
    start:string
    end:string
    distance:string,
    duration:string
    fee:string
    status:string
}
interface MainItem {
    id: string
    navId: string
    data: Trip
}

interface NavItem {
    id: string
    mainId: string
    label: string
}

interface MainItemQueryResult {
    id: string
    top: number
    dataset: {
        navId: string
      //  navScrollId: string
    }
}


// pages/mytrips/mytrips.ts
Page({

    /**
     * 页面的初始数据
     */
    ScrollStates:{
        mainItems:[]
    },
    data: {
        promotionItems: [
            {
                img: 'https://img.mukewang.com/5f7301d80001fdee18720764.jpg',
                promotionID: 1,
            },            
            {
                img: 'https://img.mukewang.com/5f6805710001326c18720764.jpg',
                promotionID: 2,
            },
            {
                img: 'https://img.mukewang.com/5f6173b400013d4718720764.jpg',
                promotionID: 3,
            },
            {
                img: 'https://img.mukewang.com/5f7141ad0001b36418720764.jpg',
                promotionID: 4,
            },
        ],
        avatarURL:'',
        trips:[] as Trip[],    
        tripsHeight:0,
        scrollTop:0,
        mainItems: [] as MainItem[],
        mainScroll: '',
        navItems: [] as NavItem[],
        navCount:0,
        navSel:'',
    },

    onRegisterTap(){
        wx.navigateTo({
            url:routing.register(), 
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad() {
        this.populateTrips()
        const userInfo=await getApp<IAppOption>().globalData.userInfo
        this.setData({
            avatarURL:userInfo?.avatarUrl
        })
    },
    populateTrips(){
        const mainItems:MainItem[]=[]
        const navItems:NavItem[]=[]
        let navSel=''
        for(let i=0;i<100;i++){
            const mainId='main-'+i
            const navId='nav-'+i
            const tripId=(10001+i).toString()
            mainItems.push({
                id:mainId,
                navId:navId,
                data:{
                    id:tripId,
                    start:"东方明珠",
                    end:"迪士尼",   
                    distance:"27.04公里",
                    duration:"0时44分",
                    fee:'128.00元',
                    status:'已完成',                    
                }

            })
            navItems.push({
                id:navId,
                mainId:mainId,
                label:tripId
            })
            if(i===0){
                navSel=navId
            }
        }
        this.setData({
            mainItems,
            navItems,
            navSel,
        },()=>{
            this.prepareScrollStates()
        })
    },
    prepareScrollStates(){
        wx.createSelectorQuery().selectAll('.main-item')
        .fields({
            id:true,
            dataset:true,
            rect:true,
        }).exec(res=>{
            this.ScrollStates.mainItems=res[0]
        })
    },
    onPromotionItemTap(e: any) {
        const promotionID:number = e.currentTarget.dataset.promotionId
        if (promotionID) {
            console.log('claiming promotion', promotionID)
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() { 
        wx.createSelectorQuery().select('#heading')
        .boundingClientRect(rect=>{
            const height=wx.getSystemInfoSync().windowHeight-rect.height
            this.setData({
                tripsHeight:height,
                navCount:Math.round(height/50),
            })
            
        }).exec()
    },
    onNavItemTap(e:any){
        const mainId:string=e.currentTarget?.dataset?.mainId
        const navId:string=e.currentTarget?.id
        if(mainId&&navId){
            this.setData({
                mainScroll:mainId,
                navSel:navId
            })
        }
    },
    
    onMainScroll(e:any){
        console.log(e)
        const top:number=e.currentTarget?.offsetTop + e.detail?.scrollTop
        if(top===undefined){
            return
        }
        const selItem:any=this.ScrollStates.mainItems.find(
            v =>v["top"]>=top)
            if(!selItem){
                return 
            } 
            this.setData({
                navSel:selItem.dataset.navId, 
            })
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