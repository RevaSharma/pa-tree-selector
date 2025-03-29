import { filterTrees, scoreTrees } from "./scoreTrees";
const jsonTrees = require("./trees.json");

function checkExpectedTrees(filteredTrees, expectedNames) {
  expectedNames.forEach((name) => {
    const treesWithName = filteredTrees.filter(
      (tree) => tree.commonName === name
    );
    expect(treesWithName.length).toBe(1);
  });
}

describe("filterTrees()", () => {
  it("filters hardinessZone", () => {
    const trees = [
      { hardinessZone: "4-8" }, // 5 in range
      { hardinessZone: "5-7" }, // 5 is min
      { hardinessZone: "3-5" }, // 5 is max
      { hardinessZone: "5-5" }, // 5 is min and max
      { hardinessZone: "3-4" }, // 5 out of range (too big)
      { hardinessZone: "7-8" }, // 5 out of range (too small)
      { hardinessZone: "invalid" }, // invalid
      {}, // property missing
    ];

    const filteringState = { hardinessZone: "5a" };
    const filteredTrees = filterTrees(trees, filteringState);

    expect(filteredTrees).toEqual([
      { hardinessZone: "4-8" }, // 5 in range
      { hardinessZone: "5-7" }, // 5 is min
      { hardinessZone: "3-5" }, // 5 is max
      { hardinessZone: "5-5" }, // 5 is min and max
    ]);
  });

  it("filters woodyPlantType", () => {
    const trees = [
      { woodyPlantType: "Tree" }, // tree
      { woodyPlantType: "Shrub" }, // shrub
      { woodyPlantType: "invalid" }, // invalid
      {}, // property missing
    ];

    const filteringState = { woodyPlantType: ["Shrub"] };
    const filteredTrees = filterTrees(trees, filteringState);

    expect(filteredTrees).toEqual([
      { woodyPlantType: "Shrub" }, // shrub
    ]);
  });

  it("filters soilMoistureConditions", () => {
    const trees = [
      { soilMoistureConditions: "Dry" }, // only dry
      { soilMoistureConditions: "Moist" }, // only moist
      { soilMoistureConditions: "Wet" }, // only wet
      { soilMoistureConditions: "Dry - Moist" }, // only dry and moist
      { soilMoistureConditions: "Moist - Wet" }, // only moist and wet
      { soilMoistureConditions: "Dry - Moist - Wet" }, // all acceptable
      { soilMoistureConditions: "invalid" }, // invalid
      {}, // property missing
    ];
    const filteringState = { soilMoistureConditions: ["Dry", "Moist"] };
    const filteredTrees = filterTrees(trees, filteringState);

    expect(filteredTrees).toEqual([
      { soilMoistureConditions: "Dry" }, // only dry
      { soilMoistureConditions: "Moist" }, // only moist
      { soilMoistureConditions: "Dry - Moist" }, // only dry and moist
      { soilMoistureConditions: "Moist - Wet" }, // only moist and wet
      { soilMoistureConditions: "Dry - Moist - Wet" }, // all acceptable
    ]);
  });

  describe("tolerances", () => {
    it("filters soilCompactionTolerance", () => {
      const trees = [
        { soilCompactionTolerance: "Very Intolerant" }, // very intolerant
        { soilCompactionTolerance: "Intolerant" }, // intolerant
        { soilCompactionTolerance: "Intermediate" }, // intermediate
        { soilCompactionTolerance: "Tolerant" }, // tolerant
        { soilCompactionTolerance: "Very Tolerant" }, // very tolerant
        { soilCompactionTolerance: "invalid" }, // invalid
        {}, // property missing
      ];

      const filteringState = {
        soilCompactionTolerance: ["Intermediate", "Tolerant"],
      };
      const filteredTrees = filterTrees(trees, filteringState);

      expect(filteredTrees).toEqual([
        { soilCompactionTolerance: "Intermediate" }, // intermediate
        { soilCompactionTolerance: "Tolerant" }, // tolerant
        { soilCompactionTolerance: "Very Tolerant" }, // very tolerant
      ]);
    });

    it("filters shadeTolerance", () => {
      const trees = [
        { shadeTolerance: "Very Intolerant" }, // very intolerant
        { shadeTolerance: "Intolerant" }, // intolerant
        { shadeTolerance: "Intermediate" }, // intermediate
        { shadeTolerance: "Tolerant" }, // tolerant
        { shadeTolerance: "Very Tolerant" }, // very tolerant
        { shadeTolerance: "invalid" }, // invalid
        {}, // property missing
      ];

      const filteringState = {
        shadeTolerance: ["Intolerant"],
      };
      const filteredTrees = filterTrees(trees, filteringState);

      expect(filteredTrees).toEqual([
        { shadeTolerance: "Very Intolerant" }, // very intolerant
        { shadeTolerance: "Intolerant" }, // intolerant
      ]);
    });

    it("filters floodTolerance", () => {
      const trees = [
        { floodTolerance: "Very Intolerant" }, // very intolerant
        { floodTolerance: "Intolerant" }, // intolerant
        { floodTolerance: "Intermediate" }, // intermediate
        { floodTolerance: "Tolerant" }, // tolerant
        { floodTolerance: "Very Tolerant" }, // very tolerant
        { floodTolerance: "invalid" }, // invalid
        {}, // property missing
      ];

      const filteringState = { floodTolerance: ["Intermediate"] };
      const filteredTrees = filterTrees(trees, filteringState);

      expect(filteredTrees).toEqual([
        { floodTolerance: "Intermediate" }, // intermediate
      ]);
    });

    it("filters droughtTolerance", () => {
      const trees = [
        { droughtTolerance: "Very Intolerant" }, // very intolerant
        { droughtTolerance: "Intolerant" }, // intolerant
        { droughtTolerance: "Intermediate" }, // intermediate
        { droughtTolerance: "Tolerant" }, // tolerant
        { droughtTolerance: "Very Tolerant" }, // very tolerant
        { droughtTolerance: "invalid" }, // invalid
        {}, // property missing
      ];

      const filteringState = {
        droughtTolerance: ["Tolerant", "Very Tolerant"],
      };
      const filteredTrees = filterTrees(trees, filteringState);

      expect(filteredTrees).toEqual([
        { droughtTolerance: "Tolerant" }, // tolerant
        { droughtTolerance: "Very Tolerant" }, // very tolerant
      ]);
    });

    it("filters roadSaltSprayTolerance", () => {
      const trees = [
        { roadSaltSprayTolerance: "Very Intolerant" }, // very intolerant
        { roadSaltSprayTolerance: "Intolerant" }, // intolerant
        { roadSaltSprayTolerance: "Intermediate" }, // intermediate
        { roadSaltSprayTolerance: "Tolerant" }, // tolerant
        { roadSaltSprayTolerance: "Very Tolerant" }, // very tolerant
        { roadSaltSprayTolerance: "invalid" }, // invalid
        {}, // property missing
      ];

      const filteringState = { roadSaltSprayTolerance: ["Very Intolerant"] };
      const filteredTrees = filterTrees(trees, filteringState);

      expect(filteredTrees).toEqual([
        { roadSaltSprayTolerance: "Very Intolerant" }, // very intolerant
      ]);
    });
  });

  it("filters hasLivestakePotential", () => {
    const trees = [
      { hasLivestakePotential: "Yes" }, // yes
      { hasLivestakePotential: "No" }, // no
      { hasLivestakePotential: "invalid" }, // invalid
      {}, // property missing
    ];

    const filteringState = { hasLivestakePotential: ["Yes"] };
    const filteredTrees = filterTrees(trees, filteringState);

    expect(filteredTrees).toEqual([
      { hasLivestakePotential: "Yes" }, // yes
    ]);
  });

  it("filters wetlandIndicator", () => {
    const trees = [
      { wetlandIndicator: "OBL" },
      { wetlandIndicator: "FACW" },
      { wetlandIndicator: "FAC" },
      { wetlandIndicator: "FACU" },
      { wetlandIndicator: "UPL" },
      { wetlandIndicator: "invalid" }, // invalid
      {}, // property missing
    ];

    const filteringState = { wetlandIndicator: ["OBL", "UPL"] };
    const filteredTrees = filterTrees(trees, filteringState);

    expect(filteredTrees).toEqual([
      { wetlandIndicator: "OBL" },
      { wetlandIndicator: "UPL" },
    ]);
  });

  it("filters pollinators", () => {
    const trees = [
      { pollinators: "Butterflies" }, // has a pollinator
      { pollinators: "Bees, insects" }, // has multiple pollinators
      { pollinators: "" }, // empty string (no pollinators)
      {}, // property missing
    ];

    const filteringState = { pollinators: ["Yes"] };
    const filteredTrees = filterTrees(trees, filteringState);

    expect(filteredTrees).toEqual([
      { pollinators: "Butterflies" }, // has a pollinator
      { pollinators: "Bees, insects" }, // has multiple pollinators
    ]);
  });

  it("filters jugloneTolerance", () => {
    // filter also known as "cohabitable with black walnut"
    const trees = [
      { jugloneTolerance: "Intolerant" }, // intolerant
      { jugloneTolerance: "Tolerant" }, // tolerant
      { jugloneTolerance: "invalid" }, // invalid
      {}, // property missing
    ];

    const filteringState = { jugloneTolerance: ["Tolerant"] };
    const filteredTrees = filterTrees(trees, filteringState);

    expect(filteredTrees).toEqual([
      { jugloneTolerance: "Tolerant" }, // tolerant
    ]);
  });

  it("filters deerPalatability", () => {
    const trees = [
      { deerPalatability: "Unpalatable" }, // unpalatable
      { deerPalatability: "Unpalatable - Palatable" }, // unpalatable and palatable
      { deerPalatability: "Palatable" }, // palatable
      { deerPalatability: "Highly Palatable" }, // highly palatable
      { deerPalatability: "invalid" }, // invalid
      {}, // property missing
    ];

    const filteringState = { deerPalatability: ["Unpalatable"] };
    const filteredTrees = filterTrees(trees, filteringState);

    expect(filteredTrees).toEqual([
      { deerPalatability: "Unpalatable" }, // unpalatable
      { deerPalatability: "Unpalatable - Palatable" }, // unpalatable and palatable
    ]);
  });

  it("filters multifunctionalUses", () => {
    const trees = [
      { multifunctionalUses: "Woody floral" }, // has a use
      { multifunctionalUses: "Edible nut, use bark for syrup" }, // has multiple uses
      { multifunctionalUses: "" }, // invalid
      {}, // property missing
    ];

    const filteringState = { multifunctionalUses: ["Yes"] };
    const filteredTrees = filterTrees(trees, filteringState);

    expect(filteredTrees).toEqual([
      { multifunctionalUses: "Woody floral" }, // has a use
      { multifunctionalUses: "Edible nut, use bark for syrup" }, // has multiple uses
    ]);
  });

  it("filters growthRate", () => {
    const trees = [
      { growthRate: "Slow" }, // only slow
      { growthRate: "Medium" }, // only medium
      { growthRate: "Fast" }, // only fast
      { growthRate: "Slow - Medium" }, // only slow and medium
      { growthRate: "Medium - Fast" }, // only medium and fast
      { growthRate: "Slow - Medium - Fast" }, // all acceptable
      { growthRate: "invalid" }, // invalid
      {}, // property missing
    ];
    const filteringState = { growthRate: ["Medium", "Fast"] };
    const filteredTrees = filterTrees(trees, filteringState);

    expect(filteredTrees).toEqual([
      { growthRate: "Medium" }, // only medium
      { growthRate: "Fast" }, // only fast
      { growthRate: "Slow - Medium" }, // only slow and medium
      { growthRate: "Medium - Fast" }, // only medium and fast
      { growthRate: "Slow - Medium - Fast" }, // all acceptable
    ]);
  });

  it("filters matureHeight", () => {
    const trees = [
      { matureHeight: "40-50" },
      { matureHeight: "12" },
      { matureHeight: "75-125" },
      { matureHeight: "invalid" }, // invalid
      {}, // property missing
    ];
    const filteringState = { matureHeight: ["30 to 50 ft"] };
    const filteredTrees = filterTrees(trees, filteringState);

    expect(filteredTrees).toEqual([{ matureHeight: "40-50" }]);
  });

  it("filters flowerColor", () => {
    const trees = [
      { flowerColor: "Inconspicuous" }, // inconspicuous (not noticeable)
      { flowerColor: "Yellow" }, // yellow
      { flowerColor: "White" }, // white
      { flowerColor: "Pink to white" }, // pink to white
      { flowerColor: "Purplish pink" }, // purplish pink
      { flowerColor: "Dark purple" }, // dark purple
      { flowerColor: "invalid" }, // invalid
      {}, // property missing
    ];

    const filteringState = { flowerColor: ["White", "Pink"] };
    const filteredTrees = filterTrees(trees, filteringState);

    expect(filteredTrees).toEqual([
      { flowerColor: "White" }, // white
      { flowerColor: "Pink to white" }, // pink to white
      { flowerColor: "Purplish pink" }, // purplish pink
    ]);
  });

  it("filters fallColor", () => {
    const trees = [
      { flowerColor: "Evergreen" }, // evergreen (no fall color)
      { flowerColor: "Scarlet red" }, // scarlet red
      { flowerColor: "Yellow red" }, // yellow red
      { flowerColor: "Golden bronze" }, // golden bronze
      { flowerColor: "invalid" }, // invalid
      {}, // property missing
    ];

    const filteringState = { flowerColor: ["Red"] };
    const filteredTrees = filterTrees(trees, filteringState);

    expect(filteredTrees).toEqual([
      { flowerColor: "Scarlet red" }, // scarlet red
      { flowerColor: "Yellow red" }, // yellow red
    ]);
  });

  describe("real tree data tests", () => {
    it("filters lehigh county, 18049", () => {
      const filteringState = {
        hardinessZone: "7a",
        woodyPlantType: ["Tree"],
        flowerColor: ["White"],
        soilMoistureConditions: ["Moist"],
        roadSaltSprayTolerance: ["Tolerant"],
      };

      const filteredTrees = filterTrees(jsonTrees, filteringState);

      const expectedNames = [
        "American Wild Plum",
        "Black Cherry",
        "Black Locust",
        "Canadian Serviceberry",
      ];

      checkExpectedTrees(filteredTrees, expectedNames);
    });

    it("filters union county, 17837", () => {
      const filteringState = {
        hardinessZone: "6b",
        woodyPlantType: ["Tree"],
        droughtTolerance: ["Tolerant"],
        soilMoistureConditions: ["Wet"],
        deerPalatability: ["Unpalatable"],
      };

      const filteredTrees = filterTrees(jsonTrees, filteringState);

      const expectedNames = [
        "American Sycamore",
        "Black Gum (Tupelo)",
        "Gray Birch",
        "Hackberry",
        "Pin Oak",
        "Sweet Gum ",
      ];

      checkExpectedTrees(filteredTrees, expectedNames);
    });

    it("filters elk county, 15857", () => {
      const filteringState = {
        hardinessZone: "5b",
        woodyPlantType: ["Shrub"],
        floodTolerance: ["Tolerant"],
        flowerColor: ["Pink"],
      };

      const filteredTrees = filterTrees(jsonTrees, filteringState);

      const expectedNames = ["Highbush Cranberry"];

      checkExpectedTrees(filteredTrees, expectedNames);
    });
  });
});
