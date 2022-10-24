export const depthLimit = (str: string, maxDepth: number): boolean  => {
  const storage: string[] = [];
  let depthNow: number = 0;
  let depthLimitExceed: boolean = false;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "{") {
      storage.push(str[i]);
    } else if (str[i] === "}") {
      //depthNow += 1
      if (storage[storage.length - 1] === "{") {
        depthNow = Math.max(storage.length, depthNow);
        storage.pop();
      }
    }
  }
  if (depthNow - 1 > maxDepth) {
    depthLimitExceed = true;
    return depthLimitExceed;
  } else {
    return depthLimitExceed;
  }
};
