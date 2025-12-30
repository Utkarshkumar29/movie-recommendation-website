import Link from 'next/link';
import React from 'react';


const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    product: [
      { label: 'Recommendations', path: '/recommendation-dashboard' },
      { label: 'Popular Movies', path: '/popular-movies' },
      { label: 'Upcoming Movies', path: '/upcoming-movies' }
    ],
    company: [
      { label: 'About Us', path: '#' },
      { label: 'Careers', path: '#' },
      { label: 'Blog', path: '#' }
    ],
    support: [
      { label: 'Help Center', path: '#' },
      { label: 'Contact Us', path: '#' },
      { label: 'Privacy Policy', path: '#' }
    ]
  };

  const socialLinks = [
    { icon: <i className="fa-brands fa-x-twitter"></i>, label: 'Twitter', url: '#' },
    { icon: <i className="fa-brands fa-facebook"></i>, label: 'Facebook', url: '#' },
    { icon: <i className="fa-brands fa-instagram"></i>, label: 'Instagram', url: '#' },
    { icon: <i className="fa-brands fa-youtube"></i>, label: 'YouTube', url: '#' }
  ];

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link href="/landing-page" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
                <i className="fa-solid fa-film"></i>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CineAI
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Discover your next favorite movie with AI-powered recommendations. Experience the future of cinema discovery.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks?.map((social) => (
                <a
                  key={social?.label}
                  href={social?.url}
                  className="w-10 h-10 rounded-lg glass-panel flex items-center justify-center hover:bg-primary/20 smooth-transition"
                  aria-label={social?.label}
                >
                  {social?.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks?.product?.map((link) => (
                <li key={link?.label}>
                  <Link
                    href={link?.path}
                    className="text-muted-foreground hover:text-foreground smooth-transition"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link) => (
                <li key={link?.label}>
                  <Link
                    href={link?.path}
                    className="text-muted-foreground hover:text-foreground smooth-transition"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks?.support?.map((link) => (
                <li key={link?.label}>
                  <div
                    
                    className="text-muted-foreground hover:text-foreground smooth-transition"
                  >
                    {link?.label}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} CineAI. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground smooth-transition">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-foreground smooth-transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground smooth-transition">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;