import * as Model from "./model.js";
import modeView from "./views/modeView";
import homeView from "./views/homeView.js";

const controlColorMode = function () {
  modeView.switchMode(
    Model.state.currentColorMode === "light" ? "dark" : "light"
  );
  Model.state.currentColorMode = modeView.mode;
  console.log(Model.state.currentColorMode);
};

const initMode = function () {
  Model.state.currentColorMode = modeView.mode;
  console.log(Model.state.currentColorMode);
};

const init = function () {
  modeView.initColorMode(initMode);
  Model.getRandomCountries();
  homeView.renderHomePage(
    Model.state.homeCountries,
    Model.state.currentColorMode
  );
  modeView.addHeaderHandler(controlColorMode);
};
init();
