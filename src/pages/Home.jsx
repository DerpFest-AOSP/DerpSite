import { Link } from 'react-router-dom'

const Home = () => {
   return (
      <div className="relative overflow-hidden">
         {/* Animated background elements */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#33bbff] to-[#1de099] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-[#1de099] to-[#33bbff] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute -bottom-8 left-1/2 w-80 h-80 bg-gradient-to-r from-[#33bbff] to-[#1de099] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
         </div>

         <div className="hero bg-transparent min-h-screen relative z-10">
            <div className="hero-content text-center py-20">
               <div className="max-w-4xl">
                  <div className="py-10">
                     <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#33bbff] to-[#1de099] gradient-shift">DerpFest!</span>
                     </h1>
                     <p className="text-xl md:text-2xl py-8 leading-relaxed text-gray-300 max-w-3xl mx-auto">
                        We are an AOSP based custom ROM, twisted with the latest features from all over the Android development community. Quality and stability are our first priority as we are dedicated to bringing you the best Android has to offer.
                     </p>
                     <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
                        <Link to="/devices">
                           <button className="btn btn-lg px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[#33bbff] to-[#1de099] hover:from-[#1de099] hover:to-[#33bbff] border-0 text-white shadow-2xl hover:shadow-[#33bbff]/25 transition-all duration-300 hover:scale-105 pulse-glow">
                              Download Now
                           </button>
                        </Link>
                        <Link to="/screenshots">
                           <button className="btn btn-lg px-8 py-4 text-lg font-semibold bg-transparent border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                              View Screenshots
                           </button>
                        </Link>
                     </div>
                  </div>
                  
                  {/* Enhanced product screens with better animations */}
                  <div className="flex justify-center pt-12 relative gap-8">
                     <div className="relative select-none">
                        <img 
                           src="./img/product-screen-1.png" 
                           alt="Derpfest Wallpapers" 
                           className="mt-24 w-80 h-fit rounded-3xl shadow-2xl hover:shadow-[#33bbff]/20 transition-all duration-500 hover:scale-105 float-animation md:block hidden pointer-events-none" 
                           draggable="false"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#33bbff]/20 to-transparent rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                     </div>
                     <div className="relative select-none">
                        <img 
                           src="./img/product-screen-2.png" 
                           alt="Derpfest Customizations" 
                           className="mt-12 w-80 h-fit rounded-3xl shadow-2xl hover:shadow-[#1de099]/20 transition-all duration-500 hover:scale-105 float-animation md:block hidden pointer-events-none" 
                           style={{animationDelay: '1s'}}
                           draggable="false"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1de099]/20 to-transparent rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                     </div>
                     <div className="relative select-none">
                        <img 
                           src="./img/product-screen-3.png" 
                           alt="Derpfest About Phone" 
                           className="w-80 h-fit rounded-3xl shadow-2xl hover:shadow-[#33bbff]/20 transition-all duration-500 hover:scale-105 float-animation pointer-events-none" 
                           style={{animationDelay: '2s'}}
                           draggable="false"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#33bbff]/20 to-transparent rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;
