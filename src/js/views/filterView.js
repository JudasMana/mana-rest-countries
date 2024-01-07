import $ from "jquery";

class FilterView {
  addFilterHandler(handler) {
    $(".filter").on("click", function () {
      $(".options").toggleClass("hidden");
    });

    $(".options").on("click", (e) => {
      const option = e.target.closest("li");
      if (!option) return;

      if (!$(option).hasClass("active__option")) {
        $("li").removeClass("active__option");
        $(option).addClass("active__option");
        handler(option.textContent);
      } else {
        $("li").removeClass("active__option");
        handler("");
      }

      $(".options").toggleClass("hidden");
    });
  }
}

export default new FilterView();
