import React, { useState, useEffect } from "react";
import "../CSS/recommend.css";

function App() {
  const [searchMovie, setSearchMovie] = useState(""); // input text
  const [movie, setMovie] = useState(""); // submitted movie
  const [posters, setPosters] = useState([]);

  const handleChange = (e) => {
    setSearchMovie(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchMovie.trim()) return;
    setMovie(searchMovie); // trigger API
  };

  useEffect(() => {
    if (!movie) return;

    const fetchMoviesAndPosters = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/recommend/${movie}`
        );
        const data = await response.json();

        const movieIds = data.id_list;

        const posterPromises = movieIds.map(async (id) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=576f0051dff3e97a42a31648d28054a8`
          );
          return res.json();
        });

        const results = await Promise.all(posterPromises);
        setPosters(results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMoviesAndPosters();
  }, [movie]);

  return (
    <>
      <div className="up">
        <h1>
          Discover your next favorite movie! Tell us a movie you loved and we’ll
          recommend similar ones 🎬
        </h1>

        <form onSubmit={handleSubmit} className="input-container">
          <input
            type="text"
            placeholder="Movie Name..."
            value={searchMovie}
            onChange={handleChange}
          />
        </form>

        <div className="fetch">
          {posters.map((movie) => (
            movie.poster_path && (
              <img
                key={movie.id}
                src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                alt={movie.title}
                className="poster"
              />
            )
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
