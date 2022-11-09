export const depthLimit = (str, maxDepth) => {
    let withinLimit;
    //seperate the queries and fragments into different string
    let query = str.slice(0, str.indexOf("fragment"));
    let fragments = str.slice(str.indexOf("fragment"));
    const fragDepths = {};
    const fragsArr = fragments.split("fragment");
    //helper function to calculate the depth of the fragment or the query
    const calcDepth = (string) => {
        let maxDepthSoFar = 0;
        let currDepth = 0;
        let fragName;
        //loop through the string and find the max depth
        for (let i = 0; i < string.length; i++) {
            // if find the opening bracket, increase the current depth by 1
            if (string[i] === "{") {
                currDepth += 1;
                // if find the closing bracket, find the max depth so far by using Math.max and decrease the current depth by 1
            }
            else if (string[i] === "}") {
                maxDepthSoFar = Math.max(currDepth, maxDepthSoFar);
                currDepth -= 1;
                // if find the "." , means this query has fragment
            }
            else if (string[i] === "." && string[i + 1] !== ".") {
                // find the name of this fragment
                fragName = string.slice(i + 1, i + 3);
                let fragVal;
                // find the depth of the fragment 
                for (let key in fragDepths) {
                    if (key.includes(fragName)) {
                        fragVal = fragDepths[key];
                    }
                }
                // add the current depth of the fragment to the curent depth
                currDepth += fragVal;
                // math.max the max Depth to find the max depth for now
                maxDepthSoFar = Math.max(currDepth, maxDepthSoFar);
                // remove the depth of the current fragment from the current depth
                currDepth -= fragVal;
            }
        }
        // return the max depth
        return maxDepthSoFar;
    };
    // store the name of fragments and the depth level of the fragment into object fragDepth in key-value paires
    fragsArr.forEach((frag) => {
        if (frag !== "") {
            fragDepths[frag] = calcDepth(frag);
        }
    });
    // if the total depth of the query is smaller than the given maxDepth, return true.
    calcDepth(query) > maxDepth ? (withinLimit = false) : (withinLimit = true);
    return { withinLimit: withinLimit, depth: calcDepth(query) };
};
//# sourceMappingURL=depth-limiter.js.map