import React, { Component } from 'react';
import { ListView, StyleSheet, ListViewDataSource } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import ListItem from './ListItem';
import { messageFetch } from '../actions';

type Props = {
    messageFetch: () => void,
    messageList: any
}
export interface MessagesState {
    dataSource: ListViewDataSource,
}

class Messages extends Component<Props, MessagesState> {
    constructor(props: Props) {
        props.messageFetch();
        console.log("in constructor");
        super(props);
        console.log("in super");
        console.log(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (old, oldnew) => old !== oldnew
        });
        console.log("ds");
        this.state = {
            dataSource: ds.cloneWithRows(props.messageList)
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        console.log('in component will receive props')
        const ds = new ListView.DataSource({
            rowHasChanged: (old, oldnew) => old !== oldnew
        });
        console.log(nextProps);
        this.setState({
            dataSource: ds.cloneWithRows(nextProps.messageList)
        });
    }

    private renderRow(classObject: any): JSX.Element {
        console.log('in renderRow of classes');
        return <ListItem classObject={classObject} />;
    }

    render(): JSX.Element {
        console.log('rendering view')
        return (
            <ListView
                enableEmptySections
                dataSource={this.state.dataSource}
                renderRow={(classObj: any) => this.renderRow(classObj)}
            />
        )
    }
}

type State = 
{
    messageList: any
}

//map will pull out classList
const mapStateToProps = ({ messageList }: State) => {
    const messages: any = _.map(messageList, (val) => {
        return { ...val };
    });
    return { messageList: messages };
}

//connect helper
export default connect(mapStateToProps,{ messageFetch })(Messages as any);

const styles = StyleSheet.create({
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
});
