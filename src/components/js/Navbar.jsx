import '../css/Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
   return (
      <div className="navbar shadow-sm">
         <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl">
               <img src="./img/favicon.png" alt="DerpFest Logo" className="w-6 h-6 mr-2" />
               DerpFest
            </Link>
         </div>
         <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
               <li><Link to="/build">Build</Link></li>
               <li><Link to="/changelogs">Changelogs</Link></li>
               <li><Link to="/devices">Devices</Link></li>
               <li><Link to="/faq">FAQ</Link></li>
               <li><Link to="/screenshots">Screenshots</Link></li>
            </ul>
         </div>
      </div>
   );
};

export default Navbar;