'use client';
import { SearchIcon } from '@chakra-ui/icons';
import {
	Card,
	Input,
	Button,
	HStack,
	VStack,
	Text,
	Box,
	Select,
	InputGroup,
	InputLeftElement,
	useRadioGroup,
	Center,
	Stat,
	StatNumber,
	StatHelpText,
	StatLabel,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RadioOptionButton } from './RadioOptionButton';
import TransactionStat from './TransactionStat';

interface TransactionsSummaryProps {
	transactions: any[]; // Define a proper type based on your transaction structure
	onFilterUpdate: (searchTerm: string, filter: 'all' | 'needsReview' | 'date') => void;
}

const TransactionsSummary = ({ transactions, onFilterUpdate }: TransactionsSummaryProps) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [filter, setFilter] = useState<'all' | 'needsReview' | 'date'>('all');

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const term = e.target.value;
		setSearchTerm(term);
		onFilterUpdate(term, filter);
	};

	const handleFilterChange = (newFilter: 'all' | 'needsReview' | 'date') => {
		setFilter(newFilter);
		onFilterUpdate(searchTerm, newFilter);
	};

	// Calculate total amounts
	const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
	const totalNeedsReview = transactions.reduce(
		(sum, transaction) => (transaction.approved ? sum : sum + transaction.amount),
		0
	);

	const FILTER_OPTIONS = {
		all: 'All',
		needsReview: 'Pending Review',
	};

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: 'framework',
		defaultValue: 'react',
		onChange: console.log,
	});

	const group = getRootProps();

	return (
		<Card mb={2} m={10} p={4}>
			<VStack mx={6}>
				<InputGroup>
					<InputLeftElement pointerEvents='none'>
						<SearchIcon color='gray.400' />
					</InputLeftElement>
					<Input placeholder='Search transactions' value={searchTerm} onChange={handleSearchChange} />
				</InputGroup>

				<HStack align='center'>
					{Object.entries(FILTER_OPTIONS).map(([key, value]) => {
						const radio = getRadioProps({ value });
						return (
							<RadioOptionButton key={value} {...radio}>
								{value}
							</RadioOptionButton>
						);
					})}
				</HStack>

				{/* Overview */}
				<HStack>
					<TransactionStat amount={totalAmount} statLabel='Total Amount' />
					<TransactionStat amount={totalNeedsReview} statLabel='Pending Review' />
				</HStack>
			</VStack>
		</Card>
	);
};

export default TransactionsSummary;
