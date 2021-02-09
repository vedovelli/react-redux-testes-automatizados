import React from 'react';

export default function FilterByName({ submitName }) {
  const changeHandler = e => {
    submitName(e.target.value);
  };

  return (
    <div className="px-4 py-4 text-gray-900">
      <label
        htmlFor="name"
        className="font-bold block text-sm uppercase ml-1 text-gray-700"
      >
        Search
      </label>
      <div className="mt-1">
        <input
          type="search"
          data-testid="name-filter"
          autoComplete="off"
          name="name"
          id="name"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="Type the planet's name"
          onChange={changeHandler}
        />
      </div>
    </div>
  );
}
