import React from "react";

/**
 * About component providing an overview of the Pennsylvania Native Tree Selector.
 *
 * @component
 * @returns {JSX.Element} The rendered About page.
 *
 * @example
 * <About />
 */
function About() {
  return (
    <div className="bg-white">
      {/* Nature-inspired Hero with Overlay Text */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/aigenerated.png"
            alt="Forest scene"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-700/60"></div>
        </div>
        <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 max-w-3xl">
            About the Pennsylvania Native Tree Selector
          </h1>
          <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
            Discover how we help landowners and conservation planners find the
            best native trees for Pennsylvania.
          </p>
        </div>
      </section>

      {/* What is the Pennsylvania Native Tree Selector? Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-green-800 mb-8">
                What is the Pennsylvania Native Tree Selector?
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p className="leading-relaxed">
                  The Pennsylvania Native Tree Selector is a comprehensive tool
                  that provides landowners and conservation planners with an
                  easy-to-use, effective means to select native species to plant
                  on projects based on variables input by the user.
                </p>
                <p className="leading-relaxed">
                  Data and selections within the tool are designed to assist
                  seasoned professionals as well as those who are new to the
                  field by cutting research time and increasing efficiency. The
                  selections within the tool provide site-specific solutions
                  with a wide variety of options and data to back it up,
                  ensuring that the correct species are planted in the correct
                  locations.
                </p>
                <p className="leading-relaxed">
                  The tool generates a list of species based on inputs and
                  includes attributes of each species such as soil preferences,
                  growth rate, shade tolerance, and much more. The Pennsylvania
                  Native Tree Selector is an easy-to-use tool for both
                  professionals and landowners and provides data that is
                  critical for decision-making in the field.
                </p>
              </div>
            </div>
            <div className="md:w-1/2 bg-green-50 rounded-lg overflow-hidden flex items-center justify-center">
              <div className="p-8">
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-green-800 mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Site-specific native tree recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Detailed species attributes and preferences</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>User-friendly interface for all experience levels</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Research-backed data for informed decisions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 px-6 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
            History
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto space-y-4">
            <p className="text-gray-700 leading-relaxed">
              As part of their commitment to Chesapeake Bay restoration goals,
              Pennsylvania has set a target of planting 95,000 acres of riparian forest buffer by the year 2025.
            </p>
            <p className="text-gray-700 leading-relaxed">
              While developing restoration and tree planting plans, groups such as Chesapeake Conservancy and Chesapeake Bay Foundation realized that there was no publicly-available, comprehensive Pennsylvania-specific web tool to choose native species for projects.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The first version of the tool was a simple Excel spreadsheet created by Chesapeake Bay Foundation field staff. Chesapeake Conservancy and Susquehanna University then migrated the spreadsheet to a more user-friendly Google sheet.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The Pennsylvania Native Tree Selector website is the result of years of development, aiming to solve usability challenges and take this tool to its fullest potential.
            </p>
          </div>
        </div>
      </section>

      {/* About Organization Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 order-2 md:order-1">
              <h2 className="text-3xl font-bold text-green-800 mb-8">
                What is the Chesapeake Conservancy?
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  Chesapeake Conservancy (CC) is a nonprofit organization with offices in Annapolis, Maryland and Selinsgrove, PA. We are a team of 45 conservation professionals and geospatial analysts.
                </p>
                <p className="leading-relaxed">
                  We believe that the Chesapeake is a national treasure that should be accessible for everyone and a place where wildlife can thrive. We use technology to accelerate the pace and quality of conservation, and we help build parks, trails, and public access sites.
                </p>
                <p className="leading-relaxed">
                  CC has seven staff members with decades of experience in conservation, based in central Pennsylvania. This team has been implementing agricultural and riparian buffer management practices on parcels chosen based on high-resolution land use and land cover data.
                </p>
                <p className="leading-relaxed">
                  Chesapeake Conservancy serves in a convening role facilitating large federal grant programs for riparian restoration projects, providing in-stream monitoring and serving to build capacity among a large partner network.
                </p>
              </div>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="bg-green-50 p-8 rounded-lg h-full flex items-center justify-center">
                <img
                  src="/images/chesapeake_logo.png"
                  alt="Chesapeake Conservancy"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-10 bg-white px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            A partnership between
          </h3>
          <div className="flex items-center justify-center gap-10">
            <img
              src="/images/bulogo_orange.png"
              alt="Bucknell University"
              className="h-16 object-contain"
            />
            <img
              src="/images/su_logo.png"
              alt="Susquehanna University"
              className="h-16 object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
