import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import mongoDbClient from '../clients/mongoDb';

const SALT_ROUNDS = 10;

export const POST = async (req: Request) => {
	try {
		// Parse the request body to extract user data
		const { email, password } = await req.json();

		// Input validation
		if (!email || !password) {
			return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
		}

		// Connect the client to the MongoDB server
		await mongoDbClient?.connect();

		// Get the database and collection
		const db = mongoDbClient?.db('Test');
		const collection = db?.collection('users');

		// Check if user with the same email already exists
		const existingUser = await collection?.findOne({ email });
		if (existingUser) {
			return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

		// Create the user object
		const user = {
			email,
			password: hashedPassword,
			createdAt: new Date(),
		};

		// Insert the user data into the collection
		const result = await collection?.insertOne(user);

		// Return a success response
		return NextResponse.json({ message: 'User saved successfully', result });
	} catch (error) {
		// Return an error response if something goes wrong
		console.error('Error saving user:', error);
		return NextResponse.json({ error: 'An error occurred while saving the user' }, { status: 500 });
	} finally {
		// Close the MongoDB client connection
		await mongoDbClient?.close();
	}
};
