export default function createStore(reducer) {
    let state;
    let listeners = []
    // 负责返回当前状态
    function getState() {
        return state
    }
    // 通过派发的方式修改状态
    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(l => l())
    }
    // 每次订阅都会返回一个取消订阅的方法
    function subscirbe(listener) {
        listeners.push(listener)
        return function() {
            listeners = listeners.filter(item => item!==listener)
        }
    }
    dispatch({type: '@@TYPE/REDUX_INIT'})
    return {dispatch, getState, subscirbe}
}