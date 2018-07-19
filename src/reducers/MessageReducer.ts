//Reducer works when state change
import { 
    MESSAGE_FETCH_SUCCESS, INPUT_UPDATE
} from '../actions/husky-actions';
import { HuskyActions } from '../actions';


const INITIAL_STATE: any = {
};

export default (state = INITIAL_STATE, action: HuskyActions) => {
    console.log("action");
    console.log(action.type);

    switch (action.type) {
        case MESSAGE_FETCH_SUCCESS:
            return action.payload;
        default:
            console.log("in default");
            console.log(state);
            return state;
    }
};
