import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const MovieSearchInput = ({ onMovieSelect, selectedMovies }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const searchRef = useRef(null);

  const movieDatabase = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    poster: "https://img.rocket.new/generatedImages/rocket_gen_img_16646168c-1764711433248.png",
    posterAlt: "Movie poster showing prison walls with dramatic lighting and silhouette of man looking at sky",
    genre: "Drama",
    rating: 9.3
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: 2008,
    poster: "https://images.unsplash.com/photo-1643115967876-7537da457102",
    posterAlt: "Dark atmospheric poster featuring Batman silhouette against Gotham city skyline at night",
    genre: "Action",
    rating: 9.0
  },
  {
    id: 3,
    title: "Inception",
    year: 2010,
    poster: "https://img.rocket.new/generatedImages/rocket_gen_img_11a7c7464-1764683395287.png",
    posterAlt: "Surreal cityscape bending upward with dream-like architectural elements and floating debris",
    genre: "Sci-Fi",
    rating: 8.8
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    poster: "https://img.rocket.new/generatedImages/rocket_gen_img_11ba53e89-1765866528632.png",
    posterAlt: "Retro style poster with bold typography and vintage film aesthetic in warm tones",
    genre: "Crime",
    rating: 8.9
  },
  {
    id: 5,
    title: "Forrest Gump",
    year: 1994,
    poster: "https://images.unsplash.com/photo-1702560629589-d938b398ef79",
    posterAlt: "Nostalgic poster showing bench in park with autumn leaves and warm golden lighting",
    genre: "Drama",
    rating: 8.8
  },
  {
    id: 6,
    title: "The Matrix",
    year: 1999,
    poster: "https://img.rocket.new/generatedImages/rocket_gen_img_1789b19cb-1764683398065.png",
    posterAlt: "Futuristic green digital code rain effect with silhouette figure in black leather coat",
    genre: "Sci-Fi",
    rating: 8.7
  },
  {
    id: 7,
    title: "Interstellar",
    year: 2014,
    poster: "https://img.rocket.new/generatedImages/rocket_gen_img_1cecebd91-1765046063931.png",
    posterAlt: "Space exploration poster with astronaut floating near massive black hole and distant planets",
    genre: "Sci-Fi",
    rating: 8.6
  },
  {
    id: 8,
    title: "The Godfather",
    year: 1972,
    poster: "https://img.rocket.new/generatedImages/rocket_gen_img_18cc0b0db-1764931572585.png",
    posterAlt: "Classic mafia poster with dramatic shadows and vintage Italian-American aesthetic",
    genre: "Crime",
    rating: 9.2
  },
  {
    id: 9,
    title: "Parasite",
    year: 2019,
    poster: "https://img.rocket.new/generatedImages/rocket_gen_img_16ac91cc9-1765302689722.png",
    posterAlt: "Modern minimalist poster showing stark contrast between luxury mansion and basement stairs",
    genre: "Thriller",
    rating: 8.6
  },
  {
    id: 10,
    title: "Avengers: Endgame",
    year: 2019,
    poster: "https://img.rocket.new/generatedImages/rocket_gen_img_19ab8ce6d-1765301440359.png",
    posterAlt: "Epic superhero ensemble poster with multiple heroes in action poses against cosmic background",
    genre: "Action",
    rating: 8.4
  }];


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery?.trim()?.length > 0) {
      const filtered = movieDatabase?.filter((movie) =>
      !selectedMovies?.some((selected) => selected?.id === movie?.id) &&
      movie?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setFilteredMovies(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredMovies([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, selectedMovies]);

  const handleMovieSelect = (movie) => {
    onMovieSelect(movie);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search for movies you love..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="w-full" />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon name="Search" size={20} className="text-muted-foreground" />
        </div>
      </div>
      {showSuggestions && filteredMovies?.length > 0 &&
      <div className="absolute top-full left-0 right-0 mt-2 glass-panel rounded-lg overflow-hidden z-50 max-h-96 overflow-y-auto scrollbar-thin">
          {filteredMovies?.map((movie) =>
        <button
          key={movie?.id}
          onClick={() => handleMovieSelect(movie)}
          className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 smooth-transition border-b border-border/50 last:border-b-0">

              <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0">
                <img
              src={movie?.poster}
              alt={movie?.posterAlt}
              className="w-full h-full object-cover" />

              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-foreground">{movie?.title}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-muted-foreground">{movie?.year}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{movie?.genre}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={14} className="text-accent fill-accent" />
                    <span className="text-sm font-medium text-accent">{movie?.rating}</span>
                  </div>
                </div>
              </div>
              <Icon name="Plus" size={20} className="text-primary" />
            </button>
        )}
        </div>
      }
      {showSuggestions && filteredMovies?.length === 0 && searchQuery?.trim()?.length > 0 &&
      <div className="absolute top-full left-0 right-0 mt-2 glass-panel rounded-lg p-6 z-50">
          <div className="text-center">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No movies found matching "{searchQuery}"</p>
          </div>
        </div>
      }
    </div>);

};

export default MovieSearchInput;