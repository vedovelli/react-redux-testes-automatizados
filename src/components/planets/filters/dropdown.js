import React from 'react';

export default function FilterSelector({
  id = '',
  testId = '',
  label = null,
  dataSource,
  changeHandler,
  selectedValue = '',
}) {
  return (
    <>
      {label ? (
        <label
          htmlFor={label}
          className="block text-sm font-bold uppercase ml-1 text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <select
        onChange={e => {
          changeHandler(e.target.value);
        }}
        data-testid={testId}
        value={selectedValue}
        id={id}
        name={id}
        className="capitalize mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {Object.entries(dataSource).map(([key, value], index) => (
          <option value={key} key={`${key}-${index}`}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
}
