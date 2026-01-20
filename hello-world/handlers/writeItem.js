const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

async function writeItem() {
  await dynamo.put({
    TableName: process.env.TABLE_NAME,
    Item: {
      id: Date.now().toString(),
      ttl: Math.floor(Date.now() / 1000) + 3600
    }
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "CI/CD working" })
  };
}

module.exports = writeItem;
