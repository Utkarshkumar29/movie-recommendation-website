import Navbar from "@/app/components/navbar/page";
import StatsBar from "@/app/components/StatsBar/page";
import ThreeBackground from "@/app/components/ThreeBackground/page";

const PopularMoviesPage = () => {
    return (
        <div className="min-h-screen bg-[#0f0f23] relative overflow-hidden">
            <ThreeBackground />
            <Navbar />

            <main className="container mx-auto px-4 lg:px-8 pt-24 pb-16 flex flex-col gap-8 relative z-10">
                
                <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
                  <i class="fa-solid fa-arrow-trend-up"></i>
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

            </main>
        </div>
    )
}

export default PopularMoviesPage;