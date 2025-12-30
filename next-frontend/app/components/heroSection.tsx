import ThreeBackground from "./ThreeBackground"


const HeroSection = () => {
    return (
        <div className="relative py-20 lg:py-32 overflow-hidden max-h-[calc(100vh-150px)] ">
            <ThreeBackground/>

            <div className=" mx-auto px-4 lg:px-8 z-10 relative ">
                <div className=" max-w-4xl mx-auto text-center flex flex-col gap-10 items-center justify-center ">
                    
                    <div className=" w-fit px-[24px] py-[8px] flex gap-4 items-center bg-[#161631] border border-gray-800 rounded-[16px] ">
                        <i className="fa-solid fa-clapperboard text-[#06ffa5] shadow-2x shadow-amber-400 "></i>
                        <span className=" text-[#80848d] ">Powered by Advanced AI Technology</span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                        Discover Your Next
                        <span className="block bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#06FFA5] bg-clip-text text-transparent ">
                        Favorite Movie
                        </span>
                    </h1>

                    <p className=" text-xl lg:text-2xl max-w-4xl mx-auto text-[#94A3B8] ">
                        Experience the future of movie discovery with our AI-powered recommendation engine. Get personalized suggestions tailored to your unique taste in cinema.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
                        <button className=" bg-[#6366F1] px-[24px] py-[8px] rounded-[6px]  ">
                            Get Started Free
                        </button>
                        <button className=" border border-gray-600  px-[24px] py-[8px] rounded-[6px]  ">
                            Explore popular
                        </button>
                    </div>

                    <div className="flex items-center justify-center space-x-8 pt-8 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                        <i className="fa-solid fa-check text-[#06FFA5] "></i>
                        <span>No Credit Card Required</span>
                        </div>
                        <div className="flex items-center space-x-2">
                        <i className="fa-solid fa-check text-[#06FFA5] "></i>
                        <span>Instant Recommendations</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HeroSection