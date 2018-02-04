import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import APIErrorMessage from '../../src/components/APIErrorMessage';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
    const props = {
        message: 'abfe',
        orderNumber: 43,
    };
    const enzymeWrapper = mount(<APIErrorMessage {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe('APIErrorMessage', () => {

    it('should render itself', () => {
        const { enzymeWrapper } = setup();

        const text = enzymeWrapper.find('p').text();
        expect(text).toMatch(/^43\)/);

        const message = enzymeWrapper.find('span.data-message').text();
        expect(message).toBe('abfe');
    });

});
