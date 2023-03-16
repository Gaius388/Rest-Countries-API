import React from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { useCountryContext } from '../context/country_context';


const Filter = () => {
     const {
       filters: { search },
       region,
       updateFilters,
       updateSearch,
       countries_duplicate,
    } = useCountryContext();
    
    const unique = countries_duplicate.map((item) => item["region"]);
    const uniqueNames = ["Filter by Region", ...new Set(unique)];
  return (
    <form className="flex md:flex-row flex-col items-center md:justify-between gap-y-4 my-10 md:h-14">
      <div className="rounded-md md:w-[25rem] w-full border-1 dark:border-darkColor shadow-lg flex h-full items-center py-2 md:py-0">
        <AiOutlineSearch className="w-1/6" />
        <input
          type="text"
          name="search"
          placeholder="Search for a country..."
          className="w-5/6 outline-none dark:text-darkTextColor dark:bg-darkColor"
          value={search}
          onChange={updateSearch}
        />
      </div>
      <div className="border dark:border-darkColor md:ml-auto md:mr-0 mr-auto rounded-md shadow-md w-[15rem] grid h-full font-medium py-2 md:py-0">
        <select
          name="region"
          className="w-full outline-none px-4 dark:text-darkTextColor dark:bg-darkColor "
          value={region}
          onChange={updateFilters}
        >
          {uniqueNames.map((names, index) => {
            return (
              <option className="font-medium" value={names} key={index}>
                {names}
              </option>
            );
          })}
        </select>
      </div>
      <div></div>
    </form>
  );
}

export default Filter