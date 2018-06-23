import { 
    LoginUserAction,
    EmailChangedAction,
    LoginUserFailAction,
    LoginUserSuccessAction,
    PasswordChangedAction
 } from './husky-actions';

export type AuthActions = 
 LoginUserAction |
 EmailChangedAction |
 LoginUserFailAction |
 LoginUserSuccessAction |
 PasswordChangedAction;
