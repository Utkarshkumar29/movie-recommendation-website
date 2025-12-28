'use client'

import Image from 'next/image';
import React, { useState } from 'react';

const RecommendationCard = ({ movie, onSave, onMarkWatched, onRequestSimilar }) => {
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
          src={movie?.poster}
          alt={movie?.posterAlt}
          className="w-full h-full object-cover smooth-transition group-hover:scale-110"
        />
        
        <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent smooth-transition ${isExpanded ? 'opacity-100' : 'opacity-0'}`} />
        
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-primary/90 backdrop-blur-sm flex items-center gap-1">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            <span className="text-xs font-semibold text-primary-foreground">{movie?.matchScore}% Match</span>
          </div>
        </div>

        <div className={`absolute bottom-0 left-0 right-0 p-4 smooth-transition ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="flex items-center gap-2 mb-2">
            <i className="fa-solid fa-star"></i>
            <span className="text-sm font-semibold text-accent">{movie?.rating}</span>
            <span className="text-xs text-muted-foreground ml-2">{movie?.year}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {movie?.genres?.map((genre, index) => (
              <span key={index} className="px-2 py-1 rounded-full bg-muted/50 text-xs text-muted-foreground">
                {genre}
              </span>
            ))}
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
            {movie?.description}
          </p>

          <div className="mb-3">
            <p className="text-xs text-muted-foreground mb-1">Cast:</p>
            <p className="text-xs text-foreground line-clamp-1">{movie?.cast?.join(', ')}</p>
          </div>

          <div className="glass-panel rounded-lg p-3 mb-3">
            <div className="flex items-start gap-2">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <div>
                <p className="text-xs font-medium text-foreground mb-1">AI Reasoning</p>
                <p className="text-xs text-muted-foreground">{movie?.aiReasoning}</p>
              </div>
            </div>
          </div>

          {movie?.streamingPlatforms?.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-2">Available on:</p>
              <div className="flex flex-wrap gap-2">
                {movie?.streamingPlatforms?.map((platform, index) => (
                  <span key={index} className="px-2 py-1 rounded bg-primary/20 text-xs text-primary font-medium">
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-3 truncate">{movie?.title}</h3>
        
        <div className="flex flex-col gap-2">
          <button
            className={isSaved ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-input hover:bg-accent hover:text-accent-foreground"}
            onClick={handleSave}
          >
            {isSaved ? 'Saved' : 'Save'}
          </button>

          <button
            className={isSaved ? "bg-success text-success-foreground hover:bg-success/90" : "border border-input hover:bg-accent hover:text-accent-foreground"}
            onClick={handleMarkWatched}
          >
            {isWatched ? 'Watched' : 'Mark as Watched'}
          </button>

          <button
            className="hover:bg-accent hover:text-accent-foreground"
            onClick={() => onRequestSimilar(movie)}
          >
            Similar Movies
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;