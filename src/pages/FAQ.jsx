const FAQ = () => {
   return (
      <div className="py-6">
         <h1 className="text-4xl text-center font-bold">FAQ</h1>
         <div className="p-6">
            <div className="collapse bg-base-100 border-base-300 border mb-3">
               <input type="checkbox" />
               <div className="collapse-title font-semibold">Why DerpFest includes GApps by default?</div>
               <div className="collapse-content text-sm">
                  Builtin GApps is the cleanest way to install them to be honest. <br />
                  You can even check for missing privapp permissions that way, and no way to mess up by the installer. <br />
                  Without considering the fact that you get to skip a step during installation.
               </div>
            </div>

            <div className="collapse bg-base-100 border-base-300 border mb-3">
               <input type="checkbox" />
               <div className="collapse-title font-semibold">Will there be a Non-GApps version?</div>
               <div className="collapse-content text-sm">
                  No.
               </div>
            </div>

            <div className="collapse bg-base-100 border-base-300 border mb-3">
               <input type="checkbox" />
               <div className="collapse-title font-semibold">How can I apply for official maintainership for my device?</div>
               <div className="collapse-content text-sm">
                  Contact us on our <a href="https://t.me/DerpFestAOSP" target="_blank" className="colored-a">Telegram</a> group. <br />
                  Our team will verify your device tree and other stuff and then, if they decide to, they will add you (no MTK chip based devices are eligible for maintainership)
               </div>
            </div>

            <div className="collapse bg-base-100 border-base-300 border mb-3">
               <input type="checkbox" />
               <div className="collapse-title font-semibold">Where I can find XDA Template for the DerpFest ROM I made?</div>
               <div className="collapse-content text-sm">
                  Get it here from <a href="https://github.com/DerpFest-AOSP/manifest/blob/11/xda_thread_template.txt" target="_blank" className="colored-a">GitHub</a> and a live preview of how it looks is <a href="https://forum.xda-developers.com/t/rom-12l-derpfest-for-oneplus-5-t-official-2022-06-26.3978357/" target="_blank" className="colored-a">here</a><br />
                  <b>Note: </b>Do not modify content other then the one which is required & give proper credits to everyone who deserves
               </div>
            </div>
         </div>
      </div>
   );
};

export default FAQ;