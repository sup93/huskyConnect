// wire toegether all of a reducers with combined reducers call
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ClassReducer from './ClassReducer';
import ClassListReducer from './ClassListReducer';
import MessageReducer from './MessageReducer';
import NewMessageReducer from './NewMessageReducer';

export default combineReducers({
    auth: AuthReducer,
    classForm: ClassReducer,
    classList: ClassListReducer,
    messageList: MessageReducer,
    input: NewMessageReducer
});