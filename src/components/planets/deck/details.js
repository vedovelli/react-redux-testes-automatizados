import React from 'react';
import MovieList from './movie-list';

export default function PlanetDetails({ planet }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {planet.name}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{planet.url}</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Climate</dt>
            <dd className="mt-1 text-sm text-gray-900">{planet.climate}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Terrain</dt>
            <dd className="mt-1 text-sm text-gray-900">{planet.terrain}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Gravity</dt>
            <dd className="mt-1 text-sm text-gray-900">{planet.gravity}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Surface water</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {planet.surface_water}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Diameter</dt>
            <dd className="mt-1 text-sm text-gray-900">{planet.diameter}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Population</dt>
            <dd className="mt-1 text-sm text-gray-900">{planet.population}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">About</dt>
            <dd className="mt-1 text-sm text-gray-900">{planet.about}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Films</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <MovieList films={planet.films} />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
