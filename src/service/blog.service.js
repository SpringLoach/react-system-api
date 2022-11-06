const connection = require("../app/database"); // 导入的是期约形式

class BlogService {
  // 添加
  async add(blogInfo) {
    const { userId, title, type, config } = blogInfo;
    const statement = `INSERT INTO blog_list (user_id, title, type, config) VALUES (?, ?, ?, ?);`;
    // 首个元素为结果，结果为数组
    const [result] = await connection.execute(statement, [
      userId,
      title,
      type,
      config,
    ]);

    return result;
  }
  // 查询
  async getBlog(id) {
    const statement = `
    SELECT b.id id, b.user_id user_id, b.title title, b.type type, b.config config, 
    date_format (b.updateAt, '%Y-%m-%d %H:%m:%s') updateTime, ui.nickname nickname FROM blog_list b
    LEFT JOIN user_info ui ON b.user_id = ui.user_id
    WHERE b.id = ?;`;
    // 首个元素为结果，结果为数组
    const [result] = await connection.execute(statement, [id]);
    console.log(11, result);
    return result;
  }
  // 编辑
  async editBlog(blogInfo) {
    const { id, title, type, config } = blogInfo;
    const statement = `UPDATE blog_list SET 
    title = ?,
    type = ?,
    config = ?
    WHERE id = ?;`;
    // 首个元素为结果，结果为数组
    const [result] = await connection.execute(statement, [
      title,
      type,
      config,
      id,
    ]);

    return result;
  }
  // 查询列表
  async list(userId) {
    const statement = `SELECT * FROM blog_list WHERE user_id = ?;`;
    const [result] = await connection.execute(statement, [userId]);
    return result;
  }
}

module.exports = new BlogService();
