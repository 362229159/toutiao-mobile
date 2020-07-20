// 导入request
import request from '@/utils/request'

// 封装登录接口
export const login = (data) => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}

// 封装获取验证码接口
export const getCode = (data) => {
  return request({
    url: `/app/v1_0/sms/codes/${data}`,
    method: 'GET'
  })
}
