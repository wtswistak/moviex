import model from "./model";
import genreView from "./view/genreView";
import listView from "./view/listView";
class Controller {
  constructor(model, genreView, listView) {
    this.model = model;
    this.genreView = genreView;
    this.listView = listView;
  }

  async init() {
    const genres = await this.model.loadGenres();
    const popularList = await this.model.loadPopularList();

    this.genreView.render(genres);
    this.listView.renderList(popularList);

    this.listView.prevBtnListener();
    this.listView.nextBtnListener();
  }
}

const controller = new Controller(model, genreView, listView);
controller.init();
