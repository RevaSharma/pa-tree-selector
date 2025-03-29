export function matchesTolerance(tolerance, desiredTolerances) {
  if (desiredTolerances.includes("Tolerant")) {
    if (tolerance === "Tolerant" || tolerance === "Very Tolerant") {
      return true;
    }
  }
  if (desiredTolerances.includes("Intolerant")) {
    if (tolerance === "Intolerant" || tolerance === "Very Intolerant") {
      return true;
    }
  }
  return desiredTolerances.includes(tolerance)
}
