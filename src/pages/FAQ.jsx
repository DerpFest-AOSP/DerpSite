const FAQ = () => {
   return (
      <div className="py-6">
         <h1 className="text-4xl text-center font-bold">FAQ</h1>
         <div className="p-6 md:px-12 px-6 leading-8">
            <h2 className="text-4xl mb-3">1) Why DerpFest includes GApps by default?</h2>

            <p className="mb-3">
            A) Builtin GApps is the cleanest way to install them to be honest. You can even check for missing privapp
            permissions that way, and no way to mess up by the installer. Without considering the fact that you get to
            skip a step during installation.<br /></p>

            <h2 className="text-4xl mb-3">2) Will there be a Non-GApps version?</h2>

            <p className="mb-3">
            A) No.</p>

            <h2 className="text-4xl mb-3">3) How can I apply for official maintainership for my device?</h2>

            <p className="mb-3">
            A) Contact us on our <a href="https://t.me/DerpFestAOSP" target="_blank" className="colored-a">Telegram</a> group. Our team will verify your device
            tree and other stuff and then, if they decide to, they will add you (no MTK chip based devices are eligible
            for maintainership)</p>

            <h2 className="text-4xl mb-3">4) Where I can find XDA Template for the DerpFest ROM I made?</h2>

            <p className="mb-3">
            A) Get it here from <a
               href="https://github.com/DerpFest-AOSP/manifest/blob/11/xda_thread_template.txt" target="_blank" className="colored-a">GitHub</a> and a live
            preview of how it looks is <a
               href="https://forum.xda-developers.com/t/rom-12l-derpfest-for-oneplus-5-t-official-2022-06-26.3978357/" target="_blank" className="colored-a">here</a><br />
            <b>Note: </b>Do not modify content other then the one which is required & give proper credits to everyone who
            deserves</p>
         </div>
      </div>
   );
};

export default FAQ;