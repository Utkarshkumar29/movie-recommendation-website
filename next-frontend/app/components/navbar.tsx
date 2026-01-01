'use client'
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathanme = usePathname()
  console.log("Current Path:", router, pathanme);

  const navigationItems = [
    { label: 'Home', path: '/', icon: <i className="fa-solid fa-house-chimney"></i> },
    { label: 'Recommendations', path: '/recommendation-dashboard', icon: <i className="fa-solid fa-clapperboard"></i> },
    { label: 'Popular', path: '/popular-movies', icon: <i className="fa-solid fa-fire"></i> },
    { label: 'Upcoming', path: '/upcoming-movies', icon: <i className="fa-solid fa-calendar"></i> }
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathanme === "/";
    }
    return pathanme.startsWith(path);
  };


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center space-x-3 smooth-transition hover:opacity-80"
              onClick={closeMobileMenu}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
                <i className="fa-solid fa-film"></i>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CineAI
              </span>
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  href={item?.path}
                  className={`
                   cursor-pointer flex items-center space-x-2 px-4 py-2 rounded-lg smooth-transition
                    ${isActive(item?.path)
                      ? 'bg-primary/20 text-primary border border-primary/30 shadow-glow'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                  onClick={() => router.push(`/pages/${item?.path}`)}
                >
                  {item?.icon}
                  <span className="font-medium">{item?.label}</span>
                </Link>
              ))}
            </nav>


            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-muted/50 smooth-transition"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <i className="fa-solid fa-x"></i> : <i className="fa-solid fa-bars"></i>}
            </button>
          </div>
        </div>
      </header>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={closeMobileMenu}
        />
      )}
      <div
        className={`
          fixed top-16 left-0 right-0 z-40 lg:hidden
          transform smooth-transition
          ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
        `}
      >
        <nav className="glass-panel border-b border-border mx-4 mt-4 rounded-lg overflow-hidden">
          {navigationItems?.map((item, index) => (
            <Link
              key={item?.path}
              href={item?.path}
              onClick={closeMobileMenu}
              className={`
                flex items-center space-x-3 px-6 py-4 smooth-transition
                ${isActive(item?.path)
                  ? 'bg-primary/20 text-primary border-l-4 border-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border-l-4 border-transparent'
                }
                ${index !== navigationItems?.length - 1 ? 'border-b border-border/50' : ''}
              `}
            >
              {item?.icon}
              <span className="font-medium">{item?.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;