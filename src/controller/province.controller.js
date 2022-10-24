const provinceService = require("../service/province.service");

class ProvinceController {
  async list(ctx, next) {
    // 查询数据
    const result = await provinceService.list();

    // 返回数据
    ctx.body = result;
  }
  async getCity(ctx, next) {
    // 查询数据
    const { province } = ctx.query;
    const result = await provinceService.getCity(province);

    // 返回数据
    ctx.body = result;
  }
}

module.exports = new ProvinceController();
