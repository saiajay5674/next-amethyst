import { Box } from '@chakra-ui/react';
import React from 'react';
import PlaidLinkButton from '../components/plaid-link-button/PlaidLinkButton';
import { SESSION_COOKIE_NAME } from '../utils/session';
import { redirect } from 'next/navigation';
import { Page } from '../constants/page';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const HomePage: React.FC = async () => {
	const linkToken = await fetchLinkToken();

	return (
		<Box>
			<h1>Welcome to Home Page</h1>
			<PlaidLinkButton linkToken={linkToken} />
		</Box>
	);
};

// Fetch the link token
async function fetchLinkToken(): Promise<string> {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

	const session = cookies().get(SESSION_COOKIE_NAME);

	let userId;
	if (session) {
		try {
			const jwtSecret = process.env.JWT_SECRET_KEY;
			const secret = new TextEncoder().encode(jwtSecret);
			const { payload } = await jwtVerify(session.value, secret);
			userId = payload.userId;
		} catch (error) {
			console.log('Failed to verify JWT:', error);
			redirect(Page.SIGNIN);
		}
	} else {
		redirect(Page.SIGNIN);
	}

	const result = await fetch(`${baseUrl}/api/plaid/linkToken`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ userId }),
		cache: 'no-store',
	});

	if (!result.ok) {
		throw new Error('Failed to fetch link token');
	}

	const data = await result.json();
	return data.link_token;
}

export default HomePage;
