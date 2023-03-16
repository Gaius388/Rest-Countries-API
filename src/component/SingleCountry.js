import React, { useEffect } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import { useCountryContext } from "../context/country_context";

const SingleCountry = () => {
  const populationInThousand = (population) => {
    return population?.toLocaleString("en-US");
  };
  const {
    single_countries: country,
    single_country_loading: loading,
    single_country_error: error,
    fetchSingleCountry,
  } = useCountryContext();
  const { id } = useParams();

  useEffect(() => {
    fetchSingleCountry(`${id}`);
    // eslint-disable-next-line
  }, [id]);

  if (loading) {
    return <div className="px-10">Loading...</div>;
  }
  if (error) {
    return <div className="px-10">Error...</div>;
  }
  const commonName = country[0].name.common;
  const region = country[0].region;
  const subregion = country[0].subregion;
  const capital = country[0].capital;
  const manyCapital = [...capital].join(", ");
  const population = country[0].population;
  const tld = country[0].tld[0];
  const languages = country[0].languages;
  const listOfLanguages = Object.values(languages).join(", ");
  const currency = country[0].currencies;
  const currencyType = Object.values(currency)[0].name;
  const nativeName = country[0].name.nativeName;
  const nativeNameCommon = Object.values(nativeName)[0].common;
  const border = country[0].borders;
  const flag = country[0].flags.png;

  return (
    <section className="px-10 dark:bg-darkColor dark:text-darkTextColor font-nunito text-lightTextColor pt-12 min-h-screen">
      <Link
        to="/"
        className="flex items-center gap-2 md:mb-12 border dark:border-darkColor shadow-lg rounded-md py-1.5 w-[8rem] justify-center"
      >
        <HiArrowNarrowLeft />
        <span className="text-sm">Back</span>
      </Link>
      <main className="grid md:grid-cols-2 md:grid-rows-1 grid-rows-2 items-center gap-10">
        <div>
          <img src={flag} alt="flag" className="w-full h-[20rem]" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{commonName}</h1>
          <div className="py-8 grid md:grid-cols-2 gap-y-2">
            <p className="text-md font-medium">
              Native Name:{" "}
              <span className="font-normal text-sm">{nativeNameCommon}</span>
            </p>
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
              Sub Region:{" "}
              <span className="font-normal text-sm">{subregion}</span>
            </p>
            <p className="text-md font-medium">
              Capital:{" "}
              <span className="font-normal text-sm">{manyCapital}</span>
            </p>
            <p className="text-md font-medium">
              Top Level Domain:{" "}
              <span className="font-normal text-sm">{tld}</span>
            </p>
            <p className="text-md font-medium">
              Currencies:{" "}
              <span className="font-normal text-sm">{currencyType}</span>
            </p>
            <p className="text-md font-medium">
              Languages:{" "}
              <span className="font-normal text-sm">{listOfLanguages}</span>
            </p>
          </div>
          <div className="md:flex grid md:gap-2 gap-4 mt-4">
            <p className="text-md font-medium">Border Countries: </p>
            <div className="flex gap-1">
              {border &&
                border.map((item, index) => {
                  return (
                    <p
                      className="rounded-md shadow-lg px-4 border dark:border-darkColor"
                      key={index}
                    >
                      {item}
                    </p>
                  );
                })}
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default SingleCountry;
