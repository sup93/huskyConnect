//Reducer works when state change
import { 
    INPUT_UPDATE, SEND_MESSAGE
} from '../actions/husky-actions';
import { HuskyActions } from '../actions';


const INITIAL_STATE: any = {
    email: '',
    message: ''
};

export default (state = INITIAL_STATE, action: HuskyActions) => {
    console.log("action");
    console.log(action.type);

    switch (action.type) {
        case INPUT_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case SEND_MESSAGE:
            return INITIAL_STATE;
        default:
            console.log("in default");
            console.log(state);
            return state;
    }
};
