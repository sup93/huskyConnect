import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATE,
    EMPLOYEES_FETCH_SUCCESS,
    EMPLOYEE_SAVE_SUCCESS,
    EMPLOYEE_DELETE_SUCCESS
} from './types';

export const employeeUpdate = ({ prop, value }) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
    };
};


export const employeeCreate = ({ name, phone, shift }) => {
    // get access to firebase which location where I store the data
    // make a reference to user's userid employee-path to JASON data store
    const { currentUser } = firebase.auth()
    return (dispatch) => {
        //create new record in firebase
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
        //push creates new record
        .push({ name, phone, shift })
        // Actions.pop() prevents this double-scene stacking behavior.
        // which means kick out from the orginal page then show up employee page instead 
        .then(() => {
            dispatch({ type: EMPLOYEE_CREATE });
            Actions.pop();
        });
    };
};

//connect firebase using currentUser value, if something 
// dispatch : run code
// firebase connect using currentUser id, if something changes,
// then run employee-fetch-success action, with snapshot updated value
//fetch means get. fetch means getting employeelist-
export const employeesFetch = () => {
    console.log('in employees fetch');
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            //snapshot is not an actual data, it's obj that describes the data
            // that we could get access to
            // .on is watch for any new value or event
            // snapshot pointed to updated value
            .on('value', snapshot => {
                //dispatch means tell someone to do something, start. fetch: get
                //payload is
                console.log(snapshot)
                console.log(snapshot.val())
                dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() })
            });
    };
};

//when you go to firebase, under 'employees' has unique strs = uid
export const employeeSave = ({ name, phone, shift, uid }) => {
    const { currentUser } = firebase.auth();

    //dispatch method as input. w
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .set({ name, phone, shift })
            .then(() => {
                console.log('saved!')
                dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
                //once edit changes, want to go back to emp list
                Actions.pop();
            });
    };
};

export const employeeDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();
    //dispatch means run one of function in connected reducer
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
        //using 'remove' keyword after connect firebase DB
            .remove()
            .then(() => {
                dispatch({ type: EMPLOYEE_DELETE_SUCCESS})
                Actions.pop();
            });
            // no need to use dispatch from this fcn becuz when we make a change to our emp list,
            // emp list runs employeesFetch action, that fetch function already included dispatch
            // so it will update state of employee from that function

            //edit:
            //used dispatch to make a input reset from 'create new account'
    };
};