import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
    return state.set('entries', List(entries));
}

function getWinners(vote) {
    if (!vote) return [];
    const [a,b] = vote.get("pair");
    const aVotes = vote.getIn(['tally', a], 0);
    const bVotes = vote.getIn(['tally', b], 0);
    if (aVotes > bVotes) return [a];
    else if (aVotes < bVotes) return [b];
    else return [a, b];
}

export function next(state) {
    // The logic is here is to just append the winner(s) to the end
    const entries = state.get('entries').concat(getWinners(state.get('vote')));

    if (entries.size === 1) {
        return state
            .remove('vote')
            .remove('entries')
            .set('winner', entries.first());
    }
    return state.merge({
        vote: Map({pair: entries.take(2)}),
        entries: entries.skip(2)
    });
}

export function vote(voteState, entry) {
    /*
     Only operates on vote, does not need information about the entire state
     Reaches into the map tally --> entry, creating maps along path for missing key
     Then if end value is missing, update to 0
     Then apply the function on tally
     */
    return voteState.updateIn(
        ['tally', entry],
        0,
        tally => tally + 1
    );
}