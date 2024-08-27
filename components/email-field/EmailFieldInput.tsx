import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

// Component for the email input field
type EmailInputProps = {
	email: string;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
	isEmailValid: boolean;
};

const EmailFieldInput: React.FC<EmailInputProps> = ({ email, setEmail, isEmailValid }) => (
	<FormControl isInvalid={!isEmailValid}>
		<FormLabel htmlFor='email'>Email</FormLabel>
		<Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} isRequired />
		<FormErrorMessage>Enter a valid email address</FormErrorMessage>
	</FormControl>
);

export default EmailFieldInput;
