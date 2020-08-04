import {AnyAction} from 'redux';
export interface MineState {

}
let initialState: MineState = {

};
export default function(state: MineState = initialState, action: AnyAction): MineState{
    switch(action.type) {
        default: 
            return state;
    }
}
