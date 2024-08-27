'use client';

import { Box, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import PlaidLinkButton from '../components/plaid-link-button/PlaidLinkButton';
import { getSession } from '../utils/session';
import { useRouter } from 'next/navigation';
import { Page } from './constants/page';

interface Session {
	userId: string;
	emailAddress: string;
}

const HomePage: React.FC = () => {
	const router = useRouter();
	const [linkToken, setLinkToken] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		const loadSession = async () => {
			try {
				const sessionData = await getSession();
				if (!sessionData) {
					router.push(Page.SIGNIN);
				} else {
					setSession(sessionData);
				}
			} finally {
				setLoading(false);
			}
		};

		loadSession();
	}, []);

	useEffect(() => {
		if (session) {
			const fetchAndSetLinkToken = async () => {
				const token = await fetchLinkToken(session.userId);
				setLinkToken(token);
			};

			fetchAndSetLinkToken();
		}
	}, [session]);

	if (loading) {
		return (
			<Box>
				<Spinner size='xl' />
				<Text>Loading...</Text>
			</Box>
		);
	}

	return (
		<Box>
			<h1>Welcome to Home Page</h1>
			<PlaidLinkButton linkToken={linkToken} />
		</Box>
	);
};

// Fetch the link token
export async function fetchLinkToken(userId: string): Promise<string> {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

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
