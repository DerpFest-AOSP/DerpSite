import TeamData from '../components/data/team.json'

const Team = () => {
   return (
      <div className="py-6">
         <h1 className="text-4xl text-center font-bold">Team</h1>
         <div className="flex p-6 leading-7 justify-center">
            <div className="grid md:grid-cols-4 grid-cols-1 gap-2">
               {TeamData.map((team) => (
                  <div className="card bg-base-100 border-1 border-gray-300 dark:border-gray-700">
                     <div className="card-body">
                        <h2 className="card-title">{team.name}</h2>
                        <p>{team.role}</p>
                        <div className="card-actions justify-end">
                           <a href={team.github} target="_blank">
                              <button className="btn btn-ghost hover:border-0 bg-gradient-to-r from-[#33bbff] to-[#1de099]">GitHub</button>
                           </a>
                           <a href={team.telegram} target="_blank">
                              <button className="btn">Telegram</button>
                           </a>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Team;