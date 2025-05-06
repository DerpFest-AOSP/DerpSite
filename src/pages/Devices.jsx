import { useState } from "react";
import data from "../components/data/devices.json";

const DeviceList = ({ devices }) => (
   <div className="grid md:grid-cols-4 grid-cols-1 gap-2">
      {devices.map(device => (
         <div className="card bg-base-100 border-1 border-gray-300 dark:border-gray-700" key={device.code}>
            <div className="card-body">
               <h2 className="card-title">{device.name} ({device.code})</h2>
               <p>Maintainer: {device.maintainer}</p>
               <div className="card-actions">
                  <a href={device.links.download} target="_blank">
                     <button className="btn btn-ghost hover:border-0 bg-gradient-to-r from-[#33bbff] to-[#1de099]">Download</button>
                  </a>
                  {device.links.xda_thread && (
                     <a href={device.links.xda_thread} target="_blank">
                        <button className="btn">XDA</button>
                     </a>
                  )}
                  <a href={device.links.changelogs} target="_blank">
                     <button className="btn">Changelogs</button>
                  </a>
               </div>
            </div>
         </div>
      ))}
   </div>
);

const BrandList = ({ brands }) => (
   <div>
      {brands.map(brand => (
         <div key={brand.name}>
            <h3 className="text-center text-3xl my-3">{brand.name}</h3>
            <DeviceList devices={brand.devices} />
         </div>
      ))}
   </div>
);

const Devices = () => {
   const [searchTerm, setSearchTerm] = useState("");

   const filteredBrands = data.brands.map(brand => ({
      ...brand,
      devices: brand.devices.filter(device =>
         device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         device.code.toLowerCase().includes(searchTerm.toLowerCase())
      )
   })).filter(brand => brand.devices.length > 0);

   return (
      <div className="p-6">
         <h1 className="text-4xl text-center font-bold">Devices</h1>
         <div className="my-4 text-center">
            <input
               type="text"
               placeholder="Search"
               className="input input-bordered md:w-lg w-full"
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
            />
         </div>
         <BrandList brands={filteredBrands} />
      </div>
   );
};

export default Devices;