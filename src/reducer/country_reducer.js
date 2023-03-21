import {
  GET_COUNTRY_DATA_BEGIN,
  GET_COUNTRY_DATA_SUCCESS,
  GET_COUNTRY_DATA_ERROR,
  GET_SINGLE_COUNTRY_DATA_BEGIN,
  GET_SINGLE_COUNTRY_DATA_SUCCESS,
  GET_SINGLE_COUNTRY_DATA_ERROR,
  GET_SEARCH_RESULT,
  GET_FILTER_RESULT,
  FILTER_PRODUCTS,
  SEARCH_PRODUCTS,
} from "../action";

const country_reducer = (state, action) => {
  if (action.type === GET_COUNTRY_DATA_BEGIN) {
    return { ...state, country_loading: true, country_error: false };
  }
  if (action.type === GET_COUNTRY_DATA_SUCCESS) {
    return {
      ...state,
      country_loading: false,
      country_error: false,
      countries: action.payload,
      countries_duplicate: [...action.payload],
    };
  }
  if (action.type === GET_COUNTRY_DATA_ERROR) {
    return {
      ...state,
      country_loading: false,
      country_error: true,
    };
  }
  if (action.type === GET_SINGLE_COUNTRY_DATA_BEGIN) {
    return {
      ...state,
      single_country_loading: true,
    };
  }
  if (action.type === GET_SINGLE_COUNTRY_DATA_SUCCESS) {
    return {
      ...state,
      single_country_loading: false,
      single_countries: action.payload,
    };
  }
  if (action.type === GET_SINGLE_COUNTRY_DATA_ERROR) {
    return {
      ...state,
      single_country_loading: false,
      single_country_error: true,
    };
  }
  if (action.type === GET_SEARCH_RESULT) {
    const { name, value } = action.payload;
    return {
      ...state,
      filters: { ...state.filters, [name]: value },
    };
  }
  if (action.type === GET_FILTER_RESULT) {
    const { name, value } = action.payload;
    return {
      ...state,
      [name]: value,
    };
  }
  if (action.type === FILTER_PRODUCTS) {
    const { countries_duplicate, region } = state;

    let tempCountry = [...countries_duplicate];
    if (region !== "Filter by Region") {
      tempCountry = tempCountry.filter((country) => {
        return country.region === region;
      });
    }
    return { ...state, countries: tempCountry };
  }
  if (action.type === SEARCH_PRODUCTS) {
    const { countries_duplicate } = state;
    const { search } = state.filters;

    let tempCountry = [...countries_duplicate];
    // searchBar
    if (search.length > 2) {
      tempCountry = tempCountry.filter((country) => {
        const { common } = country.name;
        return common.toLowerCase().startsWith(search);
      });
    }
    return { ...state, countries: tempCountry };
  }

  throw new Error(`No matching '${action.type}' - action type`);
};

export default country_reducer;
