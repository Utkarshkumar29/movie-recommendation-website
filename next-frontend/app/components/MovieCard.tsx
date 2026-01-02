import Image from "next/image"

interface Genre{
    id:number,
    name:string,
}

interface SpokenLanguages{
    name:string
    english_name:string
    iso_639_1:string
}

interface MovieCard {
    title:string,
    poster_path:string,
    genres:Genre[],
    vote_average:number,
    overview:string,
    spoken_languages:SpokenLanguages[],
    release_date:string,
    runtime:number
}

const MovieCard = (movie:MovieCard) => {
    return (
        <div className=" group glass-panel w-full h-full gradient-border rounded-xl ">
            <div className="relative h-[360px] w-full overflow-hidden group-hover:bg-black/30 smooth-transition ">
                <Image
                    fill
                    src={`https://image.tmdb.org/t/p/w185${movie?.poster_path}`}
                    alt={movie?.title}
                    className="w-full h-full object-cover rounded-t-xl transition-transform duration-200 group-hover:scale-125 ease-out "
                />
                <div className=" absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 " />
                <div className=" glass-panel border border-gray-400 absolute top-2 right-2 px-2 py-1 flex items-center rounded-xl ">
                    <i className="fa-solid fa-star text-yellow-400 mx-1"></i>
                    <span>{movie?.vote_average}</span>
                </div>
                <div className=" absolute bottom-10 text-muted-foreground group-hover:block hidden transition-opacity px-4 py-2 gap-2 flex flex-col w-full ">
                    <div className=" flex gap-2 flex-wrap flex-wrap-reverse">
                        {movie?.genres.map((genre, index) => {
                            return (
                                <span className=" glass-panel text-primary rounded-md px-[12px] py-[4px] whitespace-nowrap " key={index}>{genre.name}</span>
                            )
                        })}
                    </div>
                    <span className=" line-clamp-3 ">{movie?.overview}</span>
                </div>
                <div className="absolute bottom-2 left-2 max-w-[90%] px-2 py-1 glass-panel rounded-xl flex items-center gap-2">
                    <i className="fa-solid fa-language shrink-0"></i>

                    <span className="truncate whitespace-nowrap overflow-hidden">
                        {movie?.spoken_languages.map(l => l.name).join(", ")}
                    </span>
                </div>

            </div>
            <div className=" flex flex-col px-[24px] py-[16px] gap-2 ">
                <span className="  font-semibold text-foreground line-clamp-1 group-hover:text-primary smooth-transition">{movie?.title}</span>
                <div className="  flex justify-between text-muted-foreground ">
                    <div className=" flex gap-2 items-center ">
                        <i className="fa-solid fa-calendar"></i>
                        {movie?.release_date?.split("-")[0]}
                    </div>
                    <div className=" flex gap-2 items-center ">
                        <i className="fa-regular fa-clock"></i>
                        <span>{movie?.runtime}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard