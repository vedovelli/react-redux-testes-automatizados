import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterSelector from './dropdown';
import { PLANET_PROPERTIES } from './dropdown-utils';

const changeHandlerMock = jest.fn();

function renderComponent(overrides = {}) {
  const props = {
    dataSource: PLANET_PROPERTIES,
    changeHandler: changeHandlerMock,
    ...overrides,
  };

  render(<FilterSelector {...props} />);
}

describe('Component: FilterSelector', () => {
  describe('Displays all elements', () => {
    it('should display a label if it is provided as a prop', () => {
      renderComponent({ label: 'My label' });
      expect(screen.getByText(/my label/i)).toBeInTheDocument();
    });

    it('should NOT display a label if it is provided as a prop', () => {
      renderComponent();
      expect(screen.queryByText(/my label/i)).toBeNull();
    });

    it('should display id and testid in the select if they are provided as a props', () => {
      renderComponent({ id: 'some_id', testId: 'some_test_id' });

      const select = screen.getByRole('combobox');

      expect(select).toHaveAttribute('id', 'some_id');
      expect(select).toHaveAttribute('data-testid', 'some_test_id');
    });

    it('should NOT display id and testid if they are NOT provided as a props', () => {
      renderComponent();

      const select = screen.getByRole('combobox');

      expect(select).not.toHaveAttribute('id', 'some_id');
      expect(select).not.toHaveAttribute('data-testid', 'some_test_id');
    });
  });

  describe(`Component's behavior`, () => {
    it('should call changeHandler on change', async () => {
      renderComponent();

      const select = screen.getByRole('combobox');

      await userEvent.selectOptions(select, 'rotation_period');

      expect(changeHandlerMock).toHaveBeenCalledTimes(1);
      expect(changeHandlerMock).toHaveBeenCalledWith('rotation_period');
    });
  });
});
