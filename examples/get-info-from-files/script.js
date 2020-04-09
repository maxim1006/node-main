const fse = require("fs-extra");
const path = require("path");

// создаю мапу из инстанс: путь изнутри файла
// (async () => {
//
//     const files = await fse.readdir(path.resolve("./files"));
//     const filteredFiles = files.filter(file => file.startsWith("file"));
//
//     // console.log("filteredFiles ", filteredFiles);
//
//     let dataMap = {};
//
//     const exportRegexp = /export\s*{(.+)}\s*from\s*"\.\/dist(.+)";/m;
//
//     filteredFiles.forEach(async (file) => {
//         // get file content
//         const fileContent = await fse.readFile(path.resolve("./files", file), "utf8");
//
//         // get array of lines
//         const splittedFileContent = fileContent.split(/\r?\n/);
//
//         // go through all lines
//         splittedFileContent.forEach(line => {
//             // get all export instances
//             const exportedInstances = line.match(exportRegexp);
//
//             // check for null because of match
//             if (exportedInstances !== null) {
//                 // check if in export > 1 instance
//                 const exportedInstancesArray = exportedInstances[1].split(",");
//                 // get url
//                 const url = exportedInstances[2];
//                 // for every instance add url
//                 exportedInstancesArray.forEach(instanceName => dataMap[instanceName.trim()] = url);
//             }
//
//             console.log(dataMap);
//         });
//     });
//
//
// })();

// пример создания мапы инстанс: имя файла через точку
(async () => {
    const folder = "./ux-ng2-library";

    const files = await fse.readdir(path.resolve(folder));
    const filteredFiles = files.filter(file => file.startsWith("public_api"));

    // console.log("filteredFiles ", filteredFiles);

    let dataMap = {};

    const exportRegexp = /export\s*{(.+)}/m;

    filteredFiles.forEach(async (file) => {
        // get file name without redundant name
        const fileName = file.replace("public_api.", "").replace(".ts", "");

        // get file content
        const fileContent = await fse.readFile(path.resolve(folder, file), "utf8");

        // get array of lines
        const splittedFileContent = fileContent.split(/\r?\n/);

        // go through all lines
        splittedFileContent.forEach(line => {
            // get all export instances
            const exportedInstances = line.match(exportRegexp);

            // check for null because of match
            if (exportedInstances !== null) {
                // check if in export > 1 instance
                const exportedInstancesArray = exportedInstances[1].split(",");
                // get url
                const url = exportedInstances[2];
                // for every instance add url
                exportedInstancesArray.forEach(instanceName => dataMap[instanceName.trim()] = fileName);
            }
        });

        console.log(dataMap);
    });
})();
