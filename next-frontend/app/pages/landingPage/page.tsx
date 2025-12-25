import HeroSection from "@/app/components/heroSection/page"
import Navbar from "@/app/components/navbar/page"

const LandingPage=()=>{
    return(
        <div className=" bg-[#0f0f23] w-full min-h-screen ">
            <Navbar/>
            <main className=" pt-16 ">
                <HeroSection/>
            </main>
        </div>
    )
}

export default LandingPage