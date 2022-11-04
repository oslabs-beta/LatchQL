// export const calcCost = (query, depthFactor, costLimit) => {
//   let costSum: number = 0,
//     depthLvl: number = 1,
//     withinLimit: Boolean;
//   const split = query.split("\n");
//   for (let i = 1; i < split.length - 1; i++) {
//     if (split[i] === "") {
//       continue;
//     } else if (split[i].includes("{")) {
//       depthLvl += 1;
//     } else if (!split[i].includes("{") && !split[i].includes("}")) {
//       if (depthLvl === 1) costSum += 1;
//       else {
//         costSum += 1 * depthLvl * depthFactor;
//       }
//     } else if (split[i].includes("}")) {
//       depthLvl -= 1;
//     }
//   }
//   // check for whether the query is within the limit
//   costSum < costLimit ? (withinLimit = true) : (withinLimit = false);
//   return {
//     costSum: costSum,
//     withinLimit: withinLimit,
//   };
// };

export const calcCost = (str, depthFactor?, costLimit?) => {
  let query = str.slice(0, str.indexOf('fragment'));
  let fragments = str.slice(str.indexOf('fragment'));

  console.log(fragments);

  const fragsArr = fragments.split('fragment');

  console.log(fragsArr);

  let costSum = 0,
    depthLvl = 0,
    withinLimit = false;
  let fragName;

  console.log(query);

  const split = query.split('\n');
  console.log(split);
  for (let i = 0; i < split.length; i++) {
    if (split[i] === '') {
      continue;
    } else if (split[i].includes('{')) {
      depthLvl += 1;
    } else if (
      !split[i].includes('{') &&
      !split[i].includes('}') &&
      !split[i].includes('...') &&
      // includes any char other than white space
      split[i].trim().length !== 0
    ) {
      if (depthLvl === 1) {
        costSum += 1;
        console.log(costSum);
      } else {
        // console.log(depthLvl);
        console.log(costSum);
        costSum += 1 * depthLvl * depthFactor;
        console.log(costSum);
      }
    } else if (split[i].includes('}')) {
      depthLvl -= 1;
    } else if (split[i].includes('...')) {
      //find the current index of '.
      let currIndex = split[i].indexOf('.');
      fragName = split[i].slice(currIndex + 3);

      console.log(depthLvl);

      const calcFragCost = (fragNameStr) => {
        let fragSum = 0;
        let fragDepthLvl = depthLvl;

        console.log(fragDepthLvl);

        for (let i = 0; i < fragsArr.length; i++) {
          if (fragsArr[i].includes(fragNameStr)) {
            // fragCosts[fragNameStr] =
            console.log(fragsArr[i]);
            const current = fragsArr[i].split('\n');
            console.log(current);
            for (let i = 1; i < current.length - 1; i++) {
              console.log(current[i]);
              if (current[i].includes('{')) {
                fragDepthLvl++;
              } else if (current[i].includes('}')) {
                fragDepthLvl--;
              } else if (
                !current[i].includes('{') &&
                !current[i].includes('}') &&
                current[i].trim().length !== 0
              ) {
                if (current[i] === ' ') return;
                console.log(`fragSum`, fragSum, `fragDepthLvl`, fragDepthLvl);
                fragSum += fragDepthLvl * depthFactor;
                console.log(fragSum);
              }
            }
          }
        }
        console.log(fragSum);
        costSum += fragSum;
        console.log(costSum);
      };
      calcFragCost(fragName);

      // console.log(fragSum);
      // console.log(depthLvl);
      console.log(fragName);
    }
  }
  console.log(costSum);
  costSum < costLimit ? (withinLimit = true) : (withinLimit = false);
  return { costSum: costSum, withinLimit: withinLimit }
};
