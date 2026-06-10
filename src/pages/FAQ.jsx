const FAQ = () => {
   return (
      <div className="py-12 px-4 max-w-4xl mx-auto">
         <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#33bbff] to-[#1de099]">FAQ</span>
            </h1>
            <p className="text-xl text-gray-300">Frequently Asked Questions</p>
         </div>
         
         <div className="space-y-6">
            <div className="collapse bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
               <input type="checkbox" className="peer" />
               <div className="collapse-title text-lg font-semibold text-white peer-checked:bg-gradient-to-r peer-checked:from-[#33bbff]/20 peer-checked:to-[#1de099]/20 transition-all duration-300">
                  Why DerpFest includes GApps by default?
               </div>
               <div className="collapse-content text-gray-300 leading-relaxed">
                  <div className="pt-4">
                     <p className="mb-3">Built-in GApps is the cleanest way to install them to be honest.</p>
                     <p className="mb-3">You can even check for missing privapp permissions that way, and no way to mess up by the installer.</p>
                     <p>Without considering the fact that you get to skip a step during installation.</p>
                  </div>
               </div>
            </div>

            <div className="collapse bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
               <input type="checkbox" className="peer" />
               <div className="collapse-title text-lg font-semibold text-white peer-checked:bg-gradient-to-r peer-checked:from-[#33bbff]/20 peer-checked:to-[#1de099]/20 transition-all duration-300">
                  Will there be a Non-GApps version?
               </div>
               <div className="collapse-content text-gray-300 leading-relaxed">
                  <div className="pt-4">
                     <p className="text-xl font-semibold text-white">No.</p>
                  </div>
               </div>
            </div>

            <div className="collapse bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
               <input type="checkbox" className="peer" />
               <div className="collapse-title text-lg font-semibold text-white peer-checked:bg-gradient-to-r peer-checked:from-[#33bbff]/20 peer-checked:to-[#1de099]/20 transition-all duration-300">
                  How can I apply for official maintainership for my device?
               </div>
               <div className="collapse-content text-gray-300 leading-relaxed">
                  <div className="pt-4">
                     <p className="mb-3">
                        Contact us on our <a href="https://t.me/DerpFestAOSP" target="_blank" className="text-[#33bbff] hover:text-[#1de099] transition-colors duration-300 font-semibold underline decoration-[#1de099] hover:decoration-[#33bbff]">Telegram</a> group.
                     </p>
                     <p>Our team will verify your device tree and other requirements and then, if they decide to, they will add you</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default FAQ;
