import React from 'react';
import Sorter from './sorter';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const submitSortInfoMock = jest.fn();

const renderComponent = () =>
  render(<Sorter submitSortInfo={submitSortInfoMock} />);

describe('Component: Sorter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Displays elements', () => {
    it('should render a label with content Sorting', () => {
      renderComponent();
      screen.getByText(/^sorting$/i);
    });

    it('should render select with proper options', () => {
      const options = [
        'Name',
        'Climate',
        'Diameter',
        'Orbital Period',
        'Gravity',
        'Population',
      ];

      renderComponent();

      const select = screen.getByRole('combobox');
      const children = Array.from(select.children);

      expect(children).toHaveLength(options.length);

      for (const child of children) {
        expect(options.includes(child.textContent)).toBe(true);
      }
    });

    it('should display 2 radio buttons: ASC and DESC', () => {
      renderComponent();
      const ascRadio = screen.getByRole('radio', {
        name: /asc/i,
      });
      const descRadio = screen.getByRole('radio', {
        name: /desc/i,
      });

      expect(ascRadio).toBeInTheDocument();
      expect(descRadio).toBeInTheDocument();
    });

    it('should display a submit button', () => {
      renderComponent();

      const button = screen.getByRole('button', { name: /apply/i });

      expect(button).toHaveAttribute('type', 'submit');
    });

    it('should render a form', () => {
      renderComponent();

      expect(screen.getByTestId('sorter-form')).toBeInTheDocument();
    });
  });

  describe('Behavior', () => {
    it('should submit the default selected information on form submit', async () => {
      renderComponent();
      const button = screen.getByRole('button', { name: /apply/i });

      await userEvent.click(button);

      expect(submitSortInfoMock).toHaveBeenCalledTimes(1);
      expect(submitSortInfoMock).toHaveBeenCalledWith('name', 'ASC');
    });

    it('should submit user selected information on form submit. DESC case.', async () => {
      renderComponent();

      const button = screen.getByRole('button', { name: /apply/i });
      const select = screen.getByRole('combobox');
      const descRadio = screen.getByRole('radio', {
        name: /desc/i,
      });

      await userEvent.selectOptions(select, 'orbital_period');
      await userEvent.click(descRadio);
      await userEvent.click(button);

      expect(submitSortInfoMock).toHaveBeenCalledTimes(1);
      expect(submitSortInfoMock).toHaveBeenCalledWith('orbital_period', 'DESC');
    });

    it('should submit user selected information on form submit. ASC case.', async () => {
      renderComponent();

      const button = screen.getByRole('button', { name: /apply/i });
      const select = screen.getByRole('combobox');
      const ascRadio = screen.getByRole('radio', {
        name: /asc/i,
      });
      const descRadio = screen.getByRole('radio', {
        name: /desc/i,
      });

      await userEvent.selectOptions(select, 'diameter');
      await userEvent.click(descRadio);
      await userEvent.click(ascRadio);
      await userEvent.click(button);

      expect(submitSortInfoMock).toHaveBeenCalledTimes(1);
      expect(submitSortInfoMock).toHaveBeenCalledWith('diameter', 'ASC');
    });
  });
});
