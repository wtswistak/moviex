import View from "./View";

class GenresResultView extends View {
  loadBtn = document.querySelector(".genres-results__load-btn");
  itemClass = "genres-results__item";
  itemsBox = document.querySelector(".genres-results__box");

  renderItems(movies) {
    movies.map((movie) =>
      this.itemsBox.insertAdjacentHTML(
        "beforeend",
        this.renderItem(this.itemClass, movie)
      )
    );
  }

  btnListener(callback) {
    this.loadBtn.addEventListener("click", () => {
      callback();
    });
  }
}

export default new GenresResultView();
