import * as actions from '../../src/actions';
import * as miningTimeTypes from '../../src/constants/miningTimeTypes';
import reducer from '../../src/reducers/miningTimes';

describe('miningTimes reducer', () => {

    const initialState = [{
        test: 1,
    }];

    it('should add mining time when add by blocks mining time', () => {
        const newState = reducer(initialState, actions.addMiningTimeByBlocks(10, 20, 30));
        expect(newState).toEqual([
            {
                test: 1,
            },
            {
                type: miningTimeTypes.BY_BLOCKS,
                numberOfBlocks: 10,
                time: 20,
                average: 30,
            },
        ]);
    });

    it('should add mining time when add by time mining time', () => {
        const newState = reducer(initialState, actions.addMiningTimeByTime(100, 200, 300));
        expect(newState).toEqual([
            {
                test: 1,
            },
            {
                type: miningTimeTypes.BY_TIME,
                minutes: 100,
                time: 200,
                average: 300,
            },
        ]);
    });

    it('should add mining time when add api error', () => {
        const newState = reducer(initialState, actions.addAPIError("aaaa"));
        expect(newState).toEqual([
            {
                test: 1,
            },
            {
                type: miningTimeTypes.API_ERROR,
                message: "aaaa",
            },
        ]);
    });

    it('should do nothing when set form errors', () => {
        const newState1 = reducer(initialState, actions.setMiningTimeByTimeFormError(['a']));
        const newState2 = reducer(initialState, actions.setMiningTimeByBlocksFormError(['b']));

        expect(newState1).toEqual([{ test: 1 }]);
        expect(newState2).toEqual([{ test: 1 }]);
    });

});