import { Link } from 'react-router-dom'

const featureShowcase = [
   {
      title: 'Game Space',
      subtitle: 'Performance & focus controls',
      description: 'Curated by DerpFest for gamers: tweak GPU profiles, silence distractions, and surface critical stats without leaving your match.',
      accent: 'from-[#33bbff] to-[#1de099]',
      image: './img/5226475742240116555.jpg',
      imageAlt: 'DerpFest Game Space dashboard',
   },
   {
      title: 'QS Layout Studio',
      subtitle: 'Quick Settings, your way',
      description: 'Define exact rows and columns for portrait and landscape quick settings. Our layout tools keep your toggles structured no matter how you hold the device.',
      accent: 'from-[#1de099] to-[#33bbff]',
      image: './img/5226475742240116575.jpg',
      imageAlt: 'DerpFest quick settings layout customizations',
   },
   {
      title: 'Gradient QS Tiles',
      subtitle: 'Dynamic color theming',
         description: 'Blend dual-tone gradients across quick settings tiles and the brightness slider for a unified look.',
      accent: 'from-[#33bbff] to-[#1de099]',
      image: './img/5226475742240116573.jpg',
      imageAlt: 'DerpFest gradient quick settings tiles',
   },
   {
      title: 'Gradient Volume Slider',
      subtitle: 'Volume controls, gradient tinted',
      description: 'Volume slider styled with gradient tint for a cohesive Material You look. One of the features we shipped for the Android community.',
      accent: 'from-[#33bbff] to-[#1de099]',
      image: './img/5190896052771427113.jpg',
      imageAlt: 'DerpFest volume slider in gradient tinted style',
   },
   {
      title: 'Caddy',
      subtitle: 'App drawer grouping',
      description: 'Group applications in the app drawer. Ported from Lawnchair launcher into DerpFest launcher, based on AOSP Launcher3.',
      accent: 'from-[#1de099] to-[#33bbff]',
      image: './img/5467634951864913145.jpg',
      imageAlt: 'DerpFest Caddy app drawer grouping',
   },
   {
      title: 'Accord × DynamicBar',
      subtitle: 'Apple Music vibes, in your status bar',
      description: (
         <>
            DerpFest ships{' '}
            <a href="https://github.com/FoedusProgramme/Accord" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#33bbff] transition-colors duration-300 no-underline">Accord</a>
            , a stunning local music player inspired by Apple Music, built by our friends at FoedusProgramme. Paired with DynamicBar — an expandable status bar chip ported from{' '}
            <a href="https://github.com/AxionAOSP" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#33bbff] transition-colors duration-300 no-underline">AxionOS</a>
            {' '}— we brought Accord’s cinematic backdrop blur, player design, and seekbar eye candy animation into the expanded media card.
         </>
      ),
      accent: 'from-[#33bbff] to-[#1de099]',
      image: './img/5467370364699613033.jpg',
      imageAlt: 'DerpFest Accord music player with DynamicBar expanded media card',
      footer: 'Accord by FoedusProgramme · DynamicBar by AxionOS',
   },
   {
      title: 'Accent Status Bar',
      subtitle: 'Material You, actually shipped',
      description: 'Google teased it in their Material You mock-ups; we made it real. Flip the toggle and let system accents flow right into your status bar chrome.',
      accent: 'from-[#1de099] to-[#33bbff]',
      image: './img/5226475742240116596.jpg',
      imageAlt: 'DerpFest accent colored status bar toggle',
      imageWrapperClass: 'relative flex justify-center mb-6',
      imageClass: 'w-48 md:w-56 h-auto rounded-2xl border border-white/20 shadow-lg shadow-black/20 bg-black/40 p-4',
      imageOverlay: false,
      layout: 'landscape',
   },
   {
      title: 'Pixel Launcher Hotseat',
      subtitle: 'Android 16 QPR1 search style',
      description: 'We ported the closed-source Android 16 QPR1 Pixel Launcher hotseat search bar look into our open implementation.',
      accent: 'from-[#1de099] to-[#33bbff]',
      image: './img/5226475742240116599.jpg',
      imageAlt: 'DerpFest Pixel Launcher hotseat styles',
      imageWrapperClass: 'relative flex justify-center mb-6',
      imageClass: 'w-56 md:w-64 h-auto rounded-2xl border border-white/20 shadow-lg shadow-black/20 bg-black/40 p-3',
      imageOverlay: false,
      layout: 'landscape'
   },
   {
      title: 'Edge Light Live Preview',
      subtitle: 'See notifications glow before you apply',
      description: 'We built a live preview for edge light notifications — tune pulse count, bar width, and color mode on a device mockup and watch the effect update in real time as you customize it.',
      accent: 'from-[#33bbff] to-[#1de099]',
      image: './img/5282839792066436781.jpg',
      imageAlt: 'DerpFest edge light notification live preview in settings',
   },
   {
      title: 'Status Bar Clock Background',
      subtitle: 'Clock chip styles',
      description: 'Choose status bar clock background chip styles from a dedicated picker. Forward ported from Rising OS source with improved colors and settings preferences.',
      accent: 'from-[#1de099] to-[#33bbff]',
      image: './img/5233574769129625083.jpg',
      imageAlt: 'DerpFest status bar clock background chip style picker',
   },
];

