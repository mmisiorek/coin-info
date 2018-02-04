import { combineReducers } from 'redux';
import miningTimes from './miningTimes';
import miningTimeByBlocksFormErrors from './miningTimeByBlocksFormErrors';
import miningTimeByTimeFormErrors from './miningTimeByTimeFormErrors';

const coinInfoApp = combineReducers({
    miningTimes,
    miningTimeByBlocksFormErrors,
    miningTimeByTimeFormErrors,
});

export default coinInfoApp;
