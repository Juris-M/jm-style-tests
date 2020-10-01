const fs = require("fs");
const path = require("path");

var ret = [];

for (var fn of fs.readdirSync(".")) {
    if (fn.slice("-4") !== ".txt") {
        continue;
    }
    console.log(fn);
    var lst = fs.readFileSync(fn).toString().split("\n");
    var inBlock = false;
    var acc = [];
    for (var line of lst) {
        if (line.match(/>=+\s*INPUT/)) {
            console.log("OK");
            inBlock = true;
            continue;
        }
        if (inBlock) {
            if (line.match(/<=+\s*INPUT/)) {
                inBlock = false;
                var obj = JSON.parse(acc.join("\n"));
                ret = ret.concat(obj);
            } else {
                acc.push(line);
            }
        }
    }
}

console.log(JSON.stringify(ret, null, 2));
