//Reducer works when state change
import { 
    MESSAGES_FETCH_SUCCESS, SEND_MESSAGE, INPUT_UPDATE
} from '../actions/husky-actions';
import { HuskyActions } from '../actions';


const INITIAL_STATE: any = {
    messagesList: [], // list of message objects
    message: ''
};

export default (state = INITIAL_STATE, action: HuskyActions) => {
    console.log("action");
    console.log(action.type);

    switch (action.type) {
        case MESSAGES_FETCH_SUCCESS:
            return {...state, messagesList: action.payload};
        case INPUT_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case SEND_MESSAGE:
            // ...state - means use current values of state
            /*
                example: messagesList = [{sender: bob@bob.com, time: 1:20pm, message: hello},
                                         {sender: bob@bob.com, time: 1:22pm, message: you},
                                         {sender: bob@bob.com, time: 1:25pm, message: cute}]

                but replace messagesList part of state with this:
                ...state.messagesList - will pull out all current messages
                action.payload - 
                messagesList: [...state.messagesList, action.payload]

            */
            return {...state, message: ''}
        default:
            console.log("in default");
            console.log(state);
            return state;
    }
};
