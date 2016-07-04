/**
 * Created by mark on 7/4/16.
 */
import {setEntries, next, vote, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
    // Figure out which function to call and call it
    switch (action.type) {
        case 'SET_ENTRIES':
            return setEntries(state, action.entries);
        case 'NEXT':
            return next(state);
        case 'VOTE':
            return vote(state, action.entry);
    }
    return state; // When the action is not recognised
}