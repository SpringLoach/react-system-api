const connection = require("../app/database"); // 导入的是期约形式

class ProvinceService {
  // 查询省份列表
  async list() {
    const statement = `SELECT DISTINCT province name FROM province;`;
    const [result] = await connection.execute(statement, []);
    return result;
  }
  // 查询省份的市区列表
  async getCity(province) {
    const statement = `SELECT * FROM province WHERE province = ?;`;
    const [result] = await connection.execute(statement, [province]);
    return result;
  }
}

module.exports = new ProvinceService();
