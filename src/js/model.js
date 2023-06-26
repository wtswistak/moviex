import { API_URL } from "./config";
import { getJSON } from "./helper";

class Model {
  async fetchGenres() {
    try {
      const data = await getJSON(`${API_URL}genre/movie/list`);
      return data.genres;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async fetchPopularMovies() {
    try {
      const data = await getJSON(
        `${API_URL}movie/popular?language=en-US&page=1`
      );
      return data.results;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async fetchMoviesByGenre(genreId, page) {
    try {
      const data = await getJSON(
        `${API_URL}discover/movie?with_genres=${genreId}&page=${page}`
      );
      return data.results;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async fetchMovieData(id) {
    try {
      const data = await getJSON(`${API_URL}movie/${id}`);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async fetchMovieCrew(id) {
    try {
      const data = await getJSON(`${API_URL}movie/${id}/credits`);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async fetchUpcomingMovies() {
    try {
      const data = await getJSON(
        `${API_URL}movie/upcoming?language=en-US&page=1`
      );
      return data.results.filter(
        (item) => new Date(item.release_date) > new Date().getTime()
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async searchMoviesByQuery(searchInput) {
    try {
      const data = await getJSON(
        `${API_URL}/search/movie?query=${searchInput}`
      );
      return data.results;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
export default new Model();
