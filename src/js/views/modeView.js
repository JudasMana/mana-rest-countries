import * as $ from "jquery";

class ModeView {
  header = $("header");

  initColorMode(handler) {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this._switchIconsColor();
      this.mode = "dark";
    } else {
      this.mode = "light";
    }
    handler();
  }

  addHeaderHandler(handler) {
    this.header.on("click", function (e) {
      const btn = e.target.closest(".mode");
      if (!btn) return;
      handler();
    });
  }

  switchMode(mode) {
    this.mode = mode;
    $("html").attr("mode", this.mode);
    this._switchIconsColor();
  }

  _switchIconsColor() {
    $(".icon").toggleClass("dark__icon");
  }
}

export default new ModeView();
