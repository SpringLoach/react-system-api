const connection = require("../app/database"); // 导入的是期约形式

class HeroService {
  // 查询记录-防重
  async getHeroList(query) {
    const {
      pageNum = 1,
      pageSize = 10,
      cname,
      skinName,
      title,
      occupation,
    } = query;
    const offset = (pageNum - 1) * pageSize;

    let query1 = "hero_list";
    let queryAdd = "";
    let query2 = "";
    let haveOtherParams = false;
    ["cname", "skinName", "title", "occupation"].forEach((item) => {
      if (query[item]) {
        haveOtherParams = true;
        queryAdd += ` && ${item} LIKE '%${query[item]}%'`;
      }
    });
    if (haveOtherParams) {
      query1 = `(SELECT * FROM hero_list WHERE 1 = 1 ${queryAdd}) total_query`;
      query2 = ` WHERE 1 = 1 ${queryAdd}`;
    }

    const statement = `SELECT * FROM ${query1} LIMIT ?, ?;`;
    const statement2 = `SELECT COUNT(*) total FROM hero_list${query2};`;
    console.log(statement);
    // 首个元素为结果，结果为数组
    const [result] = await connection.execute(statement, [
      String(offset),
      String(pageSize),
    ]);
    const [result2] = await connection.execute(statement2);
    return {
      data: result,
      total: result2[0].total,
    };
  }
}

module.exports = new HeroService();
