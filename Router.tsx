// purpose of this file is to have one signle location where i can tweak
// all the different components that a user can navigate to inside of out app
import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key= "auth">
                    <Scene key="login" component={LoginForm} title="Please Login" initial />
                </Scene>

                <Scene key="main">
                    <Scene
                        //callback function for rightTitle
                        onRight={() => Actions.employeeCreate() }
                        rightTitle="Add"
                        key="employeeList"
                        component={EmployeeList}
                        title="Employees"
                    />
                    <Scene key="employeeCreate" component={EmployeeCreate} title="Create Employee" />
                    <Scene key="employeeEdit" component={EmployeeEdit} title="Edit Employee" />
                </Scene>    
            </Scene>
        </Router>
    );
};

export default RouterComponent;