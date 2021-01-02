
import History from './base'

function getHash() {
  return window.location.hash.slice(1)
}

// 确保hash 如果网站没有`hash`，默认添加`#/`
function ensureHash() {
  if(window.location.hash) {
    return 
  }
  window.location.hash = '/#'
}

// hash路由
export default class HashHistory extends History{
  constructor(router) {
    super(router)
    ensureHash()
  }

  getCurrentLocation() {
    return getHash()
  }

  setUpListener() {
    // 监听hash值变化 手动跳转路由
    window.addEventListener('hashchange', () => {
      this.transitionTo(getHash())
    })
  }
}