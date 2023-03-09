import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from 'react-table';
import { useMemo, useCallback } from 'react';
import { FaSearch, FaSortUp, FaSortDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function InputGroup7({
  label,
  name,
  value,
  onChange,
  type = 'text',
  decoration,
  className = '',
  inputClassName = '',
  decorationClassName = '',
  disabled,
}) {
  return (
    <div
      className={`flex flex-row-reverse items-stretch w-full rounded-xl overflow-hidden bg-blue-200 shadow-[0_4px_10px_rgba(0,0,0,0.03)] = ${className}`}
    >
      <input
        id={name}
        name={name}
        value={value}
        type={type}
        placeholder={label}
        aria-label={label}
        onChange={onChange}
        className={`peer block w-full p-3 focus:outline-none dark:placeholder:text-gray-500 focus:ring-0 appearance-none bg-blue-200 dark:bg-blue-400 ${
          disabled ? 'bg-gray-200' : ''
        } ${inputClassName}`}
        disabled={disabled}
      />
      <div
        className={`flex items-center pl-3 py-3 text-red-400${
          disabled ? 'bg-gray-200' : ''
        } ${decorationClassName}`}
      >
        {decoration}
      </div>
    </div>
  );
}

function GlobalSearchFilter1({
  globalFilter,
  setGlobalFilter,
  className = '',
}) {
  const { t } = useTranslation();

  return (
    <InputGroup7
      name="search"
      value={globalFilter || ''}
      onChange={(e) => setGlobalFilter(e.target.value)}
      label={t('recipeList.searchInput')}
      decoration={
        <FaSearch size="1rem" className="text-gray-400 dark:text-gray-600" />
      }
      className={className}
    />
  );
}

export default function RecipesTable({ onRemoveRecipe, onSelect }) {
  const { filteredRecipes } = useSelector((state) => state.recipes);
  const { t } = useTranslation();

  
  const generateData = ({ filteredRecipes }) =>  
    filteredRecipes?.map((item) => ({
      _id: item._id,
      name: item.name,
      qty: item.quantity,
      calories: item.nutriments.calories,
      nutriscore: item.nutriscore,
      date: item.date,
    }));
  
  const viewMoreHandler = useCallback(
    (recipe) => {
      const selected = filteredRecipes.find((el) => el._id === recipe._id);
      onSelect(selected);
    },
    [filteredRecipes, onSelect]
  );

  const getColumns = () => [
    {
      Header: t('recipeList.header.name'),
      accessor: 'name',
    },
    {
      Header: t('recipeList.header.qty'),
      accessor: 'qty',
    },
    {
      Header: t('recipeList.header.cal'),
      accessor: 'calories',
    },
    {
      Header: t('recipeList.header.ntrs'),
      accessor: 'nutriscore',

      Cell: ({ cell }) => {
        return (
          <div>
            <img
              width="70px"
              src={`./images/nutriscore/nutriscore_${cell.value.toLowerCase()}.svg`}
              alt={`logo-nutriscore`}
            />
          </div>
        );
      },
    },
    {
      Header: t('recipeList.header.date'),
      accessor: 'date',
    },
    {
      Header: t('recipeList.header.action'),
      accessor: 'action',

      Cell: ({ cell }) => {
        return (
          <div className="z-0 flex items-center justify-between gap-2">
            <button
              className="px-4 py-2 text-xs text-white bg-orange-500 rounded-lg outline-none hover:opacity-70 active:opacity-100"
              onClick={() => viewMoreHandler(cell.row.original)}
            >
              {t('recipesOption.openBtn')}
            </button>
            <button
              className="px-4 py-2 text-xs text-white bg-gray-400 rounded-lg outline-none hover:bg-red-400 active:bg-red-500"
              onClick={() => onRemoveRecipe(cell.row.original)}
            >
              {t('recipesOption.removeBtn')}
            </button>
          </div>
        );
      },
      disableSortBy: true,
    },
  ];

  function TableComponent({
    getTableProps,
    headerGroups,
    getTableBodyProps,
    rows,
    prepareRow,
  }) {
    return (
      <div className="overflow-auto">
        <table
          {...getTableProps()}
          className="w-full border-separate border-spacing-y-2"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="sticky z-20 top-2"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-4 py-2 text-xs uppercase bg-blue-200 cursor-pointer first:rounded-tl-xl last:rounded-tr-xl dark:bg-blue-400"
                    style={{ width: column.width }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-left">
                        {column.render('Header')}
                      </div>
                      {!column.disableSortBy && (
                        <div className="flex flex-col">
                          <FaSortUp
                            className={`text-sm translate-y-1/2 ${
                              column.isSorted && !column.isSortedDesc
                                ? 'text-red-300'
                                : 'text-white'
                            }`}
                          />
                          <FaSortDown
                            className={`text-sm -translate-y-1/2 ${
                              column.isSortedDesc
                                ? 'text-red-300'
                                : 'text-white'
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="overflow-visible bg-blue-200 h-11 dark:bg-blue-400"
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="px-4 py-2 text-sm font-medium first-letter:uppercase first:rounded-l-xl last:rounded-r-xl"
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  const data = useMemo(
    () => generateData({ filteredRecipes }),
    [filteredRecipes]
  );

  const columns = useMemo(getColumns, [viewMoreHandler, onRemoveRecipe, t]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    setGlobalFilter,
    rows,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className="flex flex-col gap-4 overflow-hidden sm:py-0">
      <div className="flex flex-col justify-between gap-2 sm:flex-row">
        <GlobalSearchFilter1
          className="sm:w-64 dark:bg-blue-400"
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <TableComponent
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        getTableBodyProps={getTableBodyProps}
        rows={rows}
        prepareRow={prepareRow}
      />
    </div>
  );
}
