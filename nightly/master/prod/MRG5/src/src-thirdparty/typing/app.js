"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const escapehtml = require("escape-html");
const modules = [
    "bluebird",
    "jssha",
    "lokijs",
    "moment",
    "mqtt",
    "react",
    "react-dom",
    "react-intl",
    "react-redux",
    "react-transition-group",
    "redux",
    "redux-observable",
    "rxjs",
    "underscore",
    "urijs"
];
console.debug("license generator: start processing...");
const pathModules = path.join(__dirname, "node_modules");
const pathLicenses = path.join(__dirname, "licenses");
const licenses = [];
for (const mod of modules) {
    const pathFile = path.join(pathModules, mod, "package.json");
    const fileContent = fs.readFileSync(pathFile, { encoding: "utf-8" });
    const fileJson = JSON.parse(fileContent);
    const license = { name: fileJson.name, license: fileJson.license, version: fileJson.version, modified: "no", content: [] };
    if (license.license === "MIT" || license.license === "BSD-3-Clause" || license.license === "Apache-2.0") {
        const pathLicense1 = path.join(pathModules, mod, "LICENSE");
        const pathLicense2 = path.join(pathModules, mod, "LICENSE.md");
        const pathLicense3 = path.join(pathModules, mod, "LICENSE.txt");
        if (fs.existsSync(pathLicense1)) {
            const content = fs.readFileSync(pathLicense1, "utf8").replace(/\r\n/g, () => "\n") + "\n\n";
            const regex1 = /[^\n](.|\n)+?(?=\n\n)/gm;
            for (const match of content.match(regex1) || []) {
                license.content.push(escapehtml(match).replace(/\n/g, () => "<br />"));
            }
        }
        else if (fs.existsSync(pathLicense2)) {
            const content = fs.readFileSync(pathLicense2, "utf8").replace(/\r\n/g, () => "\n") + "\n\n";
            const regex1 = /[^\n](.|\n)+?(?=\n\n)/gm;
            for (const match of content.match(regex1) || []) {
                license.content.push(escapehtml(match).replace(/\n/g, () => "<br />"));
            }
        }
        else if (fs.existsSync(pathLicense3)) {
            const content = fs.readFileSync(pathLicense3, "utf8").replace(/\r\n/g, () => "\n") + "\n\n";
            const regex1 = /[^\n](.|\n)+?(?=\n\n)/gm;
            for (const match of content.match(regex1) || []) {
                license.content.push(escapehtml(match).replace(/\n/g, () => "<br />"));
            }
        }
        else {
            console.debug(`license generator: cannot find license file for: ${pathLicense1}`);
        }
    }
    licenses.push(license);
}
if (!fs.existsSync(pathLicenses)) {
    fs.mkdirSync(pathLicenses);
}
fs.writeFileSync(path.join(pathLicenses, "licensesui.json"), JSON.stringify(licenses, null, 2), "utf-8");
console.debug("license generator: done.");
//# sourceMappingURL=app.js.map