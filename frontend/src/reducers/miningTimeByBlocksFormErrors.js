import * as actions from '../constants/actions';

const miningTimeByBlocksFormErrors = (state = [], action) => {
    switch (action.type) {
    case actions.ADD_MINING_TIME_BY_BLOCKS_FORM_ERROR_ACTION:
        return action.errors;
    case actions.ADD_MINING_TIME_BY_BLOCKS_ACTION:
        return [];
    default:
        return state;
    }
};

export default miningTimeByBlocksFormErrors;
