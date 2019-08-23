export default function bindActionCreators(actionCreators, dispatch) {
    function bindActionCreator(actionCreator, dispatch) {
        return (...args) => dispatch(actionCreator(...args))
    }
    if(typeof actionCreators == 'function') {
        return bindActionCreator(actionCreators, dispatch)
    }
    let boundActionCreators = {}
    for(let key in actionCreators) {
        boundActionCreators[key] = bindActionCreator(actionCreators[key], dispatch)
    }
    return boundActionCreators
}