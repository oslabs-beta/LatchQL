// export const depthLimit = (str, maxDepth) => {
//   const storage = [];
//   let depthNow = 0;

//   for (let i = 0; i < str.length; i++) {
//     if (str[i] === "{") {
//       storage.push(str[i]);
//     } else if (str[i] === "}") {
//       //depthNow += 1
//       if (storage[storage.length - 1] === "{") {
//         depthNow = Math.max(storage.length, depthNow);
//         storage.pop();
//       }
//     }
//   }
//   if (depthNow - 1 > maxDepth) {
//     return `exceeds maximum operation depth of ${maxDepth}`;
//   } else {
//     return "PASSED";
//   }
// };
