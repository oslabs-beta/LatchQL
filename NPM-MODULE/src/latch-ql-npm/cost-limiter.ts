
export const calcCost = (str: string, depthFactor: number, costLimit: number) => {

  //seperate the queries and fragments into different string
  let query = str.slice(0, str.indexOf('fragment'));
  let fragments = str.slice(str.indexOf('fragment'));

  // if there more than one fragments, seperate them and store them into an array
  const fragsArr = fragments.split('fragment');

  let costSum = 0,
    depthLvl = 0,
    withinLimit = false;
  let fragName: string;

  const split = query.split('\n');
 
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
      } else {
        costSum += 1 * depthLvl * depthFactor;
      }
    } else if (split[i].includes('}')) {
      depthLvl -= 1;
    } else if (split[i].includes('...')) {
      //find the current index of '.
      let currIndex = split[i].indexOf('.');
      fragName = split[i].slice(currIndex + 3);

      // helper function to calculate the cost of the fragment
      const calcFragCost = (fragNameStr) => {
        let fragSum = 0;
        let fragDepthLvl = depthLvl;

        //loop throught the fragsArr, and and find the frag that matches the current fragment
        for (let i = 0; i < fragsArr.length; i++) {
          if (fragsArr[i].includes(fragNameStr)) {
        
            const current = fragsArr[i].split('\n');

            //loop through current fragment, and calculate the cost the current fragment
            for (let i = 1; i < current.length - 1; i++) {
              console.log(current[i]);
              if (current[i].includes('{')) {
                fragDepthLvl++;
              } else if (current[i].includes('}')) {
                fragDepthLvl--;
              } else if (
                !current[i].includes('{') &&
                !current[i].includes('}') &&
                // includes any char other than white space
                current[i].trim().length !== 0
              ) {
                if (current[i] === ' ') return;
                // calculate the sum of the current fragment
                fragSum += fragDepthLvl * depthFactor;

              }
            }
          }
        }
        // add the sum of current fragment to the total cost 
        costSum += fragSum;
      };
      calcFragCost(fragName);
    }
  }
  // if sum of the total cost is smaller than the costLimit, return true. if not, return false
  costSum < costLimit ? (withinLimit = true) : (withinLimit = false);
  return { costSum: costSum, withinLimit: withinLimit }
};
