import React from 'react';
import { Card } from '@chakra-ui/react';
import TransactionDetails from '../transactionDetails/TransactionDetails';

const Transaction = async ({ transaction }) => {
	return (
		<Card borderColor='gray.200' mb={2}>
			<TransactionDetails transaction={transaction}></TransactionDetails>
		</Card>
	);
};

export default Transaction;
