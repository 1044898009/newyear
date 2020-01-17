
const url = "http://c.boaov.org/boaoweb/";
// const url = "http://c.boaov.org/boaoweb/";


function isFn(i) {
    const notArray = ["null", null, undefined, "undefined", '', 0, "0"];
    if (notArray.includes(i)) { //includes    查找
        return true;
    } else {
        return false;
    }
};
function isFns(i) {
    const notArray = ["null", null, undefined, "undefined"];
    if (notArray.includes(i)) { //includes    查找
        return true;
    } else {
        return false;
    }
};