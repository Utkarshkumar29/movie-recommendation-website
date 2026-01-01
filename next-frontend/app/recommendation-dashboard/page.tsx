'use client'

import Navbar from "@/app/components/navbar";
import RecommendationCard from "@/app/components/RecommendationCard";

import SelectedMovieCard from "@/app/components/SelectedMovieCard";
const ThreeBackground = dynamic(
  () => import("@/app/components/ThreeBackground"),
  { ssr: false }
);

import { TMDBDetailedMovie, TMDBSearchMovie } from "@/app/types/movie";
import dynamic from "next/dynamic";
import Image from "next/image";

import { useEffect, useState } from "react";

const TMDB_API_KEY = "576f0051dff3e97a42a31648d28054a8";
interface Movie {
  id: number;
  title: string;
  original_title?: string;
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
}


const RecommendationPage = () => {

  const [searchInput, setSearchInput] = useState("");
  const [poster, setPoster] = useState<TMDBSearchMovie | null>(null);


  const [selectedMovie, setSelectedMovie] = useState<TMDBSearchMovie | null>(null);
  const [recommendations, setRecommendations] = useState<TMDBDetailedMovie[]>([]);

  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!searchInput.trim()) {
      setPoster(null);
      return;
    }

    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
            searchInput
          )}&include_adult=false`
        );

        const data = await response.json();

        const firstValidMovie = (data.results || []).find(
          (movie: Movie) => movie.poster_path
        );

        setPoster(firstValidMovie || null);
      } catch (error) {
        console.error("Error fetching movies from TMDB:", error);
        setPoster(null);
      }
    };

    fetchMovie();
  }, [searchInput]);

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setPoster(null);
  }


  const fetchMoviesAndPosters = async () => {
    try {
      setIsGenerating(true)
      console.log("Selected Movie for Recommendations:", selectedMovie);
      const response = await fetch(
        `https://movie-recommendation-website-i6d8.onrender.com/api/recommend/${selectedMovie?.original_title}`
      );
      const data = await response.json();

      const movieIds: number[] = data.id_list;

      const posterPromises = movieIds.map(async (id) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=576f0051dff3e97a42a31648d28054a8`
        );
        return res.json();
      });

      const results: TMDBDetailedMovie[] = await Promise.all(posterPromises);
      setRecommendations(results);

    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsGenerating(false)
    }
  };

  return (
    <div className=" bg-[#0f0f23] w-full min-h-screen ">
      <ThreeBackground />
      <Navbar />

      <main className="pt-24 pb-16 flex items-center flex-col ">

        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  AI Movie Recommendations
                </h1>
                <p className="text-muted-foreground mt-1">
                  Tell us what you love, and we'll find your next favorite film
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8 container px-8 relative ">
          <div className="glass-panel rounded-lg p-6 lg:p-8 flex flex-col items-center ">

            <div className="flex items-center gap-2 mb-6">
              <i className="fa-solid fa-magnifying-glass text-primary "></i>
              <h2 className="text-xl font-semibold text-foreground">
                Select Your Favorite Movies
              </h2>
            </div>

            <div className=" relative w-full flex justify-between items-center h-10 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ">
              <input
                placeholder="Search for movies you love..."
                className=" outline-none pl-[12px] w-full h-full bg-transparent "
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <i className="fa-solid fa-magnifying-glass text-primary pr-[12px] "></i>
            </div>

            {/* 🔽 SINGLE SUGGESTION DROPDOWN */}
            {poster && (
              <div className=" absolute top-36 z-10 left-16 right-0 mt-2 glass-panel rounded-lg overflow-hidden z-50 max-w-[1410px]">
                <button
                  onClick={() => handleMovieSelect(poster)}
                  className=" cursor-pointer w-full flex items-center gap-4 p-4 hover:bg-muted/50 smooth-transition border-b border-border/50 last:border-b-0"
                >
                  <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={`https://image.tmdb.org/t/p/w185${poster.poster_path}`}
                      alt={poster.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-foreground">
                      {poster.title}
                    </h4>

                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-muted-foreground">
                        {poster.release_date?.split("-")[0]}
                      </span>

                      <span className="text-sm text-muted-foreground">•</span>

                      <span className="text-sm font-medium text-accent">
                        {poster.vote_average?.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            )}

            {/* 🎞 SELECTED MOVIE */}
            {selectedMovie && (
              <div className=" flex justify-center items-center my-6">
                <SelectedMovieCard
                  movie={selectedMovie}
                  onRemove={() => setSelectedMovie(null)}
                />
              </div>
            )}

            {/* EMPTY STATE */}
            {selectedMovie === null && (
              <div className="text-center py-12">
                <i className="fa-solid fa-film text-[80px] text-muted-foreground "></i>
                <p className="text-muted-foreground mb-2 mt-10">
                  Start by searching for movies you love
                </p>
                <p className="text-sm text-muted-foreground">
                  Select one movie to get personalized recommendations
                </p>
              </div>
            )}

            <button
              className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 px-[24px] py-[16px] rounded-sm text-xl cursor-pointer "
              disabled={!selectedMovie || isGenerating}
              onClick={() => fetchMoviesAndPosters()}
            >
              {isGenerating
                ? "Generating Recommendations..."
                : "Get AI Recommendations"}
            </button>

            {recommendations?.length > 0 &&
              <div className="mt-6 ">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">

                    <h2 className="text-2xl font-bold text-foreground">Your Personalized Recommendations</h2>
                  </div>
                  <span className="text-sm text-muted-foreground">{recommendations?.length} movies</span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations?.map((movie) =>
                    <RecommendationCard
                      key={movie?.id}
                      movie={movie}
                    //onSave={handleSaveMovie}
                    //onMarkWatched={handleMarkWatched}
                    //onRequestSimilar={handleRequestSimilar} 
                    />

                  )}
                </div>
              </div>
            }

          </div>
        </div>
      </main>
    </div>
  );
};

export default RecommendationPage;
