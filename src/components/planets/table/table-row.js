import React from 'react';
import DOMPurify from 'dompurify';

export default function TableRow({ columns, planet }) {
  return (
    <tr data-testid="planet-row">
      {Object.keys(columns).map((property, index) => {
        let content = planet[property];

        if (Array.isArray(planet[property])) {
          content = planet[property].join('<br />');
        }

        if (property === 'created' || property === 'edited') {
          content = new Date(planet[property]).toLocaleString('pt-BR');
        }

        return (
          <td
            key={`${property}-${index}`}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
          ></td>
        );
      })}
    </tr>
  );
}
