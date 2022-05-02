// pages/lock/lock.ts
Page({
    /**
     * 页面的初始数据
     */
    data: {
        avatarURL: ''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        var userInfo = getApp().globalData.userInfo;
        this.setData({
            avatarURL: userInfo === null || userInfo === void 0 ? void 0 : userInfo.avatarUrl
        });
    },
    getUserProfile: function () {
        var _this = this;
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: '展示用户头像',
            success: function (res) {
                console.log(res);
                _this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                });
            }
        });
    },
    onGetUserInfo: function (e) {
        var userInfo = e.detail.value;
        getApp().globalData.userInfo = userInfo;
    },
    onUnlockTap: function () {
        wx.showLoading({
            title: '开锁中',
            mask: true
        });
        setTimeout(function () {
            wx.redirectTo({
                url: '/pages/driving/driving',
                complete: function () {
                    wx.hideLoading();
                }
            });
        }, 2000);
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
