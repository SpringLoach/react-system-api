const Router = require("koa-router");
const { list, getCity } = require("../controller/province.controller");

const provinceRouter = new Router({ prefix: "/province" });

provinceRouter.get("/list", list);
provinceRouter.get("/city", getCity);

module.exports = provinceRouter;
