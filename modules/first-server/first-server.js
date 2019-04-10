// headers
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
const http = require('http');
const fs = require('fs');

const startFirstServer = () => {

    const server = http.createServer((req, res) => { // коллбек в createServer выполняется каждый раз для каждого запроса
        // console.log(req.url, req.method, req.headers);

        // так могу закончить процесс для event loop
        // process.exit();

        res.setHeader('Content-Type', 'text/html');

        // name в инпуте нужен чтобы приходили ключ значения, message= ...
        if (req.url === "/") {
            res.write(
                `
            <html>
            <header><title>My page</title></header>
            <body>
            
            <form action="/message" method="post">
            <input type="text" name="message"><button type="submit">Send message</button></form>
</body>
</html>
        `
            );
            return res.end(); // заканчиваю респонс
        }

        if (req.url === "/message" && req.method === "POST") {
            const body = [];

            req.on("data", (chunk) => {
                body.push(chunk); // так получаю чанки
            });

            return req.on("end", () => {
                const parsedBody = Buffer.concat(body).toString(); // на конец получения превращаю их в строку
                const message = parsedBody.split("=")[1];
                fs.writeFile("message.txt", message, (err) => {
                    res.statusCode = 302; // redirect
                    res.setHeader("Location", "/");
                    return res.end();
                });
            });
        }

        res.write(
            `
            <html>
            <header><title>My page</title></header>
            <body>My body</body>
</html>
        `
        );
        res.end(); // заканчиваю респонс
    });

    server.listen(4000);
};

module.exports = { startFirstServer };
// exports.startFirstServer = startFirstServer;
