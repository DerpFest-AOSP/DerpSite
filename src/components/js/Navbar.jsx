import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Navbar.css';

const menuItems = [
  { title: 'Build', path: '/build' },
  { title: 'Screenshots', path: '/screenshots' },
  { title: 'Blog', path: '/blog' },
  { title: 'Devices', path: '/devices' },
  { title: 'Changelog', path: '/changelog' },
  { title: 'Team', path: '/team' },
];

const Navbar = () => {
  const { pathname } = useLocation();

  // The path the menu was opened on (null = closed). The menu only counts as
  // open while we're still on that path, so navigating closes it automatically.
  const [openedAtPath, setOpenedAtPath] = useState(null);
  const isMobileMenuOpen = openedAtPath === pathname;

  const openMenu = () => setOpenedAtPath(pathname);
  const closeMenu = () => setOpenedAtPath(null);
  const toggleMenu = () => (isMobileMenuOpen ? closeMenu() : openMenu());

  // Lock body scroll while the menu is open, and close on Escape
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpenedAtPath(null);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="navbar shadow-md relative z-[70]" aria-label="Main navigation">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          <img
            src="/img/logo.png"
            alt="DerpFest Logo"
            className="h-7 mr-2 transition-all duration-300 hover:scale-105"
          />
        </Link>
      </div>

      <div className="flex-none">
        {/* Desktop Menu */}
        <ul className="menu menu-horizontal px-1 md:flex hidden space-x-1">
          {menuItems.map((item) => (
            <li key={item.path}>
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
        <div className="md:hidden block ml-2 relative z-[70]">
          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className={`hamburger ${isMobileMenuOpen ? 'hamburger-open' : ''}`}
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[50] backdrop" onClick={closeMenu}></div>
      )}

      {/* Mobile Menu Content */}
      <div
        id="mobile-menu"
        className={`mobile-menu fixed top-0 left-0 right-0 bottom-0 z-[60] bg-gradient-to-b from-[#33bbff] to-[#1de099] shadow-2xl pt-20 pb-10 ${
          isMobileMenuOpen ? 'mobile-menu-open' : ''
        }`}
        style={{ height: '100vh', width: '100vw' }}
        inert={!isMobileMenuOpen}
      >
        <div className="container mx-auto px-4">
          <ul className="menu text-center">
            {menuItems.map((item, index) => (
              <li
                key={item.path}
                className={`menu-item ${isMobileMenuOpen ? 'menu-item-visible' : ''}`}
                style={{ transitionDelay: isMobileMenuOpen ? `${index * 0.08}s` : '0s' }}
              >
                <Link
                  to={item.path}
                  className="block py-5 text-2xl font-medium text-white hover:bg-white/20 active:bg-white/30 rounded-lg transition-all duration-300"
                  onClick={closeMenu}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Close button at bottom */}
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={closeMenu}
              className="btn btn-ghost text-white text-lg mt-4 p-3 rounded-full border border-white/30 hover:bg-white/20 transition-all"
            >
              Close Menu
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;