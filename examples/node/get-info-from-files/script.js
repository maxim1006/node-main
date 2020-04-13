const fse = require("fs-extra");
const path = require("path");
const glob = require("glob");

(async () => {
    const folder = path.resolve(__dirname, "./test");

    const files = await fse.readdir(path.resolve(folder));
    const filteredFiles = files.filter(file => file.startsWith("public_api"));

    let dataMap = {};

    let exportsRegex = new RegExp(/export(?:["'\s]*([\w*${}\n\r\t, ]+)from\s*)?["'\s]["'\s](.*[@\w_-]+)["'\s].*;$/, 'mg');
    const exportRegexp = /export\s*{(.+)}/m;

    // clear public_api.ts file
    await fse.writeFile(path.resolve(folder, "public_api.ts"), "");

    await Promise.all(
        filteredFiles.map(async (file) => {

            // get file name without redundant name
            const fileName = file.replace("public_api.", "").replace(".ts", "");

            // get file content
            const fileContent = await fse.readFile(path.resolve(folder, file), "utf8");

            // get array of all exports
            const exportsArrayFromFile = fileContent.match(exportsRegex);

            // check if public_api.ts has name like: public_api.name.ts
            if (fileName && Array.isArray(exportsArrayFromFile)) {
                // remove carriages from array items
                const exportsArrayFromFileWithoutCarriage = exportsArrayFromFile.map(item => item.replace(/[\r\n]+/gm, ""));

                // go through all export instances
                exportsArrayFromFileWithoutCarriage.forEach(exportInstance => {
                    // get all export instances
                    const exportedInstances = exportInstance.match(exportRegexp);

                    // check for null because of match
                    if (exportedInstances !== null) {
                        // check if in export > 1 instance
                        const exportedInstancesArray = exportedInstances[1].split(",");

                        // for every instance add url
                        exportedInstancesArray.forEach(instanceName => {
                            dataMap[instanceName.trim()] = "pre/" + fileName;
                        });
                    }
                });
            }
        })
    );


    // find all modules in ./dist and change imports to pre/...
    glob(folder + "/dist/ux-components/**/*.module.ts", (er, files) => {
        files.forEach(async (file) => {
            // get file content
            const fileContent = await fse.readFile(path.resolve(file), "utf8");

            // get array of lines
            const splittedFileContent = fileContent.split(/\r?\n/).map(item => item.trim());

            // go through all lines
            splittedFileContent.forEach((line, index) => {
                const importRegexp = /import\s*{(.+)}/m;

                // remove comments
                if (line.includes("//")) {
                    splittedFileContent[index] = "";
                }

                if (line.includes("import") && line.includes(".module")
                ) {
                    const currentModuleArray = line.match(importRegexp)[1].split(',');
                    const currentModule = currentModuleArray[0].trim();
                    splittedFileContent[index] = `import {${currentModule}} from "${dataMap[currentModule]}";`;
                }
            });

            // put new import string to file
            await fse.writeFile(path.resolve(file), splittedFileContent.join(""));

            // console.log(file + " imports in module are modified");
        });

    });


    // find components that have link to other components inside in ./dist and change imports to @pre/...
    glob(folder + "/dist/ux-components/**/*.?(component|directive|service).ts", (er, files) => {

        // only for components that importds other components from different module
        files.forEach(async (file) => {

            // get file content
            const fileContent = await fse.readFile(path.resolve(file), "utf8");
            // regexp for imports
            let regex = new RegExp(/import(?:["'\s]*([\w*${}\n\r\t, ]+)from\s*)?["'\s]["'\s](.*[@\w_-]+)["'\s].*;$/, 'mg');

            // save file context without imports
            const contentWithoutImports = fileContent.replace(regex, "");

            // get array of all imports
            const importsArrayFromFile = fileContent.match(regex);

            // remove carriages from array items
            const importsArrayFromFileWithoutCarriage = importsArrayFromFile.map(item => item.replace(/[\r\n]+/gm, ""));

            importsArrayFromFileWithoutCarriage.forEach((importItem, index) => {
                if (
                    importItem.includes("/radio/radio-field.component")
                ) {
                    const importRegexp = /import\s*{(.+)}/m;
                    // find all import instances
                    const arrayOfImportInstances = importItem.match(importRegexp)[1].split(',');

                    // take the first
                    const currentImportInstance = arrayOfImportInstances[0].trim();

                    // if it exists in map from public_api change import to "pre/...
                    if (dataMap[currentImportInstance]) {
                        importsArrayFromFileWithoutCarriage[index] = `import {${arrayOfImportInstances.join(",")}} from "${dataMap[currentImportInstance]}";`;
                    }
                }
            });

            // write new imports + rest part to file
            await fse.writeFile(path.resolve(file), importsArrayFromFileWithoutCarriage.join("") + contentWithoutImports);
        });
    });


    /** put all aliases in public_api.ts */
        // get public_api.ts content
    const publicApiPath = path.resolve(folder, "public_api.ts");
    const publicApiContent = `       
       /*Interfaces*/
       export {UxDataOptionsModel} from "./dist/ux-components/src/components/common.model";
       export {UxNumberFormatModel} from "./dist/ux-components/src/components/number.model";

        export interface UxValueChangeEvent<T> {
            oldValue: T;
            newValue: T;
        }
        
        export interface UxSubmitValueChangeEvent {
            value: any;
            originalEvent: any;
        }
    `;
    let publicApiExportsString = "";

    Object.entries(dataMap)
        .forEach(([key, value]) => {
            // don't add Highcharts and brace to all bundles
            if (
                value !== "@netcracker/ux-ng2/library/ace-editor"
                && value !== "@netcracker/ux-ng2/library/graph"
            ) {
                publicApiExportsString += `export {${key}} from "${value}";`
            }
        });

    // write exports to public_api.ts
    await fse.writeFile(publicApiPath, publicApiContent + publicApiExportsString);
    // console.log(dataMap);
})();
