import React from "react";

function About() {
  return (
    <section id="about-section" className="hideable max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">About the Pennsylvania Native Tree Selector</h2>
      
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">What is the Pennsylvania Native Tree Selector?</h3>
        <p className="mb-4">
          The Pennsylvania Native Tree Selector is a comprehensive Pennsylvania-specific tool that provides 
          landowners and conservation planners with an easy-to-use, effective means to select native species to 
          plant on projects based on variables input by the user.
        </p>
        <p className="mb-4">
          Data and selections within the tool are designed to assist seasoned professionals as well as 
          those who are new to the field by cutting research time and increasing efficiency. The selections within 
          the tool provide site-specific solutions with a wide variety of options and data to back it up, ensuring that 
          the correct species are planted in the correct locations.
        </p>
        <p className="mb-4">
          The tool generates a list of species based on inputs and includes attributes of each species such as soil 
          preferences, growth rate, shade tolerance, and much more.
        </p>
        <p>
          The Pennsylvania Native Tree Selector is an easy-to-use tool for both professionals and landowners and 
          provides data that is critical for decision-making in the field.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">History</h3>
        <p className="mb-4">
          As part of their commitment to Chesapeake Bay restoration goals, 
          Pennsylvania has set a target of planting 95,000 acres of riparian 
          forest buffer by the year 2025.
        </p>
        <p className="mb-4">
          While developing restoration and tree planting plans, groups such as Chesapeake Conservancy and 
          Chesapeake Bay Foundation realized that there was no publicly-available, comprehensive Pennsylvania-specific 
          web tool to choose native species for projects.
        </p>
        <p className="mb-4">
          The first version of the tool was a simple Excel spreadsheet created by Chesapeake Bay Foundation field staff. 
          Chesapeake Conservancy and Susquehanna University then migrated the spreadsheet to a more user-friendly Google sheet.
        </p>
        <p>
          The Pennsylvania Native Tree Selector website is the result of years of development, aiming to solve 
          usability challenges and take this tool to its fullest potential.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4">What is the Chesapeake Conservancy?</h3>
        <p className="mb-4">
          Chesapeake Conservancy (CC) is a nonprofit organization with offices in Annapolis, Maryland and 
          Selinsgrove, PA. We are a team of 45 conservation professionals and geospatial analysts.
        </p>
        <p className="mb-4">
          We believe that the Chesapeake is a national treasure that should be accessible for everyone and a 
          place where wildlife can thrive. We use technology to accelerate the pace and quality of conservation, 
          and we help build parks, trails, and public access sites.
        </p>
        <p className="mb-4">
          CC has seven staff members with decades of experience in conservation, based in central Pennsylvania. 
          This team has been implementing agricultural and riparian buffer management practices on parcels chosen 
          based on high-resolution land use and land cover data.
        </p>
        <p>
          Chesapeake Conservancy serves in a convening role facilitating large federal grant programs for riparian 
          restoration projects, providing in-stream monitoring and serving to build capacity among a large partner network.
        </p>
      </div>
    </section>
  );
}

export default About;
