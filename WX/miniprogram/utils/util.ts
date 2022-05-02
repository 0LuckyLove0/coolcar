export function getSetting(): Promise<WechatMiniprogram.GetSettingSuccessCallbackResult> {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: resolve,
        fail: reject,
      })
    })
  }
  
  export function getUserInfo(): Promise<WechatMiniprogram.GetUserInfoSuccessCallbackResult> {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        success: resolve,
        fail: reject,
      })
    })
  }
export interface IAppOption {
    globalData: {
        userInfo: Promise<WechatMiniprogram.UserInfo>
    }
    resolveUserInfo(userInfo: WechatMiniprogram.UserInfo): void
}