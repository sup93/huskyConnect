import React, { Component } from 'react';
import { ListView, StyleSheet, ListViewDataSource } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { conversationFetch } from '../actions';
import ConversationListItem from './ConversationListItem';

type Props = {
    conversationFetch: () => void,
    conversationList: any
}
export interface MessagesState {
    dataSource: ListViewDataSource,
}

class Conversations extends Component<Props, MessagesState> {
    constructor(props: Props) {
        props.conversationFetch();
        console.log("in constructor");
        super(props);
        console.log("in super");
        console.log(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (old, oldnew) => old !== oldnew
        });
        console.log("ds");
        this.state = {
            dataSource: ds.cloneWithRows(props.conversationList)
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        console.log('in component will receive props')
        const ds = new ListView.DataSource({
            rowHasChanged: (old, oldnew) => old !== oldnew
        });
        console.log(nextProps);
        this.setState({
            dataSource: ds.cloneWithRows(nextProps.conversationList)
        });
    }

    private renderRow(conversation: any): JSX.Element {
        console.log('in renderRow of conversations');
        return <ConversationListItem conversation={conversation} />;
    }

    render(): JSX.Element {
        console.log('rendering view')
        return (
            <ListView
                enableEmptySections
                dataSource={this.state.dataSource}
                renderRow={(conversation: any) => this.renderRow(conversation)}
            />
        )
    }
}

type State = 
{
    conversationList: any
}

//map will pull out classList
const mapStateToProps = ({ conversationList }: State) => {
    const conversations: any = _.map(conversationList, (val) => {
        return { ...val };
    });
    return { conversationList: conversations };
}

//connect helper
export default connect(mapStateToProps,{ conversationFetch })(Conversations as any);

const styles = StyleSheet.create({
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
});
