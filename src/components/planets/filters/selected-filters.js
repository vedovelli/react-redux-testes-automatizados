import React from 'react';
import { PLANET_PROPERTIES, COMPARISON_CRITERIA } from './dropdown-utils';

export default function SelectedFilters({ list, removeHandler, clearHandler }) {
  return (
    <div className="px-4 py-5 sm:p-6 text-gray-900 lg:w-96">
      <ul data-testid="numeric-filter-selected-data">
        {list.map(({ column, comparison, value }, index) => {
          const label = `${PLANET_PROPERTIES[column]} ${COMPARISON_CRITERIA[comparison]} ${value}`;
          return (
            <li
              data-testid="filter"
              className="p-2 flex align-center cursor-pointer"
              key={`${column}-${value}-${index}`}
              onClick={() => {
                removeHandler({ column, comparison, value });
              }}
            >
              {label}
              <button>
                <svg
                  className="flex-shrink-0 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          );
        })}
        {list.length > 1 ? (
          <li
            data-testid="clear-all"
            onClick={() => {
              clearHandler();
            }}
            className="p-2 mt-6 flex align-center cursor-pointer"
          >
            clear all
            <button>
              <svg
                className="flex-shrink-0 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
