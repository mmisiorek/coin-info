import * as actions from '../constants/actions';
import * as miningTimeTypes from '../constants/miningTimeTypes';

const miningTimes = (state = [], action) => {
    switch (action.type) {
    case actions.ADD_MINING_TIME_BY_BLOCKS_ACTION:
        return [
            ...state,
            {
                type: miningTimeTypes.BY_BLOCKS,
                numberOfBlocks: action.numberOfBlocks,
                time: action.time,
                average: action.average,
            },
        ];
    case actions.ADD_MINING_TIME_BY_TIME_ACTION:
        return [
            ...state,
            {
                type: miningTimeTypes.BY_TIME,
                minutes: action.minutes,
                time: action.time,
                average: action.average,
            },
        ];
    case actions.API_ERROR_ACTION:
        return [
            ...state,
            {
                type: miningTimeTypes.API_ERROR,
                message: action.message,
            },
        ];
    default:
        return state;
    }
};

export default miningTimes;
