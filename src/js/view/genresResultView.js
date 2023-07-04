import View from "./View";

class GenresResultView extends View {
  loadBtn = document.querySelector(".genres-results__load-btn");
  item = "genres-results__item";
  parentEl = document.querySelector(".genres-results__box");
  banerEl = document.querySelector(".banner");
  heroEl = document.querySelector(".hero");

  renderItems(movies) {
    this.hideElements();
    movies.map((movie) =>
      this.parentEl.insertAdjacentHTML(
        "beforeend",
        this.renderItem(this.item, movie)
      )
    );
  }

  hideElements() {
    this.banerEl.classList.add("hidden");
    this.heroEl.classList.add("hidden");
  }

  btnListener(callback) {
    this.loadBtn.addEventListener("click", () => {
      callback();
    });
  }
}

export default new GenresResultView();
