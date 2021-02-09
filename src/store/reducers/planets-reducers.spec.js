import {
  CLEAR_COMPARISON_CRITERIA,
  FETCH_PLANETS,
  FETCH_PLANETS_FAILURE,
  FETCH_PLANETS_SUCCESS,
  FILTER_PLANET_LIST_BY_COMPARISON,
  FILTER_PLANET_LIST_BY_NAME,
  REMOVE_SINGLE_COMPARISON_CRITERIA,
  SORT_PLANET_LIST,
} from '../types';
import reducer, { INITIAL_STATE } from './planets-reducers';
import { makeServer } from '../../miragejs/server';

const getState = action => reducer(INITIAL_STATE, action);

describe('Reducers > Planets', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should return initial state when an unknown action is passed', () => {
    expect(getState({ type: 'XYZ' })).toEqual(INITIAL_STATE);
  });

  it('should set loading to true while fetching planets', () => {
    expect(getState({ type: FETCH_PLANETS }).loading).toBe(true);
  });

  it('should store the list of planets passed with the action and set loading to false', () => {
    const planets = server.createList('planet', 3);
    const state = getState({ type: FETCH_PLANETS_SUCCESS, planets });
    expect(state.loading).toBe(false);
    expect(state.list).toHaveLength(3);
    expect(state.list).toEqual(planets);
  });

  it('should empty the list of planets, set loading to false and return an error message', () => {
    const error = new Error('');
    const state = getState({ type: FETCH_PLANETS_FAILURE, error });
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(error);
    expect(state.list).toHaveLength(0);
  });

  it('should set sort order', () => {
    const column = 'name';
    const sort = 'ASC';
    const state = getState({ type: SORT_PLANET_LIST, column, sort });
    expect(state.filters.order.column).toEqual(column);
    expect(state.filters.order.sort).toEqual(sort);
  });

  it('should set filterByName', () => {
    const name = 'Vedovelli';
    const state = getState({ type: FILTER_PLANET_LIST_BY_NAME, name });
    expect(state.filters.filterByName.name).toEqual(name);
  });

  it('should set filterByNumericValues', () => {
    const filter1 = {
      column: 'orbital',
      comparison: 'greater_than',
      value: 200,
    };

    const filter2 = {
      column: 'diameter',
      comparison: 'less_than',
      value: 2500,
    };
    const state = getState({
      type: FILTER_PLANET_LIST_BY_COMPARISON,
      ...filter1,
    });
    expect(state.filters.filterByNumericValues).toHaveLength(1);
    expect(state.filters.filterByNumericValues[0]).toEqual(filter1);

    const updatedState = reducer(state, {
      type: FILTER_PLANET_LIST_BY_COMPARISON,
      ...filter2,
    });
    expect(updatedState.filters.filterByNumericValues).toHaveLength(2);
    expect(updatedState.filters.filterByNumericValues[0]).toEqual(filter1);
    expect(updatedState.filters.filterByNumericValues[1]).toEqual(filter2);
  });

  it('should remove an existing filterByNumericValues', () => {
    const filter = {
      column: 'orbital',
      comparison: 'greater_than',
      value: 200,
    };

    const state = getState({
      type: FILTER_PLANET_LIST_BY_COMPARISON,
      ...filter,
    });

    expect(state.filters.filterByNumericValues).toHaveLength(1);

    const updatedState = reducer(state, {
      type: REMOVE_SINGLE_COMPARISON_CRITERIA,
      item: filter,
    });

    expect(updatedState.filters.filterByNumericValues).toHaveLength(0);
  });

  it('should clear filterByNumericValues', () => {
    const filter = {
      column: 'orbital',
      comparison: 'greater_than',
      value: 200,
    };

    const state = getState({
      type: FILTER_PLANET_LIST_BY_COMPARISON,
      ...filter,
    });

    expect(state.filters.filterByNumericValues).toHaveLength(1);

    const updatedState = reducer(state, {
      type: CLEAR_COMPARISON_CRITERIA,
    });

    expect(updatedState.filters.filterByNumericValues).toHaveLength(0);
  });
});
