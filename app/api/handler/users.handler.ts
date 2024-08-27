import { Db, ObjectId } from 'mongodb';
import { JWT_SECRET } from '@/app/constants/secret';
import { jwtVerify } from 'jose';

export async function getUserByEmail(mongoDb: Db, email: string) {
	const collection = mongoDb?.collection('users');
	return collection?.findOne({ email });
}

export async function getUserById(mongoDb: Db, id: string) {
	const collection = mongoDb?.collection('users');
	return collection?.findOne({ _id: new ObjectId(id) });
}

export async function getUserFromSession(session?: string) {
	if (session) {
		try {
			const secret = new TextEncoder().encode(JWT_SECRET); // Make sure to replace this with your actual secret

			// Verify the JWT using jose
			const { payload } = await jwtVerify(session, secret);

			// Return the user information from the payload
			return {
				userId: payload.userId,
				emailAddress: payload.emailAddress,
			};
		} catch (error) {
			console.error('Failed to verify JWT:', error);
			// Handle the error or return undefined if verification fails
			return undefined;
		}
	}
	return undefined;
}
