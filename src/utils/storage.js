// 约定：存储信息的key值统一为shopping_app_info
const INFO_KEY = 'shopping_app_info'

export const getInfo = () => {
  const defaultInfo = {
    token: '',
    userId: ''
  }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultInfo
}
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}
