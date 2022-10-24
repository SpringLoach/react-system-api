const Router = require("koa-router");

const heroRouter = new Router({ prefix: "/hero" });

const { list } = require("../controller/hero.controller");

const { verifyAuth } = require("../middleware/auth.middleware");

heroRouter.post("/list", verifyAuth, list);

module.exports = heroRouter;
