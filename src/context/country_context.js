import React, { useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/country_reducer";
import {
  GET_COUNTRY_DATA_BEGIN,
  GET_COUNTRY_DATA_SUCCESS,
  GET_COUNTRY_DATA_ERROR,
  GET_SEARCH_RESULT,
  GET_FILTER_RESULT,
  SEARCH_PRODUCTS,
  FILTER_PRODUCTS,
  GET_SINGLE_COUNTRY_DATA_BEGIN,
  GET_SINGLE_COUNTRY_DATA_SUCCESS,
  GET_SINGLE_COUNTRY_DATA_ERROR,
} from "../action";

const initialState = {
  country_loading: false,
  country_error: false,
  countries: [],
  single_country_loading: false,
  single_country_error: false,
  single_countries: {},
  countries_duplicate: [],
  region: "Filter by Region",
  filters: {
    search: "",
  },
};

const CountryContext = React.createContext();

export const CountryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchCountryData = async () => {
    dispatch({ type: GET_COUNTRY_DATA_BEGIN });
    try {
      const response = await fetch(`https://restcountries.com/v3.1/all`);
      const data = await response.json();
      console.log(data);
      dispatch({ type: GET_COUNTRY_DATA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_COUNTRY_DATA_ERROR });
    }
  };
  const fetchSingleCountry = async (name) => {
    dispatch({ type: GET_SINGLE_COUNTRY_DATA_BEGIN });
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}?fullText=true`
      );
      const data = await response.json();
      dispatch({ type: GET_SINGLE_COUNTRY_DATA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_COUNTRY_DATA_ERROR });
    }
  };
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
  }, [state.region]);
  useEffect(() => {
    dispatch({ type: SEARCH_PRODUCTS });
  }, [state.filters]);
  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    dispatch({ type: GET_FILTER_RESULT, payload: { name, value } });
  };
  const updateSearch = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    dispatch({ type: GET_SEARCH_RESULT, payload: { name, value } });
  };

  useEffect(() => {
    fetchCountryData();
  }, []);
  return (
    <CountryContext.Provider
      value={{ ...state, updateFilters, updateSearch, fetchSingleCountry }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export const useCountryContext = () => {
  return useContext(CountryContext);
};
