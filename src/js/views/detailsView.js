import $ from "jquery";
import backArrow from "../../../assets/icons/back-arrow.svg";

class DetailsView {
  renderDetailsPage(countryData, mode, borderCountriesData) {
    window.history.pushState(null, "", `/${countryData.name.common}`);
    scrollTo(0, 0);
    const _generateDetailsMarkup = this._generateDetailsMarkup.bind(this);
    return new Promise(function (resolve, _) {
      $("main").html(
        _generateDetailsMarkup(countryData, mode, borderCountriesData)
      );
      resolve();
    });
  }

  addBackBtnHandler(handler) {
    $(".back__button").on("click", () => {
      window.history.pushState(null, "", `/`);
      scrollTo(0, 0);
      handler();
    });
  }

  addBordersHandler(handler) {
    $(".border__countries").on("click", function (e) {
      const country = e.target.closest(".border__country");
      if (!country) return;

      handler(country.dataset.country);
    });
  }

  _generateBorderCountriesMarkup(countryData, borderCountriesData) {
    if (!countryData.borders) {
      return `<p class="opacity-70">No borders or no border data available</p>`;
    }
    return `${borderCountriesData
      .map((border) => {
        return `
        <div
        class="flex items-center justify-center px-4 rounded-sm border__country h-7 lg:h-6 lg:max-w-16 min-w-max hover:cursor-pointer" data-country="${border.name.official}"
        > 
            <p class="text-xs lg:text-[0.6rem] opacity-70">${border.name.common}</p>
         </div>
        `;
      })
      .join("")}`;
  }

  _generateDetailsMarkup(countryData, mode, borderCountriesData) {
    const populationFormat = new Intl.NumberFormat("it-IT", {});
    return `
        <section class="flex flex-col w-full results">
                <div
                class="flex items-center justify-center h-8 gap-2 mt-10 rounded-sm hover:cursor-pointer w-28 back__button"
                >
                <img
                src="${backArrow}"
                alt=""
                class="h-5 arrow__back brightness-0 icon ${
                  mode === "dark" ? "dark__icon" : ""
                }"
            />
            <p class="text-sm opacity-70">Back</p>
            </div>
            <div
            class="flex flex-col w-full pt-12 lg:py-16 md:flex-row md:items-center country__page md:gap-12 lg:gap-24"
            >
            <div class="w-full mt-12 md:m-0 flag">
                <img
                src="${countryData.flags.png}"
                alt=""
                class="w-full flag__image max-w-80 md:max-w-full"
                />
            </div>
            <div
                class="flex flex-col items-start w-full mt-12 lg:m-0 country__info"
            >
                <p class="text-xl font-bold country__name">${
                  countryData.name.official
                }</p>
                <div
                class="flex flex-col items-start w-full gap-12 my-8 text-sm md:text-xs sm:flex-row country__stats md:my-8 lg:my-6"
                >
                <ul class="space-y-3 lg:space-y-2 sm:w-[50%]">
                    <li>
                    Native Name:
                    <span class="native__name opacity-70">${
                      Object.values(countryData.name.nativeName)[0].official
                    }</span>
                    </li>
                    <li>
                    Population:
                    <span class="population opacity-70">${populationFormat.format(
                      countryData.population
                    )}</span>
                    </li>
                    <li>
                    Region: <span class="stat__region opacity-70">${
                      countryData.region
                    }</span>
                    </li>
                    <li>
                    Sub Region:
                    <span class="sub__region opacity-70">${
                      countryData.subregion
                    }</span>
                    </li>
                    <li>
                    Capital: <span class="stat__capital opacity-70">${
                      countryData.capital
                        ? countryData.capital.join(", ")
                        : "No capital data found"
                    }</span>
                    </li>
                </ul>
                <ul class="space-y-3 lg:space-y-2 sm:w-[50%]">
                    <li>
                    Top Level Domain: <span class="domain opacity-70">${
                      countryData.tld ? countryData.tld[0] : "No TLD"
                    }</span>
                    </li>
                    <li>
                    Currencies: <span class="currencies opacity-70">${Object.values(
                      countryData.currencies
                    )
                      .map((curr) => curr.name)
                      .join(", ")}</span>
                    </li>
                    <li>
                    Languages: <span class="languages opacity-70">${Object.values(
                      countryData.languages
                    ).join(", ")}</span>
                    </li>
                </ul>
                </div>
                <div class="flex flex-col w-full gap-4 borders lg:flex-row">
                <p class="w-max text-nowrap lg:text-sm">Border Countries:</p>
                <div
                    class="flex flex-wrap pb-12 lg:pb-0 border__countries gap-x-2 gap-y-2"
                >
                    ${this._generateBorderCountriesMarkup(
                      countryData,
                      borderCountriesData
                    )}
                </div>
                </div>
            </div>
            </div>  
        </section>
        `;
  }
}

export default new DetailsView();
