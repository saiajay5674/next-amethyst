'use client';
import React, { useState } from 'react';
import { format as formatTimeStamp } from 'date-fns';
import {
	Flex,
	Text,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
	Input,
	List,
	ListItem,
} from '@chakra-ui/react';

interface Transaction {
	date: string;
	amount: number;
	iso_currency_code: string;
	name: string;
	payeeOrCreditor: string;
	category: string;
	account: string;
	notes: string;
}

function TransactionDetails({ transaction }: { transaction: Transaction }) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(transaction.category);
	const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

	// Format the date to a human-readable format
	const formattedDate = formatTimeStamp(transaction.date, 'MMM do, yyyy');
	const handleToggle = () => setIsOpen(!isOpen);

	// Determine color based on whether the amount is positive or negative
	const amountColor = transaction.amount < 0 ? 'red.500' : 'green.500';

	// Format amount with currency using Intl.NumberFormat
	const formattedAmount = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: transaction.iso_currency_code,
	}).format(transaction.amount);

	// Define categories with emojis
	const categories = {
		Groceries: '🛒 Groceries',
		Food: '🍔 Food',
		Transport: '🚗 Transport',
		Entertainment: '🎉 Entertainment',
		Health: '💊 Health',
		Shopping: '🛍️ Shopping',
		Other: '❓ Other',
	};

	const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSelectedCategory(value);
		if (value) {
			const filtered = Object.values(categories).filter((category) =>
				category.toLowerCase().includes(value.toLowerCase())
			);
			setFilteredCategories(filtered);
		} else {
			setFilteredCategories([]);
		}
	};

	const handleCategorySelect = (category: string) => {
		setSelectedCategory(category);
		setFilteredCategories([]);
	};

	return (
		<Accordion allowToggle onChange={handleToggle}>
			<AccordionItem border='none'>
				<AccordionButton padding='16px' _expanded={{ bg: 'teal.100' }}>
					<Flex justify='space-between' alignItems='center' flex='1' textAlign='left'>
						<Flex maxWidth='300px' flex='1'>
							<Text
								fontSize='md'
								overflow='hidden'
								textOverflow='ellipsis'
								whiteSpace='nowrap'
								maxWidth='300px'>
								{transaction.name}
							</Text>
						</Flex>
						<Flex justify='center' flex='1' maxWidth='200px'>
							<Box position='relative' width='100%'>
								<Input
									value={selectedCategory}
									onChange={handleCategoryChange}
									placeholder='Category'
									size='sm'
									textAlign='center'
								/>
								{filteredCategories.length > 0 && (
									<List
										position='absolute'
										top='100%'
										left='0'
										width='100%'
										bg='white'
										border='1px solid'
										borderColor='gray.200'
										zIndex='1000'
										mt={1}
										borderRadius='md'>
										{filteredCategories.map((category, index) => (
											<ListItem
												key={index}
												padding='8px'
												cursor='pointer'
												_hover={{ bg: 'gray.100' }}
												onClick={() => handleCategorySelect(category)}>
												{category}
											</ListItem>
										))}
									</List>
								)}
							</Box>
						</Flex>
						<Flex justify='flex-end' flex='1' maxWidth='100px'>
							<Text fontSize='md' fontWeight='bold' color={amountColor}>
								{formattedAmount}
							</Text>
						</Flex>
					</Flex>
					<AccordionIcon />
				</AccordionButton>
				<AccordionPanel padding='16px'>
					<Text fontSize='lg' fontWeight='bold'>
						{transaction.payeeOrCreditor}
					</Text>
					<Box paddingTop={2}>
						<Text>
							<strong>Account:</strong> {transaction.account}
						</Text>
						<Text>
							<strong>Notes:</strong> {transaction.notes}
						</Text>
					</Box>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
}

export default TransactionDetails;
