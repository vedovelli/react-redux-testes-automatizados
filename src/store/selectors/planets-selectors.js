/**
 * Calculates derived state efficiently
 * https://github.com/reduxjs/reselect
 */
import { createSelector } from 'reselect';

/**
 * Used to safely sort both string
 * and numeric as strings values
 */
// istanbul ignore next
const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
});

export function sortFunction(list, sortProperty, sortOrder) {
  return list.sort((a, b) => {
    if (sortOrder === 'ASC') {
      return collator.compare(a[sortProperty], b[sortProperty]);
    }
    return collator.compare(b[sortProperty], a[sortProperty]);
  });
}

export function filterByNameFunction(list, name) {
  if (!name) {
    return list;
  }

  const lowerCaseProvidedName = name.toLowerCase();

  return list.filter(planet =>
    planet.name.toLowerCase().includes(lowerCaseProvidedName)
  );
}

export function filterByNumericValueFunction(list, criteriaList) {
  if (!criteriaList.length) {
    return list;
  }

  return criteriaList.reduce((planets, { column, comparison: type, value }) => {
    return planets.filter(planet => {
      const localValue = parseInt(planet[column], 10);
      const providedValue = parseInt(value, 10);

      const comparisonFunctions = {
        greater_than: () => localValue > providedValue,
        less_than: () => localValue < providedValue,
        equals: () => localValue === providedValue,
      };

      return comparisonFunctions[type]();
    });
  }, list);
}

export const getPlanetList = ({ planets }) => planets.list;
export const getFilters = ({ planets }) => planets.filters;

// istanbul ignore next
export const userPlanetList = createSelector(
  [getPlanetList, getFilters],
  (list, filters) => {
    const { order, filterByName, filterByNumericValues } = filters;

    let userList = [];
    userList = sortFunction(list, order.column, order.sort);
    userList = filterByNameFunction(userList, filterByName.name);
    userList = filterByNumericValueFunction(userList, filterByNumericValues);

    return userList;
  }
);
