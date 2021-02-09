import React from 'react';
import { render } from '@testing-library/react';
import MovieList from './movie-list';
import planets from '../../../../test/stubs/planets';

function renderComponent() {
  return render(<MovieList films={planets.results[0].films} />);
}

describe('Component: MovieList', () => {
  describe('Displays all elements', () => {
    it('should match snapshot', () => {
      const { baseElement } = renderComponent();
      expect(baseElement).toMatchSnapshot();
    });
  });
});
