import React from 'react';
import stub from '../../../testData';
import { render, screen } from '@testing-library/react';
import Table from './table';

describe('Table component', () => {
  it('should render the provided list of Planets', async () => {
    render(<Table dataSource={stub.results} />);
    const rows = screen.getAllByTestId('planet-row');
    expect(rows).toHaveLength(10);
    expect(screen.queryByTestId('empty-table-row')).toBeNull();
  });

  it('should render message when no planets are passed as prop', async () => {
    render(<Table dataSource={[]} />);
    expect(
      screen.getByText(/at the moment there are no planets to display/i)
    ).toBeInTheDocument();
    expect(screen.queryAllByTestId('planet-row')).toHaveLength(0);
  });
});
