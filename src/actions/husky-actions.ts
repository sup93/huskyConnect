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
export type MessageFetchType = 'message_fetch';
export type MessageFetchSuccessType = 'message_fetch_success';
export type SendMessageType = 'send_message';

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
export const MESSAGE_FETCH: MessageFetchType = 'message_fetch';
export const MESSAGE_FETCH_SUCCESS: MessageFetchSuccessType = 'message_fetch_success';
export const SEND_MESSAGE: SendMessageType = 'send_message';

// 3. For each action, export the interface of the action describing the type and the payload.
//        - Also extend BaseAction class to ensure your types work.
// name of action, under type must be match with payload(result, means return value). this fcn is under BaseAction
// interface means contract between reducer and action. means what the reducer expect from action.
//export this function so I can use this from the other files

export interface SendMessageAction extends BaseAction {
    type: SendMessageType
}

export interface MessageFetchSuccessAction extends BaseAction {
    type: MessageFetchSuccessType,
    payload: any
}
export interface MessageFetchAction extends BaseAction {
    type: MessageFetchType
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

export const messageFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch: Dispatch) => {
        // @ts-ignore
        firebase.database().ref(`/users/${currentUser.uid}/message`)
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
                dispatch({ type: MESSAGE_FETCH_SUCCESS, payload: snapshot.val() })
            });
    };
}

export const sendMessage = ({ email, message}: any) => {
    const { currentUser } = firebase.auth();
    return (dispatch: Dispatch) => {
        dispatch({ type: SEND_MESSAGE });
        const ref = firebase.database().ref(`/emails/${email.split('.')[0]}`)
        ref.on('value', function(snapshot) {
            // @ts-ignore
            if (snapshot.exists()) {
                firebase.database().ref(`/conversations/${1}`)
                    // @ts-ignore
                    .set({messageId: 0, time: new Date(), sender: currentUser.email, message: message })
            } else {
                alert("not exist")
            }
        })

    }
}
