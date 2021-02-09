import * as actions from './planets-actions';
import * as types from '../types';
import planetService from '../../service/planets-service';
import { makeServer } from '../../miragejs/server';

describe('Actions > Planets', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should return proper object for sortPlanetList', () => {
    const column = 'name';
    const sort = 'DESC';

    expect(actions.sortPlanetList(column, sort)).toEqual({
      type: types.SORT_PLANET_LIST,
      column,
      sort,
    });
  });

  it('should return proper object for removeSingleComparisonCriteria', () => {
    const column = 'name';
    const sort = 'DESC';
    const item = { column, sort };

    expect(actions.removeSingleComparisonCriteria(item)).toEqual({
      type: types.REMOVE_SINGLE_COMPARISON_CRITERIA,
      item,
    });
  });

  it('should return proper object for filterPlanetListByName', () => {
    const name = 'Tattooine';

    expect(actions.filterPlanetListByName(name)).toEqual({
      type: types.FILTER_PLANET_LIST_BY_NAME,
      name,
    });
  });

  it('should return proper object for clearComparisonCriteria', () => {
    expect(actions.clearComparisonCriteria()).toEqual({
      type: types.CLEAR_COMPARISON_CRITERIA,
    });
  });

  it('should return proper object for filterPlanetListByComparison', () => {
    const column = 'name';
    const comparison = 'greater_than';
    const value = 'some value';

    expect(
      actions.filterPlanetListByComparison(column, comparison, value)
    ).toEqual({
      type: types.FILTER_PLANET_LIST_BY_COMPARISON,
      column,
      comparison,
      value,
    });
  });

  it('should call service and dispatch proper actions when service delivers results', async () => {
    const planets = server.createList('planet', 2);
    const dispatchMock = jest.fn();
    jest
      .spyOn(planetService, 'fetchPlanets')
      .mockResolvedValue({ json: jest.fn(() => ({ planets })) });

    await actions.fetchPlanets()(dispatchMock);

    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: types.FETCH_PLANETS,
    });
    expect(dispatchMock).toHaveBeenCalledWith({
      type: types.FETCH_PLANETS_SUCCESS,
      planets,
    });
  });

  it('should call service and dispatch proper actions when service fails to deliver', async () => {
    const error = new Error('Failed to retrieve planets');
    const dispatchMock = jest.fn();
    jest.spyOn(planetService, 'fetchPlanets').mockRejectedValue(error);

    await actions.fetchPlanets()(dispatchMock);

    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: types.FETCH_PLANETS,
    });
    expect(dispatchMock).toHaveBeenCalledWith({
      type: types.FETCH_PLANETS_FAILURE,
      error,
    });
  });
});
