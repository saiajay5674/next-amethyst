export interface Transaction {
	date: string;
	amount: number;
	iso_currency_code: string;
	name: string;
	category: string;
	account: string;
	notes: string;
	approved: boolean;
}
