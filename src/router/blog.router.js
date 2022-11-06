const Router = require("koa-router");
const {
  add,
  getBlog,
  editBlog,
  list,
  right,
  getRight,
} = require("../controller/blog.controller");
const { verifyAuth, verifyBlog } = require("../middleware/auth.middleware");

const blogRouter = new Router({ prefix: "/blog" });

// 添加
blogRouter.post("/add", verifyAuth, verifyBlog, add);

// 获取
blogRouter.get("/query", verifyAuth, verifyBlog, getBlog);

// 编辑
blogRouter.post("/edit", verifyAuth, verifyBlog, editBlog);

// 查询列表
blogRouter.post("/list", verifyAuth, verifyBlog, list);

// 查看权限
blogRouter.get("/viewRight", verifyAuth, verifyBlog, getRight);

// 编辑权限
blogRouter.post("/right", verifyAuth, right);

module.exports = blogRouter;
