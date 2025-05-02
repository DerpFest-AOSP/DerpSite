const Changelogs = () => {
   return (
      <div className="py-6">
         <h1 className="text-4xl text-center font-bold">Changelogs</h1>
         <div className="p-6 md:px-12 px-6 leading-8">
            <div className="mb-3">
               <h2 className="text-4xl mb-3">Monthly Changelogs - 14</h2>
               <h4 className="text-2xl mb-3">Date: 07th August 2024</h4>
               [*] Merge August security patches (android-14.0.0_r56) <br />
               [*] Yaap quote: "Refactored the hell out of battery styles code <br />
               [*] PixelPropsUtils: Updates from Rising OS <br />
               [*] DerpLauncher: Integrate themed icons into the recents <br />
               [*] DerpLauncher: Update themed icons <br />
               [*] Flash: change to FlashMode.OFF before switching usecases <br />
               [*] Update few translations <br />
            </div>

            <div className="mb-3">
               <h2 className="text-4xl mb-3">Monthly Changelogs - 13</h2>
               <h4 className="text-2xl mb-3">Date: 07th August 2024</h4>
               [*] Merged August security patch <br />
            </div>
         </div>
      </div>
   );
};

export default Changelogs;