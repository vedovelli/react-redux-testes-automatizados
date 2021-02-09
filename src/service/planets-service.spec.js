import { fetchPlanets } from './planets-service';

window.fetch = jest.fn().mockResolvedValueOnce({
  json: jest.fn(),
});

describe('Planets Service', () => {
  it('should call window.fetch with proper endpoint when fetchPlanets is executed', async () => {
    await fetchPlanets();

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith('/api/planets');
  });
});
