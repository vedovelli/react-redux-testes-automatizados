import produce, { setAutoFreeze } from 'immer';

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

/**
 * Immer's auto freeze capabilities don't
 * play well with reselect lib, which we're
 * using in order to implement derived data
 */
setAutoFreeze(false);

export const INITIAL_STATE = {
  list: [],
  loading: false,
  error: null,
  filters: {
    order: {
      column: 'name',
      sort: 'ASC',
    },
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  },
};

const reducer = produce((nextState, action) => {
  switch (action.type) {
    case FETCH_PLANETS:
      nextState.loading = true;
      break;
    case FETCH_PLANETS_SUCCESS:
      nextState.loading = false;
      nextState.list = action.planets;
      break;
    case FETCH_PLANETS_FAILURE:
      nextState.loading = false;
      nextState.list = [];
      nextState.error = action.error;
      break;
    case SORT_PLANET_LIST:
      nextState.filters.order.column = action.column;
      nextState.filters.order.sort = action.sort;
      break;
    case FILTER_PLANET_LIST_BY_NAME:
      nextState.filters.filterByName.name = action.name;
      break;
    case FILTER_PLANET_LIST_BY_COMPARISON:
      const { type, ...rest } = action;
      nextState.filters.filterByNumericValues.push({ ...rest });
      break;
    case REMOVE_SINGLE_COMPARISON_CRITERIA:
      const { item } = action;
      const toRemove = Object.values(item).join('-');
      nextState.filters.filterByNumericValues = nextState.filters.filterByNumericValues.filter(
        current => toRemove !== Object.values(current).join('-')
      );
      break;
    case CLEAR_COMPARISON_CRITERIA:
      nextState.filters.filterByNumericValues = [];
      break;
    // no default
  }
}, INITIAL_STATE);

export default reducer;
