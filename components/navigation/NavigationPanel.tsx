'use client';
import { useState } from 'react';
import { Box, IconButton, VStack, Text, HStack, Icon } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { StarIcon, SettingsIcon, ChevronDownIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import PanelButton from './PanelButton';
import { Page } from '@/constants/page';
import { BiSolidDashboard, BiSolidBank, BiMoney, BiSolidUserDetail, BiLogOut } from 'react-icons/bi';

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
			<PanelButton
				isExpanded={isExpanded}
				onClickFunction={() => navigateTo(Page.HOME)}
				buttonIcon={<BiSolidDashboard />}
				navigationLabel='Dashboard'
			/>
			<PanelButton
				isExpanded={isExpanded}
				onClickFunction={() => navigateTo(Page.TRANSACTIONS)}
				buttonIcon={<BiMoney />} // Alternative icon: BiSolidWallet
				navigationLabel='Transactions'
			/>
			<PanelButton
				isExpanded={isExpanded}
				onClickFunction={() => navigateTo(Page.HOME)}
				buttonIcon={<BiSolidBank />}
				navigationLabel='Accounts'
			/>
			<PanelButton
				isExpanded={isExpanded}
				onClickFunction={() => navigateTo(Page.HOME)}
				buttonIcon={<BiSolidUserDetail />}
				navigationLabel='Profile'
			/>
			<PanelButton
				isExpanded={isExpanded}
				onClickFunction={() => navigateTo(Page.SIGNIN)}
				buttonIcon={<BiLogOut />}
				navigationLabel='Logout'
			/>
		</Box>
	);
};

export default NavigationPanel;
