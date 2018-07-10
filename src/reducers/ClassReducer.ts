//Reducer works when state change
import { 
    CLASS_UPDATE, CLASS_FORM_SAVE, CLASS_FORM_SAVE_SUCCESS, CLASS_FETCH, CLASS_FETCH_SUCCESS
} from '../actions/husky-actions';
import { ClassStore } from '../components/common/models/class-store';
import { HuskyActions } from '../actions';


const INITIAL_STATE: ClassStore = {
    classcode: '',
    classname: '',
    profname: '',
    time: '',
    credits: '',
    subject: ''
};

export default (state = INITIAL_STATE, action: HuskyActions) => {
    console.log("action");
    console.log(action.type);

    switch (action.type) {
        case CLASS_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case CLASS_FORM_SAVE:
            // TODO: this should be updated to what we want later
            return { ...state, ...INITIAL_STATE };
        case CLASS_FORM_SAVE_SUCCESS:
            return INITIAL_STATE;
        case CLASS_FETCH_SUCCESS:
            return action.payload;
        default:
            console.log("in default");
            console.log(state);
            return state;
    }
};
