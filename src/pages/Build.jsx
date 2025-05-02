const Build = () => {
   return (
      <div className="py-6">
         <h1 className="text-4xl text-center font-bold">Build</h1>
         <div class="p-6 md:px-12 px-6 leading-8">
            <h2 className="text-4xl mb-3">Before you get excited and rush things up, please read these articles and follow the steps provided here
            </h2>

            <ul className="mb-3">
               <li className="list-disc"><a href="https://source.android.com/setup/build/initializing" target="_blank" className="colored-a">Setting up the build
                  enviroment</a></li>
               <li className="list-disc"><a href="https://github.com/akhilnarang/scripts" target="_blank" className="colored-a">Alternative & easy way to do it by using
                  Akhil Narang's scripts</a></li>
               <li className="list-disc"><a href="https://source.android.com/setup/develop/repo" target="_blank" className="colored-a">Setting up repo</a></li>
            </ul>

            <h2 className="text-4xl mb-3">Begin with initialization of your local repository using the DerpFest trees</h2>

            <div className="code mb-3">
               mkdir derpfest
               <br />cd derpfest
               <br />repo init -u https://github.com/DerpFest-AOSP/manifest.git -b 12.1
               <br />repo sync -c --force-sync --optimized-fetch --no-tags --no-clone-bundle --prune -j$(nproc --all)
            </div>

            <h2 className="text-4xl mb-3">Find your device sources and modify it as described below</h2>

            <p className="mb-3">We suggest using Lineage device sources as they are mostly stable and don't require much changes.</p>

            <p className="mb-3">The given examples below are for Lineage device sources</p>

            <h2 className="text-4xl mb-3">Adapting device sources for DerpFest</h2>

            <p className="mb-3">
               <h5 className="text-2xl mb-3">Rename the file shown below</h5>
               lineage_device-codename.mk to derp_device-codename.mk
            </p>

            <h5 className="text-2xl mb-3">Now change contents of derp_device-codename.mk as shown below</h5>

            <p className="mb-3">Change “lineage“ to “derp” & /”common.mk” to “common_full_phone.mk”
               for example: $(call inherit-product, vendor/aosip/config/common_full_phone.mk)</p>

            <p className="mb-3">Change PRODUCT_NAME value from “lineage_device-codename”
               for example: ( “lineage_tissot” ) to derp_device-codename ( i.e, derp_tissot )</p>

            <p className="mb-3">Also rename make file name in the AndroidProducts.mk file - open it and change value of
               ("PRODUCT_MAKEFILES := \
               $(LOCAL_DIR)/"(lineage_device-codename.mk”) to ”derp_device-codename.mk”)
               <br />( i.e "PRODUCT_MAKEFILES := \
               $(LOCAL_DIR)/derp_tissot.mk )</p>

            <h5 className="text-2xl mb-3">
               Rename/Remove LineageOS Stuff</h5>

            <p className="mb-3">
               It is necessary to clean up any specific files from LineageOS as these features depend on LOS SDK which
               won’t be available on DerpFest and will results in build failures. e.g: Lineage Trust HAL
            From the root of your device tree/Common device tree rename the following folders/files from lineage to derp:
            lineage-overlays</p>

            <p className="mb-3">From device.mk/common.mk (also named as your SOC codename like: msm8953.mk):</p>

            <div className="code mb-3">
               DEVICE_PACKAGE_OVERLAYS += $(LOCAL_PATH)/overlay-lineage
            </div>

            <p className="mb-3">From device.mk/common.mk (also named as your SOC codename like: msm8953.mk)
               remove this:</p>

            <div className="code mb-3">
               # Trust HAL
               <br />PRODUCT_PACKAGES += \
               <br />vendor.lineage.trust@1.0-service
            </div>

            <p className="mb-3">Note: There is a possiblity that some custom packages such as doze etc may have dependency on lineageSDK,
               it is necessary to fix them to avoid complie errors.</p>

            <h2 className="text-4xl mb-3">Start compiling DerpFest from source</h2>

            <div className="code mb-3">
               . build/envsetup.sh
               <br />lunch derp_device-user
               <br />mka derp
            </div>

            <p className="mb-3">Reference for this guide is taken from <a href="https://blog.arrowos.net/posts/compilation-guide" target="_blank" className="colored-a">Arrow OS
               Blog</a></p>
         </div>
      </div>
   );
};

export default Build;