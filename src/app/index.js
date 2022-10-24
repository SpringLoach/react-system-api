const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const errorHandler = require("./error-handle"); // 添加
const useRoutes = require("../router");

const app = new Koa();

app.useRoutes = useRoutes;

app.use(bodyParser()); // 用于解析JSON
app.useRoutes();
app.on("error", errorHandler); // 添加

module.exports = app;
