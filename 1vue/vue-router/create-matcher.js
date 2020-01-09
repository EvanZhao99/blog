
import createRouteMap from './create-route-map'
import { createRoute } from './history/base.js'
export default function createMatcher(routes) {
  // 收集所有路由路径，收集路径的对应渲染关系
  // pathLsit = ['/','/about','/about/a','/about/b']
  // pathMap = {'/': '/的记录','/about': '/about的记录',}
  let {pathList, pathMap} = createRouteMap(routes)

  // 这个方法就是动态加载路由的方法
  function addRoute(routes) {
    createRouteMap(routes, pathList, pathMap)
  }

  // 根据路径找到对应记录
  function match(path) {
    let record = pathMap[path]
    let location = {
      path: path
    }
    if(record) {
      // 根据记录创建对应的路由
      return createRoute(record, location)
    } else {
      return createRoute(null, {
        path: location
      })
    }
  } 

  return {
    addRoutes,
    match
  }
}