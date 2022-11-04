export const depthLimit = (str: string, maxDepth: number): boolean => {
  let query = str.slice(0, str.indexOf("fragment"));
  let fragments = str.slice(str.indexOf("fragment"));
  const fragDepths = {};

  const fragsArr: string[] = fragments.split("fragment");

  let targetFrag: string[] = [];

  const calcDepth = (string: string) => {
    let maxDepthSoFar: number = 0;
    let currDepth: number = 0;
    let fragName: string;
    for (let i = 0; i < string.length; i++) {
      if (string[i] === "{") {
        currDepth += 1;
      } else if (string[i] === "}") {
        maxDepthSoFar = Math.max(currDepth, maxDepthSoFar);
        currDepth -= 1;
      } else if (string[i] === "." && string[i + 1] !== ".") {
        fragName = string.slice(i + 1, i + 3);

        let fragVal;
        for (let key in fragDepths) {
          if (key.includes(fragName)) {
            fragVal = fragDepths[key];
          }
        }
        currDepth += fragVal;
        maxDepthSoFar = Math.max(currDepth, maxDepthSoFar);
        currDepth -= fragVal;
      }
    }
    return maxDepthSoFar;
  };

  fragsArr.forEach((frag) => {
    if (frag !== "") {
      targetFrag.push(frag);
      fragDepths[frag] = calcDepth(frag);
    }
  });

  if (calcDepth(query) > maxDepth) return false;
  else return true;
};

// depthLimit("{ jobs { title description } }", 5)
// module.exports = depthLimit;

// export const depthLimit = (str: any, maxDepth: number): boolean => {
//   const storage: string[] = [];
//   let depthNow: number = 0;
//   let depthLimitExceed: boolean = false;
//   let fragment = "";
//   console.log("Query Kind:", str.Kind);

//   for (let i = 0; i < str.length; i++) {
//     if (str[i] === ".") {
//       if (str[i] !== " ") fragment += str[i];
//     } else if (str[i] === "{") {
//       storage.push(str[i]);
//     } else if (str[i] === "}") {
//       if (storage[storage.length - 1] === "{") {
//         depthNow = Math.max(storage.length, depthNow);
//         storage.pop();
//       }
//     }
//   }
//   if (depthNow - 1 > maxDepth) {
//     depthLimitExceed = true;
//     return depthLimitExceed;
//   } else {
//     return depthLimitExceed;
//   }
// };
