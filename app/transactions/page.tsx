import React from 'react';
import Transaction from '../../components/transaction/Transaction';
import { Box, Heading, Text } from '@chakra-ui/react';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/utils/session';
import { jwtVerify } from 'jose';
import { JWT_SECRET } from '../constants/secret';
import { redirect } from 'next/navigation';
import { Page } from '../constants/page';

const TransactionsPage = async () => {
	const transactions = await getTransactions();

	// Group transactions by date
	const transactionsByDate = transactions.reduce((acc: Record<string, any[]>, transaction: any) => {
		const date = new Date(transaction.date).toDateString();
		if (!acc[date]) {
			acc[date] = [];
		}
		acc[date].push(transaction);
		return acc;
	}, {});

	return (
		<Box mt='20px'>
			{Object.keys(transactionsByDate).map((date) => (
				<Box key={date} mb='20px'>
					<Text as='h3' size='sm' mb='10px'>
						{date}
					</Text>
					{transactionsByDate[date].map((transaction, index) => (
						<Transaction key={index} transaction={transaction} />
					))}
				</Box>
			))}
		</Box>
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
