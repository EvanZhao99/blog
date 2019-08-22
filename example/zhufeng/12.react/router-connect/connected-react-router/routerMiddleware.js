

export default function(history) {
    return function({getState, dispatch}){
        return function(next) {
            return function(action) {

                let {payload: {method, args}} = action
                
            }
        }
    }
}