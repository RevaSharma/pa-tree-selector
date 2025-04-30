export function matchesDeerPalatibility(palatabilities, choices) {
  const isWantingPalatable = choices[0] === "Yes";
  if (isWantingPalatable) {
    return palatabilities.includes("Palatable");
  } else {
    return palatabilities.includes("Unpalatable");
  }
}
