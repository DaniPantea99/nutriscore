import React from 'react';
import { BsFillXCircleFill } from 'react-icons/bs';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { format2Decimals } from '../utility';
import { useTranslation } from 'react-i18next';

function Ingredient({ item, onChange, onRemove }) {
  const { t } = useTranslation();
  const Calories = () => {
    return (
      <div>
        <p>
          {t('ingredient.calories')} (100g):&nbsp;
          <span className={`${item.calories_100 ? '' : 'italic'}`}>
            {format2Decimals(item.calories_100 ? item.calories_100 : '0')}
            <span className="not-italic">&nbsp;kcal /&nbsp;</span>
            {format2Decimals(
              item.calories_100 ? item.calories_100 * 4.184 : '0'
            )}
            <span className="not-italic">&nbsp;kJ</span>
          </span>
        </p>
      </div>
    );
  };

  const Nutriments = () => {
    return (
      <div>
        <span>{t('ingredient.nutriments')} (100g): </span>
        {item.nutriments.length ? (
          <ul className="capitalize list-disc ml-7">
            {item?.nutriments.map((el, index) => (
              <li key={index}>
                {el.name}: {format2Decimals(el.quantity_100)}
              </li>
            ))}
          </ul>
        ) : (
          <span className="italic">{t('ingredient.infoUnavailable')}</span>
        )}
      </div>
    );
  };

  const Additives = () => {
    return (
      <div>
        <span>{t('ingredient.additives')}: </span>
        {item.additives ? (
          <ul className="capitalize list-disc ml-7">
            {item.additives.map((el, index) => (
              <li key={index}>{el.toString().slice(3)}</li>
            ))}
          </ul>
        ) : (
          <span className="italic">{t('ingredient.infoUnavailable')}</span>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`${
                open ? 'rounded-t-xl' : 'rounded-xl'
              } flex items-center w-full bg-blue-300 h-11 focus:outline-none hover:brightness-110 active:brightness-95`}
            >
              <ChevronUpIcon
                className={`${
                  open ? 'rotate-180 transform' : ''
                } h-5 w-5 text-blue-900 ml-1`}
              />
              <div className="flex items-center justify-between w-full gap-3 p-2">
                <div className="flex flex-col w-full">
                  <label
                    className="inline-block cursor-pointer"
                    htmlFor={item.productName}
                  >
                    <p className="w-24 overflow-hidden text-left first-letter:uppercase sm:w-full">
                      {item.productName}
                    </p>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    required
                    defaultValue={item.quantity}
                    className="w-24 p-1 px-2 mr-1 text-sm bg-gray-100 rounded-md outline-0 sm:mr-2 md:w-48 lg:w-32"
                    type="number"
                    placeholder={t('ingredient.inputPlaceholder')}
                    min="0.01"
                    max="9999.99"
                    step="0.01"
                    onWheel={(e) => e.target.blur()}
                    onChange={(e) => onChange(e.target.value, item)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <p>g</p>
                  <BsFillXCircleFill
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(item);
                    }}
                    className="ml-2 text-2xl text-red-700 transition-all cursor-pointer hover:text-red-500 active:text-red-900 sm:ml-6"
                  />
                </div>
              </div>
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 bg-white rounded-b-xl">
              <div className="mb-2">
                <p>
                  {t('ingredient.brand')}:&nbsp;
                  <span className={`${item.brand ? '' : 'italic'}`}>
                    {item.brand ? item.brand : t('ingredient.infoUnavailable')}
                  </span>
                </p>
                <Calories />
              </div>
              <Nutriments />
              <Additives />
              <div className="mt-2">
                <p>
                  {t('ingredient.source')}:&nbsp;
                  <span className={`${item.source ? '' : 'italic'}`}>
                    {item.source
                      ? item.source
                      : t('ingredient.infoUnavailable')}
                  </span>
                </p>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}

export default Ingredient;
