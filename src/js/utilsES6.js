/** @format */

// wth ES6 modules you  always export and import an object. ALWAYS.

/* 
const toLowerCase = (sentence) => {...};
export default toLowerCase;  // function is assigned to default
// but we actually export this object:
{
    default: (sentence) => {...}  
}
// and then
import toLowerCase from '.....js';
toLowerCase('Hello World!');

//----------------------------------------
// another way of creating an object
export const toLowerCase = (sentence) => {...};
// creates:
{
    toLowerCase: (sentence) => {...}


// with many objects created:
    export const toCamelCase = () => {...};
    export const toLowerCase = () => {...};}
    const NUM_HELPERS = 2;
    export default NUM_HELPERS;
// creates this object:
{
    toCamelCase: () => {...},
    toLowerCase: () => {...}
    default: 2
}

// import ALL
import * as helpers from './helpers.js';

// defaultExport(any name could be used here) will contain default:
import defaultExport from './helpers.js';

// import anything that is not default - you have to use the exact name:
import { toLowerCase  as newNameHere} from './helpers.js';

// Import a module for side effects only
import "module-name"; 

*/
