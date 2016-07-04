import {List, Map} from 'immutable';

export function setEntries(state, entries) {
    return state.set('entries', List(entries));
}

export function next(state) {
    const entries = state.get('entries');
    return state.merge({
        vote: Map({pair: entries.take(2)}),
        entries: entries.skip(2)
    });
}

export function vote(state, entry) {
    /*
     Reaches into the map vote --> tally --> entry, creating maps along path for missing key
     Then if end value is missing, update to 0
     Then apply the function on tally
     */
    return state.updateIn(
        ['vote', 'tally', entry],
        0,
        tally => tally + 1
    );
}