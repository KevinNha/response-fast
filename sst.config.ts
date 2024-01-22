import type { SSTConfig } from 'sst';
import { SvelteKitSite, Table } from 'sst/constructs';

export default {
	config(_input) {
		return {
			name: 'responsefast',
			region: 'us-east-1',
			profile: 'responsefast'
		};
	},
	stacks(app) {
		app.stack(function Site({ stack }) {
			const dynamoDB = new Table(stack, 'Leaderboard', {
				fields: {
					uuid: 'string',
					responseTime: 'string'
				},
				primaryIndex: { partitionKey: 'uuid', sortKey: 'responseTime' }
			});
			const site = new SvelteKitSite(stack, 'site', {
				bind: [dynamoDB]
			});
			stack.addOutputs({
				url: site.url
			});
		});
	}
} satisfies SSTConfig;
