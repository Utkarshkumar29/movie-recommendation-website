import Image from 'next/image';
import React, { useState } from 'react';


const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const RecommendationCard = ({ movie, onSave, onMarkWatched, onRequestSimilar, genreMap }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(movie);
  };

  const handleMarkWatched = () => {
    setIsWatched(!isWatched);
    onMarkWatched(movie);
  };

  return (
    <div
      className="glass-panel rounded-lg overflow-hidden group smooth-transition hover:shadow-glow transform-3d"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          fill
          className="w-full h-full object-cover smooth-transition group-hover:scale-110"
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent smooth-transition ${
            isExpanded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-primary/90 backdrop-blur-sm flex items-center gap-1">
            
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
            {movie.release_date?.split("-")[0]}
          </span>

          {/* Genres */}
          <div className="flex flex-wrap gap-1 my-2">
            {movie.genre_ids?.map((id) => (
              <span
                key={id}
                className="px-2 py-1 rounded-full bg-muted/50 text-xs text-muted-foreground"
              >
                {genreMap[id]}
              </span>
            ))}
          </div>

          {/* Overview */}
          <p className="text-xs text-muted-foreground line-clamp-3 mb-3">
            {movie.overview}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-3 truncate">
          {movie.title}
        </h3>

        
      </div>
    </div>
  );
};

export default RecommendationCard;
