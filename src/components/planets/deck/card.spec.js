import React from 'react';
import { render } from '@testing-library/react';
import Card from './card';
import planets from '../../../../test/stubs/planets';

describe('Component: Card', () => {
  function renderComponent(overrides = {}) {
    return render(<Card planet={planets.results[0]} />);
  }

  describe('Displays all elements', () => {
    it('should match snapshot', () => {
      const { baseElement } = renderComponent();
      expect(baseElement).toMatchSnapshot();
    });
  });
});
