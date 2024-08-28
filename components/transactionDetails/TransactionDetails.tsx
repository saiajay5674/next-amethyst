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
	Tag,
	TagLabel,
} from '@chakra-ui/react';

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

	return (
		<Accordion allowToggle onChange={handleToggle}>
			<AccordionItem border='none'>
				<AccordionButton padding='16px' _expanded={{ fontWeight: 'bold', fontSize: 'lg', bgColor: 'gray.50' }}>
					<Flex justify='space-between' alignItems='center' flex='1' textAlign='left'>
						<Flex maxWidth='300px' flex='1'>
							<Text whiteSpace='nowrap'>{transaction.name}</Text>
						</Flex>
						{!transaction.approved && (
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
				<AccordionPanel>
					<Box paddingTop={2}>
						<Text>Account: Chase Checking - 7689</Text>
						<Flex alignItems='center' gap={2}>
							<Text>Notes:</Text>
							<Input variant='unstyled' placeholder='Add notes here' />
						</Flex>
					</Box>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
}

export default TransactionDetails;
