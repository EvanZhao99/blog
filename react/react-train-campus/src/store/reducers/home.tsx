import {AnyAction} from 'redux';
export interface HomeState {

}
let initialState: HomeState = {

};
export default function(state: HomeState = initialState, action: AnyAction): HomeState{
    switch(action.type) {
        default: 
            return state;
    }
}
