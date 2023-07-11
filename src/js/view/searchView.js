import View from "./View";

class SearchView extends View {
  logoBox = document.querySelector(".header__logo-box");
  form = document.querySelector(".header__form");
  inputIcons = document.querySelectorAll(".header__icon");
  searchBox = document.querySelector(".search");
  inputBox = document.querySelector(".header__input");
  searchExitIcon = document.querySelector(".search__icon");
  searchIcon = document.querySelector(".header__icon-search");
  exitInputIcon = document.querySelector(".header__icon-exit");

  createItem(movie) {
    let imgSrc = "";
    movie.poster_path === null
      ? (imgSrc = "https://i.postimg.cc/MKHNR9Zp/image-error.jpg")
      : (imgSrc = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`);

    return `<a class="movie-link search__item" data-movie-id=${movie.id} href="#${movie.title}">
    <img class="search__poster" src=${imgSrc} alt="${movie.title} poster">
    <p class="search__movie-title">${movie.title} </p>
    </a>
    `;
  }
  renderItems(data) {
    if (!data.length) {
      this.searchBox.innerHTML = "No results";
      this.searchBox.classList.add("search--no-results");
    } else {
      this.searchBox.innerHTML = "";
      this.searchBox.classList.remove("search--no-results");

      data.map((element) => {
        this.searchBox.insertAdjacentHTML(
          "beforeend",
          this.createItem(element)
        );
      });
    }
  }

  inputListener(callback) {
    this.inputBox.addEventListener("input", () => {
      this.searchBox.classList.remove("opacity-none");
      this.searchExitIcon.classList.remove("opacity-none");

      const inputValue = this.inputBox.value;
      if (inputValue.length === 0) {
        this.searchBox.classList.add("opacity-none");
        this.searchExitIcon.classList.add("opacity-none");
      }

      callback(inputValue);
    });
  }

  exitListener() {
    this.searchExitIcon.addEventListener("click", () => {
      this.searchBox.classList.add("opacity-none");
      this.searchExitIcon.classList.add("opacity-none");
    });
  }
  searchIconListener() {
    this.searchIcon.addEventListener("click", () => {
      if (window.innerWidth > 600) return;
      this.logoBox.classList.add("hidden");
      this.form.classList.add("header__form-edit");
      this.inputBox.classList.add("header__input-edit");
      this.inputIcons.forEach((el) => {
        el.classList.toggle("hidden");
      });
    });
  }

  exitInputListener() {
    this.exitInputIcon.addEventListener("click", () => {
      this.logoBox.classList.remove("hidden");
      this.form.classList.remove("header__form-edit");
      this.inputBox.classList.remove("header__input-edit");
      this.inputIcons.forEach((el) => {
        el.classList.toggle("hidden");
      });
    });
  }
}
export default new SearchView();
