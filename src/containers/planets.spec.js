import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import Planets from './planets';
import { INITIAL_STATE } from '../store/reducers/planets-reducers';
import { FETCH_PLANETS } from '../store/types';

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
      <Planets />
    </Provider>
  );

  return { wrapper, store };
}

describe('Component: Planets', () => {
  describe('Displays all elements', () => {
    it('should match snapshot', () => {
      const {
        wrapper: { baseElement },
      } = renderComponent();
      expect(baseElement).toMatchSnapshot();
    });

    it('should render a heading with content Loading...', () => {
      renderComponent({ loading: true });

      const loading = screen.getByRole('heading', { name: /^loading...$/i });

      expect(loading).toBeInTheDocument();
    });

    it('should render a heading with content So sorry...', () => {
      renderComponent({ error: {} });

      const sorry = screen.getByRole('heading', { name: /^so sorry...$/i });

      expect(sorry).toBeInTheDocument();
    });
  });

  describe('Behavior', () => {
    it('should dispatch fetchPlanets action', async () => {
      const { store } = renderComponent();
      const [{ type }] = store.getActions();

      expect(type).toEqual(FETCH_PLANETS);
    });
  });
});
