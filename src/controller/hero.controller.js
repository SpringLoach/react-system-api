const HeroService = require("../service/hero.service");

class HeroController {
  // 查询列表
  async list(ctx, next) {
    const query = ctx.request.body;
    const data = await HeroService.getHeroList(query);
    ctx.body = data;
  }
}

module.exports = new HeroController();
