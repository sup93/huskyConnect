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
export type ClassUpdateType = 'class_update';
export type ClassFormSaveType = 'class_form_save';

// 2. Define the actions with a type because it's typescript (action type: from the previous 1)
//only one time exist means cannot use multiple time. unique.
export const EMAIL_CHANGED: EmailChangedType = 'email_changed';
export const PASSWORD_CHANGED: PasswordChangedType = 'password_changed';
export const LOGIN_USER_SUCCESS: LoginUserSuccessType = 'login_user_success';
export const LOGIN_USER_FAIL: LoginUserFailType = 'login_user_fail'
export const LOGIN_USER: LoginUserType = 'login_user';
export const CLASS_UPDATE: ClassUpdateType = 'class_update';
export const CLASS_FORM_SAVE: ClassFormSaveType = 'class_form_save';

// 3. For each action, export the interface of the action describing the type and the payload.
//        - Also extend BaseAction class to ensure your types work.
// name of action, under type must be match with payload(result, means return value). this fcn is under BaseAction
// interface means contract between reducer and action. means what the reducer expect from action.
//export this function so I can use this from the other files
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

type ClassUpdatePayloadType = {
    prop: string,
    value: any
}
export interface ClassUpdateAction extends BaseAction {
   type: ClassUpdateType,
   payload: ClassUpdatePayloadType
}
export interface ClassFormSaveAction extends BaseAction {
   type: ClassFormSaveType
}

// 4. Define what the action should do
//    a. If other parts of the app will need to know about this state change, then need to use dispatch
//          like loginUser
//    b. If other parts of app don't need to know about this state change, then just return 
//          like email changed
export function classUpdate(classPayload: ClassUpdatePayloadType): ClassUpdateAction {
    console.log("in action");
    console.log(classPayload);
    return {
        type: CLASS_UPDATE,
        payload: classPayload
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
            .then(user => loginUserSuccess(dispatch, user))
            //when something fails
            .catch(() => {
                //needs to create account
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => loginUserSuccess(dispatch, user))
                    .catch(() => loginUserFail(dispatch));
            });
    };
};

export const classFormSave = ({classcode, classname, profname, time, credits, subject }: ClassStore) => {
    return (dispatch: Dispatch) => {
        dispatch({ type: CLASS_FORM_SAVE });
        console.log('Saving the following: ' + classcode + classname + profname + time + credits + subject);
        // TODO: Add code to save to firebase this person's class

    // something like the following, probably just change /employees/ to something else
    //     firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
    //         .set({ name, phone, shift })
    //         .then(() => {
    //             console.log('saved!')
    //             dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
    //             //once edit changes, want to go back to emp list
    //             Actions.pop();
    //         });
        Actions.pop();
    }
};

const loginUserFail = (dispatch: Dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch: Dispatch, user: firebase.auth.UserCredential) => {
    console.log("loginusersuccess");
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    Actions.main();
};