import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip"; 
import { Info } from "lucide-react";

/**
 * InfoTooltip Component
 * 
 * This component provides an informational tooltip that displays filter definitions
 * when users hover over an info icon. It helps users understand various filtering
 * options by providing definitions sourced from authoritative sources.
 * 
 * Dependencies:
 * - @radix-ui/react-tooltip: Provides accessible tooltips.
 * - lucide-react: Provides the info icon.
 * 
 * Usage:
 * <InfoTooltip label="Filter Name" />
 * 
 * The label should match a key in the filterInfo object to show the relevant description.
 */


const filterInfo = {
    "Woody Plant Type": "Tree - a woody perennial plant with a single main stem. Shrub - a low, several-stemmed woody plant. (Merriam-Webster)",
    "Soil Moisture Conditions": "Plant preference for water availability in unsaturated soil. (NOAA)",
    "Soil Compaction Tolerance": "Tolerance to reduced soil pore space affecting water, air, and root growth. (NRCS)",
    "Shade Tolerance": "Ability to grow under shaded conditions. Highly tolerant species grow in deep shade, while intolerant ones need full sun. (USDA)",
    "Flood Tolerance": "Survival ability after seasonal flooding. Prolonged flooding can suffocate roots. (USDA)",
    "Drought Tolerance": "Ability to survive during drought conditions. Extended drought can cause tissue damage or death. (USDA)",
    "Road Salt Spray Tolerance": "Resistance to salt exposure from road de-icing, preventing foliage/root damage. (USDA)",
    "Livestake Potential": "Ability to propagate by inserting dormant stem cuttings into streambanks. (PSU)",
    "Eetland Indicator": "Likelihood of a species occurring in wetlands, ranging from OBL (always in wetlands) to UPL (rarely in wetlands). (NRCS)",
    "Eollinators": "Provides nectar/pollen for bees, especially in late fall/early spring. (USDA)",
    "Eohabitable with Black Walnut": "Can tolerate juglone, a chemical from black walnut trees that inhibits plant growth. (Purdue University)",
    "Eeer Palatability": "Likelihood of being browsed by deer. Highly palatable species are more frequently damaged. (NRCS)",
    "Eultifunctional Uses": "Offers benefits beyond ecology, such as food, timber, and medicinal uses. (NRCS)",
    "Growth Rate": "Relative stem growth rate per year. Medium growth corresponds to 1-2 ft/year. (USDA)",
    "Mature Height": "Typical height at maturity under good conditions, used for spacing and landscape planning. (USDA Forest Service)",
    "Flower Color": "Chosen for aesthetic appeal and pollinator attraction.",
    "Fall Color": "Foliage color in autumn, used for seasonal interest. (Arbor Day Foundation)"
  };

const InfoTooltip = ({ label }) => {
    return (
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button className="ml-2 text-green-500 hover:text-green-700 p-2 rounded-full bg-gray-100">
              <Info size={18} />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="bg-white text-gray-900 text-sm p-3 rounded-lg shadow-lg border border-gray-300 max-w-sm">
              {filterInfo[label] || "No information available."}
              <Tooltip.Arrow className="fill-gray-300" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  };
  
  export default InfoTooltip;
  

