import React from 'react';
import { Container, Heading, Link, Stack, Text } from '@chakra-ui/react';
import { AppLogo } from '../../components/app-logo/AppLogo';
import LoginForm from './LoginForm';

const SignInPage = async () => {
	return (
		<Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }} shadow='0'>
			<Stack spacing='8'>
				<Stack spacing='6'>
					<AppLogo color='teal' />
					<Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
						<Heading size={{ base: 'xs', md: 'sm' }}>Log in to your account</Heading>
						<Text color='fg.muted'>
							Don&apos;t have an account?
							<Link href='/signup' color='teal'>
								Sign up
							</Link>
						</Text>
					</Stack>
				</Stack>
				<LoginForm />
			</Stack>
		</Container>
	);
};

export default SignInPage;
