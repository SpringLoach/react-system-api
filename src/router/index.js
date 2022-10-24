const fs = require("fs");

const useRoutes = function () {
  // 遍历的是文件名称
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === "index.js") return;
    const router = require(`./${file}`);
    this.use(router.routes()); // 注册到服务器实例
    this.use(router.allowedMethods()); // 恰当不支持方法
  });
};

module.exports = useRoutes;
