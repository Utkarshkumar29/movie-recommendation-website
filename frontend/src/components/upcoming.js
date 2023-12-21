import React from "react";
import '../CSS/up.css'
import { useState,useEffect } from "react";

function App()
{
    const [movies,setMovies]=useState([])

    useEffect(()=>{
        const fetchMovies= async()=>{
            const response= await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=576f0051dff3e97a42a31648d28054a8`)
            const data=await response.json()
            console.log(data.results)
            setMovies(data.results)
        }
        fetchMovies();
    },[])


    return(
        <>
        <div className="up">
            <h2>Upcoming Movies</h2>
        </div>
        <div className="posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
            alt={movie.title}
            className='poster'
          />
        ))}
        </div>
        </>
    )
}

export default App