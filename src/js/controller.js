"use strict";
import model from "./model";
import genreView from "./view/genreView";
import listView from "./view/listView";
import genresResultView from "./view/genresResultView";
import heroView from "./view/heroView";
import banerView from "./view/banerView";
import searchView from "./view/searchView";

class Controller {
  constructor(
    model,
    genreView,
    listView,
    genresResultView,
    heroView,
    banerView,
    searchView
  ) {
    this.model = model;
    this.genreView = genreView;
    this.listView = listView;
    this.genresResultView = genresResultView;
    this.heroView = heroView;
    this.banerView = banerView;
    this.searchView = searchView;
    this.pageNum = 1;
  }

  async init() {
    const genres = await this.model.loadGenres();
    const popularList = await this.model.loadPopularList();
    const upcomingList = await this.model.loadUpcomingList();

    this.searchView.inputListener(async (movieName) => {
      const searchData = await this.model.searchMovie(`${movieName}`);
      this.searchView.renderItems(searchData);
    });

    // console.log(upcomingList);
    // console.log(upcomingList[0]);
    this.banerView.renderBanerEl(upcomingList[2]);

    this.genreView.render(genres);
    this.genreView.showBtnListener();
    this.genreView.hideBtnListener();

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
      const crew = await this.model.loadCrew(id);
      this.heroView.renderHero(movieData, crew);
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
  heroView,
  banerView,
  searchView
);
controller.init();
