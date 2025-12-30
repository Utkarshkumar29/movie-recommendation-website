import Image from "next/image";
import React from "react";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average?: number;
  release_date?: string;
  genres?: Genre[];
}

interface SelectedMovieCardProps {
  movie: Movie;
  onRemove?: (movieId: number) => void;
}


const SelectedMovieCard = ({ movie, onRemove }:SelectedMovieCardProps) => {
  console.log("Selected Movie in Card:", movie);

  return (
    <div className=" w-[240px] glass-panel rounded-lg overflow-hidden group smooth-transition hover:shadow-glow transform-3d hover:scale-105">
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          fill
          className=" object-cover smooth-transition group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />

        {/* Remove button */}
        <button
          onClick={() => onRemove?.(movie.id)}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 smooth-transition hover:bg-destructive hover:scale-110"
          aria-label={`Remove ${movie.title}`}
        >
          <i className="fa-solid fa-x"></i>
        </button>

        {/* Rating */}
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 smooth-transition">
          <div className="flex items-center gap-2 mb-1">
            <i className="fa-regular fa-star"></i>
            <span className="text-sm font-semibold text-accent">
              {movie.vote_average?.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-3">
        <h3 className="font-semibold text-foreground text-sm mb-1 truncate">
          {movie.title}
        </h3>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{movie.release_date?.split("-")[0]}</span>
          <span>•</span>
          <span className="truncate">
            {movie.genres?.map(g => g.name).join(", ")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SelectedMovieCard;
