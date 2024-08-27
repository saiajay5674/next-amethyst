import Cookies from 'universal-cookie';
import { jwtVerify } from 'jose';
import { JWT_SECRET } from '../app/constants/secret';

export const SESSION_COOKIE_NAME = 'amethyst-session';

const cookiesClient = new Cookies();

export async function getSession() {
	const sessionCookie = cookiesClient.get(SESSION_COOKIE_NAME);

	if (sessionCookie) {
		try {
			// Convert the JWT_SECRET to a Uint8Array
			const secret = new TextEncoder().encode(JWT_SECRET);

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

// export function getSessionSSR() {
// 	const sessionCookie = cookies().get(SESSION_COOKIE_NAME);

// 	if (sessionCookie) {
// 		return jwt.verify(sessionCookie.value, JWT_SECRET);
// 	}
// 	return undefined;
// };
