import model from "./model";
import genreView from "./view/genreView";
import listView from "./view/listView";
import itemView from "./view/itemView";
class Controller {
  constructor(model, genreView, listView, itemView) {
    this.model = model;
    this.genreView = genreView;
    this.listView = listView;
    this.itemView = itemView;
  }

  async init() {
    const genres = await this.model.loadGenres();
    const popularList = await this.model.loadPopularList();

    this.genreView.render(genres);
    this.listView.renderList(popularList);
    this.genreView.genreListener(async (genreId) => {
      const moviesByGenre = await this.model.loadMoviesByGenre(genreId);
      console.log(moviesByGenre);
      this.genreView.renderItems(moviesByGenre);
    });

    this.listView.prevBtnListener();
    this.listView.nextBtnListener();
  }
}

const controller = new Controller(model, genreView, listView);
controller.init();
