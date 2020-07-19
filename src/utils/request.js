// 导入axios
import axios from 'axios'

// 创建实例对象
const request = axios.create({
  // 配置默认地址
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 导出
export default request
