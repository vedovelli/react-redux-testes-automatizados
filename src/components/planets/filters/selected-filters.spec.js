import React from 'react';
import { screen, render } from '@testing-library/react';
import SelectedFilters from './selected-filters';
import userEvent from '@testing-library/user-event';

const removeHandlerMock = jest.fn();
const clearHandlerMock = jest.fn();

function renderComponent(overrides = {}) {
  return render(
    <SelectedFilters
      list={overrides.list || []}
      removeHandler={removeHandlerMock}
      clearHandler={clearHandlerMock}
    />
  );
}

describe('Component: SelectedFilters', () => {
  describe('Display the elements', () => {
    it('should NOT display any item', () => {
      renderComponent();
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });

    it('should render 1 item', () => {
      const list = [
        {
          column: 'orbital_period',
          comparison: 'greater_than',
          value: '2500',
        },
      ];

      renderComponent({ list });

      expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });

    it('should render 2 items and the clear all option', () => {
      const list = [
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

      renderComponent({ list });

      const items = screen.getAllByRole('listitem');
      const lastItem = items[items.length - 1];

      expect(items).toHaveLength(3);
      expect(lastItem.textContent).toEqual('clear all');
    });
  });

  describe('Behavior', () => {
    it('should call removeHandler with item info when item is clicked', async () => {
      const list = [
        {
          column: 'orbital_period',
          comparison: 'greater_than',
          value: '2500',
        },
      ];

      renderComponent({ list });

      const item = screen.getByRole('listitem');

      await userEvent.click(item);

      expect(removeHandlerMock).toHaveBeenCalledTimes(1);
      expect(removeHandlerMock).toHaveBeenCalledWith(list[0]);
    });

    it('should call clearHandler when clear all is clicked', async () => {
      const list = [
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

      renderComponent({ list });

      const items = screen.getAllByRole('listitem');
      const lastItem = items[items.length - 1];

      await userEvent.click(lastItem);

      expect(clearHandlerMock).toHaveBeenCalledTimes(1);
      expect(clearHandlerMock).toHaveBeenCalledWith(/* nothing */);
    });
  });
});
