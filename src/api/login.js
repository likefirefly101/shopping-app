// 导入request
import instance from '@/utils/request'
// 1.封装图形验证码接口
export const getPicCode = () => {
  return instance.get('/captcha/image')
}
// 2.获取短信验证码接口
export const getMsgCode = (mobile, captchaCode, captchaKey) => {
  return instance.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      mobile,
      captchaKey
    }
  })
}

// 3.登录接口
export const login = (mob, smsCode) => {
  return instance.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile: mob,
      smsCode
    }
  })
}
