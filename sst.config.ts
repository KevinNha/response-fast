import type { SSTConfig } from "sst";
import { SvelteKitSite, Table } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "response-fast",
      region: "us-east-1",
      profile: "default",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const dynamoDB = new Table(stack, "Ranking", {
        fields: {
          nickname: "string",
        },
        primaryIndex: { partitionKey: "nickname"}
      });
      const site = new SvelteKitSite(stack, "site", {
        bind: [dynamoDB]
      });
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
