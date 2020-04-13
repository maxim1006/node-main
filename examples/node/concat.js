const concat = require("concat");
const shell = require('shelljs');

(async function build() {

    const files = [
        "./examples/files/concat/concat1.css",
        "./examples/files/concat/concat2.css",
    ];

    await concat(files, "./examples/files/concat/main.css");

    shell.exec(`cleancss --inline 'none' -o ./examples/files/concat/main.min.css ./examples/files/concat/main.css`, () => {
        console.log("concatenated and minified");
    });

})();

// после конкатенирования удаляю ересь и минифинцирую c помощью npm i  clean-css-cli
// cleancss --inline 'none' -o ./examples/files/concat/main.min.css ./examples/files/concat/main.css"
