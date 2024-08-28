// app/providers.tsx
'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/comfortaa';

export function Providers({ children }: { children: React.ReactNode }) {
	const customTheme = extendTheme({
		fonts: {
			body: `'Comfortaa', sans-serif`,
		},
	});

	return (
		<CacheProvider>
			<ChakraProvider theme={customTheme}>{children}</ChakraProvider>
		</CacheProvider>
	);
}
