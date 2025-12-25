const HeroSection = () => {
    return (
        <div className="relative py-20 lg:py-32 overflow-hidden">
            

            <div className="flex w-full h-full items-center flex-col gap-10 ">
                <div className=" px-[24px] py-[8px] flex gap-4 items-center bg-[#161631] border border-gray-800 rounded-[16px] ">
                    <i className="fa-solid fa-clapperboard text-[#06ffa5] shadow-2x shadow-amber-400 "></i>
                    <span className=" text-[#80848d] ">Powered by Advanced AI Technology</span>
                </div>
                <div>
                    <span>Discover Your Next</span>
                    <span>Favorite Movie</span>
                </div>
                <div>
                    <span>Experience the future of movie discovery with our AI-powered recommendation engine. Get personalized suggestions tailored to your unique taste in cinema.</span>
                </div>
                <div>
                    <button>Get Started Free</button>
                    <button className=" bg-[#06ffa5] ">Explore Popular</button>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default HeroSection