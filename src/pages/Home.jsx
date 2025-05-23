import { Link } from 'react-router-dom'

const Home = () => {
   return (
      <div>
         <div className="hero bg-base-100 min-h-150">
            <div className="hero-content text-center py-10">
               <div>
                  <div className="py-10">
                     <h1 className="text-5xl font-bold">Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#33bbff] to-[#1de099]">DerpFest!</span></h1>
                     <p className="text-xl py-6">
                        We are an AOSP based custom ROM, twisted with the latest features from all over the Android development community. Quality and stability is our first priority as we are dedicated to bringing you the best Android has to offer.
                     </p>
                     <Link to="/devices">
                        <button className="btn btn-lg btn-ghost hover:border-0 bg-gradient-to-r from-[#33bbff] to-[#1de099]">Download</button>
                     </Link>
                     <Link to="/screenshots">
                        <button className="btn btn-lg ml-2">View more</button>
                     </Link>
                  </div>
                  <div className="flex justify-center pt-6">
                     <img src="./img/product-screen-1.png" alt="Derpfest Wallpapers" className="mt-24 w-80 h-fit mr-4 rounded-3xl animate__animated animate__fadeInUp md:block hidden" />
                     <img src="./img/product-screen-2.png" alt="Derpfest Customizations" className="mt-12 w-80 h-fit mr-4 rounded-3xl animate__animated animate__fadeInUp animate__faster md:block hidden" />
                     <img src="./img/product-screen-3.png" alt="Derpfest About Phone" className="w-80 h-fit rounded-3xl animate__animated animate__fadeInUp" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;
