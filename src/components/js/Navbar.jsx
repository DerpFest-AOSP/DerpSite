import '../css/Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
   return (
      <div className="navbar shadow-sm">
         <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl">
               <img src="./img/logo.png" alt="DerpFest Logo" className="h-6 mr-2" />
            </Link>
         </div>
         <div className="flex-none">
            {/* Desktop Menu */}
            <ul className="menu menu-horizontal px-1 md:flex hidden">
               <li><Link to="/build">Build</Link></li>
               <li><Link to="/changelogs">Changelogs</Link></li>
               <li><Link to="/devices">Devices</Link></li>
               <li><Link to="/faq">FAQ</Link></li>
               <li><Link to="/screenshots">Screenshots</Link></li>
               <li><Link to="/team">Team</Link></li>
            </ul>
            {/* Mobile Menu */}
            <div className="dropdown dropdown-end md:hidden block">
               <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-7 w-7 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
               </div>
               <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-black dark:text-white">
                  <li><Link to="/build">Build</Link></li>
                  <li><Link to="/changelogs">Changelogs</Link></li>
                  <li><Link to="/devices">Devices</Link></li>
                  <li><Link to="/faq">FAQ</Link></li>
                  <li><Link to="/screenshots">Screenshots</Link></li>
                  <li><Link to="/team">Team</Link></li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default Navbar;