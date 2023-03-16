import React from "react";
import { useCountryContext } from "../context/country_context";
import { Link } from "react-router-dom";
import Filter from "./Filter";

const CountryList = () => {
  const {
    country_loading: loading,
    country_error: error,
    countries,
  } = useCountryContext();
  const populationInThousand = (population) => {
    return population.toLocaleString("en-US");
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }

  return (
    <section>
      <Filter />
      <article className="flex flex-row flex-wrap gap-8 justify-center">
        {countries.map((country, index) => {
          const { flags, population, name, capital, region } = country;
          return (
            <Link
              to={`/${name.common}`}
              className="w-5/6 md:w-[15rem] 2xl:w-[17rem] h-[21rem] border dark:border-darkColor rounded-md shadow-md"
              key={index}
            >
              <img
                src={flags.png}
                alt={name.common}
                className="h-[50%] w-full rounded-t-md"
              />
              <div className="px-6 pt-5">
                <h1 className="font-bold text-lg pb-1">{name.common}</h1>
                <p className="text-md font-medium">
                  Population:{" "}
                  <span className="font-normal text-sm">
                    {populationInThousand(population)}
                  </span>
                </p>
                <p className="text-md font-medium">
                  Region: <span className="font-normal text-sm">{region}</span>
                </p>
                <p className="text-md font-medium">
                  Capital:{" "}
                  <span className="font-normal text-sm md:text-xs">
                    {capital}
                  </span>
                </p>
              </div>
            </Link>
          );
        })}
      </article>
    </section>
  );
};

export default CountryList;
