'use client';
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	IconButton,
	Input,
	InputGroup,
	InputProps,
	InputRightElement,
	useDisclosure,
	useMergeRefs,
} from '@chakra-ui/react';
import { forwardRef, useRef } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

export interface PasswordAttributes {
	isPasswordValid: boolean;
	errorMessage?: string;
}

interface PasswordFieldProps extends InputProps {
	passattr: PasswordAttributes;
	label?: string;
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>((props, ref) => {
	const { isPasswordValid, errorMessage } = props.passattr;

	const { isOpen, onToggle } = useDisclosure();
	const inputRef = useRef<HTMLInputElement>(null);

	const mergeRef = useMergeRefs(inputRef, ref);
	const onClickReveal = () => {
		onToggle();
		if (inputRef.current) {
			inputRef.current.focus({ preventScroll: true });
		}
	};

	return (
		<FormControl isInvalid={!isPasswordValid}>
			<FormLabel htmlFor='password'>{props.label ? props.label : 'Password'}</FormLabel>
			<InputGroup>
				<InputRightElement>
					<IconButton
						variant='text'
						aria-label={isOpen ? 'Mask password' : 'Reveal password'}
						icon={isOpen ? <HiEyeOff /> : <HiEye />}
						onClick={onClickReveal}
					/>
				</InputRightElement>
				<Input id='password' ref={mergeRef} name='password' type={isOpen ? 'text' : 'password'} {...props} />
			</InputGroup>
			<FormErrorMessage>{errorMessage}</FormErrorMessage>
		</FormControl>
	);
});

PasswordField.displayName = 'PasswordField';
