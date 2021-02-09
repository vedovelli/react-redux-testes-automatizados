import planetService from '../../service/planets-service';
import {
  FETCH_PLANETS,
  FETCH_PLANETS_FAILURE,
  FETCH_PLANETS_SUCCESS,
  SORT_PLANET_LIST,
  FILTER_PLANET_LIST_BY_NAME,
  FILTER_PLANET_LIST_BY_COMPARISON,
  REMOVE_SINGLE_COMPARISON_CRITERIA,
  CLEAR_COMPARISON_CRITERIA,
} from '../types';

export const sortPlanetList = (column, sort) => ({
  type: SORT_PLANET_LIST,
  column,
  sort,
});

export const removeSingleComparisonCriteria = item => ({
  type: REMOVE_SINGLE_COMPARISON_CRITERIA,
  item,
});

export const clearComparisonCriteria = () => ({
  type: CLEAR_COMPARISON_CRITERIA,
});

export const filterPlanetListByName = name => ({
  type: FILTER_PLANET_LIST_BY_NAME,
  name,
});

export const filterPlanetListByComparison = (column, comparison, value) => ({
  type: FILTER_PLANET_LIST_BY_COMPARISON,
  column,
  comparison,
  value,
});

export const fetchPlanets = () => async dispatch => {
  dispatch({
    type: FETCH_PLANETS,
  });

  try {
    const response = await planetService.fetchPlanets();
    const planets = (await response.json()).planets;

    dispatch({
      type: FETCH_PLANETS_SUCCESS,
      planets,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PLANETS_FAILURE,
      error,
    });
  }
};
