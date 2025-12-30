import React, { ReactNode } from 'react';

interface StatsBarProps {
  totalMovies: number;
  filteredMovies: number;
  averageRating: number | null;
}

interface StatItem {
  icon: ReactNode;
  label: string;
  value: number | string;
  color: string;
}

const StatsBar = ({ totalMovies, filteredMovies, averageRating }:StatsBarProps) => {
  const stats = [
    {
      icon: <i className="fa-solid fa-arrow-trend-up"></i>,
      label: 'Total Movies',
      value: totalMovies,
      color: 'text-primary'
    },
    {
      icon: <i className="fa-solid fa-filter"></i>,
      label: 'Filtered Results',
      value: filteredMovies,
      color: 'text-secondary'
    },
    {
      icon: <i className="fa-solid fa-star"></i>,
      label: 'Average Rating',
      value: averageRating?.toFixed(1),
      color: 'text-accent'
    }
  ];

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats?.map((stat, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-4 rounded-lg bg-muted/30 smooth-transition hover:bg-muted/50"
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center ${stat?.color}`}>
              {stat.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{stat?.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;