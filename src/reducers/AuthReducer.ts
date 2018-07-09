//Reducer works when state change
import { 
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
} from '../actions/husky-actions';
import { AuthStore } from '../components/common/models/auth-store';
import { HuskyActions } from '../actions';


const INITIAL_STATE: AuthStore = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false
};


export default (state = INITIAL_STATE, action: HuskyActions) => {
    console.log(action);

    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' }
        // case LOGIN_USER_SUCCESS:
        //     return { ...state,
        //         user: action.payload,
        //         error: '',
        //         loading: false,
        //         email: '',
        //         password: ''
        //     };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case LOGIN_USER_FAIL:
            return { ...state, error: 'Authentication Failed.', password: '', loading: false }
        default:
            return state;
    }
};
