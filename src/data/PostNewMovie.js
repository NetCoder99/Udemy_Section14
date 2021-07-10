async function PostNewMovie(movieData, setMessage, setError) {
    console.log("PostNewMovie.init");
    let tBody = '';
    let tData = '';
    try {
        const response = await fetch('http://localhost:8081/addMovie', {
            method:  'POST',
            headers: {'Content-Type': 'application/json'},
            body: movieData
        })
        const contentType = response.headers.get("content-type");
        console.log("PostNewMovie.response.contentType:" + contentType);

        tBody = await response.text();
        //tData = await response.json();

        if (!response.ok) {
          console.log("PostNewMovie.response.status:"     + response.status);
          console.log("PostNewMovie.data.message:"        + tData.message);
          throw new Error("Post failed in PostNewMovie!"  + tData.message);
        }
        //setMovies(transformedMovies);
    }
    catch(error) 
    { 
        console.log("PostNewMovie.error:" + error.message);
        setError(error.message); 
    }
    setMessage(tBody);
    console.log("PostNewMovie.exit");
  };
export default PostNewMovie;