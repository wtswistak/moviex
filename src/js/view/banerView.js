import View from "./View";
class BanerView extends View {
  parentEl = document.querySelector(".baner");

  renderBgImage(movie) {
    this.parentEl.style.setProperty(
      "--background-image",
      `url("https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}")`
    );
  }
  render;
  createBanerEl(movie) {
    return `<p class="baner__title">${movie.title}</p>
    <div class="baner__details">
      <span class="hero__year">${movie.release_date}</span>
    </div>

    <p class="baner__overview">${movie.overview}</p>`;
  }

  renderBanerEl(movie) {
    this.parentEl.innerHTML = "";
    this.renderBgImage(movie);
    this.parentEl.insertAdjacentHTML("afterbegin", this.createBanerEl(movie));
  }
}

export default new BanerView();
