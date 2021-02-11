import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import thunk from 'redux-thunk';
import App from './App';
import { INITIAL_STATE } from './store/reducers/planets-reducers';

const mockStore = configureMockStore([thunk]);

function renderComponent(overrides = {}) {
  const store = mockStore({
    planets: {
      ...INITIAL_STATE,
      ...overrides,
    },
  });
  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

describe('Component: Planets', () => {
  describe('Displays all elements', () => {
    it('should match snapshot', () => {
      const { baseElement } = renderComponent();
      expect(baseElement).toMatchSnapshot();
    });
  });
});
