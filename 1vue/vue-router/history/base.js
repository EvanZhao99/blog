
export function createRoute(record, location) {
  let res = []
  if(record) {
    while(record) {
      res.unshift(record)
      record = record.parent
    }
  }
  return {
    ...location,
    // 从父到子展开的record数组
    matched: res
  }
}

export default class History {
  constructor(router) {
    this.router = router
    // 默认路由中保存一个当前路径 后续会更改这个路径
    this.current = createRoute(null, {
      path: '/'
    })

    this.cb = null
  }

  // 在路由更新是调用this.cb
  listen(cb) {
    this.cb = cb
  }

  /**
   * 跳转的核心逻辑 
   * @param location 代表跳转的目的地
   * @param onComplete 跳转完成后 执行的回调
   */
  transitionTo(location, onComplete) {
    // 根据当前路径 找到对应路由记录
    let route = this.router.match(location)

    // 如果路径相同 不继续跳转
    if(this.current.path === location && route.matched.length === this.current.matched.length) {
      return
    }

    let queue = [].concat(this.router.beforeHooks)
    const iterator = (hook, next) => {
      // 分别对应用户的 from to next
      hook(route, this.current, () => {
        next()
      })
    }

    // 依次执行队列 执行完毕后更新路由
    runQueue(queue, itertor, () => {
      // 用新的路由覆盖current
      this.updateRoute(route)
      onComplete && onComplete()
    })
  }

  updateRoute(route) {
    this.current = route
    // 路径变化会将最新路径传递给listener方法
    this.cb && this.cb(route) 
  }

}

// beforeEach
this.beforeHooks = []
beforeEach(fn) {
  this.beforeHooks.push(fn)
}

function runQueue(queue, iterator, cb) {
  function stet(index) {
    if(index >= queue.length) {
      cb()
    } else {
      let hook = queue[index]
      iterator(hook, () => {
        step(index+1)
      })
    }
  }
  step(0)
}