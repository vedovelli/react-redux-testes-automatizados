import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, screen, within, fireEvent } from '@testing-library/react';
import thunk from 'redux-thunk';
import Filters from './filters';
import { INITIAL_STATE } from '../store/reducers/planets-reducers';
import userEvent from '@testing-library/user-event';
import {
  CLEAR_COMPARISON_CRITERIA,
  FILTER_PLANET_LIST_BY_COMPARISON,
  FILTER_PLANET_LIST_BY_NAME,
  REMOVE_SINGLE_COMPARISON_CRITERIA,
  SORT_PLANET_LIST,
} from '../store/types';

const mockStore = configureMockStore([thunk]);

function renderComponent(overrides = {}) {
  const store = mockStore({
    planets: {
      ...INITIAL_STATE,
      ...overrides,
    },
  });
  const wrapper = render(
    <Provider store={store}>
      <Filters />
    </Provider>
  );

  return { wrapper, store };
}

async function arrangeAndAct_ComparisonScenario(store) {
  const form = screen.getByTestId('filter-numeric-value-form');
  const [selectProps, selectComparison] = within(form).getAllByRole('combobox');
  const numericInput = screen.getByRole('spinbutton');
  const submitButton = within(form).getByRole('button', { name: /apply/i });

  await userEvent.selectOptions(selectProps, 'diameter');
  await userEvent.selectOptions(selectComparison, 'less_than');
  await fireEvent.change(numericInput, { target: { value: 22 } });
  await userEvent.click(submitButton);

  return store.getActions()[0];
}

describe('Component: Filters', () => {
  describe('Displays all elements', () => {
    it('should match snapshot', () => {
      const {
        wrapper: { baseElement },
      } = renderComponent();
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('Behavior', () => {
    it('should dispatch sortPlanetList action', async () => {
      const { store } = renderComponent();
      const textInput = screen.getByRole('searchbox', {
        name: /search/i,
      });

      await userEvent.type(textInput, 'T');

      const [{ type, name }] = store.getActions();

      expect(type).toEqual(FILTER_PLANET_LIST_BY_NAME);
      expect(name).toEqual('T');
    });

    it('should dispatch filterPlanetListByName action', async () => {
      const { store } = renderComponent();
      const form = screen.getByTestId('sorter-form');
      const select = within(form).getByRole('combobox');
      const radio = screen.getByRole('radio', {
        name: /desc/i,
      });
      const submitButton = within(form).getByRole('button', { name: /apply/i });

      await userEvent.selectOptions(select, 'diameter');
      await userEvent.click(radio);
      await userEvent.click(submitButton);

      const [{ type, column, sort }] = store.getActions();

      expect(type).toEqual(SORT_PLANET_LIST);
      expect(column).toEqual('diameter');
      expect(sort).toEqual('DESC');
    });

    it('should dispatch filterPlanetListByComparison action', async () => {
      const { store } = renderComponent();
      const action = await arrangeAndAct_ComparisonScenario(store);
      const { type, column, comparison, value } = action;

      expect(type).toEqual(FILTER_PLANET_LIST_BY_COMPARISON);
      expect(column).toEqual('diameter');
      expect(comparison).toEqual('less_than');
      expect(value).toEqual('22');
    });

    it('should dispatch removeSingleComparisonCriteria action', async () => {
      const { store } = renderComponent({
        filters: {
          filterByNumericValues: [
            {
              type: 'FILTER_PLANET_LIST_BY_COMPARISON',
              column: 'diameter',
              comparison: 'less_than',
              value: '22',
            },
          ],
        },
      });

      const view = screen.getByTestId('numeric-filter-selected-data');
      const li = within(view).getByRole('listitem');

      await userEvent.click(li);

      const [{ type, item }] = store.getActions();

      expect(type).toEqual(REMOVE_SINGLE_COMPARISON_CRITERIA);
      expect(item).toEqual({
        column: 'diameter',
        comparison: 'less_than',
        value: '22',
      });
    });

    it('should dispatch clearComparisonCriteria action', async () => {
      const { store } = renderComponent({
        filters: {
          filterByNumericValues: [
            {
              column: 'diameter',
              comparison: 'less_than',
              value: '22',
            },
            {
              column: 'population',
              comparison: 'greater_than',
              value: '2200000',
            },
          ],
        },
      });

      const li = screen.getByTestId('clear-all');

      await userEvent.click(li);

      const [{ type }] = store.getActions();

      expect(type).toEqual(CLEAR_COMPARISON_CRITERIA);
    });
  });
});
