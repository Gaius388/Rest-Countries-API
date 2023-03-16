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
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }
  const singleCountry = country[0]
  const {
    name,
    population,
    region,
    subregion,
    capital,
    tld,
    languages,
    currencies,
  } = country;

  console.log(singleCountry);

  return (
    <section>
      <Link
        to="/"
        className="flex items-center gap-2 mb-12 md:my-12 border dark:border-darkColor shadow-lg rounded-md py-1.5 w-[8rem] justify-center"
      >
        <HiArrowNarrowLeft />
        <span className="text-sm">Back</span>
      </Link>
      <main className="grid md:grid-cols-2 grid-rows-2 items-center gap-10">
        <div className="border">
          <img src="" alt="" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{name?.common}</h1>
          <div className="py-8 grid md:grid-cols-2 gap-y-2">
            <p className="text-md font-medium">
              Native Name:{" "}
              <span className="font-normal text-sm">{name?.nativeName}</span>
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
              Capital: <span className="font-normal text-sm">{capital}</span>
            </p>
            <p className="text-md font-medium">
              Top Level Domain:{" "}
              <span className="font-normal text-sm">{tld}</span>
            </p>
            <p className="text-md font-medium">
              Currencies:{" "}
              <span className="font-normal text-sm">{currencies}</span>
            </p>
            <p className="text-md font-medium">
              Languages:{" "}
              <span className="font-normal text-sm">{languages}</span>
            </p>
          </div>
          <div className="md:flex grid md:gap-2 gap-4 mt-4">
            <p className="text-md font-medium">Border Countries: </p>
            <div className="flex">
              <p className="rounded-md shadow-lg px-4 border dark:border-darkColor">
                France
              </p>
              <p className="rounded-md shadow-lg px-4 border dark:border-darkColor">
                France
              </p>
              <p className="rounded-md shadow-lg px-4 border dark:border-darkColor">
                France
              </p>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default SingleCountry;
