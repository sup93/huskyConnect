// wire toegether all of a reducers with combined reducers call
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ClassReducer from './ClassReducer';
import ClassListReducer from './ClassListReducer';

export default combineReducers({
    auth: AuthReducer,
    classForm: ClassReducer,
    classList: ClassListReducer
});