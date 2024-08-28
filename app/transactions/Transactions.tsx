import React from 'react';

import { Card } from '@chakra-ui/react';
import { Box, Divider, Heading, Text } from '@chakra-ui/react';
import TransactionComponent from '@/components/transaction/TransactionComponent';
import { Transaction } from '../models/transaction';

interface TransactionsComponentProps {
	transactions: Transaction[];
}

const TransactionsComponent = (props: TransactionsComponentProps) => {
	const { transactions } = props;

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
		<Card mb={2} m={10} p={1}>
			{Object.keys(transactionsByDate).map((date) => (
				<Box key={date} my={5} mx={8}>
					<Text as='h3' size='sm' textColor='gray.500' py={1}>
						{date}
					</Text>
					{transactionsByDate[date].map((transaction, index) => (
						<TransactionComponent key={index} transaction={transaction} />
					))}
				</Box>
			))}
		</Card>
	);
};

export default TransactionsComponent;
