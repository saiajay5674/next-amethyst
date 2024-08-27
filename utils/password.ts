export function isPasswordLengthValid(password?: string): boolean {
	return password !== undefined && password.length >= 8;
}

export function passwordMatch(password: string, stringToMatch?: string): boolean {
	return password === stringToMatch;
}
