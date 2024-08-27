import { CountryCode, LinkTokenCreateRequest, Products } from 'plaid';
import plaidClient from '../../clients/plaid';
import { NextResponse } from 'next/server';

// PLAID_PRODUCTS is a comma-separated list of products to use when initializing
// Link. Note that this list must contain 'assets' in order for the app to be
// able to create and retrieve asset reports.
const PLAID_PRODUCTS = [Products.Transactions];

// PLAID_COUNTRY_CODES is a comma-separated list of countries for which users
// will be able to select institutions from.
const PLAID_COUNTRY_CODES = [CountryCode.Us];

// Set PLAID_REDIRECT_URI to 'http://localhost:3000'
// The OAuth redirect flow requires an endpoint on the developer's website
// that the bank website should redirect to. You will need to configure
// this redirect URI for your client ID through the Plaid developer dashboard
// at https://dashboard.plaid.com/team/api.
const PLAID_REDIRECT_URI = process.env.PLAID_REDIRECT_URI || 'http://localhost:3000';

export const POST = async (req: Request) => {
	// Parse the request body to extract user data
	const { userId } = await req.json();

	const request: LinkTokenCreateRequest = {
		user: {
			client_user_id: userId,
		},
		client_name: 'Amethyst',
		products: PLAID_PRODUCTS,
		country_codes: PLAID_COUNTRY_CODES,
		language: 'en',
		redirect_uri: PLAID_REDIRECT_URI,
		webhook: 'https://41a4-71-190-236-168.ngrok-free.app/api/plaid/transactions',
	};

	const response = await plaidClient.linkTokenCreate(request);

	return NextResponse.json(response.data);
};
