
import {routerMiddleware} from 'redux'

let store = applyMiddleware(routerMiddleware(history)(createStroe)(reducer))