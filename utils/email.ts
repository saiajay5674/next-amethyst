export function isEmailAddresssValid(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	console.log(`This is the result for email: ${emailRegex.test(email)}`);
	return emailRegex.test(email);
}
