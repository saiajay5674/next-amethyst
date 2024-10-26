import React from 'react';
import { Stat, StatNumber, StatHelpText, StatLabel, Card } from '@chakra-ui/react';

interface TransactionStatProps {
	statLabel: string;
	amount: number;
}
const TransactionStat = (props: TransactionStatProps) => {
	const { statLabel, amount } = props;

	// Determine color based on whether the amount is positive or negative
	const amountColor = amount < 0 ? 'red.500' : 'green.500';

	// Format amount with currency using Intl.NumberFormat
	const formattedAmount = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount);

	return (
		<Card mt={3} mx={2} px={4} border='none' shadow='none'>
			<Stat>
				<StatLabel>{statLabel}</StatLabel>
				<StatNumber color={amountColor}>{formattedAmount}</StatNumber>
				<StatHelpText>Feb 12 - Feb 28</StatHelpText>
			</Stat>
		</Card>
	);
};

export default TransactionStat;
