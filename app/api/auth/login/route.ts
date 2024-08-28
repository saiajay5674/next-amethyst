import { MongoClient, ServerApiVersion } from 'mongodb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const password = 'H4bsxAxAZuviW0Oq';
const URI = `mongodb+srv://saiajay5674:${password}@test.hye7g.mongodb.net/?retryWrites=true&w=majority&appName=Test`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

export const POST = async (req: Request) => {
	try {
		// Parse the request body to extract user data
		const { email, password } = await req.json();

		// Input validation
		if (!email || !password) {
			return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
		}

		// Connect the client to the MongoDB server
		await client?.connect();

		// Get the database and collection
		const db = client?.db('Test');
		const collection = db?.collection('users');

		// Fetch user with the email address
		const user = await collection?.findOne({ email });
		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 403 });
		}

		// Hash the password
		const doesPasswordMatch = await bcrypt.compare(password, user.password);

		if (!doesPasswordMatch) {
			return NextResponse.json({ error: 'Incorrect password' }, { status: 403 });
		}

		const tokenData = {
			userId: user._id,
			email: user.email,
		};

		const jwtSecret: string = process.env.JWT_SECRET_KEY || 'secret';

		const token = await jwt.sign(tokenData, jwtSecret, { expiresIn: '3h' });

		// Return a success response
		const response = NextResponse.json({ message: 'Login successful' });
		response.cookies.set('amethyst-session', token);
		return response;
	} catch (error) {
		// Return an error response if something goes wrong
		console.error('Error saving user:', error);
		return NextResponse.json({ error: 'An error occurred while saving the user' }, { status: 500 });
	} finally {
		// Close the MongoDB client connection
		await client?.close();
	}
};
