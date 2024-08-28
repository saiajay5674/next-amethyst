'use client';
import React, { useRef, useState } from 'react';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react';
import { PasswordAttributes, PasswordField } from '../../components/password-field/PasswordField';
import { isPasswordLengthValid, passwordMatch } from '../../utils/password';
import { isEmailAddresssValid } from '../../utils/email';
import { useRouter } from 'next/navigation';
import { Page } from '../../constants/page';
import EmailFieldInput from '../../components/email-field/EmailFieldInput';

// Main SignupForm component
const SignupForm = () => {
	const router = useRouter();
	// State variables to track email, password validity, and loading state
	const [email, setEmail] = useState<string>('');
	const [isEmailValid, setEmailValid] = useState<boolean>(true);
	const [isLoading, setLoading] = useState<boolean>(false);

	// Refs to access password and confirm password input fields
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);

	// State variables to store password attributes
	const [passwordAttr, setPasswordAttr] = useState<PasswordAttributes>({ isPasswordValid: true });
	const [confirmPasswordAttr, setConfirmPasswordAttr] = useState<PasswordAttributes>({ isPasswordValid: true });

	// Handle sign-up button click
	const handleSignUp = () => {
		const isEmailValid = validateEmail();
		const isPasswordValid = validatePassword();
		if (isEmailValid && isPasswordValid) {
			saveUser();
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
		const confirmPassword = confirmPasswordRef.current?.value;

		if (!password || !isPasswordLengthValid(password)) {
			setPasswordAttr({
				isPasswordValid: false,
				errorMessage: 'Password must be at least 8 characters',
			});
			return false;
		}
		setPasswordAttr({ isPasswordValid: true });

		if (!passwordMatch(password, confirmPassword)) {
			setConfirmPasswordAttr({
				isPasswordValid: false,
				errorMessage: 'Passwords do not match',
			});
			return false;
		}
		setConfirmPasswordAttr({ isPasswordValid: true });
		return true;
	};

	// Save the user (simulated API call)
	const saveUser = async () => {
		setLoading(true);
		const requestBody = {
			email,
			password: passwordRef.current?.value,
		};

		const result = await fetch('/api/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(requestBody), // Send data as JSON
		});
		setLoading(false);

		if (result.status === 200) {
			const response = await result.json();
			console.log(response);
			router.push(Page.SIGNIN);
		}
	};

	return (
		<Box
			py={{ base: '0', sm: '8' }}
			px={{ base: '4', sm: '10' }}
			bg={{ base: 'transparent', sm: 'bg.surface' }}
			boxShadow={{ base: 'none', sm: 'lg' }}
			borderRadius={{ base: 'none', sm: 'lg' }}>
			<Stack spacing='6'>
				<EmailFieldInput email={email} setEmail={setEmail} isEmailValid={isEmailValid} />
				<PasswordConfirmationInput
					passwordRef={passwordRef}
					confirmPasswordRef={confirmPasswordRef}
					passwordAttr={passwordAttr}
					confirmPasswordAttr={confirmPasswordAttr}
				/>
				<SignUpButton onClick={handleSignUp} isLoading={isLoading} />
			</Stack>
		</Box>
	);
};

// Component for the password and confirm password fields
type PasswordFieldsProps = {
	passwordRef: React.RefObject<HTMLInputElement>;
	confirmPasswordRef: React.RefObject<HTMLInputElement>;
	passwordAttr: PasswordAttributes;
	confirmPasswordAttr: PasswordAttributes;
};

const PasswordConfirmationInput: React.FC<PasswordFieldsProps> = ({
	passwordRef,
	confirmPasswordRef,
	passwordAttr,
	confirmPasswordAttr,
}) => (
	<>
		<PasswordField passattr={passwordAttr} ref={passwordRef} />
		<PasswordField passattr={confirmPasswordAttr} label='Re-enter Password' ref={confirmPasswordRef} />
	</>
);

// Component for the sign-up button
type SignUpButtonProps = {
	onClick: () => void;
	isLoading: boolean;
};

const SignUpButton: React.FC<SignUpButtonProps> = ({ onClick, isLoading }) => (
	<Button colorScheme='teal' type='submit' onClick={onClick} isLoading={isLoading}>
		Sign up
	</Button>
);

export default SignupForm;
