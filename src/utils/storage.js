// 封装存本地数据
export const setItem = (name, data) => {
  if (typeof data === 'object') {
    data = JSON.stringify(data)
  }
  window.localStorage.setItem(name, data)
}

// 获取本地数据
export const getItem = (name) => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 删除本地数据
export const removeItem = (name) => {
  window.localStorage.removeItem(name)
}
