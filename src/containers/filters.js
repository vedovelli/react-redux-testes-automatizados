import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sortPlanetList,
  filterPlanetListByName,
  filterPlanetListByComparison,
  removeSingleComparisonCriteria,
  clearComparisonCriteria,
} from '../store/actions';
import SelectedFilters from '../components/planets/filters/selected-filters';
import FilterByNumericValue from '../components/planets/filters/numeric-value';
import FilterByName from '../components/planets/filters/name';
import Sorter from '../components/planets/filters/sorter';

export default function Filters() {
  const dispatch = useDispatch();

  const dispatchRemoveComparisonCriteria = item => {
    dispatch(removeSingleComparisonCriteria(item));
  };
  const dispatchClearComparisonCriteria = () => {
    dispatch(clearComparisonCriteria());
  };
  const dispatchSorter = (sortProperty, sortOrder) => {
    dispatch(sortPlanetList(sortProperty, sortOrder));
  };
  const dispatchFilterPlanetListByName = name => {
    dispatch(filterPlanetListByName(name));
  };
  const dispatchFilterPlanetListByComparison = (column, comparison, value) => {
    dispatch(filterPlanetListByComparison(column, comparison, value));
  };

  const { filterByNumericValues } = useSelector(store => store.planets.filters);

  return (
    <div className="bg-gray-100 bg-opacity-80 shadow sm:rounded-lg grid grid-flow-row lg:grid-flow-col">
      <div>
        <FilterByName submitName={dispatchFilterPlanetListByName} />
        <Sorter submitSortInfo={dispatchSorter} />
      </div>
      <FilterByNumericValue
        submitComparisonInfo={dispatchFilterPlanetListByComparison}
      />
      <SelectedFilters
        list={filterByNumericValues}
        removeHandler={dispatchRemoveComparisonCriteria}
        clearHandler={dispatchClearComparisonCriteria}
      />
    </div>
  );
}
