import * as selectors from './planets-selectors';
import planetsStub from '../../../test/stubs/planets';

const { results: planets } = planetsStub;

const filters = {
  filterByNumericValues: [
    {
      column: 'diameter',
      comparison: 'less_than',
      value: '100000',
    },
    {
      column: 'orbital_period',
      comparison: 'greater_than',
      value: '2500',
    },
  ],
};

const store = {
  planets: {
    list: planets,
    filters,
  },
};

describe('Utility functions', () => {
  it('should sort a provided array of objects ASCending', () => {
    const sorted = selectors.sortFunction(planets, 'name', 'ASC');
    expect(sorted[0].name).toBe('Alderaan');
    expect(sorted[0].diameter).toBe('12500');
    expect(sorted[1].name).toBe('Bespin');
    expect(sorted[1].diameter).toBe('118000');
    expect(sorted[2].name).toBe('Coruscant');
    expect(sorted[2].diameter).toBe('12240');
  });

  it('should sort a provided array of objects DECending', () => {
    const sorted = selectors.sortFunction(planets, 'name', 'DESC');
    expect(sorted[0].name).toBe('Yavin IV');
    expect(sorted[0].diameter).toBe('10200');
    expect(sorted[1].name).toBe('Tatooine');
    expect(sorted[1].diameter).toBe('10465');
    expect(sorted[2].name).toBe('Naboo');
    expect(sorted[2].diameter).toBe('12120');
  });

  it('should filter a provided array of objects by name', () => {
    const filtered = selectors.filterByNameFunction(planets, 'Yavin');

    expect(filtered).toHaveLength(1);
    expect(filtered[0].diameter).toBe('10200');
  });

  it('should return the provided list if name is provided as an empty string', () => {
    const filtered = selectors.filterByNameFunction(planets, '');

    expect(filtered).toHaveLength(planets.length);
  });

  it('should return the provided list if name is not provided', () => {
    const filtered = selectors.filterByNameFunction(planets);

    expect(filtered).toHaveLength(planets.length);
  });

  it('should return the provided list if the array of criteria is empty', () => {
    const filtered = selectors.filterByNumericValueFunction(planets, []);

    expect(filtered).toHaveLength(planets.length);
  });

  it('should return filtered list if the array of criteria is NOT empty and contains valid criteria (greater_than)', () => {
    const criteria = [
      {
        column: 'diameter',
        comparison: 'greater_than',
        value: '100000',
      },
    ];

    const filtered = selectors.filterByNumericValueFunction(planets, criteria);

    expect(filtered).toHaveLength(1);
    expect(filtered[0].name).toBe('Bespin');
  });

  it('should return filtered list if the array of criteria is NOT empty and contains valid criteria (less_than)', () => {
    const criteria = [
      {
        column: 'diameter',
        comparison: 'less_than',
        value: '100000',
      },
    ];

    const filtered = selectors.filterByNumericValueFunction(planets, criteria);

    expect(filtered).toHaveLength(9);
    expect(filtered.find(planet => planet.name === 'Bespin')).toBeUndefined();
  });

  it('should return filtered list if the array of criteria is NOT empty and contains valid criteria (equals)', () => {
    const criteria = [
      {
        column: 'diameter',
        comparison: 'equals',
        value: '12120',
      },
    ];

    const filtered = selectors.filterByNumericValueFunction(planets, criteria);

    expect(filtered).toHaveLength(1);
    expect(filtered[0].name).toBe('Naboo');
  });

  it('should return filtered list if the array of criteria is NOT empty and contains valid criteria (less_than, equals)', () => {
    const criteria = [
      {
        column: 'diameter',
        comparison: 'less_than',
        value: '100000',
      },
      {
        column: 'orbital_period',
        comparison: 'greater_than',
        value: '2500',
      },
    ];

    const filtered = selectors.filterByNumericValueFunction(planets, criteria);

    expect(filtered).toHaveLength(1);
    expect(filtered[0].name).toBe('Yavin IV');
  });

  it('should return the list of planets', () => {
    expect(selectors.getPlanetList(store)).toEqual(planets);
  });

  it('should return the list of filters', () => {
    expect(selectors.getFilters(store)).toEqual(filters);
  });
});
