class GenreView {
  genresBox = document.querySelector(".genres__list");

  createGenre(genre) {
    return `<li class="genres__list-item">
    <a class="genres__link" href="#">${genre.name}</a>
  </li>`;
  }
  render(genres) {
    genres.map((genre) =>
      this.genresBox.insertAdjacentHTML("beforeend", this.createGenre(genre))
    );
  }
}

export default new GenreView();
