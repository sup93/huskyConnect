import { BaseAction } from '../components/common/actions/base-action';
import firebase from 'firebase';
import { Dispatch } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Login } from '../components/common/models/login';
import { ClassStore } from '../components/common/models/class-store';

// 1. Define the type for the actions that we will create from this file
// name = string. string was keyword but we can create own keyword. name of type: type of keyword I created
export type EmailChangedType = 'email_changed';
export type PasswordChangedType = 'password_changed';
export type LoginUserSuccessType = 'login_user_success';
export type LoginUserFailType = 'login_user_fail'
export type LoginUserType = 'login_user';
export type InputUpdateType = 'input_update';
export type ClassFormSaveType = 'class_form_save';
export type ClassFormSaveSuccessType = 'class_form_save_success';
export type ClassFetchType = 'class_fetch';
export type ClassFetchSuccessType = 'class_fetch_success';
export type ConversationFetchType = 'conversation_fetch';
export type ConversationFetchSuccessType = 'conversation_fetch_success';
export type SendMessageType = 'send_message';
export type MessagesFetchType = 'messages_fetch';
export type MessagesFetchSuccessType = 'messages_fetch_success';

// 2. Define the actions with a type because it's typescript (action type: from the previous 1)
//only one time exist means cannot use multiple time. unique.
export const EMAIL_CHANGED: EmailChangedType = 'email_changed';
export const PASSWORD_CHANGED: PasswordChangedType = 'password_changed';
export const LOGIN_USER_SUCCESS: LoginUserSuccessType = 'login_user_success';
export const LOGIN_USER_FAIL: LoginUserFailType = 'login_user_fail'
export const LOGIN_USER: LoginUserType = 'login_user';
export const INPUT_UPDATE: InputUpdateType = 'input_update';
export const CLASS_FORM_SAVE: ClassFormSaveType = 'class_form_save';
export const CLASS_FORM_SAVE_SUCCESS: ClassFormSaveSuccessType = 'class_form_save_success';
export const CLASS_FETCH: ClassFetchType = 'class_fetch';
export const CLASS_FETCH_SUCCESS: ClassFetchSuccessType = 'class_fetch_success';
export const CONVERSATION_FETCH: ConversationFetchType = 'conversation_fetch';
export const CONVERSATION_FETCH_SUCCESS: ConversationFetchSuccessType = 'conversation_fetch_success';
export const SEND_MESSAGE: SendMessageType = 'send_message';
export const MESSAGES_FETCH: MessagesFetchType = 'messages_fetch';
export const MESSAGES_FETCH_SUCCESS: MessagesFetchSuccessType = 'messages_fetch_success';

// 3. For each action, export the interface of the action describing the type and the payload.
//        - Also extend BaseAction class to ensure your types work.
// name of action, under type must be match with payload(result, means return value). this fcn is under BaseAction
// interface means contract between reducer and action. means what the reducer expect from action.
//export this function so I can use this from the other files

export interface MessageFetchAction extends BaseAction {
    type: MessagesFetchType
}

export interface MessageFetchSuccessAction extends BaseAction {
    type: MessagesFetchSuccessType,
    payload: any
}
export interface SendMessageAction extends BaseAction {
    type: SendMessageType
}

export interface ConversationFetchSuccessAction extends BaseAction {
    type: ConversationFetchSuccessType,
    payload: any
}
export interface ConversationFetchAction extends BaseAction {
    type: ConversationFetchType
}

// getting class list. after ClassFetchAction
export interface ClassFetchSuccessAction extends BaseAction {
    type: ClassFetchSuccessType,
    payload: any
}

// type ClassFetchPayloadType = {
//     payload: firebase.database.DataSnapshot
// }

// init call to get a class
export interface ClassFetchAction extends BaseAction {
    type: ClassFetchType
    // payload: ClassFetchPayloadType
}
export interface ClassFormSaveSuccessAction extends BaseAction {
    type: ClassFormSaveSuccessType
}
export interface EmailChangedAction extends BaseAction {
    type: EmailChangedType,
    payload: string
}

export interface PasswordChangedAction extends BaseAction {
    type: PasswordChangedType,
    payload: string
}

export interface LoginUserSuccessAction extends BaseAction {
    type: LoginUserSuccessType,
    payload: firebase.auth.UserCredential
}

export interface LoginUserFailAction extends BaseAction {
    type: LoginUserFailType
}
export interface LoginUserAction extends BaseAction {
    type: LoginUserType
}

