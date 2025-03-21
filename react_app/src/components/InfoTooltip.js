import React, { useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Info } from "lucide-react";

/**
 * InfoTooltip Component
 * 
 * Displays a tooltip with definitions when users click the info icon.
 * Provides explanations for different filtering options.
 * 
 * Dependencies:
 * - @radix-ui/react-tooltip (for accessible tooltips)
 * - lucide-react (for the info icon)
 * 
 * Usage:
 * <InfoTooltip label="Filter Name" />
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
  "Wetland Indicator": "Likelihood of a species occurring in wetlands, ranging from OBL (always in wetlands) to UPL (rarely in wetlands). (NRCS)",
  "Pollinators": "Provides nectar/pollen for bees, especially in late fall/early spring. (USDA)",
  "Cohabitable with Black Walnut": "Will likely tolerate juglone, a chemical from black walnut trees that inhibits plant growth. (Purdue University)",
  "Deer Palatability": "Likelihood of being browsed by deer. Highly palatable species are more frequently damaged. (NRCS)",
  "Multifunctional Uses": "Offers benefits beyond ecology, such as food, timber, and medicinal uses. (NRCS)",
  "Growth Rate": "Relative stem growth rate per year. Medium growth corresponds to 1-2 ft/year. (USDA)",
  "Mature Height": "Typical height at maturity under good conditions, used for spacing and landscape planning. (USDA Forest Service)",
  "Flower Color": "Chosen for aesthetic appeal and pollinator attraction.",
  "Fall Color": "Foliage color in autumn, used for seasonal interest. (Arbor Day Foundation)"
};

const InfoTooltip = ({ label }) => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip.Provider>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>
          <button
            onClick={() => setOpen(!open)}
            className="ml-2 text-green-500 hover:text-green-700 p-2 rounded-full bg-gray-100"
            aria-label="Show info"
          >
            <Info size={18} />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-white text-gray-900 text-sm p-3 rounded-lg shadow-lg border border-gray-300 max-w-sm"
            side="right"
            align="center"
          >
            {filterInfo[label] || "No information available."}
            <Tooltip.Arrow className="fill-gray-300" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default InfoTooltip;
