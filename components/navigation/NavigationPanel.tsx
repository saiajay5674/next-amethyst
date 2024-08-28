'use client';
import { useState } from 'react';
import { Box, IconButton, VStack, Text, HStack, Icon } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { StarIcon, SettingsIcon, ChevronDownIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';

const NavigationPanel = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const router = useRouter();

	const toggleDrawer = () => {
		setIsExpanded(!isExpanded);
	};

	const navigateTo = (path: string) => {
		if (isExpanded) {
			router.push(path);
			toggleDrawer();
		}
	};

	return (
		<Box
			position='fixed'
			left={0}
			top={0}
			height='100vh'
			bg='gray.700'
			color='white'
			display='flex'
			flexDirection='column'
			transition='width 0.3s'
			width={isExpanded ? '250px' : '60px'}
			boxShadow='lg'
			zIndex={1000}>
			<IconButton
				icon={isExpanded ? <CloseIcon /> : <HamburgerIcon />}
				onClick={toggleDrawer}
				aria-label='Toggle Navigation'
				alignSelf={isExpanded ? 'flex-end' : 'center'}
				mt={4}
				mb={8}
				size='md'
				variant='ghost'
				color='white'
			/>
			<IconButton
				icon={<StarIcon />}
				onClick={toggleDrawer}
				aria-label='Toggle Navigation'
				alignSelf={isExpanded ? 'flex-end' : 'center'}
				mt={4}
				mb={8}
				size='md'
				variant='ghost'
				color='white'
			/>
			<VStack spacing={4} align={isExpanded ? 'flex-start' : 'center'} p={4}>
				<HStack spacing={3} cursor='pointer' onClick={() => navigateTo('/')} width='100%'>
					<Icon as={StarIcon} color='white' />
					{isExpanded && (
						<Text fontSize='lg' fontWeight='bold' color='white'>
							Home
						</Text>
					)}
				</HStack>
				<HStack spacing={3} cursor='pointer' onClick={() => navigateTo('/transactions')} width='100%'>
					<Icon as={ChevronDownIcon} color='white' />
					{isExpanded && (
						<Text fontSize='lg' fontWeight='bold' color='white'>
							Transactions
						</Text>
					)}
				</HStack>
				<HStack spacing={3} cursor='pointer' onClick={() => navigateTo('/settings')} width='100%'>
					<Icon as={SettingsIcon} color='white' />
					{isExpanded && (
						<Text fontSize='lg' fontWeight='bold' color='white'>
							Settings
						</Text>
					)}
				</HStack>
				<HStack spacing={3} cursor='pointer' onClick={() => navigateTo('/signin')} width='100%'>
					<Icon as={ArrowForwardIcon} color='white' />
					{isExpanded && (
						<Text fontSize='lg' fontWeight='bold' color='white'>
							Logout
						</Text>
					)}
				</HStack>
			</VStack>
		</Box>
	);
};

export default NavigationPanel;
