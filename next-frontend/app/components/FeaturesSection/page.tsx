import FeatureCard from "../FeatureCard/page"

const FeaturesSections = () => {

    const features = [
        {
            icon: <i className="fa-solid fa-brain"></i>,
            title: "AI-Powered Intelligence",
            description: "Our advanced machine learning algorithms analyze millions of data points to understand your unique preferences and deliver highly accurate movie recommendations tailored just for you.",
            gradient: "from-primary to-secondary"
        },
        {
            icon: <i className="fa-solid fa-bolt"></i>,
            title: "Instant Discovery",
            description: "Get personalized movie suggestions in seconds. Our lightning-fast recommendation engine processes your preferences instantly to help you discover your next favorite film without the endless scrolling.",
            gradient: "from-secondary to-accent"
        },
        {
            icon: <i className="fa-solid fa-arrow-trend-up"></i>,
            title: "Trending Insights",
            description: "Stay ahead of the curve with real-time insights into what's popular and upcoming. Discover trending movies, hidden gems, and critically acclaimed films before they become mainstream.",
            gradient: "from-accent to-primary"
        },
        {
            icon: <i className="fa-solid fa-heart"></i>,
            title: "Personalized Experience",
            description: "Build your unique taste profile as you interact with recommendations. The more you use CineAI, the better it understands your preferences, delivering increasingly accurate suggestions over time.",
            gradient: "from-primary to-accent"
        }
    ]

    return (
        <div className="py-20 lg:py-32">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        Why Choose
                        <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            CineAI?
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Experience the next generation of movie discovery with cutting-edge AI technology and intuitive design.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features?.map((feature, index) => (
                        <div key={index} className="stagger-item">
                            <FeatureCard {...feature} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FeaturesSections