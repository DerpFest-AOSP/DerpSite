import data from "../components/data/devices.json";

const DeviceList = ({ devices }) => (
   <div className="grid grid-cols-4 gap-2">
      {devices.map(device => (
         <div className="card bg-base-100 border-1 border-gray-300" key={device.code}>
            <div className="card-body">
               <h2 className="card-title">{device.name} ({device.code})</h2>
               <p>Maintainer: {device.maintainer}</p>
               <div className="card-actions">
                  <a href={device.links.download} target="_blank">
                     <button className="btn btn-ghost hover:border-0 bg-gradient-to-r from-[#33bbff] to-[#1de099]">Download</button>
                  </a>
                  <a href={device.links.xda_thread} target="_blank">
                     <button className="btn btn-white">XDA</button>
                  </a>
                  <a href={device.links.changelogs} target="_blank">
                     <button className="btn btn-white">Changelogs</button>
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
   return (
      <div className="p-6">
         <h1 className="text-4xl text-center font-bold">Devices</h1>
         <BrandList brands={data.brands} />
      </div>
   );
};

export default Devices;