const Build = () => {
   return (
      <div className="py-6">
         <h1 className="text-4xl text-center font-bold gradient-shift">Build</h1>
         <div className="p-6 md:px-12 px-6 leading-7">
            <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl p-8 mb-8">
               <h2 className="text-3xl mb-6 text-[#33bbff] font-semibold">Prerequisites</h2>

               <p className="mb-4 text-gray-300 leading-relaxed">
                  To get started with Android, you'll need to get familiar with{' '}
                  <a href="https://source.android.com/setup/develop" target="_blank" className="colored-a hover:text-[#33bbff] transition-colors duration-300">Source Control Tools</a>.
                  To set up your build environment and sync DerpFest, follow this{' '}
                  <a href="https://raw.githubusercontent.com/nathanchance/android-tools/main/guides/building_aosp.txt" target="_blank" className="colored-a hover:text-[#33bbff] transition-colors duration-300">build environment guide</a>.
               </p>

               <ul className="mb-6 space-y-2">
                  <li className="flex items-center">
                     <span className="w-2 h-2 bg-[#1de099] rounded-full mr-3"></span>
                     <a href="https://source.android.com/setup/build/initializing" target="_blank" className="colored-a hover:text-[#33bbff] transition-colors duration-300">Setting up the build environment</a>
                  </li>
                  <li className="flex items-center">
                     <span className="w-2 h-2 bg-[#1de099] rounded-full mr-3"></span>
                     <a href="https://github.com/DerpFest-AOSP/android_manifest" target="_blank" className="colored-a hover:text-[#33bbff] transition-colors duration-300">Official DerpFest manifest repository</a>
                  </li>
               </ul>
            </div>

            <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl p-8 mb-8">
               <h2 className="text-3xl mb-6 text-[#33bbff] font-semibold">Getting Started</h2>

               <p className="mb-6 text-gray-300 leading-relaxed">
                  To initialize your local repository using the AOSP/CAF based DerpFest source, use a command like this:
               </p>

               <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-6 overflow-x-auto">
                  <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-all">
                     <code>
{`mkdir derpfest
cd derpfest
repo init -u https://github.com/DerpFest-AOSP/android_manifest.git -b 16.2 --git-lfs`}
                     </code>
                  </pre>
               </div>

               <p className="mb-4 text-gray-300 leading-relaxed">Sync up with this command:</p>

               <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-6 overflow-x-auto">
                  <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-all">
                     <code>repo sync</code>
                  </pre>
               </div>

               <p className="text-sm text-gray-400 leading-relaxed">
                  <code className="text-[#1de099]">repo init</code> must be run before <code className="text-[#1de099]">repo sync</code>. The <code className="text-[#1de099]">-u</code> flag points repo at the manifest URL above.
               </p>
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
                           <code>lunch lineage_$device-bp4a-user</code>
                        </pre>
                     </div>
                     <p className="mt-3 text-gray-300 leading-relaxed">
                        Replace <code className="text-[#1de099]">$device</code> with your device's codename. For example, Polaris (Xiaomi Mi Mix 2s) would be:
                     </p>
                     <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 mt-3 overflow-x-auto">
                        <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-all">
                           <code>lunch lineage_polaris-bp4a-user</code>
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
                     <p className="mb-3 text-[#1de099] font-semibold">Alternatively, you can use our custom build script that will handle everything for you by using the format:</p>
                     <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 overflow-x-auto">
                        <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-all">
                           <code>derpfest (device codename)</code>
                        </pre>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl p-8 mb-8">
               <h2 className="text-3xl mb-6 text-[#33bbff] font-semibold">Unofficial Builds</h2>

               <p className="mb-4 text-gray-300 leading-relaxed">
                  The instructions above apply to officially supported devices already included in the{' '}
                  <a href="https://github.com/DerpFest-AOSP/android_manifest" target="_blank" className="colored-a hover:text-[#33bbff] transition-colors duration-300">DerpFest manifest</a>.
                  If you are building for an unsupported device, you still need to run <code className="text-[#1de099]">repo init</code> first, then add your device trees via a local manifest before syncing.
               </p>

               <p className="mb-4 text-gray-300 leading-relaxed">
                  Create a file named after your device's codename and place it at <code className="text-[#1de099]">.repo/local_manifests/&lt;device&gt;.xml</code> after <code className="text-[#1de099]">repo init</code> and before <code className="text-[#1de099]">repo sync</code>.
                  Throughout this section, replace <code className="text-[#1de099]">device</code> with your actual codename.
               </p>

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

               <p className="mb-4 text-gray-300 leading-relaxed">Throughout this guide, we'll use Polaris (Xiaomi Mi Mix 2s) as an example.</p>

               <div className="bg-gradient-to-r from-[#33bbff]/10 to-[#1de099]/10 border border-[#33bbff]/20 rounded-xl p-4 mb-6">
                  <p className="text-gray-300 leading-relaxed"><strong className="text-[#33bbff]">Quick tip:</strong> If a device is supported by LineageOS, check lineage.dependencies — usually everything you need is listed there!</p>
               </div>

               <h3 className="text-2xl mb-4 text-[#1de099] font-semibold">Example Local Manifest</h3>

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

               <h3 className="text-2xl mb-4 text-[#1de099] font-semibold">Understanding the XML Structure</h3>

               <p className="mb-4 text-gray-300 leading-relaxed">Remotes tell <code className="text-[#1de099]">repo sync</code> where to fetch projects from:</p>

               <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-6 overflow-x-auto">
                  <pre className="text-sm text-gray-300 font-mono">
                     <code>
{`<remote name="LineageOS"            fetch="https://github.com/LineageOS"           revision="lineage-23.0" />
<remote name="TheMuppets"           fetch="https://github.com/TheMuppets"          revision="lineage-23.0" />`}
                     </code>
                  </pre>
               </div>

               <p className="mb-4 text-gray-300 leading-relaxed">Each <code className="text-[#1de099]">&lt;project&gt;</code> entry clones a repository into a specific path. For example:</p>

               <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-4 overflow-x-auto">
                  <pre className="text-sm text-gray-300 font-mono">
                     <code>
{`<project name="android_device_xiaomi_polaris" path="device/xiaomi/polaris" remote="LineageOS" />`}
                     </code>
                  </pre>
               </div>

               <p className="mb-6 text-gray-300 leading-relaxed">
                  This clones <code className="text-[#1de099]">https://github.com/LineageOS/android_device_xiaomi_polaris</code> into <code className="text-[#1de099]">device/xiaomi/polaris</code>.
               </p>

               <h3 className="text-2xl mb-4 text-[#1de099] font-semibold">Full Workflow for Unofficial Builds</h3>

               <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-6 overflow-x-auto">
                  <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-all">
                     <code>
{`mkdir derpfest
cd derpfest
repo init -u https://github.com/DerpFest-AOSP/android_manifest.git -b 16.2 --git-lfs

# After init, add your local manifest:
# .repo/local_manifests/<device>.xml

repo sync -c -j$(nproc --all) \\
    --force-sync --no-clone-bundle --no-tags

. build/envsetup.sh
lunch lineage_$device-bp4a-user
mka derp`}
                     </code>
                  </pre>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Build;
