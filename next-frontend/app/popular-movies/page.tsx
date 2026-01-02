'use client'

import Navbar from "@/app/components/navbar";
import dynamic from "next/dynamic";
import StatsBar from "../components/StatsBar";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
const ThreeBackground = dynamic(
  () => import("@/app/components/ThreeBackground"),
  { ssr: false }
)

interface Genre {
  id: number
  name: string
}

interface SpokenLanguage {
  iso_639_1: string
  name: string
  english_name: string
}

interface PopularMovie {
  id: number
  title: string
  poster_path: string
  genres: Genre[]
  vote_average: number
  overview: string
  spoken_languages: SpokenLanguage[]
  release_date: string
  runtime: number
}

interface PopularMoviesResponse {
  popular_ids: number[]
}

const PopularMoviesPage = () => {
  const [popularMovies, setPopularMovies] = useState<PopularMovie[]>([])

  useEffect(() => {
      const fetchMoviesAndPosters = async () => {
        try {
          const response = await fetch(`https://movie-recommendation-website-i6d8.onrender.com/popular`);
          const data:PopularMoviesResponse = await response.json();
  
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
          setPopularMovies(posters);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchMoviesAndPosters();
    }, []);

    return (
        <div className="min-h-screen h-full bg-[#0f0f23] relative overflow-hidden">
            <ThreeBackground />
            <Navbar />

            <main className=" h-full max-w-[1540px] mx-auto px-4 lg:px-8 pt-24 pb-16 flex flex-col gap-8 relative z-10">
                
                <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
                  <i className="fa-solid fa-arrow-trend-up"></i>
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                    Popular Movies
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    AI-curated using trend analysis & rating patterns
                  </p>
                </div>
              </div>
            </div>

            <StatsBar
              totalMovies={20}
              filteredMovies={10}
              averageRating={5} />

            <div className=" min-h-screen grid grid-cols-5 gap-10 place-items-center ">
              {popularMovies.length>0 && popularMovies.map((movie,index)=>{
              return(
                <MovieCard {...movie}  key={index} />
              )
            })}
            </div>

            </main>
        </div>
    )
}

export default PopularMoviesPage;