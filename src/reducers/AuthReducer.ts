
import { 
    EmailChangedType,
    PasswordChangedType,
    LoginUserSuccessType,
    LoginUserFailType,
    LoginUserType,

} from '../actions/husky-actions';
import { AuthStore } from '../components/common/models/auth-store';
import { AuthActions } from '../actions';

const INITIAL_STATE: AuthStore = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false
};

export const authReducer = (state = INITIAL_STATE, action: AuthActions) => {
    // console.log(action);

    switch (action.type) {
        case EmailChangedType:
            return { ...state, email: action.payload };
        case PasswordChangedType:
            return { ...state, password: action.payload };
        case LoginUserType:
            return { ...state, loading: true, error: '' }
        // case LOGIN_USER_SUCCESS:
        //     return { ...state,
        //         user: action.payload,
        //         error: '',
        //         loading: false,
        //         email: '',
        //         password: ''
        //     };
        case LoginUserSuccessType:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case LoginUserFailType:
            return { ...state, error: 'Authentication Failed.', password: '', loading: false }
        default:
            return state;
    }
};