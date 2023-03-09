import React from 'react';

const SearchField = ({ onSearch, isLoading }) => {
  return (
    <div className="relative flex input-group">
      <input
        className="w-full h-12 p-3 form-control rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
      />
      {isLoading && (
        <span className="absolute z-50 right-3 top-3">Loading...</span>
      )}
    </div>
  );
};

export default SearchField;
