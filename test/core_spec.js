/**
 * Created by mark on 7/4/16.
 */
import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
    describe('setEntries', () => {
        it('add entries to that state', () => {
            const state = Map();
            const entries = List.of("A", "B");
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of("A", "B")
            }));
        });

        it('converts to immutable', () => {
            const state = Map();
            const entries = ["A", "B"];
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of("A", "B")
            }));
        });
    });

    describe('next', () => {
        it('takes the next two entries under vote', () => {
            const state = Map({
                entries: List.of("A", "B", "C")
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("A", "B")
                }),
                entries: List.of("C")
            }));
        });

        it('puts winner of current vote back to entries', () => {
            const state = fromJS({
                vote: {
                    pair: ["A", "B"],
                    tally: {
                        A: 4,
                        B: 2
                    }
                },
                entries: ["C", "D", "E"]
            });
            const nextState = next(state);
            expect(nextState).to.equal(fromJS({
                vote: {
                    pair: ["C", "D"]
                },
                entries: ["E", "A"]
            }));
        });

        it('puts both from tied vote back into entries', () => {
            const state = fromJS({
                vote: {
                    pair: ["A", "B"],
                    tally: {
                        A: 4,
                        B: 4
                    }
                },
                entries: ["C", "D", "E"]
            });
            const nextState = next(state);
            expect(nextState).to.equal(fromJS({
                vote: {
                    pair: ["C", "D"]
                },
                entries: ["E", "A", "B"]
            }));
        });

        it('marks winner with 1 entry left', () => {
            const state = fromJS({
                vote: {
                    pair: ["A", "B"],
                    tally: {
                        A: 4,
                        B: 2
                    }
                },
                entries: []
            });
            const nextState = next(state);
            expect(nextState).to.equal(fromJS({
                winner: "A"
            }));
        });
    });

    describe('vote', () => {
        it('creates a tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of("A", "B")
                }),
                entries: List()
            });
            const nextState = vote(state, "A");
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("A", "B"),
                    tally: Map({
                        "A": 1
                    })
                }),
                entries: List()
            }));
        });

        it('adds to existing tally for voted entry', () => {
            const state = fromJS({
                vote: {
                    pair: ["A", "B"],
                    tally: {
                        A: 3,
                        B: 2
                    }
                },
                entries: []
            });
            const nextState = vote(state, "A");
            expect(nextState).to.equal(fromJS({
                vote: {
                    pair: ["A", "B"],
                    tally: {
                        A: 4,
                        B: 2
                    }
                },
                entries: []
            }));
        });
    });
});