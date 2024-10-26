import React from 'react';
import { IconButton, Text, HStack, Tooltip } from '@chakra-ui/react';

interface PanelButtonProps {
	isExpanded: boolean;
	onClickFunction: () => void;
	buttonIcon: React.ReactElement;
	navigationLabel: string;
}

const PanelButton = (props: PanelButtonProps) => {
	const { isExpanded, onClickFunction, buttonIcon, navigationLabel } = props;

	return (
		<HStack
			align='center'
			justify={isExpanded ? 'flex-start' : 'center'}
			py={2}
			onClick={isExpanded ? onClickFunction : undefined} // Apply onClick to HStack only if expanded
			cursor='pointer'
			_hover={
				isExpanded
					? {
							boxShadow: 'lg',
							borderColor: 'gray.100',
							bg: 'gray.500',
					  }
					: undefined
			}
			borderRadius='md'
			px={isExpanded ? 3 : 0} // Add padding to give space for the border when expanded
		>
			<Tooltip label={!isExpanded ? navigationLabel : ''} placement='top' fontSize='small'>
				<IconButton
					icon={buttonIcon}
					aria-label='Toggle Navigation'
					size='md'
					variant='ghost'
					color='white'
					ml={isExpanded ? 4 : 0}
					_hover={{ bg: isExpanded ? 'transparent' : 'gray.200' }}
					onClick={!isExpanded ? onClickFunction : undefined} // Apply onClick to IconButton only if collapsed
				/>
			</Tooltip>
			{isExpanded && (
				<Text fontSize='lg' fontWeight='bold' color='white' pt={1}>
					{navigationLabel}
				</Text>
			)}
		</HStack>
	);
};

export default PanelButton;
