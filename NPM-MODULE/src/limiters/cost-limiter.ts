export const calcCost = (query, depthFactor, costLimit) => {
  let costSum: number = 0,
    depthLvl: number = 1,
    withinLimit: Boolean;
  const split = query.split("\n");
  for (let i = 1; i < split.length - 1; i++) {
    if (split[i] === "") {
      continue;
    } else if (split[i].includes("{")) {
      depthLvl += 1;
    } else if (!split[i].includes("{") && !split[i].includes("}")) {
      if (depthLvl === 1) costSum += 1;
      else {
        costSum += 1 * depthLvl * depthFactor;
      }
    } else if (split[i].includes("}")) {
      depthLvl -= 1;
    }
  }
  // check for whether the query is within the limit
  costSum < costLimit ? (withinLimit = true) : (withinLimit = false);
  return {
    costSum: costSum,
    withinLimit: withinLimit,
  };
};
