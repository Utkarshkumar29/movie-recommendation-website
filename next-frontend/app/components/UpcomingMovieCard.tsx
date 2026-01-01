import Image from "next/image"

const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  18: "Drama",
  14: "Fantasy",
  27: "Horror",
  53: "Thriller",
  878: "Sci-Fi",
};

const UpcomingMovieCard = ({ movie }) => {
  return (
    <div className="group glass-panel rounded-xl min-w-[250px] ">

      <div className="relative h-[360px] overflow-hidden">
        <Image
          fill
          src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
          alt={movie?.title}
          className="object-cover transition-transform group-hover:scale-125"
        />

        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition" />

        <div className="absolute bottom-10 px-4 space-y-2 opacity-0 group-hover:opacity-100 transition">
          <div className="flex gap-2 flex-wrap">
            {movie?.genre_ids.map((id) => (
              <span key={id} className="glass-panel px-3 py-1 rounded-md text-sm">
                {GENRE_MAP[id] || "Other"}
              </span>
            ))}
          </div>

          <p className="line-clamp-3 text-muted-foreground">
            {movie?.overview}
          </p>
        </div>
      </div>

      <div className="px-6 py-4">
        <h3 className="font-semibold line-clamp-1">{movie?.title}</h3>
        <span className="text-sm text-muted-foreground">
          {movie?.release_date.split("-")[0]}
        </span>
      </div>
    </div>
  )
}

export default UpcomingMovieCard
