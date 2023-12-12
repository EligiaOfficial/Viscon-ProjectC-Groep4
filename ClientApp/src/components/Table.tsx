import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowIcon from "../assets/icons/arrow.svg";
import searchIcon from "../assets/icons/search.svg";
import crossIcon from "../assets/icons/cross.svg";
import { useTranslation } from "react-i18next";

type TableProps = {
  data: any[];
  uid: string;
};

type FilterType = {
  category: string;
  term: string;
};

function Table(props: TableProps) {
  const [keys, setKeys] = useState<string[]>([]);
  const nav = useNavigate();
  const [sort, setSort] = useState<string>("");
  const [ascending, setAscending] = useState<boolean>(true);
  const [textSearch, setTextSearch] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [filteredData, setFiltererdData] = useState<any[]>([]);
  const [filters, setFilters] = useState<FilterType[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    if (
      props.data != undefined &&
      props.data != null &&
      props.data.length > 0
    ) {
      setKeys(Object.keys(props.data[0]));
      sortData(Object.keys(props.data[0])[0], true);
      setSort(Object.keys(props.data[0])[0]);
      setFiltererdData(props.data);
    }
  }, [props]);

  const sortData = (key: string, ascend: boolean) => {
    if (typeof props.data[0][key] === "number") {
      if (ascend) {
        props.data.sort((a, b) => a[key] - b[key]);
      } else {
        props.data.sort((a, b) => b[key] - a[key]);
      }
    } else {
      if (ascend) {
        props.data.sort((a, b) => a[key].localeCompare(b[key]));
      } else {
        props.data.sort((a, b) => b[key].localeCompare(a[key]));
      }
    }
  };

  const handleSort = (key: string) => {
    if (sort == key) {
      setAscending(!ascending);
      sortData(key, !ascending);
    } else {
      setAscending(true);
      sortData(key, true);
    }
    setSort(key);
  };

  const applyFilterOnData = (data: any[], category: string, text: string) => {
    if (category != "All") {
      let filteredArray: any[] = [];
      filteredArray = data.filter((ticket) =>
        ticket[category]
          .toString()
          .toLowerCase()
          .includes(text.toString().toLowerCase())
      );
      return filteredArray;
    }
    // If category = "All"
    return filterAll(data, text);
  };

  const filterAll = (data: any[], text: string) => {
    let filteredArray: any[] = [];
    data.forEach((ticket) =>
      keys.forEach((key) =>
        ticket[key]
          .toString()
          .toLowerCase()
          .includes(text.toString().toLowerCase())
          ? filteredArray.some((item) => item[props.uid] == ticket[props.uid])
            ? ""
            : filteredArray.push(ticket)
          : ""
      )
    );
    return filteredArray;
  };

  const removeFilter = (filter: FilterType) => {
    let newFilters = filters.filter(
      (item: FilterType) =>
        item.category != filter.category || item.term != filter.term
    );
    setFilters(newFilters);
    reapplyFilters(newFilters);
  };

  const reapplyFilters = (newFilters: FilterType[]) => {
    let newData = props.data;
    newFilters.forEach((filter) => {
      newData = applyFilterOnData(newData, filter.category, filter.term);
    });
    setFiltererdData(newData);
  };

  const handleSearch = () => {
    // Eliminate duplicate filter
    if (
      filters.some(
        (filter) =>
          filter.category == categoryFilter && filter.term == textSearch
      )
    ) {
      return;
    }
    setFiltererdData(
      applyFilterOnData(filteredData, categoryFilter, textSearch)
    );
    setFilters([...filters, { category: categoryFilter, term: textSearch }]);
    setTextSearch("");
  };

  return (
    <>
      {props.data == undefined ? (
        <>No data to show.</>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-5 gap-x-4">
            <span className="col-start-1 col-span-2 font-semibold dark:text-stone-200">
              {t("tickets.table.title")}
            </span>
            <span className="col-start-3 col-span-1 font-semibold dark:text-stone-200">
              {t("tickets.table.category")}
            </span>
            <input
              onChange={(e) => setTextSearch(e.target.value)}
              value={textSearch}
              className="col-start-1 col-span-2 outline-none rounded-md px-2"
              onKeyDown={(e) => {
                e.key == "Enter" ? handleSearch() : "";
              }}
            />
            <select
              onChange={(e) => setCategoryFilter(e.target.value)}
              onKeyDown={(e) => {
                e.preventDefault();
                e.key == "Enter" ? handleSearch() : "";
              }}
              className="col-start-3 col-span-1 outline-none rounded-md px-1"
            >
              <option>{t("tickets.table.all")}</option>
              {keys.map((key) => (
                <option key={key} value={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </option>
              ))}
            </select>
            <div
              onClick={() => {
                handleSearch();
              }}
              className="flex flex-row gap-1 dark:hover:text-stone-200 font-semibold w-fit rounded-md border dark:hover:border-white dark:hover:bg-stone-600 px-2 py-1 cursor-pointer duration-200 bg-white active:scale-95 select-none"
            >
              <img
                className="w-[20px] max-w-[20px] min-w-[20px]"
                src={searchIcon}
              />
              <span className="">{t("tickets.table.search")}</span>
            </div>
          </div>
          <div className="flex flex-row gap-1">
            {filters.map((filter) => (
              <div
                key={filter.category + ":" + filter.term}
                className="flex flex-row bg-stone-400 rounded-md w-fit"
              >
                <span className="font-semibold p-1 select-none">
                  {filter.category + ': "' + filter.term + '"'}
                </span>
                <img
                  onClick={() => removeFilter(filter)}
                  className="w-[24px] cursor-pointer scale-90 hover:scale-100 duration-100 select-none"
                  src={crossIcon}
                />
              </div>
            ))}
          </div>
          <div className="bg-white w-full overflow-auto">
            <table className="w-full select-none">
              <tbody>
                <tr className="text-left">
                  {keys.map((key) => (
                    <th
                      className={`${
                        key == sort
                          ? "hover:bg-stone-500 bg-stone-400 dark:hover:bg-stone-600 dark:bg-stone-700 dark:text-white active:bg-stone-500"
                          : "hover:bg-stone-300 dark:bg-stone-400 active:bg-white"
                      }  duration-300 p-1 cursor-pointer border border-stone-300 dark:border-stone-600`}
                      onClick={() => handleSort(key)}
                      key={key}
                    >
                      <div className="flex flex-row justify-between">
                        <span className="">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </span>
                        {key == sort ? (
                          <img
                            className={`translate duration-200 min-w-[24px] max-w-[24px] dark:invert`}
                            src={arrowIcon}
                            style={{ transform: ascending ? "" : "scaleY(-1)" }}
                          />
                        ) : (
                          <div className="min-w-[24px] max-w-[24px]" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
                {filteredData.map((ticket: any) => (
                  <tr
                    key={ticket[props.uid]}
                    className="hover:bg-stone-300 cursor-pointer translate duration-100 border border-stone-200 active:bg-stone-100 dark:bg-stone-400 dark:border-stone-600"
                    onClick={() => nav(`/ticket?id=${ticket[props.uid]}`)}
                  >
                    {keys.map((key) => (
                      <td
                        className="p-1 border border-white dark:border-stone-600"
                        key={ticket[props.uid] + key}
                      >
                        {key === "created"
                          ? // Format the date if the key is 'date'
                            (() => {
                              const date = new Date(ticket[key]);
                              return new Intl.DateTimeFormat("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }).format(date);
                            })()
                          : // Display the value as is for other keys
                            ticket[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Table;
