'use client'

import { useEffect, useState } from "react";
import Navbar from "../components/navbar"
import dynamic from "next/dynamic";
import MovieCard from "../components/MovieCard";
import UpcomingMovieCard from "../components/UpcomingMovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
const ThreeBackground = dynamic(
    () => import("@/app/components/ThreeBackground"),
    { ssr: false }
)

const UpcomingMoviesPage = () => {

    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [nextUrl, setNextUrl] = useState("")
    const [totalPages, setTotalPages] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const fetchMovies = async (page = 1) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=576f0051dff3e97a42a31648d28054a8&page=${page}`)
            console.log(response, 'maker')
            setUpcomingMovies(prev => page === 1 ? response.data.results : [...prev, ...response.data.results])
            setTotalPages(response.data.total_pages)
            setHasMore(page < response.data.total_pages)
        } catch (error) {
            console.log(error)
        }
    }

   useEffect(() => {
  fetchMovies(1)
}, [])


    const fetchNext = () => {
  setCurrentPage(prevPage => {
    const nextPage = prevPage + 1
    fetchMovies(nextPage)
    return nextPage
  })
}


    return (
        <div className="min-h-screen h-full bg-[#0f0f23] relative overflow-hidden">
            <Navbar />
            <ThreeBackground />

            <main className="container mx-auto px-4 lg:px-8 pt-24 pb-16">
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
                            <i className="fa-solid fa-calendar"></i>
                        </div>
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">Upcoming Movies</h1>
                            <p className="text-muted-foreground mt-2">Discover the most anticipated releases</p>
                        </div>
                    </div>
                </div>

                <InfiniteScroll
                    next={fetchNext}
                    dataLength={upcomingMovies.length}
                    hasMore={hasMore}
                    loader={<p>Loading.....</p>}
                    endMessage={
                        <p className="text-center text-muted-foreground mt-8">
                            🎬 No more upcoming movies
                        </p>}
                >
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 place-items-center">
                        {upcomingMovies.length > 0 && upcomingMovies.map((movie, index) => {
                            return (
                                <UpcomingMovieCard movie={movie} key={index} />
                            )
                        })}
                    </div>
                </InfiniteScroll>

            </main>
        </div>
    )
}

export default UpcomingMoviesPage