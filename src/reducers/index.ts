// wire toegether all of a reducers with combined reducers call
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ClassReducer from './ClassReducer';

export default combineReducers({
    auth: AuthReducer,
    classForm: ClassReducer
});