// purpose of this file is to have one signle location where i can tweak
// all the different components that a user can navigate to inside of out app
import React from 'react';
import { Scene, Tabs, Router, Actions } from 'react-native-router-flux';
import LoginForm from './src/components/LoginForm';
import Homepage from './src/components/Homepage';
import Classes from './src/components/Classes';
import { TabIcon } from './src/components/common/TabIcon';
import ClassForm from './src/components/ClassForm';

const RouterComponent = () => {
    console.log("got here");
    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key= "auth">
                    <Scene key="login" component={LoginForm} title="Please Login" initial />
                </Scene>
                
                <Scene key="main" >
                
                    <Tabs key="tabbar" >
                        <Scene 
                            key = "thome"
                            component={Homepage}
                            title="Home"
                            icon={TabIcon}
                        />
                        <Scene
                            key = "tclass"
                            component={Classes}
                            title="Classes"
                            icon={TabIcon}
                            onRight={() => Actions.classForm() }
                            rightTitle="Add Class"
                        />
                    </Tabs>
                    <Scene
                        key = "classForm"
                        component={ClassForm}
                        title="Class Form"
                    />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;