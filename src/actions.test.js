import {
    CHANGE_SEARCHFIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
} from './constants';
import * as actions from './actions';

import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import fetchMock from 'fetch-mock';
const nodeFetch = require('node-fetch');
nodeFetch.default = fetchMock.sandbox();

const mockStore = configureMockStore([thunkMiddleware]);

it('should create an action to search robots', () => {
    const text = 'woo';
    const expectedAction = {
        type: CHANGE_SEARCHFIELD,
        payload: text
    };
    expect(actions.setSearchField(text)).toEqual(expectedAction);
});

describe('asyncAction', () => {
    afterEach(() => {
        fetchMock.restore(); 
    });

    it('handles requesting robots API PENDING call', () => {
        const store = mockStore();
        store.dispatch(actions.requestRobots());
        const action = store.getActions();
        console.log(action);
        const expectedAction = {
            type: REQUEST_ROBOTS_PENDING
        }
        expect(action[0]).toEqual(expectedAction);
    });

    it('handles requesting robots API SUCCESS call ', () => {
        const store = mockStore({ robots: [{
            id: 1,
            name: 'jon',
            email: 'jon@gmail.com'
        }] });

        fetchMock.getOnce('https://jsonplaceholder.typicode.com/users', {
            body: { 
                robots: [{
                    id: 1,
                    name: 'jon',
                    email: 'jon@gmail.com'
                }] 
            },
            headers: { 'content-type': 'application/json' }
        });

        const expectedActions =  { 
              type: REQUEST_ROBOTS_SUCCESS, 
              payload: { 
                robots: [{
                    id: 1,
                    name: 'jon',
                    email: 'jon@gmail.com'
                }] 
              } 
            };

        const action = store.getActions();

        return store.dispatch(actions.requestRobots()).then(() => {
            console.log(action);
            expect(action[1]).toEqual(expectedActions)
        });
    });
    
});
