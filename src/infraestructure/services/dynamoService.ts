import { DynamoDBClient, UpdateTimeToLiveCommand } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

const expire_at = Math.floor((new Date().getTime() + 90 * 24 * 60 * 60 * 1000) / 1000);

interface Item {
  apiId: string;
  response: string;
  created: string;
}

class DynamoDBService {
  private docClient: DynamoDBDocumentClient;
  private tableName: string;

  constructor(tableName: string, region: string = 'us-east-1')  {
    const client = new DynamoDBClient({region });
    this.docClient = DynamoDBDocumentClient.from(client);
    this.tableName = tableName;
  }

  async enableTableTTL(tableName: string, ttlAttributeName: string) {
      const command = new UpdateTimeToLiveCommand({
        TableName: tableName,
        TimeToLiveSpecification: {
          Enabled: true,
          AttributeName: ttlAttributeName,
        },
        });

        try {
            const response = await this.docClient.send(command);
            console.log("TTL enabled successfully:", response);
        } catch (error) {
            console.error("Error enabling TTL:", error);
      }
  }

  async createItem(item: Item, expiryTimestamp): Promise<void> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: {...item, expiryTimestamp: { N: expiryTimestamp.toString() } }
    });
    await this.docClient.send(command);
  }

  async getItem(id: string): Promise<Item | undefined> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: { apiId: id },
    });
    const { Item } = await this.docClient.send(command);
    return Item as Item | undefined;
  }

  async updateItem(id: string, updates: Partial<Item>): Promise<void> {
    const updateExpressionParts: string[] = [];
    const expressionAttributeValues: Record<string, any> = {};

    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        updateExpressionParts.push(`${key} = :${key}`);
        expressionAttributeValues[`:${key}`] = (updates as any)[key];
      }
    }

    const command = new UpdateCommand({
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: `SET ${updateExpressionParts.join(", ")}`,
      ExpressionAttributeValues: expressionAttributeValues,
    });
    await this.docClient.send(command);
  }

  async deleteItem(id: string): Promise<void> {
    const command = new DeleteCommand({
      TableName: this.tableName,
      Key: { id },
    });
    await this.docClient.send(command);
  }
}

// Usage example:
// const myService = new DynamoDBService("YourTableName");
// async function run() {
//   await myService.createItem({ id: "123", name: "Test Item" });
//   const item = await myService.getItem("123");
//   console.log(item);
//   await myService.updateItem("123", { name: "Updated Item" });
//   await myService.deleteItem("123");
// }
// run();

export default DynamoDBService;