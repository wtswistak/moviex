class GenreView {
  genresBox = document.querySelector(".genres__list");
  headerName = document.querySelector(".genres-results__header");
  itemsBox = document.querySelector(".genres-results__box");
  parentEl = document.querySelector(".genres-results");
  listsBox = document.querySelector(".lists");
  genresContainer = document.querySelector(".genres");

  genreId;

  showBtn = document.querySelector(".right-chevron");
  hideBtn = document.querySelector(".left-chevron");

  createGenre(genre) {
    return `<li class="genres__list-item">
    <a class="genres__link" data-genre-id=${
      genre.id
    } href="#${genre.name.toLowerCase()}">${genre.name}</a>
  </li>`;
  }
  render(genres) {
    genres.map((genre) =>
      this.genresBox.insertAdjacentHTML("beforeend", this.createGenre(genre))
    );
  }

  activeCheck(e) {
    const active = document.querySelector(".genres__link--active");
    if (active) {
      active.classList.remove("genres__link--active");
    }
    e.target.classList.add("genres__link--active");
  }

  genreListener(callback) {
    const genresArray = document.querySelectorAll(".genres__link");

    genresArray.forEach((element) =>
      element.addEventListener("click", (e) => {
        this.listsBox.classList.add("hidden");
        this.activeCheck(e);
        this.parentEl.classList.remove("hidden");
        this.itemsBox.innerHTML = "";

        const targetId = parseInt(e.target.dataset.genreId);
        this.genreId = targetId;
        const genreName = e.target.innerText;
        this.headerName.innerHTML = `${genreName} movies`;
        callback(targetId);
      })
    );
  }

  getGenreId() {
    return this.genreId;
  }

  btnToggler() {
    this.showBtn.classList.toggle("opacity-none");
    this.hideBtn.classList.toggle("opacity-none");
  }
  showBtnListener() {
    this.showBtn.addEventListener("click", () => {
      this.btnToggler();
      this.genresContainer.classList.add("show");
    });
  }
  hideBtnListener() {
    this.hideBtn.addEventListener("click", () => {
      this.btnToggler();
      this.genresContainer.classList.remove("show");
    });
  }
}

export default new GenreView();
