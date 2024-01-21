import { getLeaderboard } from '$lib/server/dynamodb';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const result = await getLeaderboard();

	return { leaderBoard: result };
};
