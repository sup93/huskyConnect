// wire toegether all of a reducers with combined reducers call
import { combineReducers } from 'redux';
import { authReducer } from './AuthReducer';

export default combineReducers({
    auth: authReducer
});