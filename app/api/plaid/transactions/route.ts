import { NextResponse } from 'next/server';
import * as transactions from '../../handler/transactions.handler';

export const POST = async (req: Request) => {
	const { webhook_code, item_id } = await req.json();

	try {
		switch (webhook_code) {
			case 'INITIAL_UPDATE':
			case 'SYNC_UPDATES_AVAILABLE': {
				transactions.fetchTransactionUpdate(item_id);
				break;
			}
			case 'DEFAULT_UPDATE':
			case 'HISTORICAL_UPDATE':
				// Ignore these webhook codes as not needed
				break;
			default:
			// serverLogAndEmitSocket(`Unhandled webhook type received.`, plaidItemId);
		}
	} catch (error) {
		console.error('Error handling webhook:', error);
		return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
		return;
	}

	return NextResponse.json({ message: 'ok' });
};
