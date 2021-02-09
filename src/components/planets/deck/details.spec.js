import React from 'react';
import { render } from '@testing-library/react';
import PlanetDetails from './details';
import planets from '../../../../test/stubs/planets';

describe('Component: PlanetDetails', () => {
  function renderComponent() {
    return render(<PlanetDetails planet={planets.results[0]} />);
  }

  describe('Displays all elements', () => {
    it('should match snapshot', () => {
      const { baseElement } = renderComponent();
      expect(baseElement).toMatchSnapshot();
    });
  });
});
