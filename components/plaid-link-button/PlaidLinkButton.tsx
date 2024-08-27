'use client';
import { getSession } from '@/app/utils/session';
import { Button } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess, PlaidLinkOnSuccessMetadata } from 'react-plaid-link';

interface PlaidLinkButtonProps {
	linkToken?: string;
}

const PlaidLinkButton = (props: PlaidLinkButtonProps) => {
	const onSuccess = useCallback<PlaidLinkOnSuccess>((public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
		// log and save metadata
		// exchange public token
		fetch('/api/plaid/exchangeToken', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				public_token,
			}),
		});
	}, []);

	const { linkToken } = props;

	// The usePlaidLink hook manages Plaid Link creation
	// It does not return a destroy function;
	// instead, on unmount it automatically destroys the Link instance
	const config: PlaidLinkOptions = {
		onSuccess,
		onExit: (err, metadata) => {},
		onEvent: (eventName, metadata) => {},
		token: linkToken || '',
	};
	const { open, ready } = usePlaidLink(config);
	return (
		<Button
			bgColor='gray.800'
			color='white'
			colorScheme='black'
			size='lg'
			isDisabled={!linkToken || !ready}
			onClick={() => open()}>
			Link account
		</Button>
	);
};

export default PlaidLinkButton;
