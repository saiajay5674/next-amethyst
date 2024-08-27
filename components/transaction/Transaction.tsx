import React from 'react';
import { Card } from '@chakra-ui/react';
import TransactionDetails from '../transactionDetails/TransactionDetails';

const Transaction = async ({ transaction }) => {
	return (
		<Card border='1px solid' borderColor='gray.300' borderRadius='lg' mb={2}>
			<TransactionDetails transaction={transaction}></TransactionDetails>
		</Card>
	);
};

export default Transaction;
