import { shallow } from 'enzyme';
import React from 'react';
import CardList from './CardList';

it('expect to render CardList Component', () => {
    const mockRobots = [
        {
            id: 1,
            email: 'mock@mail.com',
            name: 'mock'
        }
    ]
    expect(shallow(<CardList robots={mockRobots} />)).toMatchSnapshot(); 
});