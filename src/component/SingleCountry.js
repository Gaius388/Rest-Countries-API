import React, { useEffect } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useCountryContext } from "../context/country_context";

const SingleCountry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const populationInThousand = (population) => {
    return population?.toLocaleString("en-US");
  };
  const {
    single_country_loading: loading,
    single_country_error: error,
    single_countries: country,
    fetchSingleCountry,
  } = useCountryContext();

  useEffect(() => {
    fetchSingleCountry(
      `https://restcountries.com/v3.1/name/${id}?fullText=true`
    );
    // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate.push("/");
      }, 3000);
    }
    // eslint-disable-next-line
  }, [error]);

  if (loading) {
    return <div className="px-10">Loading...</div>;
  }
  if (error) {
    return <div className="px-10">Error...</div>;
  }
  const nameNative = (nativeName) => {
    const nativeNames = nativeName;
    const nativeNameCommon = Object.values(nativeNames)[0].common;
    return nativeNameCommon;
  };
  const capitals = (capital) => {
    if (capital.length > 1) {
      const manyCapital = [...capital].join(", ");
      return manyCapital;
    } else {
      return capital;
    }
  };
  const language = (languages) => {
    const lang = languages;
    const listOfLanguages = Object.values(lang).join(", ");
    return listOfLanguages;
  };
  const currency = (currencies) => {
    const curr = currencies;
    const currencyType = Object.values(curr)[0].name;
    return currencyType;
  };

  const {
    flags,
    name,
    population,
    region,
    subregion,
    tld,
    borders,
    languages,
    currencies,
    capital,
  } = country;

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
          <img src={flags.png} alt="flag" className="w-full h-[20rem]" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{name.common}</h1>
          <div className="py-8 grid md:grid-cols-2 gap-y-2">
            <p className="text-md font-medium">
              Native Name:{" "}
              <span className="font-normal text-sm">
                {nameNative(name.nativeName)}
              </span>
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
              <span className="font-normal text-sm">{capitals(capital)}</span>
            </p>
            <p className="text-md font-medium">
              Top Level Domain:{" "}
              <span className="font-normal text-sm">{tld}</span>
            </p>
            <p className="text-md font-medium">
              Currencies:{" "}
              <span className="font-normal text-sm">
                {currency(currencies)}
              </span>
            </p>
            <p className="text-md font-medium">
              Languages:{" "}
              <span className="font-normal text-sm">{language(languages)}</span>
            </p>
          </div>
          <div className="md:flex grid md:gap-2 gap-4 mt-4">
            <p className="text-md font-medium">Border Countries: </p>
            <div className="flex gap-1">
              {borders &&
                borders.map((item, index) => {
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
