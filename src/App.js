import React, {useState, useEffect }from 'react';

import MoviesList from './components/MoviesList';

import FetchMovies from './data/FetchMovies';
//import MoviesStatic from './data/MoviesStatic';

import './App.css';

function App() {
  //const dummyMovies = MoviesStatic();
  // ---------------------------------------------------------
  const [movies, setMovies] = useState([]);
  const [hasError, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMoviesHandler() {
    console.log("fetchMoviesHandler.init");
    setIsLoading(true);
    setError(null);
    await FetchMovies(setMovies, setError);
    if (hasError) {
      console.log("fetchMoviesHandler.error:" + hasError);
    }
    setIsLoading(false);
    console.log("fetchMoviesHandler.exit");
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
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
