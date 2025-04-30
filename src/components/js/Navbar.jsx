import '../css/Navbar.css'

const Navbar = () => {
   return (
      <div className="navbar shadow-sm">
         <div className="flex-1">
            <a className="btn btn-ghost text-xl">
               <img src="./img/favicon.png" alt="DerpFest Logo" className="w-6 h-6 mr-2" />
               DerpFest
            </a>
         </div>
         <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
               <li><a>Link</a></li>
               <li>
                  <details>
                     <summary>Parent</summary>
                     <ul className="text-black bg-base-100 rounded-t-none p-2">
                        <li><a>Link 1</a></li>
                        <li><a>Link 2</a></li>
                     </ul>
                  </details>
               </li>
            </ul>
         </div>
      </div>
   );
};

export default Navbar;