import React from 'react';
import Transaction from '../../components/transaction/Transaction';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/utils/session';
import { jwtVerify } from 'jose';
import { JWT_SECRET } from '../constants/secret';
import { redirect } from 'next/navigation';
import { Page } from '../constants/page';
import TransactionsComponent from './Transactions';
import { Grid } from '@chakra-ui/react';

const TransactionsPage = async () => {
	const transactions = await getTransactions();

	return (
		<Grid>
			<TransactionsComponent transactions={transactions} />
		</Grid>
	);
};

export async function getTransactions() {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
	const session = cookies().get(SESSION_COOKIE_NAME);

	let userId;
	if (session) {
		try {
			const secret = new TextEncoder().encode(JWT_SECRET);
			const { payload } = await jwtVerify(session.value, secret);
			userId = payload.userId;
		} catch (error) {
			console.log('Failed to verify JWT:', error);
			redirect(Page.SIGNIN);
		}
	} else {
		redirect(Page.SIGNIN);
	}

	const response = await fetch(`${baseUrl}/api/users/${userId}/transactions`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});

	if (!response.ok) {
		throw new Error('Failed to fetch transactions');
	}

	return response.json();
}

export default TransactionsPage;
