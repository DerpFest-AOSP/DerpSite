import '../css/Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
   return (
      <div>
         <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
            <aside>
               <p className="leading-6">
                  <span className="text-3xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-[#33bbff] to-[#1de099]">DerpFest</span>
                  <br />
                  © 2020 - 2025 DerpFest AOSP. All Rights reserved
                  <br />
                  Website Designed By <Link to="/credit">DerpFest Team</Link>
               </p>
            </aside>
            <nav>
               <h6 className="footer-title">Contents</h6>
               <Link to="/build" className="link link-hover">Build</Link>
               <Link to="/changelogs" className="link link-hover">Changelogs</Link>
               <Link to="/credit" className="link link-hover">Credit</Link>
               <Link to="/devices" className="link link-hover">Devices</Link>
               <Link to="/faq" className="link link-hover">FAQ</Link>
               <Link to="/pp" className="link link-hover">Privacy Policy</Link>
               <Link to="/team">Team</Link>
               <Link to="/tou" className="link link-hover">Terms of Use</Link>
            </nav>
            <nav>
               <h6 className="footer-title">Links</h6>
               <a href="https://t.me/derpfestupdates" target="_blank" className="link link-hover">Release Channel</a>
               <a href="https://t.me/DerpFestAOSP" target="_blank" className="link link-hover">Telegram</a>
               <a href="https://github.com/DerpFest-AOSP" target="_blank" className="link link-hover">GitHub</a>
               <a href="https://github.com/DerpFest-Devices" target="_blank" className="link link-hover">GitHub (Devices)</a>
            </nav>
         </footer>
      </div>
   );
};

export default Footer;