import '../css/Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
   return (
      <div>
         <footer className="footer sm:footer-horizontal bg-base-200 text-base-content md:p-10 p-6">
            <aside>
               <p className="leading-7">
                  <span className="text-3xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-[#33bbff] to-[#1de099]">DerpFest</span>
                  <br />
                  © 2020 - 2025 DerpFest AOSP. All Rights reserved
                  <br />
                  Website Designed By <Link to="/credit">DerpFest Team</Link>
               </p>
            </aside>
            <nav>
               <h6 className="footer-title">Link</h6>
               <Link to="/build">Build</Link>
               <Link to="/changelogs">Changelogs</Link>
               <Link to="/credit">Credit</Link>
               <Link to="/devices">Devices</Link>
               <Link to="/faq">FAQ</Link>
               <Link to="/team">Team</Link>
               <Link to="/tou">Terms of Use</Link>
            </nav>
            <nav>
               <h6 className="footer-title">Social</h6>
               <a href="https://t.me/derpfestupdates" target="_blank">Release Channel</a>
               <a href="https://t.me/DerpFestAOSP" target="_blank">Telegram</a>
               <a href="https://github.com/DerpFest-AOSP" target="_blank">GitHub</a>
               <a href="https://github.com/DerpFest-Devices" target="_blank">GitHub (Devices)</a>
            </nav>
         </footer>
      </div>
   );
};

export default Footer;