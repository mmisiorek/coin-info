import * as utils from '../../src/utils';

describe('utils', () => {

    it('isIntegerNumeric', () => {
        expect(utils.isIntegerNumeric("123")).toBe(true);
        expect(utils.isIntegerNumeric("aqwqed")).toBe(false);
    });

    it('timestampToString', () => {
        expect(utils.timestampToString(1)).toBe("1970-01-01 00:00:01");
    });

});