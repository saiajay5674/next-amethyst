'use client';
import { Card, Input, Button, HStack, VStack, Text, Box, Select } from '@chakra-ui/react';
import React, { useState } from 'react';

interface TransactionsSummaryProps {
	transactions: any[]; // Define a proper type based on your transaction structure
	onFilterUpdate: (searchTerm: string, filter: string) => void;
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

	return (
		<Card mb={2} m={10} p={4}>
			<VStack align='start' spacing={4}>
				{/* Search Input */}
				<Input placeholder='Search transactions' value={searchTerm} onChange={handleSearchChange} />

				{/* Filters */}
				<HStack spacing={4}>
					<Button variant={filter === 'all' ? 'solid' : 'outline'} onClick={() => handleFilterChange('all')}>
						All
					</Button>
					<Button
						variant={filter === 'needsReview' ? 'solid' : 'outline'}
						onClick={() => handleFilterChange('needsReview')}>
						Needs Review
					</Button>
					<Select
						value={filter === 'date' ? 'date' : ''}
						onChange={(e) => handleFilterChange('date')}
						placeholder='Filter by Date'>
						<option value='date'>Date</option>
						{/* Add more date options if needed */}
					</Select>
				</HStack>

				{/* Overview */}
				<Box>
					<Text>Total Amount: {totalAmount.toFixed(2)}</Text>
					<Text>Total Needs Review: {totalNeedsReview.toFixed(2)}</Text>
				</Box>
			</VStack>
		</Card>
	);
};

export default TransactionsSummary;
