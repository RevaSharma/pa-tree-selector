import React from "react";

/**
 * Tutorial for how to go offline with the Pennsylvania Native Tree Selector.
 *
 * @component
 * @returns {JSX.Element} The rendered GoOffline page.
 *
 * @example
 * <About />
 */
function GoOffline() {
  return (
    <div className="bg-white">
      {/* Nature-inspired Hero with Overlay Text */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Full-width background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/aigenerated.png"
            alt="Forest scene"
            className="w-full h-full object-cover"
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-700/60"></div>
        </div>

        {/* Centered hero content */}
        <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 max-w-3xl">
            How to Go Offline With the Pennsylvania Native Tree Selector
          </h1>
          <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
            With this quick tutorial, learn how to use the Pennsylvania Native Tree Selector
            without internet.
          </p>
        </div>
      </section>
      
      {/* How do I get offline desktop section */}
      <section className="py-20 px-6 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 order-2 md:order-1">
              <h2 className="text-3xl font-bold text-green-800 mb-8 dark:text-green-100">
                How can I get the Pennsylvania Native Tree Selector Offline?
              </h2>
              <div className="space-y-4 text-gray-700 dark: text-gray-300">
                <p className="leading-relaxed">
                  First, navigate to the right half of the search bar and click on the leftmost symbol.
                  This should pop up with a prompt asking if you want to install the app.
                </p>
                <p className="leading-relaxed">
                  Second, click install. Depending on the browser, you will be asked if you want to make a desktop shortcut.
                  Make sure this box is checked for quick access to the website offline.
                </p>
                <p className="leading-relaxed">
                  You are now finished installing the PA Native Tree Selector for offline use! To ensure uniterrupted offline use,
                  do not use extensions that speed up the browser. This could swiftly delete the saved trees, negating the purpose of going offline!
                </p>
                <p className="leading-relaxed">
                  If there are no trees offline, quickly go online to load all the trees before going back offline. Always make sure to check the website
                  before going offline to ensure everything is loaded!
                </p>
              </div>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="bg-green-50 p-8 rounded-lg h-full flex items-center justify-center dark:bg-green-800">
                <img
                  src="images/PWA_Tutorial_GIF.gif"
                  alt="offline tutorial gif"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* I cant see the icon! section */}
      <section className="py-20 px-6 bg-green-50 dark:bg-green-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center dark:text-green-100">
            But the Download Icon Isn't There!
          </h2>

          <div className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto">
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
              If the download icon is not there, then your current browser does not natively support offline websites.
              To fix this, go to the browser's extensions and search for one that adds "Progressive Web Apps." If this 
              does not exist, then your current browser cannot use the website offline.
              </p>
              <p className="text-gray-700 leading-relaxed">
              For Firefox, you want to go to the addons mannager and add an extension called, 
              "Progressive Web Apps for Firefox" and install it. 
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* How do I use it on mobile section */}
      <section className="py-20 px-6 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Visual accent - decorative tree illustration or photo */}
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="bg-green-50 p-8 rounded-lg h-full flex items-center justify-center dark:bg-green-800">
                <img
                  src="images/Mobile_PWA_Tutorial.gif"
                  alt="offline tutorial for mobile gif"
                  className="h-auto rounded-lg shadow-md"
                />
              </div>
            </div>

            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-green-800 mb-8 dark:text-green-100">
                Can I go Offline with a Mobile Device?
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4 dark:text-gray-300">
                <p className="leading-relaxed">
                  Yes! For Iphone, you need to navigate to the share website button and click on it. 
                  In the new menu, navigate to where it says "Add to Home Screen" and click that.
                  If you cannot find "Add to Home Screen" then your current browser may not support offline websites. 
                  Safari is guarenteed to support offline. 
                </p>
                <p className="leading-relaxed">
                  For Android, use Chrome and click on the three dots by the search bar. click "Add to Homescreen" then click "install."
                </p>
                <p className="leading-relaxed">
                  You will then be asked again if you want to add it to home screen. Click on "Add." Now PANTS
                  is avilable offline on a mobile device! If there are no trees offline, quickly go online to load all the 
                  trees before going back offline. Always make sure to check the website
                  before going offline to ensure everything is loaded!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GoOffline;
