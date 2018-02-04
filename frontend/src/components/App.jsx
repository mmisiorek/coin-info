import { Component } from 'react';
import AddMiningTimeByBlocksFormContainer from '../containers/AddMiningTimeByBlocksFormContainer';
import AddMiningTimeByTimeFormContainer from '../containers/AddMiningTimeByTimeFormContainer';
import MiningTimesListContainer from '../containers/MiningTimesListContainer';
import '../styles/App.css';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <MiningTimesListContainer />
                <AddMiningTimeByTimeFormContainer />
                <AddMiningTimeByBlocksFormContainer />
            </div>
        );
    }
}
