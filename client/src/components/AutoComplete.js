import React, { useState } from 'react';
import { debounce } from 'lodash';
import SearchField from './SearchField';
import ListItems from './ListItems';
import axios from 'axios';
import { InfoConsIngredientsURL } from '../api.js';

const DEBOUNCE = 500;
const searchFun = (queryParam, setResults, setIsLoading) => {
  axios
    .get(`${InfoConsIngredientsURL}?name=${queryParam}`)
    .then(({ data }) => {
      const currentData = data;
      const totalItems = currentData.data;
      setIsLoading(false);
      setResults(totalItems ? totalItems : []);
    });
};

const debouncedSearch = debounce(searchFun, DEBOUNCE);

const AutoComplete = ({ onAddNewIngredient }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const onSearch = (value) => {
    const search = debouncedSearch;
    if (!value) {
      debouncedSearch.cancel();
      setResults([]);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      search(value, setResults, setIsLoading);
    }
  };

  const selectedIngredientHandler = (ingredient) => {
    onAddNewIngredient(ingredient)
    setResults([])
  }

  return (
    <>
      <SearchField onSearch={onSearch} isLoading={isLoading} />
      {!!results.length && (
        <ListItems items={results} onSelect={selectedIngredientHandler} />
      )}
    </>
  );
};

export default AutoComplete;
