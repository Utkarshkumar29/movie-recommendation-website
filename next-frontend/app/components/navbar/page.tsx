const Navbar=()=>{
    return(
        <div className=" bg-[#161631] flex justify-between px-[64px] h-[80px] items-center border-b border-gray-800 shadow-[#1f1f4a] shadow-md ">
            <div>CineAI</div>
            <div className=" flex gap-20 ">
                <div className=" flex gap-2 items-center text-[#80848d] text-[18px] "><i className="fa-solid fa-house-chimney"></i>Home</div>
                <div className=" flex gap-2 items-center text-[#80848d] text-[18px] "><i className="fa-solid fa-clapperboard"></i>Recommendations</div>
                <div className=" flex gap-2 items-center text-[#80848d] text-[18px] "><i className="fa-solid fa-fire"></i>Popular</div>
                <div className=" flex gap-2 items-center text-[#80848d] text-[18px] "><i className="fa-solid fa-calendar"></i>Upcoming</div>
            </div>
        </div>
    )
}

export default Navbar