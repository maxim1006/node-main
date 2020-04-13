// сервер без экспресс
// require('./modules/first-server/first-server').startFirstServer();


// сервер с экспресс

// это не нужно так как экспресс
// const http = require("http");


const path = require("path");


const express = require("express");
const app = express();
const bodyParser = require("body-parser");



const routes = require('./routes');
const {db} = require('./utils');
const {dbUserModel} = require('./models');


// так храню гбобальные переменные приложения и забираю их
// Есть зарезервированные переменные типо view engine или views которые используются для авто конвертации вью в темплейт

// пример использования template engine: pug
app.set('view engine', 'ejs');
// говорю что вью лежат в папке views, закомментировал, тк по умолчанию и так /views
// app.set('views', 'views');
// затем использую  .render метод чтобы отрендерить вью, пример:
// router.get('/', (req, res, next) => {
//     res.render('shop');
// });


// пример переменной
// app.set('appSetVariable', 'appSetVariableValue');
// console.log(app.get('appSetVariable'));

// главная папка проекта
// console.log(path.join(process.cwd()));



// Если хочу middleware который выполняется перед всеми то просто пихаю его выше всех и добавляю next()
// так добавляю в экспресс middleware, который будет выполнен для каждого входящего реквеста, top to bottom
// app.use((req, res, next) => {
//     console.log("first middleware");
//
//     // передаю управление следующему миддлверу, если не передам все зависнет или могу послать респонс
//     next();
// });


// использую body-parser для парсинга req.body из формы с urlencoded форматом
// extended=false is a configuration option that tells the parser to use the classic encoding
app.use(bodyParser.urlencoded({extended: false}));

// так сервлю статические файлы к примеру по пути /styles/main.css
app.use(express.static(path.join(__dirname, "public")));

// Routes
// теперь ко всем запросам в путях routes.admin добавится /admin/
app.use('/admin', routes.admin.router);
// app.use(routes.admin.router);

app.use('/users', (req, res, next) => {
    res.send(`<h1>Users Page</h1>`);
});

// получаю юзера в этом middleware и могу поиметь его где угодно
app.use(async (req, res, next) => {
    try {
        const user = await dbUserModel.User.findById('5cb561341c9d440000fd0d6b');

        req.user = new dbUserModel.User(user);
    } catch (e) {
        console.log('app.js User.findById error ', e);
    }

    next();
});

app.use(routes.cart);

app.use(routes.shop);

app.use(routes.pageNotFound);




// вместо этих 2х строк использую .listen от express
// const server = http.createServer(app);
// server.listen(4000);

db.mongoConnect(_ => {
    app.listen(4000);
});




