const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand
} = require("@aws-sdk/lib-dynamodb");
const { randomUUID } = require("crypto");

const client = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(client);

exports.lambdaHandler = async () => {
  const tableName = process.env.TABLE_NAME;

  const item = {
    id: randomUUID(),
    message: "Hello from DynamoDB 🚀",
    createdAt: new Date().toISOString()
  };

  // Write item
  await ddb.send(
    new PutCommand({
      TableName: tableName,
      Item: item
    })
  );

  // Read items
  const data = await ddb.send(
    new ScanCommand({
      TableName: tableName
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      inserted: item,
      allItems: data.Items
    })
  };
};