type InputUpdatePayloadType = {
    prop: string,
    value: any
}

export interface InputUpdateAction extends BaseAction {
   type: InputUpdateType,
   payload: InputUpdatePayloadType
}

export interface ClassFormSaveAction extends BaseAction {
   type: ClassFormSaveType
}

// 4. Define what the action should do
//    a. If other parts of the app will need to know about this state change, then need to use dispatch
//          like loginUser
//    b. If other parts of app don't need to know about this state change, then just return 
//          like email changed
export function inputUpdate(inputPayload: InputUpdatePayloadType): InputUpdateAction {
    console.log("in action");
    return {
        type: INPUT_UPDATE,
        payload: inputPayload
    };
};

export function emailChanged(text: string): EmailChangedAction {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export function passwordChanged(text: string): PasswordChangedAction {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

//email and password needs for login from user.
//dispatch means run this reducer. 
export const loginUser = ({ email, password }: Login) => {
    //dispatch (I can name it whatever I want but easy to see): Dispatch (from redux)
    return (dispatch: Dispatch) => {
        //dispatch function going to run the type of action called Login-user
        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email, password)
            //pass dispatch so loginUserSuccess can re-run dispatch with user
            .then(user => loginUserSuccess(dispatch, user, email))
            //when something fails
            .catch(() => {
                //needs to create account
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => loginUserSuccess(dispatch, user, email))
                    .catch(() => loginUserFail(dispatch));
            });
    };
};


const loginUserFail = (dispatch: Dispatch) => {
    console.log("LOGIN USER FAIL IN ACTION");
    dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch: Dispatch, user: firebase.auth.UserCredential, email: string) => {
    console.log("got here in login user success");
    const { currentUser } = firebase.auth();
    
    // @ts-ignore
    const { uid } = currentUser;
    // same as: const uid = currentUser.uid;

    // store email to DB
    dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
    firebase.database().ref(`/emails/${email.split('.')[0]}`)
        .set({ uid })
        .then(() => {
            console.log('saved email');
            Actions.main();
        })
        .catch(() => {
            console.log('failed to save email');
        });
    console.log("nothing");
};

export const messagesFetch = (conversationId: string) => {
    console.log('message fetch');
    return (dispatch: Dispatch) => {
        firebase.database().ref(`/conversations/${conversationId}/messages`)
            .on('value', snapshot => {
                // @ts-ignore
                console.log(snapshot.val())
                // @ts-ignore
                dispatch({ type: MESSAGES_FETCH_SUCCESS, payload: snapshot.val() })
            });
    };
};

// @ts-ignore <- tells typescript ignors error or warning the next line.
export const classFetch = () => {
    console.log('in class fetch');
    const { currentUser } = firebase.auth();

    return (dispatch: Dispatch) => {
        // @ts-ignore
        firebase.database().ref(`/users/${currentUser.uid}/class`)
            //snapshot is not an actual data, it's obj that describes the data
            // that we could get access to
            // .on is watch for any new value or event
            // snapshot pointed to updated value
            .on('value', snapshot => {
                //dispatch means tell someone to do something, start. fetch: get
                //payload is
                console.log('in class fetch returnvalue');
                console.log(snapshot);
                // @ts-ignore
                console.log(snapshot.val());
                // @ts-ignore
                dispatch({ type: CLASS_FETCH_SUCCESS, payload: snapshot.val() })
            });
    };
};

export const classFormSave = ({classcode, classname, profname, time, credits, subject }: ClassStore) => {
    const { currentUser } = firebase.auth();

    return (dispatch: Dispatch) => {
        dispatch({ type: CLASS_FORM_SAVE });
        console.log('Saving the following: ' + classcode + classname + profname + time + credits + subject);
        // TODO: Add code to save to firebase this person's class

    // something like the following, probably just change /employees/ to something else
    // @ts-ignore
        firebase.database().ref(`/users/${currentUser.uid}/class/${classcode}`)
            .set({ classcode, classname, profname, time, credits, subject })
            .then(() => {
                console.log('saved!')
                dispatch({ type: CLASS_FORM_SAVE_SUCCESS });
                //once edit changes, want to go back to emp list
                Actions.pop();
            });
    }
};

