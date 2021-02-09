import React from 'react';
import { render } from '@testing-library/react';
import Deck from './main';
import planets from '../../../../test/stubs/planets';

function renderComponent() {
  return render(<Deck dataSource={planets.results} />);
}

describe('Component: Deck', () => {
  describe('Displays all elements', () => {
    it('should match snapshot', () => {
      const { baseElement } = renderComponent();
      expect(baseElement).toMatchSnapshot();
    });
  });
});
