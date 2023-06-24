import View from "./View";
class BanerView extends View {
  parentEl = document.querySelector(".baner");
  banerBox = document.querySelector(".baner__box");
  sliderBox = document.querySelector(".baner__slider");

  renderBgImage(movie) {
    this.parentEl.style.setProperty(
      "--background-image",
      `url("https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}")`
    );
  }
  render;
  createBanerEl(movie) {
    return `<p class="baner__title animated">${movie.title}</p>
    <div class="baner__details animated">
      <span class="hero__year animated" >${movie.release_date}</span>
    </div>

    <p class="baner__overview animated">${movie.overview}</p>`;
  }

  renderBanerEl(movie) {
    this.banerBox.innerHTML = "";
    this.renderBgImage(movie);
    this.banerBox.insertAdjacentHTML("afterbegin", this.createBanerEl(movie));
  }
  createSliderItem(movie) {
    return `<a class="movie-link-slider" data-movie-id=${movie.id} href="#${movie.title}">
  <img class="baner__poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="movie-poster" />
</a>`;
  }

  renderSliderItems(movies) {
    movies.forEach((el) => {
      this.sliderBox.insertAdjacentHTML("beforeend", this.createSliderItem(el));
    });
  }

  sliderItemsListner(callback) {
    const sliderItems = document.querySelectorAll(".movie-link-slider");
    sliderItems[0].classList.add("active");
    this.sliderBox.addEventListener("click", (e) => {
      const movieLink = e.target.closest(".movie-link-slider");
      if (!movieLink) return;
      const targetId = parseInt(movieLink.dataset.movieId);
      callback(targetId);

      sliderItems.forEach((el) => {
        parseInt(el.dataset.movieId) === targetId
          ? el.classList.add("active")
          : el.classList.remove("active");
      });
    });
  }
}

export default new BanerView();
