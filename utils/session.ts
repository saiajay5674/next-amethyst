import Cookies from 'universal-cookie';
import { jwtVerify } from 'jose';

export const SESSION_COOKIE_NAME = 'amethyst-session';

const cookiesClient = new Cookies();

export async function getSession() {
	const sessionCookie = cookiesClient.get(SESSION_COOKIE_NAME);

	if (sessionCookie) {
		try {
			const jwtSecret = process.env.JWT_SECRET_KEY;
			// Convert the JWT_SECRET to a Uint8Array
			const secret = new TextEncoder().encode(jwtSecret);

			// Verify the JWT using jose
			const { payload } = await jwtVerify(sessionCookie, secret);

			return payload; // Expected to return { userId, emailAddress }
		} catch (error) {
			console.error('Failed to verify JWT:', error);
			// Handle the error or return undefined if verification fails
			return undefined;
		}
	}

	return undefined;
}
