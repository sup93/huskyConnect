import React, { Component } from 'react';
import { ListView, StyleSheet, ListViewDataSource } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import ListItem from './ListItem';
import { classFetch } from '../actions';

type Props = {
    //could be {} inside loginUser
    // supportedActions: ClassesSupportedActions[],
    classFetch: () => void,
    classList: any
}

// export const enum ClassesSupportedActions {
//     editClass = 'editClass',
// }

export interface ClassesState {
    dataSource: ListViewDataSource,
}

class Classes extends Component<Props, ClassesState> {
    constructor(props: Props) {
        props.classFetch();
        console.log("in constructor");
        super(props);
        console.log("in super");
        console.log(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (old, oldnew) => old !== oldnew
        });
        console.log("ds");
        //copy employee data into datasource
        //cloewith'rows' because listview is by rows
        this.state = {
            dataSource: ds.cloneWithRows(props.classList)
        };
    }

    // componentWillMount() {
    //     console.log('in component will mount');
    //     this.props.classesFetch();
    //     this.createDataSource(this.props);
        
    // }

    componentWillReceiveProps(nextProps: Props) {
        // nextProps are the next set of props that this component
        // will be rendered with
        // this.props is still the old set of props
        console.log('in component will receive props')
        const ds = new ListView.DataSource({
            rowHasChanged: (old, oldnew) => old !== oldnew
        });
        //copy employee data into datasource
        //cloewith'rows' because listview is by rows
        console.log(nextProps);
        this.setState({
            dataSource: ds.cloneWithRows(nextProps.classList)
        });
    }
    // { employees } == props.employees
    // createDataSource(props) { 
    //    this.dataSource = ds.cloneWithRows(props.employees);
    //}
    // listview is UI component, datasource is from the source
    // react rendering component. rowhaschanged basically compare
    //before and after data, and it's difference then it tells 'changed'
    // createDataSource({ classes }) {
    //     const ds = new ListView.DataSource({
    //         rowHasChanged: (old, oldnew) => old !== oldnew
    //     });
    //     //copy employee data into datasource
    //     //cloewith'rows' because listview is by rows
    //     this.dataSource = ds.cloneWithRows(classes);
    // }

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
    classList: any
}

//map will pull out classList
const mapStateToProps = ({ classList }: State) => {
    // Convert each datasnapshot item into an object in the array
    // use ...val to pull the items out of val, so instead of {val: {tcomm: blahblah, tmath: blahblah}}
    // we will have {tcomm:blahblah, tmath:blahblah} directly
    const classes: any = _.map(classList, (val) => {
        return { ...val };
    });
    return { classList: classes };
} 

//connect helper
export default connect(mapStateToProps,{ classFetch })(Classes as any);

const styles = StyleSheet.create({
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
});
