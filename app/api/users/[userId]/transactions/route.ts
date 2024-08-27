import { NextRequest, NextResponse } from 'next/server';
import * as transactions from '../../../handler/transactions.handler';

export const GET = async (req: NextRequest, { params }: { params: { userId: string } }) => {
	const userId = params.userId;
	if (!userId) {
		return NextResponse.json({ message: 'Missing userId' }, { status: 400 });
	}
	const response = await transactions.getTransactionsByUserId(userId);

	return NextResponse.json(response);
};
