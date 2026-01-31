import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { MeshStandardMaterial } from "three";

const ThreeMoviePosterCarousel = () => {

    const [currentIndex, setCurrentIndex] = useState(0)
    const moviePosters = [
        {
            id: 1,
            title: "Inception",
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_16c16df93-1764668729988.png",
            alt: "Cinematic movie poster showing futuristic cityscape bending upward with dramatic lighting and deep blue tones creating surreal dreamlike atmosphere",
            year: "2010",
            rating: "8.8"
        },
        {
            id: 2,
            title: "The Dark Knight",
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_10685afe7-1764668724947.png",
            alt: "Dark atmospheric movie poster featuring silhouetted figure against burning cityscape with orange flames and black smoke creating intense dramatic mood",
            year: "2008",
            rating: "9.0"
        },
        {
            id: 3,
            title: "Interstellar",
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1cecebd91-1765046063931.png",
            alt: "Epic space movie poster showing astronaut floating near massive black hole with swirling cosmic dust and brilliant stars in deep space",
            year: "2014",
            rating: "8.6"
        },
        {
            id: 4,
            title: "The Matrix",
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_19ba02206-1764677118370.png",
            alt: "Cyberpunk movie poster with green digital rain code cascading down black background and silhouetted figure in long coat creating mysterious tech atmosphere",
            year: "1999",
            rating: "8.7"
        },
        {
            id: 5,
            title: "Blade Runner 2049",
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b01b6c88-1765078724758.png",
            alt: "Futuristic noir movie poster showing neon-lit dystopian cityscape with towering buildings reflected in rain-soaked streets under orange and purple sky",
            year: "2017",
            rating: "8.0"
        }];

    return (
        <Canvas>
            <mesh>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color="hotpink" />
            </mesh>
        </Canvas>
    )
}

export default ThreeMoviePosterCarousel