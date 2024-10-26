import { Box, BoxProps, useRadio } from '@chakra-ui/react';

interface RadioOptionButtonProps extends BoxProps {}
export const RadioOptionButton = (props: RadioOptionButtonProps) => {
	const { getInputProps, getRadioProps } = useRadio(props);

	const input = getInputProps();
	const checkbox = getRadioProps();

	return (
		<Box as='label'>
			<input {...input} />
			<Box
				{...checkbox}
				fontSize='sm'
				cursor='pointer'
				borderWidth='1px'
				borderRadius='md'
				boxShadow='md'
				_checked={{
					bg: 'gray.600',
					color: 'white',
					fontWeight: 'bold',
					borderColor: 'gray.800',
					boxShadow: 'lg',
				}}
				_focus={{
					boxShadow: 'outline',
				}}
				mx={2}
				my={2}
				px={5}
				py={2}>
				{props.children}
			</Box>
		</Box>
	);
};
