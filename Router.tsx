// purpose of this file is to have one signle location where i can tweak
// all the different components that a user can navigate to inside of out app
import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './src/components/LoginForm';

const RouterComponent = () => {
    console.log("got here");
    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key= "auth">
                    <Scene key="login" component={LoginForm} title="Please Login" initial />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;