import * as actions from '../constants/actions';

const miningTimeByTimeFormErrors = (state = [], action) => {
    switch (action.type) {
    case actions.ADD_MINING_TIME_BY_TIME_FORM_ERROR_ACTION:
        return action.errors;
    case actions.ADD_MINING_TIME_BY_TIME_ACTION:
        return [];
    default:
        return state;
    }
};

export default miningTimeByTimeFormErrors;
