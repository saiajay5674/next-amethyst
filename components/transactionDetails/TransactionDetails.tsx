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
	Tag,
	TagLabel,
	IconButton,
	Tooltip,
	useToast,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

interface Transaction {
	date: string;
	amount: number;
	iso_currency_code: string;
	name: string;
	category: string;
	account: string;
	notes: string;
	approved: boolean;
}

function TransactionDetails({ transaction }: { transaction: Transaction }) {
	const [isOpen, setIsOpen] = useState(false);
	const [accordianIndex, setAccordianIndex] = useState(-1);
	const [isReviewed, setIsReviewed] = useState(transaction.approved);
	const [name, setName] = useState(transaction.name);
	const toast = useToast();

	// Format the date to a human-readable format
	const handleToggle = (index: number) => {
		setAccordianIndex(index);
		setIsOpen(!isOpen);
	};

	// Determine color based on whether the amount is positive or negative
	const amountColor = transaction.amount < 0 ? 'red.500' : 'green.500';

	// Format amount with currency using Intl.NumberFormat
	const formattedAmount = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: transaction.iso_currency_code,
	}).format(transaction.amount);

	// Handle marking the transaction as reviewed and updating the name
	const markAsReviewed = async () => {
		try {
			// Mock API call to update transaction
			// const response = await fetch('/api/update-transaction', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	},
			// 	body: JSON.stringify({
			// 		...transaction,
			// 		name,
			// 		approved: false,
			// 	}),
			// });

			// if (!response.ok) {
			// 	throw new Error('Failed to update transaction');
			// }

			// Assuming API call is successful
			setIsReviewed(true);

			toast({
				title: 'Transaction updated.',
				description: 'The transaction has been approved',
				status: 'success',
				duration: 2500,
				isClosable: true,
			});
		} catch (error) {
			toast({
				title: 'An error occurred.',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Accordion allowToggle onChange={handleToggle} index={accordianIndex}>
			<AccordionItem border='none'>
				<AccordionButton padding='16px' _expanded={{ fontWeight: 'bold', fontSize: 'lg', bgColor: 'gray.50' }}>
					<Flex justify='space-between' alignItems='center' flex='1' textAlign='left'>
						<Flex maxWidth='300px' flex='1'>
							<Input
								variant='unstyled'
								whiteSpace='nowrap'
								value={transaction.name}
								fontWeight={isOpen ? 'bold' : 'normal'}
								fontSize={isOpen ? 'lg' : 'sm'}
								onChange={() => markAsReviewed()} // Fix this
							></Input>{' '}
						</Flex>
						{!isReviewed && (
							<Flex justify='center' alignItems='center' flex={1}>
								<Tag size='md' variant='outline' colorScheme='orange'>
									<TagLabel>Pending Review</TagLabel>
								</Tag>
							</Flex>
						)}
						<Flex justify='flex-end' flex='1'>
							<Text fontSize='md' fontWeight='bold' color={amountColor}>
								{formattedAmount}
							</Text>
						</Flex>
					</Flex>
					<AccordionIcon ml={2} />
				</AccordionButton>
				<AccordionPanel position='relative'>
					<Box paddingTop={2}>
						<Text>Account: Chase Checking - 7689</Text>
						<Flex alignItems='center' gap={2}>
							<Text>Notes:</Text>
							<Input variant='unstyled' placeholder='Add notes here' />
						</Flex>
					</Box>
					{!isReviewed && (
						<Tooltip label='Approve'>
							<IconButton
								aria-label='Mark as Reviewed'
								icon={<CheckIcon />}
								size='sm'
								colorScheme='green'
								bgColor='green.400'
								position='absolute'
								bottom='10px'
								right='10px'
								isRound={true}
								onClick={() => {
									markAsReviewed();
									handleToggle(-1);
								}}
							/>
						</Tooltip>
					)}
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
}

export default TransactionDetails;
