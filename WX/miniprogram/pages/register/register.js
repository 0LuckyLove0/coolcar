// pages/register/register.ts
Page({
    /**
     * 页面的初始数据
     */
    data: {
        licNo: '',
        name: '',
        birthDate: '2003-05-08',
        genderIndex: 0,
        genders: ['未知', '男', '女', '想什么呢?'],
        licImgURL: '',
        state: 'UNSUBMITTED'
    },
    onUploadLic: function () {
        var _this = this;
        wx.chooseImage({
            success: function (res) {
                if (res.tempFilePaths.length > 0) {
                    _this.setData({
                        licImgURL: res.tempFilePaths[0]
                    });
                    // TODO upload image
                    setTimeout(function () {
                        _this.setData({
                            licNo: '24135355648',
                            name: 'Jarvis',
                            genderIndex: 1,
                            birthDate: '2003-05-08'
                        });
                    });
                }
            }
        });
    },
    onGenderChange: function (e) {
        this.setData({
            genderIndex: e.detail.value
        });
    },
    onBirthDateChange: function (e) {
        this.setData({
            birthDate: e.detail.value
        });
    },
    onSubmit: function () {
        var _this = this;
        //TODO:submit the server 
        this.setData({
            state: 'PENDING'
        });
        setTimeout(function () {
            _this.onLicVerified();
        }, 3000);
    },
    onResubmit: function () {
        this.setData({
            state: 'UNSUBMITTED',
            licImgURL: ' '
        });
    },
    onLicVerified: function () {
        this.setData({
            state: 'VERIFIED'
        });
        wx.redirectTo({
            url: '/pages/lock/lock'
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    }
});
