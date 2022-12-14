const crypto = require("crypto");

const md5password = (password) => {
  const md5 = crypto.createHash("md5"); // 选择加密方式
  const result = md5.update(password).digest("hex");
  return result;
};

module.exports = md5password;