const philosophyCards = [
   {
      title: 'Original by Design',
      description:
         'DerpFest is not a patchwork of borrowed features. We prototype, build, and ship a lot of what lands in our builds ourselves — unique tools and ideas that come from our team, not an endless mix of other projects.',
      span: 'md:col-span-2',
      accent: 'from-[#33bbff]/10 to-transparent',
   },
   {
      title: 'Clean & Considered',
      description:
         'Additions are planned before they ship. New work is shaped with feedback from our maintainers along the way, so what you get feels polished and intentional — not thrown together.',
      span: '',
      accent: 'from-[#1de099]/10 to-transparent',
   },
   {
      title: 'Studied, Then Rebuilt',
      description:
         'When we want Pixel-like behavior or OEM polish, we study how Google, Samsung, and others implement it — then write our own implementation on top of AOSP. Inspired by the best, written entirely in our tree.',
      span: '',
      accent: 'from-purple-500/10 to-transparent',
   },
   {
      title: 'Pixel Fidelity',
      description:
         'We follow Pixel stock design language and Google\'s Material Design 3 expressive guidelines across settings, launcher, and system UI — so DerpFest feels native, cohesive, and unmistakably Google-aligned.',
      span: 'md:col-span-2',
      accent: 'from-zinc-500/10 to-transparent',
   },
];

const Home = () => {
   return (
      <div className="relative overflow-hidden">
         {/* Animated background elements */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#33bbff] to-[#1de099] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-[#1de099] to-[#33bbff] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute -bottom-8 left-1/2 w-80 h-80 bg-gradient-to-r from-[#33bbff] to-[#1de099] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
         </div>

         <div className="hero bg-transparent relative z-10">
            <div className="hero-content text-center py-20">
               <div className="max-w-4xl">
                  <div className="py-10">
                     <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#33bbff] to-[#1de099] gradient-shift">DerpFest!</span>
                     </h1>
                     <p className="text-xl md:text-2xl py-8 leading-relaxed text-gray-300 max-w-3xl mx-auto">
                        Combining newest security patches, original features and wide device support, DerpFest is a product created to make your life easier and breathe some fresh air into the Android Custom ROM scene.
                     </p>
                     <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
                        <Link to="/devices">
                           <button className="btn btn-lg px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-[#33bbff] to-[#1de099] hover:from-[#1de099] hover:to-[#33bbff] border-0 text-white shadow-2xl hover:shadow-[#33bbff]/25 transition-all duration-300 hover:scale-105 pulse-glow">
                              Download Now
                           </button>
                        </Link>
                        <Link to="/screenshots">
                           <button className="btn btn-lg px-8 py-4 text-lg font-semibold rounded-full bg-transparent border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                              View Screenshots
                           </button>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <section className="relative z-10 px-6 md:px-12 pb-24 max-w-6xl mx-auto">
            <div className="text-center mb-12">
               <p className="uppercase tracking-widest text-sm text-white/50 mb-3">Our approach</p>
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">How we build DerpFest</h2>
               <p className="text-lg text-white/60 max-w-2xl mx-auto">
                  Original ideas, thoughtful execution, stock design done right.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(220px,_auto)]">
               {philosophyCards.map((card) => (
                  <div
                     key={card.title}
                     className={`group relative rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md p-8 md:p-10 flex flex-col justify-center overflow-hidden shadow-2xl hover:shadow-[#33bbff]/10 transition-all duration-500 hover:-translate-y-1 ${card.span}`}
                  >
                     <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                     <h3 className="relative z-10 text-2xl md:text-3xl font-semibold text-white mb-4">{card.title}</h3>
                     <p className="relative z-10 text-white/70 leading-relaxed">{card.description}</p>
                  </div>
               ))}
            </div>
         </section>

         <div className="relative z-10 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                  <div className="pt-8">
                     <div className="text-center mb-8">
                        <p className="uppercase tracking-widest text-sm text-white/50 mb-2">DerpFest Originals</p>
                        <h2 className="text-3xl md:text-4xl font-semibold text-white">Features we shipped for the Android community</h2>
                        <p className="mt-4 text-white/70 max-w-2xl mx-auto">
                           These innovations come straight from the DerpFest team. Here’s what sets our build apart.
                        </p>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featureShowcase.map((feature, index) => (
                           <div
                              key={feature.title}
                              className={`relative rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl hover:shadow-[#33bbff]/20 transition-all duration-500 hover:-translate-y-1 ${
                                 feature.layout === 'landscape'
                                    ? 'md:col-span-2 lg:col-span-3 p-8 md:p-10 flex flex-col md:flex-row md:items-center md:gap-10'
                                    : 'p-8'
                              }`}
                              style={{animationDelay: `${index * 150}ms`}}
                           >
                              {feature.image && (
                                 <div
                                    className={`${
                                       feature.layout === 'landscape'
                                          ? 'md:w-2/5 lg:w-1/3 md:mb-0 mb-6'
                                          : 'mb-6'
                                    } ${feature.imageWrapperClass ?? 'relative overflow-hidden rounded-2xl border border-white/10 bg-black/40'}`}
                                 >
                                    <img
                                       src={feature.image}
                                       alt={feature.imageAlt ?? feature.title}
                                       className={feature.imageClass ?? 'w-full h-auto object-cover'}
                                       draggable="false"
                                    />
                                    {(feature.imageOverlay ?? true) && (
                                       <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                    )}
                                 </div>
                              )}
                              <div className={feature.layout === 'landscape' ? 'md:flex-1 text-left' : 'text-left'}>
                                 <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${feature.accent} text-white/90 shadow-lg shadow-black/10`}>
                                    DerpFest
                                 </div>
                                 <h3 className="mt-6 text-2xl font-semibold text-white">{feature.title}</h3>
                                 <p className="text-[#1de099] uppercase tracking-widest text-xs font-semibold mt-2">{feature.subtitle}</p>
                                 <p className="mt-4 text-white/70 leading-relaxed">{feature.description}</p>
                                 <div className="mt-8 pt-6 border-t border-white/10 text-sm text-white/50">
                                    {feature.footer ?? 'Crafted in-house, open for everyone.'}
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
            </div>
         </div>
      </div>
   );
};

export default Home;
