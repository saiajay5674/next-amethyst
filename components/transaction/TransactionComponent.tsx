import React from 'react';
import { Card } from '@chakra-ui/react';
import TransactionDetails from '../transactionDetails/TransactionDetails';
import { Transaction } from '@/app/models/transaction';

interface TransactionComponentProps {
	transaction: Transaction;
}
const TransactionComponent = async (props: TransactionComponentProps) => {
	const { transaction } = props;
	return (
		<Card borderColor='gray.200' mb={2}>
			<TransactionDetails transaction={transaction}></TransactionDetails>
		</Card>
	);
};

export default TransactionComponent;
