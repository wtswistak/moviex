class ListView {
  list = document.querySelector(".lists__list");

  prevButton = document.querySelector(".btn-prev");
  nextButton = document.querySelector(".btn-next");
  translateXValue = 0;

  renderItem(movie) {
    return `<div class="lists__item">
    <a class="lists__link" href="#">
      <figure>
        <img class="lists__poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="movie-poster" />
        <figcaption class="lists__title">${movie.title}</figcaption>
      </figure>
    </a>
    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon-star" viewBox="0 0 512 512"><path d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/></svg>

  </div>`;
  }

  renderList(movies) {
    movies.map((movie) =>
      this.list.insertAdjacentHTML("beforeend", this.renderItem(movie))
    );
  }

  prevBtnListener() {
    this.prevButton.addEventListener("click", () => {
      const listItems = document.querySelectorAll(".lists__item");
      this.translateXValue === 0
        ? (this.translateXValue = 0)
        : (this.translateXValue += 100);
      listItems.forEach(
        (item) =>
          (item.style.transform = `translateX(${this.translateXValue}%)`)
      );
    });
  }
  nextBtnListener() {
    this.nextButton.addEventListener("click", () => {
      const listItems = document.querySelectorAll(".lists__item");
      this.translateXValue === -1400
        ? (this.translateXValue = -1400)
        : (this.translateXValue -= 100);
      listItems.forEach(
        (item) =>
          (item.style.transform = `translateX(${this.translateXValue}%)`)
      );
    });
  }
}
export default new ListView();
