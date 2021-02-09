import React from 'react';
import FilterByName from './name';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const submitNameMock = jest.fn();
const renderComponent = () =>
  render(<FilterByName submitName={submitNameMock} />);

describe('Component: FilterByName', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Displays elements', () => {
    it('should render a label with content Search', () => {
      renderComponent();
      screen.getByText(/^search$/i);
    });

    it('should render a search field with a placeholder text', () => {
      renderComponent();
      const searchbox = screen.getByRole('searchbox', {
        name: /search/i,
      });

      expect(searchbox).toHaveProperty('placeholder', `Type the planet's name`);
      expect(searchbox).toHaveProperty('autocomplete', 'off');
    });
  });

  describe('Behavior', () => {
    it('should execute submitName with text input by the user', async () => {
      renderComponent();
      const searchbox = screen.getByRole('searchbox', {
        name: /search/i,
      });

      await userEvent.type(searchbox, 'T');
      expect(submitNameMock).toHaveBeenCalledTimes(1);
      expect(submitNameMock).toHaveBeenCalledWith('T');

      await userEvent.type(searchbox, 'Ta');
      expect(submitNameMock).toHaveBeenCalledTimes(2);
      expect(submitNameMock).toHaveBeenCalledWith('Ta');
    });
  });
});
