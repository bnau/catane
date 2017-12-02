const fs = require('fs');


function createWriteFile(path, output) {
    if (path.substr(path.length - 1) === '/') {
        if (!fs.existsSync(path)) {
            createWriteFile(path.substr(0, path.substr(-1).lastIndexOf('/') + 1));
            fs.mkdirSync(path);
        }
    }
    else {
        if (!fs.existsSync(path)) {
            createWriteFile(path.substr(0, path.lastIndexOf('/') + 1));
            fs.openSync(path, 'w');
        }
        fs.writeFileSync(path, output);
    }
}

function extract(pattern, str) {
        let rx = new RegExp("^"+pattern+".*$", "m");
        let arr = rx.exec(str);
        let ext = arr[0];
        return ext.substring(pattern.length);
}

exports.createWriteFile = createWriteFile;
exports.extract = extract;