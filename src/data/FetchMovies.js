export default async function FetchMovies(setMovies, setError) {
    console.log("FetchMovies.init");
    try {
        //const response = await fetch('https://swapi.dev/api/films/', {})
        const response = await fetch('http://localhost:8081/getMovies', {})
        const data     = await response.json();
        if (!response.ok) {
          console.log("FetchMovies.response:" + response.status);
          console.log("FetchMovies.response:" + data.message);
          throw new Error("Fetch failed in FetchMovies!" + data.message);
        }
        const transformedMovies = data.results.map(movieData => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date
          }
        });
        setMovies(transformedMovies);
    }
    catch(error) 
    { 
        console.log("FetchMovies.error:" + error.message);
        setError(error.message); 
    }
    console.log("FetchMovies.exit");
  };
