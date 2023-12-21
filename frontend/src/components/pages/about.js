import React from "react";
import '../../CSS/about.css'

function app()
{
    return(
        <div className="about">Welcome to our movie recommendation system! We know that finding the perfect movie to watch can be a daunting task, especially with so many options available. That's why we created our movie recommendation system, to make your movie watching experience more enjoyable and personalized.

        Our system is based on a content-based algorithm that analyzes the features of a movie such as the genre, director, actors, and plot to recommend similar movies to the user. Our algorithm takes into account the user's movie preferences and viewing history to suggest movies that are tailored to their tastes.
        
        We have also created an API that allows users to access our movie recommendation system from various platforms. Our API is built using the MERN stack, which includes MongoDB, Express, React, and Node.js. We chose this stack because it allows us to create a seamless user experience, with fast load times and real-time updates.
        
        We are committed to providing the best movie recommendations to our users. We constantly update our algorithm to ensure that our recommendations are accurate and up-to-date. We also welcome user feedback and suggestions, as they help us improve our system and provide a better user experience.
        
        Thank you for choosing our movie recommendation system. We hope you enjoy your personalized movie recommendations and have a great movie watching experience!</div>
    )
}

export default app