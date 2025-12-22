import React, { useState, useEffect } from "react";

function App() {
  const [poster, setPoster] = useState([]);

  useEffect(() => {
    const fetchMoviesAndPosters = async () => {
      try {
        const response = await fetch(`https://movie-recommendation-website-i6d8.onrender.com/popular`);
        const data = await response.json();
        console.log(data.popular_movies);
        console.log(data.popular_movies.length);

        const movieIds = data.popular_ids;
        const posterPromises = movieIds.map(async (movieId) => {
          const responsep = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=576f0051dff3e97a42a31648d28054a8`
          );
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

    fetchMoviesAndPosters();
  }, []);

  return (
    <>
      <div className="up">
        <h1>Popular Movies</h1>

        <div className="fetch">
          {poster.map((movie) => (
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
              alt={movie.title}
              className="poster"
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
