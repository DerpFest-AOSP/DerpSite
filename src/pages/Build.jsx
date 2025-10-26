const Build = () => {
   return (
      <div className="py-6">
         <h1 className="text-4xl text-center font-bold gradient-shift">Build</h1>
         <div className="p-6 md:px-12 px-6 leading-7">
            <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl p-8 mb-8">
               <h2 className="text-3xl mb-6 text-[#33bbff] font-semibold">Prerequisites</h2>

               <ul className="mb-6 space-y-2">
                  <li className="flex items-center">
                     <span className="w-2 h-2 bg-[#1de099] rounded-full mr-3"></span>
                     <a href="https://source.android.com/setup/build/initializing" target="_blank" className="colored-a hover:text-[#33bbff] transition-colors duration-300">Setting up the build
                        environment</a>
                  </li>
               </ul>
            </div>

            <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl p-8 mb-8">
               <h2 className="text-3xl mb-6 text-[#33bbff] font-semibold">Building DerpFest for Your Device</h2>

               <p className="mb-4 text-gray-300 leading-relaxed">When you make an unofficial build (community), you will need to find the sources yourself and add them to a .xml file.</p>

               <p className="mb-4 text-gray-300 leading-relaxed">This file should be named according to your device's codename.</p>

               <p className="mb-4 text-gray-300 leading-relaxed">Throughout this guide, when I mention device.xml, replace "device" with your actual device's codename.</p>

               <p className="mb-4 text-gray-300 leading-relaxed">In this file, you'll add all the trees you need. The specific requirements depend on the device and OEM, but you'll generally need:</p>

               <ul className="mb-6 ml-6 space-y-2">
                  <li className="flex items-center text-gray-300">
                     <span className="w-2 h-2 bg-[#1de099] rounded-full mr-3"></span>
                     The device tree(s)
                  </li>
                  <li className="flex items-center text-gray-300">
                     <span className="w-2 h-2 bg-[#1de099] rounded-full mr-3"></span>
                     The vendor tree(s)
                  </li>
                  <li className="flex items-center text-gray-300">
                     <span className="w-2 h-2 bg-[#1de099] rounded-full mr-3"></span>
                     Kernel sources
                  </li>
                  <li className="flex items-center text-gray-300">
                     <span className="w-2 h-2 bg-[#1de099] rounded-full mr-3"></span>
                     Sometimes, extra dependencies (such as hardware dependencies)
                  </li>
               </ul>

               <p className="mb-4 text-gray-300 leading-relaxed">I use "tree(s)" because sometimes a device shares common trees with other devices that use the same CPU.</p>

               <p className="mb-4 text-gray-300 leading-relaxed">Throughout this guide, we'll use Polaris (Xiaomi Mi Mix 2s) as an example.</p>

               <div className="bg-gradient-to-r from-[#33bbff]/10 to-[#1de099]/10 border border-[#33bbff]/20 rounded-xl p-4">
                  <p className="text-gray-300 leading-relaxed"><strong className="text-[#33bbff]">Quick tip:</strong> If a device is supported by LineageOS, check lineage.dependencies - usually everything you need is listed there!</p>
               </div>
            </div>

            <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl p-8 mb-8">
               <h2 className="text-3xl mb-6 text-[#33bbff] font-semibold">Creating Your Device XML</h2>

               <p className="mb-4 text-gray-300 leading-relaxed">Once you've found your trees, let's build the XML file.</p>

               <p className="mb-6 text-gray-300 leading-relaxed">Here is the classic structure of an XML file (using Polaris as our example):</p>

               <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6 overflow-x-auto">
                  <pre className="text-sm text-gray-300 font-mono leading-relaxed">
                     <code>
{`<?xml version="1.0" encoding="UTF-8"?>
<manifest>
    <!--Remotes-->
    <remote name="LineageOS"            fetch="https://github.com/LineageOS"           revision="lineage-23.0" />
    <remote name="TheMuppets"           fetch="https://github.com/TheMuppets"          revision="lineage-23.0" />

    <!--Devices Trees-->
    <project name="android_device_xiaomi_polaris"           path="device/xiaomi/polaris"       remote="LineageOS" />
    <project name="android_device_xiaomi_sdm845-common"     path="device/xiaomi/sdm845-common" remote="LineageOS" />

    <!--Vendors Tree-->
    <project name="proprietary_vendor_xiaomi_polaris"       path="vendor/xiaomi/polaris"       remote="TheMuppets" />
    <project name="proprietary_vendor_xiaomi_sdm845-common" path="vendor/xiaomi/sdm845-common" remote="TheMuppets" />

    <!--Kernel Tree-->
    <project name="android_kernel_xiaomi_sdm845"            path="kernel/xiaomi/sdm845"        remote="LineageOS" />

    <!--Hardware dependencies-->
    <project name="android_hardware_xiaomi"                 path="hardware/xiaomi"             remote="LineageOS" />
</manifest>`}
                     </code>
                  </pre>
               </div>
            </div>

            <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl p-8 mb-8">
               <h2 className="text-3xl mb-6 text-[#33bbff] font-semibold">Understanding the XML Structure</h2>

               <p className="mb-6 text-gray-300 leading-relaxed">Let's explain what's in here:</p>

               <h3 className="text-2xl mb-4 text-[#1de099] font-semibold">Remotes</h3>
               <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-6 overflow-x-auto">
                  <pre className="text-sm text-gray-300 font-mono">
                     <code>
{`<remote name="LineageOS"            fetch="https://github.com/LineageOS"           revision="lineage-23.0" />
<remote name="TheMuppets"           fetch="https://github.com/TheMuppets"          revision="lineage-23.0" />`}
                     </code>
                  </pre>
               </div>

               <p className="mb-4 text-gray-300 leading-relaxed">These lines tell the repo sync command where to look when syncing dependencies. The remotes define the root locations where repo sync will fetch from.</p>

               <p className="mb-4 text-gray-300 leading-relaxed">Let's examine this line more closely:</p>

               <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-6 overflow-x-auto">
                  <pre className="text-sm text-gray-300 font-mono">
                     <code>
{`<project name="android_device_xiaomi_polaris"           path="device/xiaomi/polaris"       remote="LineageOS" />`}
                     </code>
                  </pre>
               </div>

               <p className="mb-6 text-gray-300 leading-relaxed">This tells the repo sync command to clone<br/>
                  <span className="text-[#33bbff]">https://github.com/lineageos/android_device_xiaomi_polaris</span><br/>
                  into the <span className="text-[#1de099]">device/xiaomi/polaris</span> folder.</p>
            </div>

            <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl p-8 mb-8">
               <h2 className="text-3xl mb-6 text-[#33bbff] font-semibold">Setting Up Your Build</h2>

               <p className="mb-4 text-gray-300 leading-relaxed">The &lt;device&gt;.xml file should be placed in .repo/local_manifests/&lt;device&gt;.xml</p>

               <p className="mb-4 text-gray-300 leading-relaxed">Once your device.xml is written and placed in the correct directory, sync the sources:</p>

               <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-6 overflow-x-auto">
                  <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-all">
                     <code>
{`repo sync -c -j$(nproc --all) \\
    --force-sync --no-clone-bundle --no-tags`}
                     </code>
                  </pre>
               </div>

               <p className="mb-4 text-gray-300 leading-relaxed">This will retrieve all the necessary sources. Then you need to:</p>

               <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-6 overflow-x-auto">
                  <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-all">
                     <code>lunch lineage_$device-bp2a-user</code>
                  </pre>
               </div>

               <p className="mb-4 text-gray-300 leading-relaxed">Where $device is your device's codename. The build type is fixed as "bp2a-user" for DerpFest builds.</p>

               <p className="mb-4 text-gray-300 leading-relaxed">For Polaris, it would look like:</p>

               <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-6 overflow-x-auto">
                  <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-all">
                     <code>lunch lineage_polaris-bp2a-user</code>
                  </pre>
               </div>

               <p className="mb-6 text-gray-300 leading-relaxed">If everything is set up correctly, DerpFest will start building.</p>
            </div>

            <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl p-8 mb-8">
               <h2 className="text-3xl mb-6 text-[#33bbff] font-semibold">Initializing DerpFest Repository</h2>

               <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-6 overflow-x-auto">
                  <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-all">
                     <code>
{`mkdir derpfest
cd derpfest
repo init -u https://github.com/DerpFest-AOSP/android_manifest.git \\
    -b 16 --git-lfs
repo sync`}
                     </code>
                  </pre>
               </div>
            </div>

            <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl p-8 mb-8">
               <h2 className="text-3xl mb-6 text-[#33bbff] font-semibold">Building DerpFest</h2>

               <p className="mb-6 text-gray-300 leading-relaxed">The source at DerpFest is well configured for building.</p>

               <div className="space-y-6">
                  <div>
                     <p className="mb-3 text-[#1de099] font-semibold">Initiate the build with:</p>
                     <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 overflow-x-auto">
                        <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-all">
                           <code>. build/envsetup.sh</code>
                        </pre>
                     </div>
                  </div>

                  <div>
                     <p className="mb-3 text-[#1de099] font-semibold">Prepare your device with:</p>
                     <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 overflow-x-auto">
                        <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-all">
                           <code>lunch lineage_$device-bp2a-user</code>
                        </pre>
                     </div>
                  </div>

                  <div>
                     <p className="mb-3 text-[#1de099] font-semibold">Then fire it off with:</p>
                     <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 overflow-x-auto">
                        <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-all">
                           <code>mka derp</code>
                        </pre>
                     </div>
                  </div>

                  <div>
                     <p className="mb-3 text-[#1de099] font-semibold">Alternatively, you can use our custom build script that handles everything for you with this format:</p>
                     <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 overflow-x-auto">
                        <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-all">
                           <code>derpfest (device codename)</code>
                        </pre>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Build;