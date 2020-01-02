import * as ykyNumbers from 'yky-numbers'
import _ from 'lodash'
require('./style.less')

function getComponent() {
  let element = document.createElement('div')
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
    
    element.innerHTML = _.join(['hello', 'world', '!', ykyNumbers.numToWord(0)])

    return element
  }).catch(err => {
    element.innerHTML = err
    return element
  })

}

setTimeout(() => {
  getComponent().then(component => {
    document.body.appendChild(component)
  })
}, 3000)





