import React,{useState,useEffect} from "react";
import '../CSS/recommend.css'

function App()
{
    const [movie,setMovies]=useState("")
    const [poster,setPoster]=useState([])
    
    const handlechange=(event)=>{
        setMovies(event.target.value)
    }

    const handlesubmit=(event)=>{
        event.preventDefault()
    }

    useEffect(() => {
      const fetchMoviesAndPosters = async () => {
        try {
          const response = await fetch(`http://localhost:5000/home/${movie}`);
          const data = await response.json();
          console.log(data.recommended_movies);
          console.log(data.recommended_movies.length)
          setMovies(data.recommended_movies.length);
      
          const movieIds = data.recommended_ids;
          const posterPromises = movieIds.map(async (movieId) => {
            const responsep = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=576f0051dff3e97a42a31648d28054a8`);
            const datap = await responsep.json();
            console.log(movieId);
            return datap;
          });
          const posters = await Promise.all(posterPromises);
          setPoster(posters);
        } catch (error) {
          console.error(error);
        }
      };
    
      if (movie) {
        fetchMoviesAndPosters();
      }
    }, [movie]);
    
      

    return(
        <>
            <div className="up">
                <h1>Discover your next favorite movie! Tell us the name of a film you loved and we'll suggest similar must-watch movies for you!!!!</h1>
                
                <form onSubmit={handlesubmit} className="input-container">
                    <input type="text" id="myInput" placeholder="Movie Name..." onChange={handlechange}></input>
                </form>

                <div className="fetch">
                {poster.map((movie) => (
                <img
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                  alt={movie.title}
                  className='poster'
                />
              ))}
              </div>
            </div>
        </>
    )
}

export default App
