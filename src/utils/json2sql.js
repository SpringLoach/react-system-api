const target = require("./d.js");

const fs = require("fs");

target.forEach((item) => {
  const content = `\r\nINSERT INTO province (province, name, postCode) VALUES ('${item.province}', '${item.name}', '${item.id}');`;
  fs.writeFile("./a.js", content, { flag: "a" }, (err) => {
    console.log(err);
  });
});
