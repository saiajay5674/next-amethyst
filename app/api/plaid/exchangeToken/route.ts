import { ItemPublicTokenExchangeRequest } from 'plaid';
import plaidClient from '../../clients/plaid';
import { NextResponse } from 'next/server';
import * as accounts from '../../handler/accounts.handler';
import * as users from '../../handler/users.handler';

import mongoDbClient from '../../clients/mongoDb';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '../../../../utils/session';

export const POST = async (req: Request) => {
	// Parse the request body to extract user data
	const { public_token } = await req.json();

	if (!public_token) {
		return NextResponse.json({ error: 'Failure missing public token' }, { status: 400 });
	}

	const request: ItemPublicTokenExchangeRequest = {
		public_token,
	};

	const response = await plaidClient.itemPublicTokenExchange(request);
	// add logic for extracting header here
	const user = await users.getUserFromSession(cookies().get(SESSION_COOKIE_NAME)?.value);

	if (!user) {
		return NextResponse.json({ error: 'Failed to find authenticated user' }, { status: 403 });
	}

	await accounts.saveAccountForUser({
		userId: user.userId,
		accessToken: response.data.access_token,
		itemId: response.data.item_id,
	});

	return NextResponse.json({ message: 'Success' });
};
