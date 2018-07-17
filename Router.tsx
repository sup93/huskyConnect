// purpose of this file is to have one signle location where i can tweak
// all the different components that a user can navigate to inside of out app
import React from 'react';
import { Scene, Tabs, Router, Actions } from 'react-native-router-flux';
import LoginForm from './src/components/LoginForm';
import Homepage from './src/components/Homepage';
import Classes from './src/components/Classes';
import { TabIcon } from './src/components/common/TabIcon';
import ClassForm from './src/components/ClassForm';
import CourseBoard from './src/components/CourseBoard';
import Messages from './src/components/Messages';
import NewMessage from './src/components/NewMessage';

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
                        <Scene
                            key="tmessage"
                            component={Messages}
                            title="Messages"
                            icon={TabIcon}
                            onRight={() => Actions.newMessage() }
                            rightTitle="New Message"
                        />
                    </Tabs>
                    <Scene
                        key = "classForm"
                        component={ClassForm}
                        title="Class Form"
                    />
                    <Scene
                        key="courseBoard"
                        component={CourseBoard}
                        title="Course Board"
                    />
                    <Scene
                        key="newMessage"
                        component={NewMessage}
                        title="New Message"
                    />

                </Scene>
            </Scene>
        </Router>
    );
};  

export default RouterComponent;