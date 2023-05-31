class GenreView {
  genresBox = document.querySelector(".genres__list");
  headerName = document.querySelector(".genres-results__header");
  itemsBox = document.querySelector(".genres-results__box");
  parentEl = document.querySelector(".genres-results");

  genreId;

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
}

export default new GenreView();
