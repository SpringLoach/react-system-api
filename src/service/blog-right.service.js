const connection = require("../app/database"); // 导入的是期约形式

class BlogService {
  // 查询
  async getBlog() {
    const statement = `SELECT * FROM jurisdiction_list WHERE id = 1;`;
    // 首个元素为结果，结果为数组
    const [result] = await connection.execute(statement, []);
    console.log(11, result);
    return result[0];
  }
  // 编辑
  async editBlog(data) {
    const statement = `UPDATE jurisdiction_list SET name = ? WHERE id = 1;`;
    // 首个元素为结果，结果为数组
    const [result] = await connection.execute(statement, [data]);

    return result;
  }
}

module.exports = new BlogService();
