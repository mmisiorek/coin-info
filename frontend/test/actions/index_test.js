import * as actions from '../../src/actions';
import * as constants from '../../src/constants/actions';

describe('actions ', () => {

    it('addMiningTimeByBlocks', () => {
        expect(actions.addMiningTimeByBlocks(10, 20, 30)).toEqual({
            type: constants.ADD_MINING_TIME_BY_BLOCKS_ACTION,
            numberOfBlocks: 10,
            time: 20,
            average: 30,
        });
    });

    it('addMiningTimeByTime', () => {
        expect(actions.addMiningTimeByTime(100, 200, 300)).toEqual({
            type: constants.ADD_MINING_TIME_BY_TIME_ACTION,
            minutes: 100,
            time: 200,
            average: 300,
        });
    });

    it('addAPIError', () => {
        expect(actions.addAPIError('Aaaa')).toEqual({
            type: constants.API_ERROR_ACTION,
            message: 'Aaaa',
        });
    });

    it('setMiningTimeByTimeFormError', () => {
        expect(actions.setMiningTimeByTimeFormError(['a', 'b'])).toEqual({
            type: constants.ADD_MINING_TIME_BY_TIME_FORM_ERROR_ACTION,
            errors: ['a', 'b']
        });
    });

    it('setMiningTimeByBlocksFormError', () => {
        expect(actions.setMiningTimeByBlocksFormError(['d', 'e', 'f'])).toEqual({
            type: constants.ADD_MINING_TIME_BY_BLOCKS_FORM_ERROR_ACTION,
            errors: ['d', 'e', 'f']
        });
    });

});