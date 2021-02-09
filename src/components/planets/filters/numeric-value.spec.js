import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterByNumericValue from './numeric-value';

const submitComparisonInfoMock = jest.fn();

function renderComponent(overrides = {}) {
  return render(
    <FilterByNumericValue submitComparisonInfo={submitComparisonInfoMock} />
  );
}

const select1 = [
  'Surface Water',
  'Diameter',
  'Orbital Period',
  'Rotation Period',
  'Population',
];

const select2 = ['Greater than', 'Less than', 'Equals'];

describe('Component: FilterByNumericValue', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Displays all elements', () => {
    it('should match snapshot', () => {
      const { baseElement } = renderComponent();
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe(`Component's behavior`, () => {
    it('should NOT submit any information if value is not provided', async () => {
      renderComponent();

      await userEvent.click(screen.getByRole('button', { name: /apply/i }));

      expect(submitComparisonInfoMock).toHaveBeenCalledTimes(0);
    });

    it('should submit user provided information and the initial selected value in the select fields', async () => {
      renderComponent();

      const inputField = screen.getByRole('spinbutton');
      await fireEvent.change(inputField, { target: { value: 22 } });
      await userEvent.click(screen.getByRole('button', { name: /apply/i }));

      expect(submitComparisonInfoMock).toHaveBeenCalledTimes(1);
      expect(submitComparisonInfoMock).toHaveBeenCalledWith(
        'surface_water',
        'greater_than',
        '22'
      );
    });

    it('should submit user provided information on all fields fields', async () => {
      renderComponent();

      const [propertySelector, comparisonSelector] = screen.getAllByRole(
        'combobox'
      );
      const inputField = screen.getByRole('spinbutton');

      await userEvent.selectOptions(propertySelector, 'diameter');
      await userEvent.selectOptions(comparisonSelector, 'less_than');
      await fireEvent.change(inputField, { target: { value: 2000 } });
      await userEvent.click(screen.getByRole('button', { name: /apply/i }));

      expect(submitComparisonInfoMock).toHaveBeenCalledTimes(1);
      expect(submitComparisonInfoMock).toHaveBeenCalledWith(
        'diameter',
        'less_than',
        '2000'
      );
    });

    it('should return values to their original after submitting', async () => {
      renderComponent();

      const [propertySelector, comparisonSelector] = screen.getAllByRole(
        'combobox'
      );
      const inputField = screen.getByRole('spinbutton');

      await userEvent.selectOptions(propertySelector, 'diameter');
      await userEvent.selectOptions(comparisonSelector, 'less_than');
      await fireEvent.change(inputField, { target: { value: 2000 } });
      await userEvent.click(screen.getByRole('button', { name: /apply/i }));

      expect(inputField.value).toEqual('0');
      expect(propertySelector.value).toEqual('surface_water');
      expect(comparisonSelector.value).toEqual('greater_than');
    });
  });
});
