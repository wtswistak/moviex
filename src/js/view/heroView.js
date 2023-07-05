import View from "./View";

class HeroView extends View {
  parentEl = document.querySelector(".hero");
  container = document.querySelector(".block");
  bannerEl = document.querySelector(".banner");
  searchBox = document.querySelector(".search");
  exitIcon = document.querySelector(".search__icon");

  removeHidden() {
    this.parentEl.classList.remove("hidden");
  }

  createHeroElement(movie, crew) {
    const actors = this.getActors(crew);
    const director = this.getDirector(crew);
    const genres = movie.genres.map((genre) => genre.name).join(", ");

    return `
    <img class="hero__img" src="https://image.tmdb.org/t/p/w500/${
      movie.poster_path
    }" alt="movie-poster"/>
    <div class="hero__movie-data">
      <h1 class="hero__title">${movie.title}</h1>
      <div class="hero__details">
        <span class="hero__year">${movie.release_date.split("-")[0]}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon-star" viewBox="0 0 512 512"><path d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="64"/></svg>
        <span class="hero__vote">${movie.vote_average.toFixed(1)}</span>
      </div>
      <p class="hero__genres">${genres}</p>
      <p class="hero__overview">${movie.overview}</p>
      <p class="hero__sm-header">Cast</p>
      <p class="hero__bottom-paragraph">${actors}</p>
      <p class="hero__sm-header">Director</p>
      <p class="hero__bottom-paragraph">${director}</p>
    </div>`;
  }

  heroItemListener(callback) {
    this.container.addEventListener("click", (e) => {
      const movieLink = e.target.closest(".movie-link");
      if (movieLink) {
        this.searchBox.classList.add("opacity-none");
        this.exitIcon.classList.add("opacity-none");

        const targetId = parseInt(movieLink.dataset.movieId);
        callback(targetId);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }
  renderBgImage(movie) {
    this.parentEl.style.setProperty(
      "--background-image",
      `url("https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}")`
    );
  }

  renderHero(movie, crew) {
    this.removeHidden();
    this.parentEl.innerHTML = "";
    this.bannerEl.classList.add("hidden");
    this.renderBgImage(movie);
    this.parentEl.insertAdjacentHTML(
      "afterbegin",
      this.createHeroElement(movie, crew)
    );
  }
}

export default new HeroView();
