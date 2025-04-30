/**
 * 
 * This component renders a visually styled list of citation sources
 * used to inform the PA Tree Selector Tool. It includes links to online
 * resources and references for various ecological attributes (e.g., flood tolerance, growth rate).
 * 
 * Key Features:
 * - Auto-updates today's date for GBIF reference.
 * - Displays all sources in a scrollable table format.
 */
import React from "react";
import { TreePine } from "lucide-react"; // Icon for title

function Sources() {
  // Gets today's date in a readable format
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Source data array: topic, citation, and link
  const sources = [
    {
      topic: "Definitions / Terminology",
      source: "Merriam-Webster Online (as general reference)",
      link: "https://www.merriam-webster.com",
    },
    {
      topic: "Soil Moisture Preference",
      source: "NOAA (Soil Moisture Preference)",
      link: "https://www.noaa.gov",
    },
    {
      topic: "Soil Compaction Tolerance, Wetland Indicator, Multifunctional Use",
      source: "NRCS",
      link: "https://www.nrcs.usda.gov/",
    },
    {
      topic: "Shade, Flood, Drought Tolerance, Growth Rate, Pollinator Friendly",
      source: "USDA National Agroforestry Center",
      link: "https://www.fs.usda.gov/nac/",
    },
    {
      topic: "Black Walnut (juglone) Tolerance",
      source: "Purdue Extension",
      link: "https://www.extension.purdue.edu/",
    },
    {
      topic: "Mature Height",
      source: "USDA Forest Service",
      link: "https://www.fs.usda.gov/",
    },
    {
      topic: "Fall Color",
      source: "Arbor Day Foundation",
      link: "https://www.arborday.org/",
    },
    {
      topic: "Livestock Potential",
      source: "PSU",
      link: "https://psu.edu",
    },
    {
      topic: "Black Walnut (juglone) Tolerance",
      source:
        "Dana, Micheal N. and Lerner, B. Rosie. 2001. Black Walnut Toxicity. Purdue University Cooperative Extension Service. General Horticulture HO-193-W.",
      link: "https://www.extension.purdue.edu/extmedia/HO/HO-193.pdf",
    },
    {
      topic: "Black Walnut (juglone) Tolerance",
      source:
        "Joy, Ann and Hudelson, Brian. 2010. Black Walnut Toxicity. UW-Madison Division of Extension. Website.",
      link: "https://hort.extension.wisc.edu/articles/black-walnut-toxicity/",
    },
    {
      topic: "Black Walnut (juglone) Tolerance",
      source:
        "Funt, Richard C. and Martin, Jane. Black Walnut Toxicity to Plants, Humans and Horses. Ohio State University Extension Fact Sheet.HYG-1148-93.",
      link: "http://washtenawcd.org/uploads/5/9/2/0/59207889/black_walnut_toxicity_to_plants.pdf",
    },
    {
      topic: "Common Ripariam Species",
      source:
        "Chesapeake Bay Foundation Field Staff Pennsylvania Native Trees and Shrubs Recommended for Riparian Buffers document.",
      link: "https://chesapeakeforestbuffers.net/wp-content/uploads/2017/02/Pennsylvania-Riparian-Forest-Buffer-Handbook-2017.pdf",
    },
    {
      topic: "Deer Palatability",
      source:
        "Gilchrist, Drew. 2013. Deer Resistant/Tolerant Native Plants for Southeastern Pennsylvania. PA Department of Conservation and Natural Resources.",
      link: "http://www.docs.dcnr.pa.gov/cs/groups/public/documents/document/dcnr_20028673.pdf",
    },
    {
      topic: "Flood Tolerance",
      source:
        "Jull, Laura G. 2008. Effects of Flooding on Woody Landscape Plants. Univesity of Wisconsin Cooperative Extension.",
      link: "https://kenosha.extension.wisc.edu/files/2010/05/Effects-of-Flooding-on-Woody-Plants.pdf",
    },
    {
      topic: "General Info",
      source: "USDA Plants Database. Website.",
      link: "https://plants.usda.gov",
    },
    {
      topic: "General Info",
      source:
        "Barnes, Burton V. and Wagner Jr., Warren H. 1996 revised and updated edition. Michigan Trees: A Guide to the Trees of the Great Lakes Region. The University of Michigan Press. Ann Arbor, MI.",
      link: "https://www.press.umich.edu/17709/michigan_trees_revised_and_updated",
    },
    {
      topic: "General Info. An Excellent Source for Tree Information and ID.",
      source: "The Morton Arboreteum. Website.",
      link: "https://www.mortonarb.org/trees-plants/tree-plant-descriptions/",
    },
    {
      topic: "General Info/ID",
      source:
        "Cassell, Seth and Dix, Ed. Common Trees of Pennsylvania. Pennsylvania Department of Conservation and Natural Resources.",
      link: "http://www.docs.dcnr.pa.gov/cs/groups/public/documents/document/dcnr_20029752.pdf",
    },
    {
      topic: "General Info/ID",
      source:
        "Petrides, George A. and Wehr, Janet. 1998. A Field Guide to Eastern Trees (Peterson Field Guides). Houghton Mifflin Harcourt.",
      link: null,
    },
    {
      topic: "Livestake Potential",
      source: "Ernst Seeds Bioengineering Materials. Website.",
      link: "https://www.ernstseed.com/products/bioengineering-materials/",
    },
    {
      topic: "Livestock Toxicity",
      source: "Nice, Glen. 2008. Guide to Toxic Plants and Forages. Purdue University Extension.",
      link: "https://www.extension.purdue.edu/extmedia/WS/WS_37_ToxicPlants08.pdf",
    },
    {
      topic: "Livestock Toxicity",
      source: "Noxious Plants for Agricultural Livestock in Pennsylvania. 2010. Lancaster County Planning Commission.",
      link: "https://lancastercountyplanning.org/DocumentCenter/View/150/Noxious-Plants-for-Agricultural-Livestock-in-Pennsylvania",
    },
    {
      topic: "Multifunctional Use; Pollinator Use; General Info.",
      source: "A Short List of Suggested Buffer Plants. PA Department of Conservation and Natural Resources.",
      link: "http://www.docs.dcnr.pa.gov/cs/groups/public/documents/document/dcnr_20033078.pdf",
    },
    {
      topic: "Physiogeographic Region; Soil Moisture; General Info; Excellent Native Plant Resource.",
      source: "Chesapeake Bay Native Plant Center. Website.",
      link: "http://www.nativeplantcenter.net/",
    },
    {
      topic: "Physiogeographic Region; Soil Moisture; General Info; Excellent Native Plant Resource.",
      source: "Slattery, Britt E., Kathryn Reshetiloff, and Susan M. Zwicker. 2003. Native Plants for Wildlife Habitat and Conservation Landscaping: Chesapeake Bay Watershed. U.S. Fish & Wildlife Service, Chesapeake Bay Field Office, Annapolis, MD. 82 pp.",
      link: "https://www.fws.gov/chesapeakebay/pdf/NativePlantsforWildlifeHabitatandConservationLandscaping.pdf",
    },
    {
      topic: "Plant Hardiness Zones",
      source: "USDA Plant Hardiness Zone Map. Website.",
      link: "https://planthardiness.ars.usda.gov/PHZMWeb/#",
    },
    {
      topic: "Plant Names; Soil Drainage; Flood Tolerance; Drought Tolerance; Deer Palatability; Road Salt Spray Tolerance; Mature Height; Growth Rate; Soil Compaction Tolerance.",
      source: "Salon P.R. and C. F. Miller. 2012. A Guide to: Conservation Plantings on Critical Areas for the Northeast USDA, NRCS, Big Flats Plant Materials Center, Corning, NY. (via USDA NRCS eFOTG)",
      link: "https://efotg.sc.egov.usda.gov/references/public/PA/PA391TreeandShrubInformationforPANRCS.pdf",
    },
    {
      topic: "Plant Names; Soil Drainage; Flood Tolerance; Drought Tolerance; Deer Palatability; Road Salt Spray Tolerance; Mature Height; Growth Rate; Soil Compaction Tolerance.",
      source: "Chesapeake Bay Foundation Keystone 10 Million Trees 2020 Tree List.",
      link: null,
    },
    {
      topic: "Pollinator Use",
      source: "USDA NRCS Woody Plants for Use in Pollinator‐Friendly Plantings.",
      link: "https://efotg.sc.egov.usda.gov/references/public/PA/PA391Woodyplantsforpollinators.pdf",
    },
    {
      topic: "Pollinator Use",
      source: "Mader, Eric. 2011. Attracting Native Pollinators (Xerces Society Guide): Protecting North America's Bees and Butterflies. Storey Publishing. North Adams, MA.",
      link: "https://www.xerces.org/publications/books/attracting-native-pollinators",
    },
    {
      topic: "Pollinator Use",
      source: "Wattles, Kirk. 2017. Trees and Shrubs for Bees. Philadelphia Bee Keepers Guild.",
      link: "https://phillybeekeepers.org/wp-content/uploads/2017/02/BToS_3rd-ed_20170204_5pp.pdf",
    },
    {
      topic: "Pollinator Use; Wildlife Use",
      source: "Tallamy, Douglas W. 2017. Bringing Nature Home. 11th edition. Timber Press. Portland, OR.",
      link: "http://www.bringingnaturehome.net/",
    },
    {
      topic: "Pollinator Use; Fall Color; Flower Color; General Info; Excellent Native Plant Resource.",
      source: "Native Plants of North America. Lady Bird Johnson Wildflower Center. Website.",
      link: "https://www.wildflower.org/plants-main",
    },
    {
      topic: "Pollinator Use; General Info.",
      source: "Native Plant Finder. National Wildlife Federation. Website.",
      link: "https://www.nwf.org/NativePlantFinder/",
    },
    {
      topic: "Soil Compaction Tolerance",
      source: "Fountain, William H. 2011. Trees and Compacted Soils. University of Kentucky Cooperative Extension.",
      link: "http://www2.ca.uky.edu/agcomm/pubs/ho/ho93/ho93.pdf",
    },
    {
      topic: "Soil Drainage Class Descriptions",
      source: "Soil Survey Division Staff. 1993. Soil survey manual. Soil Conservation Service. U.S. Department of Agriculture Handbook 18.",
      link: "https://www.nrcs.usda.gov/resources/guides-and-instructions/soil-survey-manual",
    },
    {
      topic: "Soil Drainage Classes by County",
      source: "2019. Pennsylvania Soils Drainage Classes by County - USDA-NRCS Soil Survey Database.",
      link: "https://extension.psu.edu/programs/nutrient-management/planning-resources/other-planning-resources/pennsylvania-county-drainage-class-tables",
    },
    {
      topic: "Soils",
      source: "USDA Web Soil Survey online.",
      link: "https://websoilsurvey.sc.egov.usda.gov/App/HomePage.htm",
    },
    {
      topic: "Wetland Indicator Status Descriptions",
      source: "Ernst Seeds Wetland Indicator Map and Key. Website.",
      link: "https://www.ernstseed.com/resources/wetland-indicator-map-key/",
    },
    {
      topic: "Wetland Indicator; Excellent Resource for Identifying Specific PA Native Species to the County and Watershed Level.",
      source: "The Pennsylvania Flora Project of Morris Arboretum. Website.",
      link: "http://paflora.org/original/adv-db.php",
    },
    {
      topic: "Wildlife Use; General Info; Excellent Riparian Buffer Planning Resource.",
      source: "Palone, R.S. and A.H. Todd (editors.) 1997. Chesapeake Bay riparian handbook: a guide for establishing and maintaining riparian forest buffers. USDA Forest Service. NA-TP-02-97. Radnor, PA.",
      link: "https://www.chesapeakebay.net/content/publications/cbp_13019.pdf",
    }    
    // Continue for rest of entries...
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-gradient-to-b from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl shadow-lg">
      <h1 className="text-4xl font-extrabold text-green-800 dark:text-green-100 flex items-center gap-2 mb-4">
        <TreePine className="w-8 h-8" /> Sources
      </h1>
      <p className="mb-8 text-gray-700 dark:text-gray-300 text-md">
        This project makes use of biodiversity occurrence data provided by the
        Global Biodiversity Information Facility (GBIF). Data accessed on <strong>{today}</strong>.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-800 dark:text-gray-200 rounded-lg overflow-hidden shadow-md border border-green-200 dark:border-green-800">
          <thead className="bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100 text-base">
            <tr>
              <th className="border px-4 py-2">Topic</th>
              <th className="border px-4 py-2">Source</th>
              <th className="border px-4 py-2">Link</th>
            </tr>
          </thead>
          <tbody>
            {sources.map((entry, idx) => (
              <tr key={idx} className="bg-white dark:bg-gray-900 border-t border-green-100 dark:border-green-800">
                <td className="border px-4 py-2 align-top">{entry.topic}</td>
                <td className="border px-4 py-2 align-top">{entry.source}</td>
                <td className="border px-4 py-2 align-top">
                  {entry.link ? (
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 dark:text-green-300 underline font-medium hover:text-green-900 dark:hover:text-green-200 transition"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">No link</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sources;