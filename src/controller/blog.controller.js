const blogService = require("../service/blog.service");
const blogRightService = require("../service/blog-right.service");

const errorTypes = require("../constants/error-types");

class BlogController {
  async add(ctx, next) {
    // 获取参数
    const blogInfo = ctx.request.body;
    blogInfo.userId = ctx.user.id;
    console.log(222, blogInfo);
    // 查询数据
    const result = await blogService.add(blogInfo);
    // 返回数据
    ctx.body = result;
  }
  async getBlog(ctx, next) {
    // 获取参数
    const { id: userId } = ctx.user;
    console.log(2222, ctx.user);
    const { id } = ctx.query;
    // 查询数据
    const result = await blogService.getBlog(id);
    // 返回数据
    if (result[0] && result[0].user_id === userId) {
      ctx.body = result[0];
    } else {
      ctx.body = "没有权限";
    }
  }
  async editBlog(ctx, next) {
    // 获取参数
    const { id: userId } = ctx.user;
    const blogInfo = ctx.request.body;

    // 查询数据
    const result = await blogService.getBlog(blogInfo.id);
    if (result[0] && result[0].user_id !== userId) {
      ctx.body = "没有权限";
      return;
    }
    const result2 = await blogService.editBlog(blogInfo);
    // 返回数据
    ctx.body = result2;
  }
  async list(ctx, next) {
    // 获取参数
    const { id: userId } = ctx.user;

    // 查询数据
    const result = await blogService.list(userId);

    // 返回数据
    ctx.body = result;
  }
  // 修改能够编辑博客的权限
  async right(ctx, next) {
    // 获取参数
    const { name } = ctx.user;
    const { nameList } = ctx.request.body;

    if (name !== "master") {
      const error = new Error(errorTypes.USER_REQUIRE_RIGHT);
      ctx.app.emit("error", error, ctx);
      return;
    }

    // 查询数据
    const result = await blogRightService.editBlog(nameList);

    // 返回数据
    ctx.body = result;
  }
  // 修改能够编辑博客的权限
  async getRight(ctx, next) {
    // 获取参数

    // 查询数据
    const result = await blogRightService.getBlog();

    // 返回数据
    ctx.body = result;
  }
}

module.exports = new BlogController();
