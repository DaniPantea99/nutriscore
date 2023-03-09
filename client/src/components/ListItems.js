import React from 'react';

const ListItems = ({ items, onSelect }) => {
  return (
    <ul className="w-full p-2 mt-1 bg-white h-[250px] dropdown-menu show rounded-xl overflow-auto">
      {items.map((item, index) => (
        <li
          key={item + index}
          className="p-1 cursor-pointer dropdown-item"
          onClick={() => onSelect(item)}
        >
          {item.product_name +
            ' - ' +
            (item.brands ? item.brands : item.creator)}
        </li>
      ))}
    </ul>
  );
};

export default ListItems;
