import React from 'react';
import Card from './card';

export default function Deck({ dataSource }) {
  return (
    <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {dataSource.map(planet => (
        <Card planet={planet} key={planet.id} />
      ))}
    </ul>
  );
}
