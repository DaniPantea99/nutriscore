import React from 'react';
import { useTranslation } from 'react-i18next';
import { Fragment, useState } from 'react';
import { Combobox, Transition, Switch } from '@headlessui/react';
import {
  CheckIcon,
  ChevronUpDownIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/20/solid';

const languages = [
  { key: 'en', value: 'English' },
  { key: 'ro', value: 'Romanian' },
];

function Settings() {
  const { t, i18n } = useTranslation();
  // const [selected, setSelected] = useState(languages[0]);
  const [query, setQuery] = useState('');
  const [enabled, setEnabled] = useState(
    localStorage.getItem('darkMode') === 'true' ? true : false
  );

  const filteredLanguages =
    query === ''
      ? languages
      : languages.filter((lang) =>
          lang.value
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const onLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="min-h-screen p-8 duration-100 dark:text-gray-100 dark:bg-slate-900">
      <img className='inline mr-2' width="50px" src="./images/nutriscore-app-logo.png" alt="nutriscore-app-logo" />
      <h2 className="inline text-gray-900 dark:text-gray-100">
        {t('settingsPage.title')}
      </h2>
      <div className="p-4 w-44">
        <Combobox
          value={
            languages.find((language) => language.key === i18n.resolvedLanguage)
              ?.value
          }
          onChange={(lng) => onLanguageChange(lng)}
        >
          <Combobox.Label>{t('settingsPage.language')}</Combobox.Label>
          <div className="relative mt-1">
            <div className="relative w-full text-left bg-white rounded-lg shadow-md cursor-default sm:text-sm">
              <Combobox.Input className="w-full py-2 pl-3 pr-10 overflow-hidden text-sm leading-5 text-gray-900 border-none rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600" />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="w-5 h-5 text-gray-400"
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
              <Combobox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-1 sm:text-sm">
                {filteredLanguages.length === 0 && query !== '' ? (
                  <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                    Nothing found.
                  </div>
                ) : (
                  filteredLanguages.map((lang) => (
                    <Combobox.Option
                      key={lang.key}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-blue-300 text-white' : 'text-gray-900'
                        }`
                      }
                      value={lang.key}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {lang.value}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-white' : 'text-blue-400'
                              }`}
                            >
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
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
        <div className="mt-5">
          <Switch.Group>
            <div className="flex flex-col items-center">
              <Switch.Label className="mr-4">
                {t('settingsPage.themeSwitcher')}
              </Switch.Label>
              <Switch
                checked={enabled}
                onChange={(isChecked) => {
                  setEnabled(isChecked);
                  if (isChecked === true) {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('darkMode', true);
                  } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('darkMode', false);
                  }
                }}
                className={`${
                  enabled
                    ? 'bg-gradient-to-t from-blue-300 to-blue-500 hover:bg-gradient-to-t hover:from-blue-400 hover:to-blue-500'
                    : 'bg-gradient-to-t from-blue-300 to-blue-500 hover:bg-gradient-to-t  hover:from-blue-300 hover:to-blue-400'
                }
                relative inline-flex h-[26.5px] w-[63px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-color duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span
                  aria-hidden="true"
                  className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
                  pointer-events-none bg-white dark:bg-slate-900 inline-block h-[24px] w-[24px] transform rounded-full  shadow-lg ring-0`}
                >
                  {enabled && <MoonIcon />}
                  {!enabled && <SunIcon />}
                </span>
              </Switch>
            </div>
          </Switch.Group>
        </div>
      </div>
    </div>
  );
}

export default Settings;
