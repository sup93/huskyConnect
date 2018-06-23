import { BaseAction, ActionHandler, VoidAction } from '../components/common/actions/base-action';
import firebase, { User } from 'firebase';
import { Dispatch } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Login } from '../components/common/models/login';

export type EMAIL_CHANGED = 'email_changed';
export type PASSWORD_CHANGED = 'password_changed';
export type LOGIN_USER_SUCCESS = 'login_user_success';
export type LOGIN_USER_FAIL = 'login_user_fail'
export type LOGIN_USER = 'login_user';

export const EmailChangedType: EMAIL_CHANGED = 'email_changed';
export const PasswordChangedType: PASSWORD_CHANGED = 'password_changed';
export const LoginUserSuccessType: LOGIN_USER_SUCCESS = 'login_user_success';
export const LoginUserFailType: LOGIN_USER_FAIL = 'login_user_fail'
export const LoginUserType: LOGIN_USER = 'login_user';

export interface EmailChangedAction extends BaseAction {
    type: EMAIL_CHANGED,
    payload: string
}

export interface PasswordChangedAction extends BaseAction {
    type: PASSWORD_CHANGED,
    payload: string
}

export interface LoginUserSuccessAction extends BaseAction {
    type: LOGIN_USER_SUCCESS,
    payload: User
}

export interface LoginUserFailAction extends BaseAction {
    type: LOGIN_USER_FAIL
}

export interface LoginUserAction extends BaseAction {
    type: LOGIN_USER
}

export function emailChanged(text: string): EmailChangedAction {
    return {
        type: EmailChangedType,
        payload: text
    };
};

export function passwordChanged(text: string): PasswordChangedAction {
    return {
        type: PasswordChangedType,
        payload: text
    };
};

export const loginUser = ({ email, password }: Login) => {
    return (dispatch: Dispatch) => {
        dispatch({ type: LoginUserType });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => loginUserSuccess(dispatch, user))
                    .catch(() => loginUserFail(dispatch));
            });
    };
};

const loginUserFail = (dispatch: Dispatch) => {
    dispatch({ type: LoginUserFailType });
};

const loginUserSuccess = (dispatch: Dispatch, user: firebase.auth.UserCredential) => {
    dispatch({
        type: LoginUserSuccessType,
        payload: user
    });

    Actions.main();
};