import $ from "jquery";

class WindowView {
  addWindowHandler = function (handler) {
    ["load", "popstate"].forEach((event) => {
      $(window).on(event, function () {
        console.log(window.history);
        console.log(window.location.pathname);
        const destination = window.location.pathname.slice(1);
        handler(destination);
      });
    });
  };
}

export default new WindowView();
