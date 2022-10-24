const connection = require("../app/database"); // 导入的是期约形式

class UserService {
  // 插入记录
  async create(user) {
    const { name, password } = user;
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;
    const result = await connection.execute(statement, [name, password]);

    return result;
  }
  // 查询记录-防重
  async getUserByName(name) {
    const statement = `SELECT u.id id, u.name name, u.password password, ui.nickname nickname, ui.avatar avatar FROM user u
    LEFT JOIN user_info ui ON u.id = ui.user_id
    WHERE name = ?;`;
    // 首个元素为结果，结果为数组
    const [result] = await connection.execute(statement, [name]);

    return result;
  }
  // 查询详细信息
  async getInfo(userId) {
    const statement = `SELECT * FROM user_info WHERE user_id = ?;`;
    // 首个元素为结果，结果为数组
    const [result] = await connection.execute(statement, [userId]);

    return result;
  }
  // 添加详细信息
  async addInfo(userInfo) {
    const {
      userId,
      nickname,
      avatar,
      email,
      profile,
      country,
      province,
      area,
      address,
      telephone,
    } = userInfo;
    const statement = `INSERT INTO user_info (
      user_id,
      nickname,
      avatar,
      email,
      profile,
      country,
      province,
      area,
      address,
      telephone
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    console.log(222222, userInfo);
    // 首个元素为结果，结果为数组
    const [result] = await connection.execute(statement, [
      userId,
      nickname,
      avatar,
      email,
      profile,
      country,
      province,
      area,
      address,
      telephone,
    ]);
    console.log(222222, result);

    return result;
  }
  // 编辑详细信息
  async editInfo(userInfo) {
    const {
      userId,
      nickname,
      avatar,
      email,
      profile,
      country,
      province,
      area,
      address,
      telephone,
    } = userInfo;
    console.log("userId", userInfo);
    const statement = `UPDATE user_info SET
    nickname = ?,
    avatar = ?,
    email = ?,
    profile = ?,
    country = ?,
    province = ?,
    area = ?,
    address = ?,
    telephone = ?
    WHERE user_id = ?;`;
    // 首个元素为结果，结果为数组
    const [result] = await connection.execute(statement, [
      nickname,
      avatar,
      email,
      profile,
      country,
      province,
      area,
      address,
      telephone,
      userId,
    ]);

    return result;
  }
}

module.exports = new UserService();
