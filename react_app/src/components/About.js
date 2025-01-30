import React from 'react';

function About() {
    return (
        <section id="about-section" className="hideable">
        <h2 className="section-title">About</h2>
        <h3>History</h3>
        <p>
          As part of their commitment to Chesapeake Bay restoration goals,
          Pennsylvania has set a target of planting 95,000 acres of riparian
          forest buffer by the year 2025. As on-the-ground restoration partners
          like volunteer groups, watershed associations, nonprofits, and state
          agencies work to accelerate progress toward this goal, there is a need
          for resources to improve both the planting design process and to
          ensure survivorship of new tree plantings.
        </p>
        <p>
          While developing restoration and tree planting plans, groups such as
          Chesapeake Conservancy and Chesapeake Bay Foundation realized that
          there was no publicly-available, comprehensive Pennsylvania-specific
          web tool to choose native species for projects. It was realized that
          if such a tool was developed, it could improve planning efficiency and
          ensure the right species are planted in the right locations.
        </p>
        <p>
          The first version of the tool was a simple Excel spreadsheet created
          by Chesapeake Bay Foundation field staff that could be sorted and
          filtered to select species with desired attributes. The sheet had
          robust amounts of information and worked well but it saw limited use.
          It was realized that if the sheet were more aesthetically appealing,
          easier to use, and produced better outputs it would likely be used by
          more people. So, Chesapeake Conservancy and Susquehanna University set
          about to migrate the spreadsheet to a much more user-friendly and
          aesthetically improved Google sheet. This improved sheet was much more
          appealing and had many more users than the original but had challenges
          in terms of usability and outputs. Thus the idea to create an app or
          website to solve these problems and take this tool to its fullest
          potential was born. The Pennsylvania Tree Selector Tool website is the
          result of years of development.
        </p>
        <h3>What is the Chesapeake Conservancy?</h3>
        <p>
          Chesapeake Conservancy (CC) is a nonprofit organization with offices
          in Annapolis, Maryland and Selinsgrove, PA. We are a team of 45
          conservation professionals and geospatial analysts. We believe that
          the Chesapeake is a national treasure that should be accessible for
          everyone and a place where wildlife can thrive. We use technology to
          accelerate the pace and quality of conservation, and we help build
          parks, trails, and public access sites. With global calls to protect
          30% of land by 2030 as a climate and biodiversity solution, CC uses
          artificial intelligence and groundbreaking data to accelerate progress
          in conserving landscapes vital to the Bay's health and its cultural
          heritage while connecting people to the Chesapeake.
        </p>
        <p>
          CC has seven staff members with decades of experience in conservation,
          based in central Pennsylvania. This team has been implementing
          agricultural and riparian buffer management practices on parcels
          chosen based on high-resolution land use and land cover data,
          developed by our Conservation Innovation Center (CIC), that helps
          identify parcels with the largest reductions in nitrogen, phosphorus,
          and sediment pollution. Chesapeake Conservancy serves in a convening
          role facilitating large federal grant programs for riparian
          restoration projects, providing in-stream monitoring and serving to
          build capacity among a large partner network.
        </p>
      </section>
    )
}

export default About;