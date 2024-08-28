'use client';
import React, { useRef, useState } from 'react';
import { Box, Button, Checkbox, FormControl, FormLabel, HStack, Input, Stack } from '@chakra-ui/react';
import { PasswordAttributes, PasswordField } from '../../components/password-field/PasswordField';
import EmailFieldInput from '../../components/email-field/EmailFieldInput';
import { isEmailAddresssValid } from '../../utils/email';
import { Page } from '../../constants/page';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
	const router = useRouter();
	// State variables to track email, password validity, and loading state
	const [email, setEmail] = useState<string>('');
	const [isEmailValid, setEmailValid] = useState<boolean>(true);
	const [isLoading, setLoading] = useState<boolean>(false);

	// Refs to access password input field
	const passwordRef = useRef<HTMLInputElement>(null);

	// State variables to store password attributes
	const [passwordAttr, setPasswordAttr] = useState<PasswordAttributes>({ isPasswordValid: true });

	// Handle sign-in button click
	const handleSignIn = () => {
		const isEmailValid = validateEmail();
		const isPasswordValid = validatePassword();
		if (isEmailValid && isPasswordValid) {
			login();
		}
	};

	// Validate email address
	const validateEmail = (): boolean => {
		const valid = isEmailAddresssValid(email);
		setEmailValid(valid);
		return valid;
	};

	// Validate password and confirm password
	const validatePassword = (): boolean => {
		const password = passwordRef.current?.value;

		if (!password) {
			setPasswordAttr({
				isPasswordValid: false,
				errorMessage: 'Enter password',
			});
			return false;
		}
		setPasswordAttr({ isPasswordValid: true });
		return true;
	};

	const login = async () => {
		setLoading(true);
		const requestBody = {
			email,
			password: passwordRef.current?.value,
		};

		const result = await fetch('/api/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(requestBody), // Send data as JSON
			credentials: 'include', // Include cookies in the request and response
		});
		setLoading(false);

		if (result.status === 200) {
			router.push(Page.HOME);
		}
	};

	return (
		<Box
			py={{ base: '0', sm: '8' }}
			px={{ base: '4', sm: '10' }}
			bg={{ base: 'transparent', sm: 'bg.surface' }}
			boxShadow={{ base: 'none', sm: 'lg' }}
			borderRadius={{ base: 'none', sm: 'xl' }}>
			<Stack spacing='6'>
				<Stack spacing='5'>
					<EmailFieldInput email={email} setEmail={setEmail} isEmailValid={isEmailValid} />
					<PasswordField passattr={passwordAttr} ref={passwordRef} />
				</Stack>
				<HStack justify='space-between'>
					<Checkbox colorScheme='teal' isDisabled={true}>
						Remember me
					</Checkbox>
					<Button variant='text' size='sm' color='teal'>
						Forgot password?
					</Button>
				</HStack>
				<Button colorScheme='teal' onClick={handleSignIn} isLoading={isLoading}>
					Sign in
				</Button>
			</Stack>
		</Box>
	);
};

export default LoginForm;
