

function getComponent() {
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
    let element = document.createElement('div')

    element.innerHTML = _.join(['hello', 'world', '!'])

    return element
  }).catch(err => 'An error occurred while loading kthi component')
}



setTimeout(() => {
  getComponent().then(component => {
    document.body.appendChild(component)
  })
}, 3000);

