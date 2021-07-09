export default async function FetchMovies(setMovies, setError) {
    console.log("FetchMovies.init");
    try {
        const response = await fetch('https://swapi.dev/api/films/', {})
        const data     = await response.json();

        if (!response.ok) {
            throw new Error("Fetch failed in FetchMovies!");
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
