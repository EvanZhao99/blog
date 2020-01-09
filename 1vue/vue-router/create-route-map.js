
export default function createRouterMap(routes, oldPathList, oldPathMap) {
  let pathList = oldPathList || []
  let pathMap = oldPathMap || Object.create(null)
  routes.forEach(route => {
    // 添加到路由记录 用户配置可能是无效层级 稍后递归调用词方法
    addRouteRecord(route, pathList, pathMap)
  })

  return {
    pathList,
    pathMap
  }
}

// 改变pathLsit pathMap
function addRouteRecord(route, pathList, pathMap, parent) {
  // 子路由记录添加前缀
  let path = parent ? `${parent.path}/${router.path}` : route.path
  let record = {
    path,
    component: route.component,
    parent
  }
  if(!pathMap[path]) {
    pathList.push(path)
    pathMap[path] = record
  }
  // 递归处理子路由
  if(route.children) {
    route.children.forEach(r => {
      addRouteRecord(r, pathList, pathMap, route)
    })
  }
}