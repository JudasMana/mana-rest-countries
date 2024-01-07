import * as Model from "./model.js";
import modeView from "./views/modeView";
import homeView from "./views/homeView.js";
import filterView from "./views/filterView.js";
import detailsView from "./views/detailsView.js";
import searchView from "./views/searchView.js";
import windowView from "./views/windowView.js";

const homePage = async function () {
  await homeView.renderHomePage(
    Model.state.homeCountries,
    Model.state.currentColorMode
  );
  searchView.addSearchHandler(controlSearchedCountry);
  filterView.addFilterHandler(controlFilter);
  homeView.addCountryHandler(controlCountryDetails);
};

const detailPage = async function (country, type = "search") {
  if (type === "search") await Model.getDataByName(country);
  if (type === "state") await Model.getDataFromState(country);
  await detailsView.renderDetailsPage(
    Model.state.detailCountry,
    Model.state.currentColorMode,
    Model.state.borderCountries
  );
  detailsView.addBackBtnHandler(controlBackButton);
  detailsView.addBordersHandler(controlSearchedCountry);
};

const controlColorMode = function () {
  modeView.switchMode(
    Model.state.currentColorMode === "light" ? "dark" : "light"
  );
  Model.state.currentColorMode = modeView.mode;
};

const initMode = function () {
  Model.state.currentColorMode = modeView.mode;
};

const controlFilter = function (region) {
  Model.filter(region);
  homeView.renderCountries(Model.state.filteredCountries);
};

const controlCountryDetails = async function (country) {
  homeView.renderSpinner(Model.state.currentColorMode);
  await Model.getDataFromState(country);
  await detailPage(country, "state");
};

const controlBackButton = async function () {
  homeView.renderSpinner(Model.state.currentColorMode);
  await homePage();
};

const controlSearchedCountry = async function (country) {
  homeView.renderSpinner(Model.state.currentColorMode);
  try {
    await detailPage(country);
  } catch (err) {
    await homePage();
    homeView.renderError();
  }
};

const controlWindow = async function (destination) {
  homeView.renderSpinner(Model.state.currentColorMode);
  if (destination === "") {
    await homePage();
  } else {
    await detailPage(destination);
  }
};

const init = async function () {
  modeView.initColorMode(initMode);
  await Model.getRandomCountries();
  await homePage();
  modeView.addHeaderHandler(controlColorMode);
  windowView.addWindowHandler(controlWindow);
};
init();
