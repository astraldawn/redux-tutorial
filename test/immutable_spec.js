/**
 * Created by mark on 7/4/16.
 */

import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {
    describe('a number', () => {
        function increment(currentState) {
            return currentState + 1;
        }

        it('is immutable', () => {
            let state = 42;
            let nextState = increment(state);

            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        });
    });

    describe('a list', () => {
        function addItem(currentState, movie) {
            return currentState.push(movie);
        }

        it('is immutable', () => {
            let state = List.of("A", "B");
            let nextState = addItem(state, "C");

            expect(nextState).to.equal(List.of("A", "B", "C"));
            expect(state).to.equal(List.of("A", "B"));
        });
    });

    describe('a tree', () => {
        function addMovie(currentState, movie) {
            return currentState.update('movies', movies => movies.push(movie));
            // Same as
            // return currentState.set(
            //     'movies',
            //     currentState.get('movies').push(movie)
            // );
        }

        it('is immutable', () => {
            let state = Map({
                movies: List.of("A", "B")
            });
            let nextState = addMovie(state, "C");

            expect(nextState).to.equal(Map({
                movies: List.of("A", "B", "C")
            }));

            expect(state).to.equal(Map({
                movies: List.of("A", "B")
            }));
        });
    });
});