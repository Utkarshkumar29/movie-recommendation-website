import HeroSection from "@/app/components/heroSection/page"
import Navbar from "@/app/components/navbar/page"

const LandingPage=()=>{
    return(
        <div className=" bg-[#0f0f23] w-full min-h-screen ">
            <Navbar/>
            <main className=" pt-16 ">
                <HeroSection/>
                
                <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Featured
                <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent"> Movies</span>
              </h2>
              <p className="text-[#94A3B8] text-lg">
                Explore our curated collection in stunning 3D
              </p>
            </div>
            
          </div>
        </section>
                
            </main>
        </div>
    )
}

export default LandingPage