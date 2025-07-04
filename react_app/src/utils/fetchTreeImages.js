// Utility that fetches tree images from GBIF or Wikimedia Commons
import axios from "axios";

// Removes alternate names in parentheses from scientific names
const cleanScientificName = (name) => {
  return name.replace(/\s*\(.*?\)/g, "").trim();
};

/**
 * Attempts to fetch images from GBIF → Wikimedia → Fallback image.
 */
export const fetchTreeImages = async (treeList) => {
  if (!treeList || treeList.length === 0) return [];

  const updatedTrees = await Promise.all(
    treeList.map(async (tree) => {
      try {
        const cleanedSciName = cleanScientificName(tree.sciName);
        const altNameMatch = tree.sciName.match(/\((.*?)\)/);
        const altSciName = altNameMatch ? altNameMatch[1].trim() : null;
        const commonName = tree.commonName;

        let images = await fetchImagesFromGBIF(cleanedSciName);
        if (!images.length && altSciName)
          images = await fetchImagesFromGBIF(altSciName);
        if (!images.length) images = await fetchImagesFromGBIF(commonName);

        if (!images.length)
          images = await fetchImagesFromWikimedia(cleanedSciName);
        if (!images.length) images = await fetchImagesFromWikimedia(commonName);

        if (!images.length)
          images = ["https://example.com/placeholder-tree.jpg"];

        return { ...tree, images };
      } catch (error) {
        console.error("Error fetching images for:", tree.sciName, error);
        return {
          ...tree,
          images: ["https://example.com/placeholder-tree.jpg"],
        };
      }
    })
  );

  return updatedTrees;
};

// Uses GBIF API to search for tree images by scientific/common name
const fetchImagesFromGBIF = async (searchName) => {
  try {
    const response = await axios.get(
      `https://api.gbif.org/v1/occurrence/search?scientificName=${encodeURIComponent(
        searchName
      )}&mediaType=StillImage`
    );
    return (
      response.data.results
        ?.flatMap((res) => res.media || [])
        .map((img) => img.identifier) || []
    );
  } catch (error) {
    console.error("Error fetching images from GBIF for:", searchName, error);
    return [];
  }
};

// Uses Wikimedia API to find tree images as a fallback
const fetchImagesFromWikimedia = async (searchName) => {
  try {
    const response = await axios.get(
      `https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=images&titles=${encodeURIComponent(
        searchName
      )}&origin=*`
    );
    return response.data.query?.pages
      ? Object.values(response.data.query.pages)
          .flatMap((page) => page.images || [])
          .map(
            (img) =>
              `https://commons.wikimedia.org/wiki/Special:FilePath/${img.title}`
          )
      : [];
  } catch (error) {
    console.error(
      "Error fetching images from Wikimedia for:",
      searchName,
      error
    );
    return [];
  }
};
