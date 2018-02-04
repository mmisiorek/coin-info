import * as actions from '../../src/actions';
import reducer from '../../src/reducers/miningTimeByTimeFormErrors';

describe('miningTimeByTimeFormErrors reducer', () => {

    it('should be able to set new errors', () => {
        const newState = reducer(['a'], actions.setMiningTimeByTimeFormError(['b', 'c']));
        expect(newState).toEqual(['b', 'c']);
    });

    it('should be able to delete errors when new submit is valid', () => {
        const newState = reducer(['b'], actions.addMiningTimeByTime(10, 20, 30));
        expect(newState).toEqual([]);
    });

    it('should do nothing when by blocks request is made', () => {
        const newState = reducer(['a', 'z'], actions.addMiningTimeByBlocks(10, 20, 30));
        expect(newState).toEqual(['a', 'z']);
    });

    it('should do nothing when tries to set errors for blocks form', () => {
        const newState = reducer(['x', 'y'], actions.setMiningTimeByBlocksFormError(['i', 'j']));
        expect(newState).toEqual(['x', 'y']);
    });

});