export const conversationFetch = () => {
    const { currentUser } = firebase.auth();
    console.log('261')

    return (dispatch: Dispatch) => {
        // @ts-ignore
        firebase.database().ref(`/users/${currentUser.uid}/conversations`)
            //snapshot is not an actual data, it's obj that describes the data
            // that we could get access to
            // .on is watch for any new value or event
            // snapshot pointed to updated value
            .on('value', snapshot => {
                //dispatch means tell someone to do something, start. fetch: get
                //payload is
                console.log('in message fetch returnvalue');
                console.log(snapshot);
                // @ts-ignore
                console.log(snapshot.val());
                // @ts-ignore
                dispatch({ type: CONVERSATION_FETCH_SUCCESS, payload: snapshot.val() })
            });
    };
}

// 2. after user clicked sendMessage, code comes here
//    this will store data in firebase
export const sendMessage = ({ conversationId, message }: any) => {
    const { currentUser } = firebase.auth();
    console.log("in send msg action");
    console.log(conversationId, message);
    return (dispatch: Dispatch) => {
        const ref = firebase.database().ref(`/conversations/${conversationId}/participants`);
        let lastMsgId = 0;
        console.log("292");
        ref.once('value', function(snapshot) {
            const participants = snapshot.val();

            console.log("participants");
            console.log(participants);
            participants.forEach((p: string, idx: number) => {
                console.log("SAVING FOR REF");
                const chatReceiverRef = firebase.database().ref(`/users/${p}/conversations/${conversationId}`);
                chatReceiverRef.once('value', function(chatsnapshot) {
                    const data = chatsnapshot.val();
                    lastMsgId = ++data.lastMsgId;
                    data.lastMessage = message;
                    chatReceiverRef.set(data)

                    if (idx == participants.length - 1) {
                        console.log("saving and dispatch");
                        // 3. after storing data in firebase, it will call the SEND_MESSAGE reducer to update the state 
                        // with the message we just sent
                        // @ts-ignore
                        var messagesRef = firebase.database().ref(`/conversations/${conversationId}/messages`);
                        var newMessageChild = messagesRef.push();
                        const now = new Date();
                        // @ts-ignore
                        newMessageChild.set({messageId: lastMsgId, time: now, sender: currentUser.email, message: message });
                        // @ts-ignore
                        dispatch({ type: SEND_MESSAGE });
                    }
                });
            });
        });
    }
}

export const sendNewMessage = ({ email, message}: any) => {
    const { currentUser } = firebase.auth();
    return (dispatch: Dispatch) => {
        dispatch({ type: SEND_MESSAGE });
        const ref = firebase.database().ref(`/emails/${email.split('.')[0]}`);
        ref.once('value', function(snapshot) {
            // @ts-ignore
            if (snapshot.exists()) {
                const receiverInfo = snapshot.val().uid;
                console.log("receiver info");
                console.log(receiverInfo);
                // @ts-ignore
                const ids = [currentUser.uid, receiverInfo].sort()
                const chatId = ids[0].substring(0,5)+ ids[1].substring(0,5)
                // @ts-ignore
                const chatSenderRef = firebase.database().ref(`/users/${currentUser.uid}/conversations/${chatId}`);
                const chatReceiverRef = firebase.database().ref(`/users/${receiverInfo}/conversations/${chatId}`);
                let lastMsgId = 0;
                chatSenderRef.once('value', function(chatsnapshot) {
                    if (chatsnapshot.exists()) {
                        console.log("chat exists");
                        const data = chatsnapshot.val();
                        lastMsgId = ++data.lastMsgId;
                        data.lastMessage = message;
                        chatSenderRef.set(data);
                        chatReceiverRef.set(data)
                        // Chat existed so just append
                    } else {
                        console.log("re-create chat");
                        chatSenderRef.set({conversationId: chatId, users: email, lastMsgId: 0, lastMessage: message});
                        // @ts-ignore
                        chatReceiverRef.set({conversationId: chatId, user: currentUser.email, lastMsgId:0, lastMessage: message})
                        // Chat did not exist yet, so need to create it
                        
                    }
                    var cRef = firebase.database().ref(`/conversations/${chatId}/participants`);
                    // @ts-ignore
                    cRef.once('value', function(snap) {
                        if (!snap.exists()) {
                            //@ts-ignore
                            cRef.set([currentUser.uid, receiverInfo])
                        }
                    });
                    var messagesRef = firebase.database().ref(`/conversations/${chatId}/messages`);
                    var newMessageChild = messagesRef.push();
                    // @ts-ignore
                    newMessageChild.set({messageId: lastMsgId, time: new Date(), sender: currentUser.email, message: message })
                    Actions.conversationThread({ conversationId: chatId });
                });
            } else {
                alert("not exist")
            }
        })

    }
}
