import React, {useState, useEffect }from 'react';

//import { Switch, Route } from 'react-router-dom';
//import Layout from './components/Layout/Layout';
//import MainNavigation from './components/Layout/MainNavigation';

import MoviesList   from './components/Movies/MoviesList';
import AddMovie     from './components/Movies/AddMovie'

import FetchMovies   from './data/FetchMovies';
import PostNewMovie  from './data/PostNewMovie';
//import MoviesStatic from './data/MoviesStatic';

import './App.css';

function App() {
  //const dummyMovies = MoviesStatic();
  // ---------------------------------------------------------
  const [movies,    setMovies] = useState([]);
  const [hasError,  setError] = useState();
  const [message,   setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // ---------------------------------------------------------
  function setMessageHandler(message) {
    console.log("App.setMessageHandler.message:" + message);
    setMessage(message);
  }


  // ---------------------------------------------------------
  async function postMovieHandler(movie) {
    console.log("App.postMovieHandler.init:" + movie);

    const movieData = JSON.stringify({
        title: movie.title,
        openingText: movie.openingText,
        releaseDate: movie.releaseDate
    });

    setIsLoading(true);
    setError(null);

    await PostNewMovie(movieData, setMessageHandler, setError)

    if (hasError) {
      console.log("App.PostNewMovie.error:" + hasError);
    }
    setIsLoading(false);

    console.log("App.PostNewMovie.exit");
  }

  // ---------------------------------------------------------
  async function fetchMoviesHandler() {
    console.log("App.fetchMoviesHandler.init");
    setIsLoading(true);
    setError(null);
    await FetchMovies(setMovies, setError);
    if (hasError) {
      console.log("App.fetchMoviesHandler.error:" + hasError);
    }
    setIsLoading(false);
    console.log("App.fetchMoviesHandler.exit");
  };

  let content = <p>No movies to display!</p>;
  if (movies.length > 0) {content = <MoviesList movies={movies} /> };
  if (hasError) {content = 
    <React.Fragment>
      <h3 className="error">Error</h3>
      <p>{hasError}</p>
    </React.Fragment>
  };
  if (isLoading) {content = <p>Loading...</p> };

  // ---------------------------------------------------------
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={postMovieHandler}></AddMovie>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
