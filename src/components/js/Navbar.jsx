import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [window.location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  // Animation delays for menu items
  const menuItems = [
    { title: 'Build', path: '/build' },
    { title: 'Changelogs', path: '/changelogs' },
    { title: 'Devices', path: '/devices' },
    { title: 'FAQ', path: '/faq' },
    { title: 'Screenshots', path: '/screenshots' },
    { title: 'Team', path: '/team' }
  ];

  return (
    <div className="navbar shadow-md">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          <img 
            src="./img/logo.png" 
            alt="DerpFest Logo" 
            className="h-7 mr-2 transition-all duration-300 hover:scale-105" 
          />
        </Link>
      </div>
      
      <div className="flex-none">
        {/* Desktop Menu */}
        <ul className="menu menu-horizontal px-1 md:flex hidden space-x-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link 
                to={item.path}
                className="px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/20 active:bg-white/30"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden block ml-2">
          <button 
            className={`hamburger ${isMobileMenuOpen ? 'hamburger-open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              className="inline-block h-8 w-8 stroke-current"
            > 
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path> 
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Menu Content */}
      <div 
        className={`mobile-menu fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#33bbff] to-[#1de099] shadow-2xl pt-20 pb-10 ${
          isMobileMenuOpen ? 'mobile-menu-open' : ''
        }`}
      >
        <div className="container mx-auto px-4">
          <ul className="menu text-center">
            {menuItems.map((item, index) => (
              <li 
                key={index}
                className={`menu-item ${isMobileMenuOpen ? 'menu-item-visible' : ''}`}
                style={{ transitionDelay: isMobileMenuOpen ? `${index * 0.08}s` : '0s' }}
              >
                <Link 
                  to={item.path}
                  className="block py-5 text-2xl font-medium text-white hover:bg-white/20 active:bg-white/30 rounded-lg transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Close button at bottom */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn btn-ghost text-white text-lg mt-4 p-3 rounded-full border border-white/30 hover:bg-white/20 transition-all"
            >
              Close Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;