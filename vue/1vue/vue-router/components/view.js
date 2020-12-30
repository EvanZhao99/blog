export default {
  functional: true,
  render(h, {parent, data}) {
    let route = parent.$route
    let depth = 0
    data.routerView = 0
    // 根据matched 渲染对应的router-view
    while(parent) {
      if(parent.$vnode && parent.$vnode.data.routerView) {
        depth++
      }
      parent = parent.$parent
    }
    let record = route.matched[depth]
    if(!record) {
      return h()
    } else {
      return h(record.componet, data)
    }
  }
}