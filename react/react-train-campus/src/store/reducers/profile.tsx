import {AnyAction} from 'redux';
export interface ProfileState {

}
let initialState: ProfileState = {

};
export default function(state: ProfileState = initialState, action: AnyAction): ProfileState{
    switch(action.type) {
        default: 
            return state;
    }
}
