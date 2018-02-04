import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MiningTimeByBlocks from '../../src/components/MiningTimeByBlocks';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
    const props = {
        numberOfBlocks: 100,
        time: 20,
        average: 301,
        orderNumber: 1,
    };
    const enzymeWrapper = mount(<MiningTimeByBlocks {...props} />);

    return {
        props,
        enzymeWrapper,
    };
}

describe('MiningTimeByBlocks', () => {

    it('should render itself', () => {
        const { enzymeWrapper } = setup();
        const textNode = enzymeWrapper.find('p').text();
        const blocksText = enzymeWrapper.find('span.data.data-number-of-blocks').text();
        const averageText = enzymeWrapper.find('span.data.data-average').text();

        expect(textNode).toMatch(/^1\)/);
        expect(blocksText).toBe("100");
        expect(averageText).toBe("301");
    });

});
