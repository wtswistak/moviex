class SearchView {
  searchBox = document.querySelector(".search");
  inputBox = document.querySelector(".header__input");

  createItem(movie) {
    return `<a class="movie-link search__item" data-movie-id=${movie.id} href="#${movie.title}">
    <img class="search__poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
    <p class="search__movie-title">${movie.title} </p>
    </a>
    `;
  }
  renderItems(data) {
    data.map((element) => {
      this.searchBox.insertAdjacentHTML("beforeend", this.createItem(element));
    });
  }

  inputListener(callback) {
    this.inputBox.addEventListener("input", () => {
      this.searchBox.classList.remove("hidden");
      this.searchBox.innerHTML = "";
      const inputValue = this.inputBox.value;

      callback(inputValue);
    });
  }
}
export default new SearchView();
