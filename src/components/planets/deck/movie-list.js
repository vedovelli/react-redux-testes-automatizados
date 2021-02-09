import React from 'react';

export default function MovieList({ films }) {
  return (
    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
      {films.map((film, index) => {
        return (
          <li
            key={`${film}-${index}`}
            className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
          >
            <div className="w-0 flex-1 flex items-center">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                />
              </svg>
              <span className="ml-2 flex-1 w-0 truncate">{film}</span>
            </div>
            <div className="ml-4 flex-shrink-0">
              <a
                href={film}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Visit
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
