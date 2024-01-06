import * as data from "../../data.json";
import { numberOfCountries } from "./config";

export const state = {
  currentColorMode: "light",
  homeCountries: [],
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

export const getRandomCountries = function () {
  const randArr = getRandomNumbers();
  const randomCountries = data.filter((_, i) => randArr.includes(i));
  state.homeCountries = randomCountries;
};
