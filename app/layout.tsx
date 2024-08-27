import { Providers } from './providers';
import NavigationPanel from '../components/navigation/NavigationPanel';
import { Box, Container, Flex } from '@chakra-ui/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body>
				<Providers>
					<NavigationPanel />
					<Box
						flex='1'
						ml={{ base: '60px' }} // Adjust margin based on panel width
						transition='margin-left 0.3s'
						mr={0}
						p={4} // Padding to ensure content is not too close to the edges
					>
						{children}
					</Box>
				</Providers>
			</body>
		</html>
	);
}
