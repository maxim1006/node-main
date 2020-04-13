const fs = require("fs");
const path = require("path");

// проверить есть ли папки и создать файл
if (!fs.existsSync(`./dist/test`)) {
    fs.mkdirSync(`./dist/test`, { recursive: true });
}

// прочитать файл
const pathRead = path.join(__dirname, "../files/readFile.js");
const pathWrite = path.join(__dirname, "../files/writeFile.js");
const mainTsData = fs.readFileSync(pathRead, "utf8");
// записать файл
fs.writeFileSync(pathWrite, mainTsData);


// скопировать файл
// function copy(from, to) {
//     fs.copyFile(from, to, (err) => {
//         if (err) throw err;
//         console.log(`${from} was copied to ${to}`);
//     });
// }

// читать файл
function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);

            console.log(data);
        });
    });
}

readFile("./examples/files/readFile.js")

// заменить инфо в файле по регэкспу
function replace(filePath, searchRegex, replaceString) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);

            const result = data.replace(searchRegex, replaceString);

            fs.writeFile(filePath, result, 'utf8', (err) => {
                if (err) reject(err);

                resolve();
            });
        });
    });
}

// переместить файл
function move(from, to) {
    return new Promise((resolve, reject) => {
        fs.rename(
            path.resolve(from),
            path.resolve(to),
            (err) => {
                if (err) reject('ERROR: ' + err);
                resolve();
            });
    });
}

