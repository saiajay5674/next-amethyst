import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';

const config: Configuration = new Configuration({
	basePath: PlaidEnvironments[PLAID_ENV],
	baseOptions: {
		headers: {
			'PLAID-CLIENT-ID': '5f13bccaf567db001253a4fd', //sanbox
			'PLAID-SECRET': '35533f70f935a9723c6a4445d90a26',
			'Plaid-Version': '2020-09-14',
		},
	},
});

const plaidClient = new PlaidApi(config);

export default plaidClient;
