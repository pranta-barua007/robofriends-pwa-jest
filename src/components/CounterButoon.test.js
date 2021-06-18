import { shallow } from "enzyme";
import React from "react";
import CounterButton from "./CounterButton";

describe('CounterButton', () => {
    it('should render CounterButton & match snapshot', () => {
        const mockColor = 'red';
        expect(shallow(<CounterButton color={mockColor} />)).toMatchSnapshot();
    })

    it('should recive red as value of color prop', () => {
        const mockColor = 'red';
        const wrapper = shallow(<CounterButton color={mockColor} />);

        expect(wrapper.props().color).toEqual('red');
    })

    it('should increase counter by click event', () => {
        const mockColor = 'red';
        const wrapper = shallow(<CounterButton color={mockColor} />);
        
        wrapper.find("[id='counter']").simulate('click');
        wrapper.find("[id='counter']").simulate('click');
        expect(wrapper.state()).toEqual({ count: 2 });
        wrapper.find("[id='counter']").simulate('keypress');
        expect(wrapper.state()).toEqual({ count: 2 });
    })
});