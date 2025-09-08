import TeamData from '../components/data/team.json'

const Team = () => {
   const getShape = (index) => {
      const shapeIndex = index % 4;
      switch(shapeIndex) {
         case 0: return "circle";
         case 1: return "tilted-square";
         case 2: return "square";
         case 3: return "triangle";
         default: return "circle";
      }
   };

   const formatRole = (role) => {
      return role.split('\n').map((line, index) => (
         <span key={index} className={index === 0 ? "font-semibold text-base-content" : "text-base-content/70"}>
            {line}
            {index < role.split('\n').length - 1 && <br />}
         </span>
      ));
   };

   return (
      <div className="py-12 min-h-screen bg-base-100">
         <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-base-content mb-4">
               Meet Our Team
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#33bbff] to-[#1de099] mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto px-4">
               The passionate individuals behind our project, dedicated to bringing you the best experience.
            </p>
         </div>

         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
               {TeamData.map((team, index) => {
                  const initials = team.name.split(' ').map(n => n[0]).join('').toUpperCase();
                  const shape = getShape(index);
                  
                  return (
                  <div 
                     key={index}
                     className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-base-300 hover:border-[#33bbff]/30"
                  >
                     <div className="h-1 bg-gradient-to-r from-[#33bbff] to-[#1de099]"></div>
                     
                     <div className="card-body p-6">
                        <div className="flex justify-center mb-4">
                           <div className="avatar relative w-20 h-20 mx-auto">
                              <svg 
                                 width="80" 
                                 height="80" 
                                 viewBox="0 0 80 80"
                                 className="drop-shadow-md"
                              >
                                 <defs>
                                    <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                       <stop offset="0%" stopColor="#33bbff" />
                                       <stop offset="50%" stopColor="#2dd4bf" />
                                       <stop offset="100%" stopColor="#1de099" />
                                    </linearGradient>
                                    <pattern 
                                       id={`dots-${index}`} 
                                       width="20" 
                                       height="20" 
                                       patternUnits="userSpaceOnUse"
                                    >
                                       <circle cx="10" cy="10" r="2" fill="white" opacity="0.2" />
                                    </pattern>
                                 </defs>
                                 
                                 {shape === "circle" && (
                                    <>
                                       <circle cx="40" cy="40" r="36" fill={`url(#gradient-${index})`} />
                                       <circle cx="40" cy="40" r="36" fill={`url(#dots-${index})`} />
                                       <circle cx="40" cy="40" r="35" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
                                       <text 
                                          x="40" 
                                          y="45" 
                                          textAnchor="middle" 
                                          fill="white" 
                                          fontSize="20" 
                                          fontWeight="600"
                                          fontFamily="system-ui, sans-serif"
                                       >
                                          {initials}
                                       </text>
                                    </>
                                 )}
                                 
                                 {shape === "tilted-square" && (
                                    <>
                                       <path d="M40,10 L70,40 L40,70 L10,40 Z" fill={`url(#gradient-${index})`} />
                                       <path d="M40,10 L70,40 L40,70 L10,40 Z" fill={`url(#dots-${index})`} />
                                       <path d="M40,10 L70,40 L40,70 L10,40 Z" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
                                       <text 
                                          x="40" 
                                          y="45" 
                                          textAnchor="middle" 
                                          fill="white" 
                                          fontSize="20" 
                                          fontWeight="600"
                                          fontFamily="system-ui, sans-serif"
                                       >
                                          {initials}
                                       </text>
                                    </>
                                 )}
                                 
                                 {shape === "square" && (
                                    <>
                                       <rect x="10" y="10" width="60" height="60" fill={`url(#gradient-${index})`} />
                                       <rect x="10" y="10" width="60" height="60" fill={`url(#dots-${index})`} />
                                       <rect x="10" y="10" width="60" height="60" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
                                       <text 
                                          x="40" 
                                          y="45" 
                                          textAnchor="middle" 
                                          fill="white" 
                                          fontSize="20" 
                                          fontWeight="600"
                                          fontFamily="system-ui, sans-serif"
                                       >
                                          {initials}
                                       </text>
                                    </>
                                 )}
                                 
                                 {shape === "triangle" && (
                                    <>
                                       <path d="M40,10 L70,70 L10,70 Z" fill={`url(#gradient-${index})`} />
                                       <path d="M40,10 L70,70 L10,70 Z" fill={`url(#dots-${index})`} />
                                       <path d="M40,10 L70,70 L10,70 Z" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
                                       <text 
                                          x="40" 
                                          y="50" 
                                          textAnchor="middle" 
                                          fill="white" 
                                          fontSize="18" 
                                          fontWeight="600"
                                          fontFamily="system-ui, sans-serif"
                                       >
                                          {initials}
                                       </text>
                                    </>
                                 )}
                              </svg>
                           </div>
                        </div>

                        <h2 className="text-xl font-bold text-center text-base-content mb-3">
                           {team.name}
                        </h2>
                        
                        <div className="text-center mb-6 min-h-[4rem] flex items-center justify-center">
                           <div className="text-sm leading-relaxed">
                              {formatRole(team.role)}
                           </div>
                        </div>

                        <div className="flex justify-center gap-3">
                           <a 
                              href={team.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="btn btn-sm bg-gradient-to-r from-[#33bbff] to-[#1de099] text-white border-0 hover:shadow-md hover:scale-105 transition-all duration-200"
                           >
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                 <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                              </svg>
                              GitHub
                           </a>
                           
                           <a 
                              href={team.telegram} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline border-base-300 hover:border-[#33bbff] hover:bg-[#33bbff] hover:text-white transition-all duration-200"
                           >
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                 <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
                              </svg>
                              Telegram
                           </a>
                        </div>
                     </div>
                  </div>
               )})}
            </div>
         </div>

         <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-2 text-base-content/50">
               <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#33bbff] to-transparent"></div>
               <span className="text-sm">Built with passion</span>
               <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#1de099] to-transparent"></div>
            </div>
         </div>
      </div>
   );
};

export default Team;
