import View from "./View";
class BannerView extends View {
  parentEl = document.querySelector(".banner");
  bannerBox = document.querySelector(".banner__box");
  sliderBox = document.querySelector(".banner__slider");

  renderBgImage(movie) {
    this.parentEl.style.setProperty(
      "--background-image",
      `url("https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}")`
    );
  }
  createBannerEl(movie) {
    return `
    <h2 class="banner__heading animated">Upcoming!</h2>
    <h1 class="banner__title animated">${movie.title}</h1>
    <div class="banner__details animated">
      <span class="banner__year animated" >${movie.release_date}</span>
    </div>
    <p class="banner__overview animated">${movie.overview}</p>`;
  }

  renderBannerEl(movie) {
    this.bannerBox.innerHTML = "";
    this.renderBgImage(movie);
    this.bannerBox.insertAdjacentHTML("afterbegin", this.createBannerEl(movie));
  }
  createSliderItem(movie) {
    return `<a class="movie-link-slider" data-movie-id=${movie.id} href="#${movie.title}">
     <img class="banner__poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="movie-poster" />
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

export default new BannerView();
