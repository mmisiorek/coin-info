import * as actions from '../constants/actions';

export const addMiningTimeByBlocks = (numberOfBlocks, time, average) => ({
    type: actions.ADD_MINING_TIME_BY_BLOCKS_ACTION,
    numberOfBlocks,
    time,
    average,
});

export const addMiningTimeByTime = (minutes, time, average) => ({
    type: actions.ADD_MINING_TIME_BY_TIME_ACTION,
    minutes,
    time,
    average,
});

export const addAPIError = message => ({
    type: actions.API_ERROR_ACTION,
    message,
});

export const setMiningTimeByTimeFormError = errors => ({
    type: actions.ADD_MINING_TIME_BY_TIME_FORM_ERROR_ACTION,
    errors,
});

export const setMiningTimeByBlocksFormError = errors => ({
    type: actions.ADD_MINING_TIME_BY_BLOCKS_FORM_ERROR_ACTION,
    errors,
});
