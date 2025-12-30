'use client';

import Image from 'next/image';
import React, { useState } from 'react';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  overview: string;
  genre_ids: number[];
}

interface RecommendationCardProps {
  movie: Movie;
  genreMap?: Record<number, string>;
  onSave?: (movie: Movie) => void;
  onMarkWatched?: (movie: Movie) => void;
  onRequestSimilar?: (movie: Movie) => void;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const RecommendationCard = ({
  movie,
  genreMap = {},
  onSave,
  onMarkWatched,
  onRequestSimilar,
}: RecommendationCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  const handleSave = () => {
    setIsSaved((prev) => !prev);
    onSave?.(movie);
  };

  const handleMarkWatched = () => {
    setIsWatched((prev) => !prev);
    onMarkWatched?.(movie);
  };

  return (
    <div
      className="glass-panel rounded-lg overflow-hidden group smooth-transition hover:shadow-glow transform-3d"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${movie.poster_path}`
              : '/placeholder.jpg'
          }
          alt={movie.title}
          fill
          className="object-cover smooth-transition group-hover:scale-110"
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent smooth-transition ${
            isExpanded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Rating */}
        <div className="absolute top-3 right-3">
          <div className="px-3 py-1 rounded-full bg-primary/90 backdrop-blur-sm">
            <span className="text-xs font-semibold text-primary-foreground">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Expanded Content */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 smooth-transition ${
            isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          {/* Year */}
          <span className="text-xs text-muted-foreground">
            {movie.release_date?.split('-')[0]}
          </span>

          {/* Genres */}
          {movie.genre_ids.length > 0 && (
            <div className="flex flex-wrap gap-1 my-2">
              {movie.genre_ids.map((id) => (
                <span
                  key={id}
                  className="px-2 py-1 rounded-full bg-muted/50 text-xs text-muted-foreground"
                >
                  {genreMap[id] ?? 'Unknown'}
                </span>
              ))}
            </div>
          )}

          {/* Overview */}
          <p className="text-xs text-muted-foreground line-clamp-3 mb-3">
            {movie.overview}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground truncate">
          {movie.title}
        </h3>
      </div>
    </div>
  );
};

export default RecommendationCard;
