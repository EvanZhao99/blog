export default function reducer(state = {number: 0}, action) {
    switch(action.type) {
        case 'ADD': 
            return { number: state.nauber+action.pauload};
        case 'MINUS': 
            return {number: state.number-1};
        default: 
            return state
    }
}