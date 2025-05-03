import CreditData from '../components/data/credit.json'

const Credit = () => {
   return (
      <div className="py-6">
         <h1 className="text-4xl text-center font-bold">Credit</h1>
         <div className="flex p-6 leading-7 justify-center">
            <div className="grid grid-cols-4 gap-2">
               {CreditData.map((credit) => (
                  <div className="card bg-base-100 border-1 border-gray-300">
                     <figure>
                        <img src={credit.profile} alt={credit.name} className="mt-4 w-64 rounded-2xl" />
                     </figure>
                     <div className="card-body">
                        <h2 className="card-title">{credit.name}</h2>
                        <p>{credit.description}</p>
                        <div className="card-actions justify-end">
                           <a href={credit.github} target="_blank">
                              <button className="btn btn-ghost hover:border-0 bg-gradient-to-r from-[#33bbff] to-[#1de099]">GitHub</button>
                           </a>
                           <a href={credit.telegram} target="_blank">
                              <button className="btn btn-white">Telegram</button>
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

export default Credit;