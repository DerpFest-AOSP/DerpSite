import TeamData from '../components/data/team.json'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ROLE_LABELS = [
   { match: 'Founder', label: 'Founder', color: 'from-yellow-400 to-orange-400' },
   { match: 'Senior', label: 'Senior Maintainer', color: 'from-purple-400 to-pink-400' },
   { match: 'Web Developer', label: 'Web Developer', color: 'from-blue-400 to-cyan-400' },
   { match: 'Developer', label: 'Developer', color: 'from-blue-400 to-cyan-400' },
   { match: 'Maintainer', label: 'Device Maintainer', color: 'from-[#33bbff] to-[#1de099]' },
]

function getRoleBadge(role) {
   const firstLine = role.split('\n')[0]
   for (const r of ROLE_LABELS) {
      if (firstLine.includes(r.match)) return r
   }
   return { label: 'Team Member', color: 'from-gray-400 to-gray-500' }
}

function getDevices(role) {
   return role.split('\n').map(l => l.trim()).filter(Boolean).slice(1)
}

function getRoleTitle(role) {
   return role.split('\n')[0].trim()
}

const Team = () => {
   const [profilePics, setProfilePics] = useState({})
   const [loading, setLoading] = useState(true)
   const location = useLocation()
   const navigate = useNavigate()
   const hashId = location.hash.replace('#', '')
   const filteredTeam = hashId
      ? TeamData.filter(m => m.name.toLowerCase().replace(/[^a-z0-9]/g, '') === hashId)
      : TeamData

   // Extract GitHub usernames from URLs
   const getGitHubUsername = (githubUrl) => {
      return githubUrl.split('/').pop()
   }

   // Fetch GitHub profile pictures
   useEffect(() => {
      const fetchProfilePics = async () => {
         const picPromises = TeamData.map(async (member) => {
            const username = getGitHubUsername(member.github)
            try {
               const response = await fetch(`https://api.github.com/users/${username}`)
               if (response.ok) {
                  const data = await response.json()
                  return { username, avatar: data.avatar_url }
               }
            } catch (error) {
               console.warn(`Failed to fetch profile for ${username}:`, error)
            }
            return { username, avatar: null }
         })

         const results = await Promise.all(picPromises)
         const picMap = {}
         results.forEach(({ username, avatar }) => {
            if (avatar) {
               picMap[username] = avatar
            }
         })

         setProfilePics(picMap)
         setLoading(false)
      }

      fetchProfilePics()
   }, [])

   const getProfilePic = (githubUrl) => {
      const username = getGitHubUsername(githubUrl)
      return profilePics[username] || `https://avatars.githubusercontent.com/${username}`
   }

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
               {filteredTeam.map((team, index) => {
                  const badge = getRoleBadge(team.role)
                  const devices = getDevices(team.role)
                  const roleTitle = getRoleTitle(team.role)

                  return (
                     <div
                        key={index}
                        id={team.name.toLowerCase().replace(/[^a-z0-9]/g, '')}
                        className="rounded-2xl border border-base-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
                        style={{
                           background: 'linear-gradient(135deg, rgba(51,187,255,0.07) 0%, rgba(29,224,153,0.07) 100%)',
                        }}
                     >
                        {/* top accent bar */}
                        <div className="h-1 bg-gradient-to-r from-[#33bbff] to-[#1de099] flex-shrink-0"></div>

                        <div className="flex flex-col p-6 gap-4 flex-1">

                           {/* avatar + name + badge */}
                           <div className="flex flex-col items-center gap-3 text-center">
                              {loading ? (
                                 <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#33bbff] to-[#1de099] flex items-center justify-center flex-shrink-0">
                                    <div className="loading loading-spinner loading-md text-white"></div>
                                 </div>
                              ) : (
                                 <img
                                    src={getProfilePic(team.github)}
                                    alt={`${team.name}'s profile`}
                                    className="w-24 h-24 rounded-full object-cover border-2 border-white/20 shadow-md flex-shrink-0"
                                    loading="lazy"
                                 />
                              )}

                              <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${badge.color} text-white shadow`}>
                                 {badge.label}
                              </span>

                              <div>
                                 <h2 className="text-xl font-bold text-base-content leading-snug">
                                    {team.name}
                                 </h2>
                                 <p className="text-sm text-base-content/60 mt-1">
                                    {roleTitle}
                                 </p>
                              </div>
                           </div>

                           {/* device list */}
                           {devices.length > 0 && (
                              <div className="flex flex-col gap-2 flex-1 mt-2">
                                 <p className="text-xs font-semibold text-base-content/50 uppercase tracking-widest text-center">
                                    Maintained Devices
                                 </p>
                                 <div
                                    className="overflow-y-auto pr-1"
                                    style={{ maxHeight: '160px', scrollbarWidth: 'thin' }}
                                 >
                                    <ul className="space-y-2">
                                       {devices.map((device, i) => (
                                          <li key={i} className="flex items-start gap-2 text-sm text-base-content/80">
                                             <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#33bbff] to-[#1de099] flex-shrink-0"></span>
                                             {device}
                                          </li>
                                       ))}
                                    </ul>
                                 </div>
                              </div>
                           )}

                           <div className="flex-1" />

                           {/* buttons */}
                           <div className="flex gap-3 flex-wrap justify-center mt-2">
                              <a
                                 href={team.github}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="btn btn-sm btn-outline border-base-300 hover:border-[#33bbff] hover:bg-[#33bbff] hover:text-white transition-all duration-200 flex-1 min-w-[100px]"
                              >
                                 <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                 </svg>
                                 GitHub
                              </a>

                              {team.telegram && (
                                 <a
                                    href={team.telegram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-sm btn-outline border-base-300 hover:border-[#33bbff] hover:bg-[#33bbff] hover:text-white transition-all duration-200 flex-1 min-w-[100px]"
                                 >
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                       <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
                                    </svg>
                                    Telegram
                                 </a>
                              )}
                           </div>
                        </div>
                     </div>
                  )
               })}

               {hashId && filteredTeam.length === 0 && (
                  <div className="col-span-full text-center text-base-content/60 py-12">
                     No member found for <code className="text-[#33bbff]">#{hashId}</code>
                  </div>
               )}
            </div>

            {hashId && (
               <div className="text-center mt-10">
                  <button
                     onClick={() => navigate('/team')}
                     className="btn btn-sm bg-gradient-to-r from-[#33bbff] to-[#1de099] text-white border-0 hover:scale-105 transition-all duration-200"
                  >
                     &larr; Show all members
                  </button>
               </div>
            )}
         </div>

         <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-2 text-base-content/50">
               <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#33bbff] to-transparent"></div>
               <span className="text-sm">Built with passion</span>
               <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#1de099] to-transparent"></div>
            </div>
         </div>
      </div>
   )
}

export default Team
