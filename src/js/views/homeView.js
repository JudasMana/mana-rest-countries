import $ from "jquery";
import lens from "../../../assets/icons/search.svg";
import downArrow from "../../../assets/icons/down-arrow.svg";

class HomeView {
  renderHomePage(countries, mode) {
    $(window).on("load", () => {
      $("main").append(this._generateHomePageMarkup(countries, mode));
    });
  }

  _generateCountryGridMarkup(countries) {
    return countries
      .map((country) => {
        return this._generateCountryMarkup(country);
      })
      .join("");
  }

  _generateCountryMarkup(countryData) {
    const populationFormat = new Intl.NumberFormat("it-IT", {});
    const name =
      countryData.name.length > 22
        ? `${countryData.name.slice(0, 22)}...`
        : countryData.name;

    return `
        <div
        class="flex flex-col w-full overflow-hidden rounded-md card lg:w-64 max-w-64 hover:cursor-pointer">
        <div class=" w-full overflow-hidden" style="height: 150px;">
            <img
            src="${countryData.flags.png}"
            alt=""
            class="flag block w-full h-full" style="object-fit: cover"
            />
        </div>

        <div class="pt-6 pb-10 pl-6 card__body">
        <h1 class="mb-4 text-lg font-bold country__name">${name}</h1>
        <ul class="card__info list-none space-y-1.5">
            <li class="text-sm population">
            Population: <span class="data opacity-70">${populationFormat.format(
              countryData.population
            )}</span>
            </li>
            <li class="text-sm region">
            Region: <span class="data opacity-70">${countryData.region}</span>
            </li>
            <li class="text-sm capital">
            Capital: <span class="data opacity-70">${countryData.capital}</span>
            </li>
        </ul>
        </div>
    </div>
    `;
  }

  _generateHomePageMarkup(countries, mode) {
    return `
    <section class="flex flex-col items-center w-full h-full">
    <div
      class="flex flex-col items-center justify-center w-full gap-10 mt-6 lg:flex-row lg:mb-8t"
    >
      <div class="relative w-full search">
        <input
          placeholder="Search for a country..."
          type="text"
          class="w-full h-12 pl-16 text-xs lg:text-sm rounded lg:w-[29rem] search__bar"
        />
        <img
          src="${lens}"
          alt=""
          class="absolute top-0 bottom-0 w-6 my-auto brightness-0 left-6 icon ${
            mode === "dark" ? "dark__icon" : ""
          }"
        />
      </div>
      <div
        class="relative w-full mb-8 lg:mb-0 lg:w-min filter__container h-14"
      >
        <div
          class="flex items-center justify-between h-full pl-6 pr-4 rounded filter w-52 lg:w-48"
        >
          <p class="text-xs filter__text lg:text-sm">Filter by Region</p>
          <img
            src="${downArrow}"
            alt=""
            class="w-4 lg:w-5 arrow icon ${mode === "dark" ? "dark__icon" : ""}"
          />
        </div>
        <ul
          class="absolute left-0 hidden py-4 pl-6 my-1 space-y-2 text-xs list-none rounded lg:text-sm options w-52 lg:w-48"
        >
          <li class="opacity-70 hover:opacity-100 hover:cursor-pointer">
            Africa
          </li>
          <li class="opacity-70 hover:opacity-100 hover:cursor-pointer">
            America
          </li>
          <li class="opacity-70 hover:opacity-100 hover:cursor-pointer">
            Asia
          </li>
          <li class="opacity-70 hover:opacity-100 hover:cursor-pointer">
            Europe
          </li>
          <li class="opacity-70 hover:opacity-100 hover:cursor-pointer">
            Oceania
          </li>
        </ul>
      </div>
    </div>
    <section
      class="flex flex-wrap items-center w-full py-10 justify-around card__container gap-y-10 gap-x-auto"
    >
        ${this._generateCountryGridMarkup(countries)}
    </section>
  </section>
    `;
  }
}

export default new HomeView();
