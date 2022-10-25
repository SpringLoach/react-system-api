const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const errorHandler = require("./error-handle"); // 添加
const useRoutes = require("../router");
const cors = require("koa2-cors");

const app = new Koa();

app.useRoutes = useRoutes;

app.use(
  cors({
    origin: "*", // 允许来自指定域名请求
    maxAge: 5, // 本次预检请求的有效期，单位为秒。
    methods: ["GET", "POST"], // 所允许的HTTP请求方法
    alloweHeaders: ["Conten-Type"], // 服务器支持的所有头信息字段
    credentials: true, // 是否允许发送Cookie
  })
);

app.use(bodyParser()); // 用于解析JSON
app.useRoutes();
app.on("error", errorHandler); // 添加

module.exports = app;
