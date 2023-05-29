import ItemView from "./itemView";

class ListView extends ItemView {
  list = document.querySelector(".lists__list");
  prevButton = document.querySelector(".btn-prev");
  nextButton = document.querySelector(".btn-next");

  className = "lists__item";
  translateXValue = 0;
  tempXValue = 0;

  renderList(movies) {
    movies.map((movie) =>
      this.list.insertAdjacentHTML(
        "beforeend",
        this.renderItem(this.className, movie)
      )
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
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1000) this.tempXValue = -1400;
      if (windowWidth < 1000) this.tempXValue = -1700;
      if (windowWidth <= 500) this.tempXValue = -1800;
      this.translateXValue === this.tempXValue
        ? (this.translateXValue = this.tempXValue)
        : (this.translateXValue -= 100);
      listItems.forEach(
        (item) =>
          (item.style.transform = `translateX(${this.translateXValue}%)`)
      );
    });
  }
}
export default new ListView();
