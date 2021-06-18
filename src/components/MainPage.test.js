import { shallow } from "enzyme";
import React from "react";
import MainPage from "./MainPage";

describe('MainPage', () => {

    let wrapper;
    beforeEach(() => {
        const mockProps = {
            onRequestRobots: jest.fn(),
            robots: [],
            searchField: '',
            isPending: false
        }
        wrapper = shallow(<MainPage {...mockProps} />)
    });
    
    it('should render ManinPage & match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should filter robots correctly', () => {
        const mockProps2 = {
            onRequestRobots: jest.fn(),
            robots: [
                {
                    id: 5,
                    name: 'jon',
                    email: 'jon@gmail.com'
                }
            ],
            searchField: 'jon',
            isPending: false
        }
        const wrapper2 = shallow(<MainPage {...mockProps2}/>)
        expect(wrapper2.instance().filteredRobots()).toEqual([
            {
                id: 5,
                name: 'jon',
                email: 'jon@gmail.com'
            }
        ]);
    });

    it('should filter unmatched robots ', () => {
        const mockProps3 = {
            onRequestRobots: jest.fn(),
            robots: [
                {
                    id: 5,
                    name: 'jon',
                    email: 'jon@gmail.com'
                }
            ],
            searchField: 'pop',
            isPending: false
        }
        const wrapper3 = shallow(<MainPage {...mockProps3}/>)
        expect(wrapper3.instance().filteredRobots()).toEqual([]);
    });

});
