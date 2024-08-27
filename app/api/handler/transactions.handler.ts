import { RemovedTransaction, Transaction, TransactionsSyncRequest } from 'plaid';
import * as accounts from './accounts.handler';
import plaidClient from '../clients/plaid';
import { ca } from 'date-fns/locale';
import mongoDbClient from '../clients/mongoDb';
import { ObjectId } from 'mongodb';

export async function fetchTransactionUpdate(item_id: string) {
	const account = await accounts.getAccountByPlaidAccountId(item_id);

	const { _id, userId, plaidToken, plaidLastCursor } = account;

	let cursor = plaidLastCursor;

	// New transaction updates since "cursor"
	let added: Transaction[] = [];
	let modified: Transaction[] = [];
	// Removed transaction ids
	let removed: RemovedTransaction[] = [];
	let hasMore = true;

	const BATCH_SIZE = 100;

	try {
		while (hasMore) {
			const request: TransactionsSyncRequest = {
				access_token: plaidToken,
				cursor: plaidLastCursor,
				count: BATCH_SIZE,
			};

			const response = await plaidClient.transactionsSync(request);
			const data = response.data;

			// Add this page of results
			added = added.concat(data.added);
			modified = modified.concat(data.modified);
			removed = removed.concat(data.removed);
			hasMore = data.has_more;
			// Update cursor to the next cursor
			cursor = data.next_cursor;
		}
	} catch (error) {
		console.error(`Error fetching transactions: ${error.message}`);
		cursor = plaidLastCursor;
	}

	batchSaveTransactionsForAccount(_id, userId, added);
}

export async function batchSaveTransactionsForAccount(accountId: string, userId: string, transactions: Transaction[]) {
	const collection = await getTransactionsCollection();

	// Prepare the transactions for insertion
	const formattedTransactions = transactions.map((transaction: Transaction) => {
		const { transaction_id, account_id, account_owner, ...restOfTransaction } = transaction;

		return {
			transactionId: transaction_id, // Use transaction_id as the MongoDB document ID
			accountId, // Add the input accountId
			userId, // Add the input userId
			approved: false,
			...restOfTransaction, // Spread the rest of the transaction fields
		};
	});

	// Perform the batch insert into MongoDB
	try {
		await collection.insertMany(formattedTransactions, { ordered: false });
		console.log('Transactions saved successfully');
	} catch (error) {
		console.error('Error saving transactions:', error);
	}
}

export async function getTransactionsByUserId(userId: string) {
	const collection = await getTransactionsCollection();

	try {
		// Find all transactions that match the userId
		const result = await collection.find({ userId }).toArray();

		return result; // Return the transactions as an array
	} catch (error) {
		console.error('Error fetching transactions:', error);
		throw new Error('Failed to retrieve transactions');
	}
}

async function getTransactionsCollection() {
	// Connect the client to the MongoDB server
	await mongoDbClient?.connect();
	// Get the database and collection
	const db = mongoDbClient?.db('Test');

	return db?.collection('transactions');
}
