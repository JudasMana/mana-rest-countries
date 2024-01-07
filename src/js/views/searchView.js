import $ from "jquery";

class SearchView {
  addSearchHandler(handler) {
    $(".search").on("submit", (e) => {
      e.preventDefault();
      handler($(".search__bar").val());
    });
  }
}

export default new SearchView();
