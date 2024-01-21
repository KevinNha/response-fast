import { json } from '@sveltejs/kit';
import { updateLeaderboard } from '$lib/server/dynamodb.js';

// TODO implement get function
export async function GET() {}

export async function POST({ request }) {
	const { nickName, responseTime } = await request.json();
	const updateResult = updateLeaderboard(nickName, responseTime);
	return json({ updateResult }, { status: 200 });
}
