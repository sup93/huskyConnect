// wire toegether all of a reducers with combined reducers call
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ClassReducer from './ClassReducer';
import ClassListReducer from './ClassListReducer';
import ConversationReducer from './ConversationReducer';
import NewMessageReducer from './NewMessageReducer';
import ConversationThreadReducer from './ConversationThreadReducer';

export default combineReducers({
    auth: AuthReducer,
    classForm: ClassReducer,
    classList: ClassListReducer,
    conversationList: ConversationReducer,
    input: NewMessageReducer,
    messagesInfo: ConversationThreadReducer
});