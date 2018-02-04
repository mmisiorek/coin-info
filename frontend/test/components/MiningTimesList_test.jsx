import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MiningTimesList from '../../src/components/MiningTimesList';
import * as miningTimeTypes from '../../src/constants/miningTimeTypes';

Enzyme.configure({ adapter: new Adapter() });

function getProps() {
    return {
        miningTimes: [
            {
                type: miningTimeTypes.BY_BLOCKS,
                numberOfBlocks: 450,
                time: 100,
                average: 10,
            },
            {
                type: miningTimeTypes.BY_TIME,
                minutes: 60,
                time: 200,
                average: 20,
            },
            {
                type: miningTimeTypes.API_ERROR,
                message: 'aaaa',
            },
        ]
    }
}

function getEmptyProps() {
    return {
        miningTimes: []
    };
}

function setup(props) {
    const enzymeWrapper = mount(<MiningTimesList {...props} />);
    return {
        props,
        enzymeWrapper
    };
}

describe('MiningTimesList', () => {

    it('should not have any elements when array is empty', () => {
        const { enzymeWrapper } = setup(getEmptyProps());
        expect(enzymeWrapper.children().children().length).toBe(0);
    });

    it('should render itself and sub components', () => {
        const { enzymeWrapper } = setup(getProps());

        expect(enzymeWrapper.children().children().length).toBe(3);

        const byTimeEls = enzymeWrapper.find('MiningTimeByTime');
        const byBlocksEls = enzymeWrapper.find('MiningTimeByBlocks');
        const errorEls = enzymeWrapper.find('APIErrorMessage');

        expect(byBlocksEls.length).toBe(1);
        expect(byTimeEls.length).toBe(1);
        expect(errorEls.length).toBe(1);

        expect(byTimeEls.props()).toEqual({minutes: 60, time: 200, average: 20, orderNumber: 2});
        expect(byBlocksEls.props()).toEqual({numberOfBlocks: 450, time: 100, average: 10, orderNumber: 1});
        expect(errorEls.props()).toEqual({message: 'aaaa', orderNumber: 3});
    });
});