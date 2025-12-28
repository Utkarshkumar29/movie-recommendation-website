import Navbar from "@/app/components/navbar/page";
import RecommendationCard from "@/app/components/RecommendationCard/page";
import ThreeBackground from "@/app/components/ThreeBackground/page";

const RecommendationPage = () => {


    
  const mockRecommendations = [
  {
    id: 101,
    title: "Blade Runner 2049",
    year: 2017,
    poster: "https://img.rocket.new/generatedImages/rocket_gen_img_1984d2000-1764699432226.png",
    posterAlt: "Futuristic neon-lit cityscape with flying vehicles and towering skyscrapers in orange and blue tones",
    genre: "Sci-Fi",
    genres: ["Sci-Fi", "Thriller", "Mystery"],
    rating: 8.0,
    matchScore: 95,
    description: "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.",
    cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas", "Jared Leto"],
    streamingPlatforms: ["Netflix", "Prime Video"],
    aiReasoning: "Based on your love for Inception and The Matrix, this visually stunning sci-fi masterpiece explores similar themes of reality and identity with breathtaking cinematography."
  },
  {
    id: 102,
    title: "The Prestige",
    year: 2006,
    poster: "https://img.rocket.new/generatedImages/rocket_gen_img_1a382e220-1764683399111.png",
    posterAlt: "Victorian era magician in formal attire performing illusion with dramatic stage lighting and mysterious atmosphere",
    genre: "Thriller",
    genres: ["Thriller", "Mystery", "Drama"],
    rating: 8.5,
    matchScore: 92,
    description: "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
    cast: ["Christian Bale", "Hugh Jackman", "Scarlett Johansson", "Michael Caine"],
    streamingPlatforms: ["HBO Max", "Apple TV+"],
    aiReasoning: "Christopher Nolan\'s intricate storytelling and mind-bending narrative structure align perfectly with your preference for Inception and complex plot twists."
  },
  {
    id: 103,
    title: "Arrival",
    year: 2016,
    poster: "https://img.rocket.new/generatedImages/rocket_gen_img_1596b0222-1765521548972.png",
    posterAlt: "Massive alien spacecraft hovering over misty landscape with silhouettes of people observing from ground",
    genre: "Sci-Fi",
    genres: ["Sci-Fi", "Drama", "Mystery"],
    rating: 7.9,
    matchScore: 90,
    description: "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.",
    cast: ["Amy Adams", "Jeremy Renner", "Forest Whitaker", "Michael Stuhlbarg"],
    streamingPlatforms: ["Paramount+", "Prime Video"],
    aiReasoning: "This thought-provoking sci-fi drama matches your taste for intelligent storytelling and explores profound themes about communication and time."
  },
  {
    id: 104,
    title: "Prisoners",
    year: 2013,
    poster: "https://img.rocket.new/generatedImages/rocket_gen_img_1ac32a15f-1765813386763.png",
    posterAlt: "Dark atmospheric poster showing shadowy figure in rain-soaked urban environment with dramatic lighting",
    genre: "Thriller",
    genres: ["Thriller", "Crime", "Drama"],
    rating: 8.1,
    matchScore: 88,
    description: "When his daughter and her friend go missing, a desperate father takes matters into his own hands while a detective pursues multiple leads.",
    cast: ["Hugh Jackman", "Jake Gyllenhaal", "Viola Davis", "Paul Dano"],
    streamingPlatforms: ["Netflix", "Hulu"],
    aiReasoning: "The intense psychological thriller elements and moral complexity resonate with your appreciation for The Dark Knight\'s darker themes."
  },
  {
    id: 105,
    title: "Her",
    year: 2013,
    poster: "https://images.unsplash.com/photo-1592234403516-69d83a03f96b",
    posterAlt: "Minimalist poster with man in warm orange lighting looking contemplative against soft pastel background",
    genre: "Sci-Fi",
    genres: ["Sci-Fi", "Romance", "Drama"],
    rating: 8.0,
    matchScore: 87,
    description: "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
    cast: ["Joaquin Phoenix", "Scarlett Johansson", "Amy Adams", "Rooney Mara"],
    streamingPlatforms: ["HBO Max", "Apple TV+"],
    aiReasoning: "This unique exploration of human connection and AI consciousness complements your interest in futuristic narratives like The Matrix."
  },
  {
    id: 106,
    title: "Shutter Island",
    year: 2010,
    poster: "https://images.unsplash.com/photo-1715443263523-220d6fc8a868",
    posterAlt: "Isolated lighthouse on rocky island surrounded by stormy seas and ominous dark clouds",
    genre: "Thriller",
    genres: ["Thriller", "Mystery", "Drama"],
    rating: 8.2,
    matchScore: 86,
    description: "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.",
    cast: ["Leonardo DiCaprio", "Mark Ruffalo", "Ben Kingsley", "Michelle Williams"],
    streamingPlatforms: ["Netflix", "Prime Video"],
    aiReasoning: "Martin Scorsese\'s psychological thriller with its twist ending and atmospheric tension matches your preference for complex narratives."
  }];
    
    return (
        <div className=" bg-[#0f0f23] w-full min-h-screen ">
            <ThreeBackground />
            <Navbar />

            <main className="pt-24 pb-16">

                <div className="container mx-auto px-4 lg:px-8">
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
                                <i class="fa-solid fa-wand-magic-sparkles"></i>
                            </div>
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">AI Movie Recommendations</h1>
                                <p className="text-muted-foreground mt-1">Tell us what you love, and we'll find your next favorite film</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="lg:col-span-8 space-y-8">
                <div className="glass-panel rounded-lg p-6 lg:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Icon name="Search" size={20} className="text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Select Your Favorite Movies</h2>
                  </div>

                  <MovieSearchInput
                    onMovieSelect={handleMovieSelect}
                    selectedMovies={selectedMovies} />


                  {selectedMovies?.length > 0 &&
                  <div className="mt-8">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-muted-foreground">
                          {selectedMovies?.length} {selectedMovies?.length === 1 ? 'movie' : 'movies'} selected
                        </p>
                        <button
                        onClick={() => setSelectedMovies([])}
                        className="text-sm text-destructive hover:text-destructive/80 smooth-transition flex items-center gap-1">

                          <Icon name="X" size={14} />
                          Clear all
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
                        {selectedMovies?.map((movie) =>
                      <SelectedMovieCard
                        key={movie?.id}
                        movie={movie}
                        onRemove={handleRemoveMovie} />

                      )}
                      </div>

                      <Button
                      variant="default"
                      size="lg"
                      fullWidth
                      loading={isGenerating}
                      iconName="Sparkles"
                      iconPosition="left"
                      onClick={handleGenerateRecommendations}>

                        {isGenerating ? 'Generating Recommendations...' : 'Get AI Recommendations'}
                      </Button>
                    </div>
                  }

                  {selectedMovies?.length === 0 &&
                  <div className="text-center py-12">
                      <Icon name="Film" size={64} className="text-muted-foreground mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground mb-2">Start by searching for movies you love</p>
                      <p className="text-sm text-muted-foreground">Select at least one movie to get personalized recommendations</p>
                    </div>
                  }
                </div>

                {recommendations?.length > 0 &&
                <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Icon name="Sparkles" size={24} className="text-primary" />
                        <h2 className="text-2xl font-bold text-foreground">Your Personalized Recommendations</h2>
                      </div>
                      <span className="text-sm text-muted-foreground">{recommendations?.length} movies</span>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {recommendations?.map((movie) =>
                    <RecommendationCard
                      key={movie?.id}
                      movie={movie}
                      onSave={handleSaveMovie}
                      onMarkWatched={handleMarkWatched}
                      onRequestSimilar={handleRequestSimilar} />

                    )}
                    </div>
                  </div>
                }
              </div>
            </main>
        </div>
    )
}

export default RecommendationPage;