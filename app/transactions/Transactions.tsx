'use client';

import React, { useState, useMemo } from 'react';
import TransactionsSummary from './TransactionsSummary';
import { Transaction } from '../models/transaction';
import TransactionsCard from './TransactionsCard';

interface TransactionsComponentProps {
	transactions: Transaction[];
}

const TransactionsComponent = ({ transactions }: TransactionsComponentProps) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [filter, setFilter] = useState<'all' | 'needsReview' | 'date'>('all');

	// Filter transactions based on the search term and filter option
	const filteredTransactions = useMemo(() => {
		return transactions.filter((transaction) => {
			const matchesSearchTerm = transaction.name.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesFilter =
				filter === 'all' ||
				(filter === 'needsReview' && !transaction.approved) ||
				(filter === 'date' && /* Add your date filter logic here */ true);
			return matchesSearchTerm && matchesFilter;
		});
	}, [searchTerm, filter, transactions]);

	return (
		<>
			<TransactionsSummary
				transactions={transactions}
				onFilterUpdate={(searchTerm, filter) => {
					setSearchTerm(searchTerm);
					setFilter(filter);
				}}
			/>
			<TransactionsCard transactions={filteredTransactions} />
		</>
	);
};

export default TransactionsComponent;
