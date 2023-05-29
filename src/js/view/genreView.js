import ItemView from "./itemView";

class GenreView extends ItemView {
  genresBox = document.querySelector(".genres__list");
  parentEl = document.querySelector(".genres-results");
  itemsBox = document.querySelector(".genres-results__box");
  headerName = document.querySelector(".genres-results__header");

  className = "genres-results__item";
  createGenre(genre) {
    return `<li class="genres__list-item">
    <a class="genres__link" data-genre-id=${genre.id} href="#">${genre.name}</a>
  </li>`;
  }
  render(genres) {
    genres.map((genre) =>
      this.genresBox.insertAdjacentHTML("beforeend", this.createGenre(genre))
    );
  }
  genreListener(renderElements) {
    const genresArray = document.querySelectorAll(".genres__link");
    genresArray.forEach((element) =>
      element.addEventListener("click", (e) => {
        const active = document.querySelector(".genres__link--active");
        if (active) {
          active.classList.remove("genres__link--active");
        }
        e.target.classList.add("genres__link--active");
        console.log(e.target);
        const targetId = parseInt(e.target.dataset.genreId);
        const genreName = e.target.innerText;

        this.headerName.innerHTML = `${genreName} movies`;
        renderElements(targetId);
      })
    );
  }

  renderItems(movies) {
    this.parentEl.classList.remove("hidden");
    this.itemsBox.innerHTML = "";
    movies.map((movie) =>
      this.itemsBox.insertAdjacentHTML(
        "beforeend",
        this.renderItem(this.className, movie)
      )
    );
  }
}

export default new GenreView();
