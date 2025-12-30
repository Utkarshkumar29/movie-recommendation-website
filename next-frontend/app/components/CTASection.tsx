import React from 'react';


const CTASection = () => {


    return (
        <div className="py-20 lg:py-32">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="glass-panel rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 pointer-events-none" />

                    <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                        <div className="inline-flex items-center space-x-2 glass-panel px-4 py-2 rounded-full mb-4">
                            <i className="fa-solid fa-clapperboard text-[#06ffa5] shadow-2x shadow-amber-400 "></i>
                            <span className="text-sm font-medium">Start Your Journey Today</span>
                        </div>

                        <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                            Ready to Discover
                            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                Amazing Movies?
                            </span>
                        </h2>

                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Join thousands of movie enthusiasts who trust CineAI to find their next favorite film. Get started in seconds with our AI-powered recommendation engine.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                            <button className=" bg-[#6366F1] px-[24px] py-[8px] rounded-[6px]  ">
                                Get Started Free
                            </button>
                            <button className=" border border-gray-600  px-[24px] py-[8px] rounded-[6px]  ">
                                Explore popular
                            </button>
                        </div>

                        <div className="flex items-center justify-center space-x-6 pt-8 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                                <i className="fa-solid fa-shield"></i>
                                <span>Secure & Private</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <i className="fa-solid fa-bolt"></i>
                                <span>Instant Access</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <i className="fa-solid fa-heart"></i>
                                <span>Free Forever</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CTASection;