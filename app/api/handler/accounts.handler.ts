import { Db, ObjectId } from 'mongodb';
import mongoDbClient from '../clients/mongoDb';

interface SaveAccountForUserPayload {
	userId: string;
	accessToken: string;
	itemId: string;
}
export async function saveAccountForUser(payload: SaveAccountForUserPayload) {
	const { userId, accessToken, itemId } = payload;

	const collection = await getAccountsCollection();

	const userAccount = {
		userId,
		plaidToken: accessToken,
		plaidAccountId: itemId,
	};
	return collection?.insertOne(userAccount);
}

export async function getAccountByPlaidAccountId(plaidAccountId: string) {
	const collection = await getAccountsCollection();

	return collection.findOne({ plaidAccountId });
}

async function getAccountsCollection() {
	// Connect the client to the MongoDB server
	await mongoDbClient?.connect();
	// Get the database and collection
	const db = mongoDbClient?.db('Test');

	return db?.collection('accounts');
}
