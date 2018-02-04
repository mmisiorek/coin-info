import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MiningTimeByTime from '../../src/components/MiningTimeByTime';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
    const props = {
        minutes: 10,
        time: 20,
        average: 30,
        orderNumber: 1,
    };
    const enzymeWrapper = mount(<MiningTimeByTime {...props} />);

    return {
        props,
        enzymeWrapper,
    };
}

describe('MiningTimeByTime', () => {

    it('should render itself', () => {
        const { enzymeWrapper } = setup();
        const textNode = enzymeWrapper.find('p').text();
        const minutesText = enzymeWrapper.find('span.data.data-minutes').text();
        const averageText = enzymeWrapper.find('span.data.data-average').text();

        expect(textNode).toMatch(/^1\)/);
        expect(minutesText).toBe("10");
        expect(averageText).toBe("30");
    });

});
