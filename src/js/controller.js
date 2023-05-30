import model from "./model";
import genreView from "./view/genreView";
import listView from "./view/listView";
import genresResultView from "./view/genresResultView";
import heroView from "./view/heroView";
class Controller {
  constructor(model, genreView, listView, genresResultView, heroView) {
    this.model = model;
    this.genreView = genreView;
    this.listView = listView;
    this.genresResultView = genresResultView;
    this.heroView = heroView;
    this.pageNum = 1;
  }

  async init() {
    const genres = await this.model.loadGenres();
    const popularList = await this.model.loadPopularList();

    this.genreView.render(genres);
    this.listView.renderList(popularList);
    this.genreView.genreListener(async (genreId) => {
      this.pageNum = 1;
      const moviesByGenre = await this.model.loadMoviesByGenre(
        genreId,
        this.pageNum
      );

      this.genresResultView.renderItems(moviesByGenre);
      this.pageNum++;
    });

    this.genresResultView.btnListener(async () => {
      let genreId = genreView.getGenreId();
      const moviesByGenre = await this.model.loadMoviesByGenre(
        genreId,
        this.pageNum
      );
      this.pageNum++;
      this.genresResultView.renderItems(moviesByGenre);
    });

    this.heroView.heroItemListener(async (id) => {
      const movieData = await this.model.loadMovieData(id);
      console.log(movieData);
      this.heroView.renderHero(movieData);
    });

    this.listView.prevBtnListener();
    this.listView.nextBtnListener();
  }
}

const controller = new Controller(
  model,
  genreView,
  listView,
  genresResultView,
  heroView
);
controller.init();
