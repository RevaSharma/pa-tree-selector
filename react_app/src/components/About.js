import React from "react";

function About() {
  return (
    <>
      {/* Hero Section: Side-by-Side Layout */}
      <section className="flex flex-col md:flex-row min-h-[40vh]">
        {/* LEFT SIDE: Gradient Banner */}
        <div className="bg-gradient-to-r from-green-800 to-green-500 text-white p-10 md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            About the Pennsylvania Native Tree Selector
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Discover how we help landowners and conservation planners find the best native trees for Pennsylvania.
          </p>
        </div>

        {/* RIGHT SIDE: Optional Image or Extra Text */}
        <div className="bg-white text-black p-10 md:w-1/2 flex items-center justify-center">
          {/* Example: an image or additional content */}
          <img
            src="/images/aigenerated.png"
            alt="AIGenerated forest scene"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Main Content Section */}
      <section
        id="about-section"
        className="max-w-4xl mx-auto px-1 py-13 space-y-8"
      >
        {/* 1. What is the Pennsylvania Native Tree Selector? */}
        <div>
          <h2 className="text-1xl font-bold mb-4">
            What is the Pennsylvania Native Tree Selector?
          </h2>
          <p className="text-gray-700 leading-7 mb-4">
            The Pennsylvania Native Tree Selector is a comprehensive tool that provides 
            landowners and conservation planners with an easy-to-use, effective means to 
            select native species to plant on projects based on variables input by the user.
          </p>
          <p className="text-gray-700 leading-7 mb-4">
            Data and selections within the tool are designed to assist seasoned professionals 
            as well as those who are new to the field by cutting research time and increasing efficiency. 
            The selections within the tool provide site-specific solutions with a wide variety of options 
            and data to back it up, ensuring that the correct species are planted in the correct locations.
          </p>
          <p className="text-gray-700 leading-7">
            The tool generates a list of species based on inputs and includes attributes of each species 
            such as soil preferences, growth rate, shade tolerance, and much more. 
            The Pennsylvania Native Tree Selector is an easy-to-use tool for both professionals 
            and landowners and provides data that is critical for decision-making in the field.
          </p>
        </div>

        {/* 2. History */}
        <div>
          <h2 className="text-1xl font-bold mb-4">History</h2>
          <p className="text-gray-700 leading-7 mb-4">
            As part of their commitment to Chesapeake Bay restoration goals, Pennsylvania has 
            set a target of planting 95,000 acres of riparian forest buffer by the year 2025.
          </p>
          <p className="text-gray-700 leading-7 mb-4">
            While developing restoration and tree planting plans, groups such as Chesapeake Conservancy 
            and Chesapeake Bay Foundation realized that there was no publicly-available, comprehensive 
            Pennsylvania-specific web tool to choose native species for projects.
          </p>
          <p className="text-gray-700 leading-7 mb-4">
            The first version of the tool was a simple Excel spreadsheet created by 
            Chesapeake Bay Foundation field staff. Chesapeake Conservancy and Susquehanna University 
            then migrated the spreadsheet to a more user-friendly Google sheet.
          </p>
          <p className="text-gray-700 leading-7">
            The Pennsylvania Native Tree Selector website is the result of years of development, 
            aiming to solve usability challenges and take this tool to its fullest potential.
          </p>
        </div>

        {/* 3. About Chesapeake Conservancy */}
        <div>
          <h2 className="text-1xl font-bold mb-4">
            What is the Chesapeake Conservancy?
          </h2>
          <p className="text-gray-700 leading-7 mb-4">
            Chesapeake Conservancy (CC) is a nonprofit organization with offices in Annapolis, Maryland and 
            Selinsgrove, PA. We are a team of 45 conservation professionals and geospatial analysts.
          </p>
          <p className="text-gray-700 leading-7 mb-4">
            We believe that the Chesapeake is a national treasure that should be accessible for everyone 
            and a place where wildlife can thrive. We use technology to accelerate the pace and quality of 
            conservation, and we help build parks, trails, and public access sites.
          </p>
          <p className="text-gray-700 leading-7 mb-4">
            CC has seven staff members with decades of experience in conservation, based in central Pennsylvania. 
            This team has been implementing agricultural and riparian buffer management practices on parcels 
            chosen based on high-resolution land use and land cover data.
          </p>
          <p className="text-gray-700 leading-7">
            Chesapeake Conservancy serves in a convening role facilitating large federal grant programs for 
            riparian restoration projects, providing in-stream monitoring and serving to build capacity among 
            a large partner network.
          </p>
        </div>
      </section>
    </>
  );
}

export default About;
