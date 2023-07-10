"use strict";
import model from "./model";
import genreView from "./view/genreView";
import listView from "./view/listView";
import genresResultView from "./view/genresResultView";
import heroView from "./view/heroView";
import bannerView from "./view/bannerView";
import searchView from "./view/searchView";

class Controller {
  constructor(
    model,
    genreView,
    listView,
    genresResultView,
    heroView,
    bannerView,
    searchView
  ) {
    this.model = model;
    this.genreView = genreView;
    this.listView = listView;
    this.genresResultView = genresResultView;
    this.heroView = heroView;
    this.bannerView = bannerView;
    this.searchView = searchView;
    this.pageNum = 1;
  }

  async init() {
    const genres = await this.model.fetchGenres();
    const popularList = await this.model.fetchPopularMovies();
    const upcomingList = await this.model.fetchUpcomingMovies();

    this.bannerView.renderBannerEl(upcomingList.at(0));
    bannerView.renderSliderItems(upcomingList);

    this.bannerView.sliderItemsListner(async (id) => {
      const movieData = await this.model.fetchMovieData(id);
      this.bannerView.renderBannerEl(movieData);
    });

    this.genreView.render(genres);
    this.genreView.showBtnListener();
    this.genreView.hideBtnListener();

    this.listView.renderList(popularList);
    this.listView.listsBox.style.display = "block";
    this.genreView.genreListener(async (genreId) => {
      this.pageNum = 1;
      const moviesByGenre = await this.model.fetchMoviesByGenre(
        genreId,
        this.pageNum
      );
      this.genreView.deleteLoadingDots();
      this.genresResultView.renderItems(moviesByGenre);
      this.pageNum++;
    });

    this.genresResultView.btnListener(async () => {
      let genreId = genreView.getGenreId();
      const moviesByGenre = await this.model.fetchMoviesByGenre(
        genreId,
        this.pageNum
      );
      this.pageNum++;
      this.genresResultView.renderItems(moviesByGenre);
      this.genreView.deleteLoadingDots();
    });

    this.heroView.handleMoviesLinks(async (id) => {
      const movieData = await this.model.fetchMovieData(id);
      const crew = await this.model.fetchMovieCrew(id);
      const similarMovies = await this.model.fetchSimilarMovies(id);

      this.heroView.renderHero(movieData, crew);
      this.genreView.parentEl.classList.add("hidden");
      this.listView.renderList(similarMovies);
      this.listView.listTitle.innerHTML = "Similar movies";
    });

    this.searchView.inputListener(async (movieName) => {
      const searchData = await this.model.searchMoviesByQuery(`${movieName}`);
      this.searchView.renderItems(searchData);
    });
    this.searchView.exitListener();
    this.searchView.searchIconListener();
    this.searchView.exitInputListener();

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
  bannerView,
  searchView
);
controller.init();
