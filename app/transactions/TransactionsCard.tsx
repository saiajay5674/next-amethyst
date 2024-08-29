import React from 'react';

import { Box, Card, Center, Icon, Text } from '@chakra-ui/react';
import TransactionComponent from '@/components/transaction/TransactionComponent';
import { Transaction } from '../models/transaction';
import { MdOutlineCreditCardOff } from 'react-icons/md'; // Example icon for no transactions

interface TransactionsCardProps {
	transactions: Transaction[];
}

const TransactionsCard = ({ transactions }: TransactionsCardProps) => {
	// Group transactions by date
	const transactionsByDate = transactions.reduce((acc: Record<string, any[]>, transaction: any) => {
		const date = new Date(transaction.date).toDateString();
		if (!acc[date]) {
			acc[date] = [];
		}
		acc[date].push(transaction);
		return acc;
	}, {});

	const isEmpty = transactions.length === 0;

	return (
		<Card
			mb={2}
			m={10}
			p={1}
			justifyContent='center'
			border={isEmpty ? 'none' : 'shadow'}
			bg={isEmpty ? 'gray.50' : 'white'}>
			{isEmpty ? (
				<Center flexDirection='column' textColor='gray.500'>
					<Icon as={MdOutlineCreditCardOff} boxSize={20} mb={4} />
					<Text>No transactions available</Text>
				</Center>
			) : (
				<Box flex='1' width='100%'>
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
				</Box>
			)}
		</Card>
	);
};

export default TransactionsCard;
