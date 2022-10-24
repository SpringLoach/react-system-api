const Router = require("koa-router");
const {
  create,
  getInfo,
  addInfo,
  editInfo,
  setInfo,
} = require("../controller/user.controller");
const { verifyUser, handlePassword } = require("../middleware/user.middleware");
const { verifyAuth } = require("../middleware/auth.middleware");

const userRouter = new Router({ prefix: "/users" });

// 注册
userRouter.post("/", verifyUser, handlePassword, create);

// 获取用户信息
userRouter.get("/getInfo", verifyAuth, getInfo);

// 添加用户信息
userRouter.post("/addInfo", verifyAuth, addInfo);

// 编辑用户信息
userRouter.post("/editInfo", verifyAuth, editInfo);

// 动态处理用户信息（无-编辑，有-添加）
userRouter.post("/setInfo", verifyAuth, setInfo);

module.exports = userRouter;
