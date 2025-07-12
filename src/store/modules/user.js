// 存储用户信息的模块
import { getInfo, setInfo } from '@/utils/storage'
// 导出至index.js的总store中
export default {
  namespaced: true,
  state: {
    userInfo: getInfo() || {}
  },
  mutations: {
    SET_USER_INFO (state, payload) {
      state.userInfo = payload
      console.log('SET_USER_INFO', state.userInfo)
      setInfo(payload)
    }
  },
  actions: {
  },
  getters: {}
}
