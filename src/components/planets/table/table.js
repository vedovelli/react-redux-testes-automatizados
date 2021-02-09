import React from 'react';
import TableRow from './table-row';

export default function Table({ dataSource }) {
  const columns = {
    name: 'Name',
    rotation_period: 'Rotation Period',
    orbital_period: 'Orbital Period',
    diameter: 'Diameter',
    climate: 'Climate',
    gravity: 'Gravity',
    terrain: 'Terrain',
    surface_water: 'Ssurface Water',
    population: 'Population',
    films: 'Films',
    created: 'Created',
    edited: 'Edited',
    url: 'URL',
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50  bg-opacity-80">
                <tr>
                  {Object.values(columns).map((name, index) => (
                    <th
                      key={`${name}-${index}`}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                    >
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white  bg-opacity-90 divide-y divide-gray-200">
                {!dataSource.length ? (
                  <tr data-textid="empty-table-row">
                    <td colSpan={Object.keys(columns).length}>
                      <div className="p-10 text-center uppercase font-bold">
                        At the moment there are no planets to display
                      </div>
                    </td>
                  </tr>
                ) : null}
                {dataSource.map((planet, index) => (
                  <TableRow
                    key={`${planet.name}-${index}`}
                    columns={columns}
                    planet={planet}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
