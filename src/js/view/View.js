export default class View {
  renderItem(className, movie) {
    return `<div class="${className}">
    <a class="movie-link" data-movie-id="${movie.id}" href="#${movie.title}">
      <figure>
        <img class="lists__poster" src="https://image.tmdb.org/t/p/w500/${
          movie.poster_path
        }" alt="movie-poster" />
        <figcaption class="lists__title">${movie.title}</figcaption>
      </figure>
    </a>
    <div class="lists__bottom-box">
     <div class="lists__icon-rate-box">
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon-star" viewBox="0 0 512 512"><path d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="64"/></svg>
        <span class="lists__rate">${movie.vote_average} </span>
     </div>
      <span class="lists__year">${movie.release_date.split("-")[0]}</span>
    </div>
  </div>`;
  }
  renderLoadingDots() {
    return `<div class="loading-dots">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>`;
  }
  deleteLoadingDots() {
    const loadingDots = document.querySelector(".loading-dots");
    loadingDots.remove();
  }

  getDirector(crew) {
    const director = crew.crew.find((item) => item.job === "Director").name;
    return director;
  }
  getActors(crew) {
    const actors = crew.cast
      .slice(0, 8)
      .map((actor) => actor.original_name)
      .join(", ");
    return actors;
  }
}
