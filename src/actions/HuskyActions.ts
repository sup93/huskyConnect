// This file is just used for combining all of the types of actions we have into one type, which is called HuskyActions.
// We can then use this type in our reducer to represent all of those types under HuskyActions
import { 
    LoginUserAction,
    EmailChangedAction,
    LoginUserFailAction,
    LoginUserSuccessAction,
    PasswordChangedAction,
    ClassUpdateAction,
    ClassFormSaveAction
 } from './husky-actions';

export type HuskyActions = 
// Authentication Actions
 LoginUserAction |
 EmailChangedAction |
 LoginUserFailAction |
 LoginUserSuccessAction |
 PasswordChangedAction |
 // Class Form Actions
 ClassUpdateAction |
 ClassFormSaveAction;
