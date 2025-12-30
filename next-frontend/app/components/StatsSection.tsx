import React from 'react';


const StatsSection = () => {
  const stats = [
    {
      icon: <i className="fa-solid fa-film"></i>,
      value: "50K+",
      label: "Movies Analyzed",
      description: "Comprehensive database coverage"
    },
    {
      icon: <i className="fa-solid fa-user"></i>,
      value: "100K+",
      label: "Active Users",
      description: "Growing community worldwide"
    },
    {
      icon: <i className="fa-solid fa-star"></i>,
      value: "4.9/5",
      label: "User Rating",
      description: "Highly rated experience"
    },
    {
      icon: <i className="fa-solid fa-bolt"></i>,
      value: "99.9%",
      label: "Accuracy Rate",
      description: "Precise recommendations"
    }
  ];

  return (
    <div className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b dpointer-events-none" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="glass-panel rounded-3xl p-12 lg:p-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats?.map((stat, index) => (
              <div key={index} className="text-center stagger-item">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-6 shadow-glow">
                  {stat.icon}
                </div>
                <div className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat?.value}
                </div>
                <div className="text-lg font-semibold mb-2">{stat?.label}</div>
                <div className="text-sm text-muted-foreground">{stat?.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;