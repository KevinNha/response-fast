    import { json } from "@sveltejs/kit"
    import { Table } from 'sst/node/table';
	import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';

/** @type {import('./$types').RequestHandler} */
export async function POST() {
    const db = new DynamoDBClient();
    const updateInput = new UpdateItemCommand({
        TableName: Table.Ranking.tableName,
        Key: {
            "nickname": {
                "S": "abcde"
            }
        },
        UpdateExpression: "SET responseTime = :time",
        ExpressionAttributeValues: {
            ":time": {
                "S": "10"
            },
        }
    });
    console.log(updateInput)
    const result = await db.send(updateInput)
    return json({result}, {status: 200})
}
