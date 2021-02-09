import React, { useState } from 'react';
import FilterSelector from './dropdown';
import { ORDER_SELECTOR_LIST } from './dropdown-utils';

export default function Sorter({ submitSortInfo }) {
  const [sortProperty, setSortProperty] = useState('name');
  const [sortOrder, setSortOrder] = useState('ASC');
  const submitHandler = e => {
    e.preventDefault();
    submitSortInfo(sortProperty, sortOrder);
  };

  return (
    <form
      data-testid="sorter-form"
      className="px-4 pb-5 text-gray-900"
      onSubmit={submitHandler}
    >
      <FilterSelector
        label="Sorting"
        dataSource={ORDER_SELECTOR_LIST}
        changeHandler={setSortProperty}
        testId="column-sort"
        selectedValue={sortProperty}
      />
      <div className="my-3">
        <label htmlFor="asc" className="pr-3">
          <input
            type="radio"
            id="asc"
            name="sortOrder"
            value="ASC"
            defaultChecked={true}
            data-testid="column-sort-input"
            onChange={e => {
              setSortOrder(e.target.value);
            }}
          />{' '}
          ASC
        </label>
        <label htmlFor="desc">
          <input
            type="radio"
            id="desc"
            name="sortOrder"
            value="DESC"
            data-testid="column-sort-input"
            onChange={e => {
              setSortOrder(e.target.value);
            }}
          />{' '}
          DESC
        </label>
      </div>
      <button
        type="submit"
        data-testid="column-sort-button"
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Apply
      </button>
    </form>
  );
}
