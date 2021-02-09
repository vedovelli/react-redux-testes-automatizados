import React, { useState } from 'react';
import FilterSelector from './dropdown';
import { COMPARISON_CRITERIA, PLANET_PROPERTIES } from './dropdown-utils';

const [columnInitialValue] = Object.keys(PLANET_PROPERTIES);
const [comparisonInitialValue] = Object.keys(COMPARISON_CRITERIA);

export default function FilterByNumericValue({ submitComparisonInfo }) {
  const [column, setColumn] = useState(columnInitialValue);
  const [comparison, setComparison] = useState(comparisonInitialValue);
  const [numeriValue, setNumericValue] = useState(0);

  const submitHandler = e => {
    e.preventDefault();
    if (numeriValue > 0) {
      submitComparisonInfo(column, comparison, numeriValue);
      setNumericValue(0);
      setColumn(columnInitialValue);
      setComparison(comparisonInitialValue);
    }
  };

  return (
    <form
      data-testid="filter-numeric-value-form"
      onSubmit={submitHandler}
      className="px-4 py-5 sm:p-6 text-gray-900"
    >
      <p className="block text-sm font-bold uppercase ml-1 text-gray-700">
        Comparison filter
      </p>
      <div className="grid grid-flow-row md:grid-flow-col gap-x-2 mb-2">
        <FilterSelector
          id="Columns"
          dataSource={PLANET_PROPERTIES}
          changeHandler={setColumn}
          selectedValue={column}
          testId="column-filter"
        />
        <FilterSelector
          id="Comparison"
          testId="comparison-filter"
          dataSource={COMPARISON_CRITERIA}
          changeHandler={setComparison}
          selectedValue={comparison}
        />
      </div>
      <input
        type="number"
        data-testid="value-filter"
        autoComplete="off"
        name="value"
        id="value"
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        placeholder="Type the information to compare"
        onChange={e => setNumericValue(e.target.value)}
        value={numeriValue}
      />
      <button
        type="submit"
        data-testid="button-filter"
        className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Apply
      </button>
    </form>
  );
}
