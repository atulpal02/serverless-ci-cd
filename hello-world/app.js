const writeItem = require("./handlers/writeItem");

exports.lambdaHandler = async () => {
  return await writeItem();
};
