const fs = require("fs");

for (var fn of fs.readdirSync(".")) {
    var txt = fs.readFileSync(fn).toString();
    var lst = txt.split("\n");
    var state = null;
    for (var i=0,ilen=lst.length; i<ilen; i++) {
        var line = lst[i];
        if (!state) {
            if (line.indexOf("RESULT") > -1) {
                state = "inResult";
                continue;
            }
        } else {
            if (line.indexOf("RESULT") > -1) {
                break
            } else {
                lst[i] = line.replace(/\.$/, "");
            }
        }
    }
    txt = lst.join("\n");
    fs.writeFileSync(fn, txt);
}

