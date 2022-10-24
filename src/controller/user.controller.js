const userService = require("../service/user.service");

class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body;

    // 查询数据
    const result = await userService.create(user);

    // 返回数据
    ctx.body = result;
  }
  async getInfo(ctx, next) {
    // 获取用户信息
    const { id: userId } = ctx.user;
    // 查询数据
    const result = await userService.getInfo(userId);
    // 返回数据
    if (result.length) {
      ctx.body = result[0];
    } else {
      ctx.body = null;
    }
  }
  async addInfo(ctx, next) {
    // 获取用户请求传递的参数
    const userInfo = ctx.request.body;
    userInfo.userId = ctx.user.id;

    // 查询数据
    const result = await userService.addInfo(userInfo);
    // 返回数据
    ctx.body = result;
  }
  async editInfo(ctx, next) {
    // 获取用户请求传递的参数
    const userInfo = ctx.request.body;
    userInfo.userId = ctx.user.id;

    // 查询数据
    const result = await userService.editInfo(userInfo);
    console.log(222, result);
    // 返回数据
    ctx.body = result;
  }
  async setInfo(ctx, next) {
    // 查询是否有记录
    const { id: userId } = ctx.user;
    const res = await userService.getInfo(userId);
    // 获取请求参数，判断操作类型
    const userInfo = ctx.request.body;
    console.log("---------", ctx.user);
    userInfo.userId = ctx.user.id;
    let result;
    if (!res.length) {
      result = await userService.addInfo(userInfo);
    } else {
      result = await userService.editInfo(userInfo);
    }
    console.log("result", result);
    // 返回数据
    ctx.body = result;
  }
}

module.exports = new UserController();
