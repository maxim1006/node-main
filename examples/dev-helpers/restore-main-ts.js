// MUI builder removes data from main.ts to create plugins, hence we need to return it

const fs = require("fs");
const path = require("path");

fs.writeFileSync(path.resolve("./rktn-fragments/src/main.ts"), `
    Some files
`);
