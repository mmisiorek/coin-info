import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddMiningTimeByTimeForm from '../../src/components/AddMiningTimeByTimeForm';

Enzyme.configure({ adapter: new Adapter() });

function setup(errors) {
    const props = {
        onSubmit: jest.fn(),
        errors: errors
    };

    const enzymeWrapper = mount(<AddMiningTimeByTimeForm {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe('AddMiningTimeByTimeForm', () => {

    it('should render itself when has no errors', () => {
        const { enzymeWrapper } = setup([]);

        const errorsUlEl = enzymeWrapper.find('.errors ul');
        expect(errorsUlEl.children().length).toBe(0);
    });

    it('should render itself when has errors', () => {
        const { enzymeWrapper } = setup(['a', 'b', 'c']);

        const errorsUlEl = enzymeWrapper.find('.errors ul');
        expect(errorsUlEl.children().length).toBe(3);
    });

});