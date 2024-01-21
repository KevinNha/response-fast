import { DynamoDBClient, ScanCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { Table } from 'sst/node/table';

import { v4 as uuidv4 } from 'uuid';

const NUMBER_OF_LEADERBOARD_ITEMS_TO_SHOW = 10;

const db = new DynamoDBClient();

export const getLeaderboard = async () => {
	const tableName = Table.Leaderboard.tableName;

	const scanParam = new ScanCommand({
		TableName: tableName
	});

	const scanResult = await db.send(scanParam);
	if (scanResult.Items && scanResult.Items.length > 0) {
		scanResult.Items.length = NUMBER_OF_LEADERBOARD_ITEMS_TO_SHOW;

		const unmarshalledData = scanResult.Items.map((item) => {
			return unmarshall(item);
		});

		return unmarshalledData;
	}

	return [];
};

export const updateLeaderboard = async (nickName: string, responseTime: string) => {
	console.log(uuidv4());
	const updateInput = new UpdateItemCommand({
		TableName: Table.Leaderboard.tableName,
		Key: {
			uuid: {
				S: uuidv4()
			},
			responseTime: {
				S: responseTime
			}
		},
		UpdateExpression: 'SET nickname = :name',
		ExpressionAttributeValues: {
			':name': {
				S: nickName
			}
		}
	});
	console.log(updateInput);
	return await db.send(updateInput);
};
