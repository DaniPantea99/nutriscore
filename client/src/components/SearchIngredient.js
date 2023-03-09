import React, { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export default function SearchIngredient({ onAddNewIngredient }) {
  const [query, setQuery] = useState('');
  const { filtered } = useSelector((state) => state.ingredients);
  const { t } = useTranslation();
  const filteredItems =
    query === ''
      ? filtered
      : filtered.filter((item) =>
          item.product_name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <div className="flex w-full h-12">
      <Combobox onChange={(ingredient) => onAddNewIngredient(ingredient)}>
        <div className="relative w-full">
          <div className="relative w-full text-left cursor-default ">
            <Combobox.Input
              className="w-full h-full p-3 pr-10 text-base leading-5 text-gray-900 bg-white rounded-xl input focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder={t('editRecipe.placeholderSecond')}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="w-5 h-5 text-gray-600"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute z-40 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredItems.length === 0 && query !== '' ? (
                <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                  {t('editRecipe.nothingFound')}
                </div>
              ) : (
                filteredItems.map((item) => (
                  <Combobox.Option
                    key={item.product_name}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 capitalize ${
                        active ? 'bg-blue-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {item.product_name}
                          {item.brands.length > 0
                            ? ` - ${item.brands}`
                            : ` - ${item.creator}`}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-blue-600'
                            }`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
