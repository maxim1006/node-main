const http = require("http");
const path = require("path");
const fs = require("fs");

console.log(process.env.PORT);
const pageNotFoundPath = path.join(__dirname, "public/not-found.html");
const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
    console.log(req.url);

    if (req.url === "/") {
        req.url = "/index.html"
    }

    let pagePath = path.join(__dirname, "public", req.url);
    let ext = path.extname(pagePath);
    let contentType = "text/html";

    // добавляю расширение если вдруг его нет
    if (!ext) {
        pagePath += ".html";
    }

    // проверяю на content-type
    switch (ext) {
        case(".css"): {
            contentType = "text/css";
            break;
        }

        case(".js"): {
            contentType = "text/javascript";
            break;
        }

        default: {
            contentType = "text/html";
        }
    }

    res.writeHead(200, {
        'Content-type': contentType
    });

    resPage({pagePath, res, contentType});
});

server.listen(PORT, () => {console.log(`Server started on port ${PORT}`);});

// helpers
function resPage({pagePath, res, contentType}) {
    fs.readFile(pagePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(404, {
                'Content-type': contentType
            });

            resPage({pagePath: pageNotFoundPath, res});
        } else {
            res.end(data);
        }
    })
}
