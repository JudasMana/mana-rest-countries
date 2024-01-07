import * as data from "../../data.json";
import { numberOfCountries, baseURL } from "./config";
import $ from "jquery";

export const state = {
  currentColorMode: "light",
  homeCountries: [],
  filteredCountries: [],
  currentFilter: "",
  borderCountries: [],
  detailCountry: {},
};

export const setColorMode = function (mode) {
  state.currentColorMode = mode;
};

const getRandomNumbers = function () {
  const randArr = [];

  while (randArr.length < numberOfCountries) {
    const randNum = Math.floor(Math.random() * 250);
    if (randArr.indexOf(randNum) >= 0) continue;
    randArr.push(randNum);
  }
  return randArr;
};

export const getRandomCountries = async function () {
  const randArr = getRandomNumbers();
  const data = await getAllCountries();
  const randomCountries = data.filter((_, i) => randArr.includes(i));
  state.homeCountries = randomCountries;
};

const getAllCountries = async function () {
  try {
    return await $.ajax(`${baseURL}all`);
  } catch (err) {
    throw err;
  }
};

export const filter = function (region) {
  state.currentFilter = region.trim();
  if (region === "") {
    state.filteredCountries = state.homeCountries;
    return;
  }
  state.filteredCountries = state.homeCountries.filter(
    (country) => country.region === state.currentFilter
  );
};

const getBorderCountries = async function (countryData) {
  if (!countryData.borders) {
    return [];
  }
  return await $.ajax(
    `${baseURL}/alpha?codes=${countryData.borders.join(",")}`
  );
};

export const getDataFromState = async function (countryName) {
  state.detailCountry = state.homeCountries.find(
    (country) => country.name.common === countryName
  );

  state.borderCountries = await getBorderCountries(state.detailCountry);
};

export const getDataByName = async function (countryName) {
  try {
    [state.detailCountry] = await $.ajax(
      `${baseURL}/name/${countryName.toLowerCase()}`
    );

    state.borderCountries = await getBorderCountries(state.detailCountry);
  } catch (err) {
    throw err;
  }
};
