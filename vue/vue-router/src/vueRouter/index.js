

class Router {

}

Router.install = function (_Vue) {
  if(Router.installed) {
    warn('already installed')
    return 
  }
}

export default Router