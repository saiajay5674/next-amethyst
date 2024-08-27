import React from 'react';
import { Container, Heading, HStack, Input, Link, Stack, Text } from '@chakra-ui/react';
import { AppLogo } from '../../components/app-logo/AppLogo';
import SignupForm from './SignupForm';

const SignUpPage = () => {
	return (
		<Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }} shadow='0'>
			<Stack spacing='8'>
				<Stack spacing='6'>
					<AppLogo color='teal' />
					<Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
						<Heading size={{ base: 'xs', md: 'sm' }}>Create your account</Heading>
						<Text color='fg.muted'>
							Already have an account?{' '}
							<Link href='/signin' color='teal'>
								Login
							</Link>
						</Text>
					</Stack>
				</Stack>
				<SignupForm />
			</Stack>
		</Container>
	);
};

export default SignUpPage;
