import { MongoClient, ServerApiVersion } from 'mongodb';

const password = 'H4bsxAxAZuviW0Oq';

const URI = `mongodb+srv://saiajay5674:${password}@test.hye7g.mongodb.net/?retryWrites=true&w=majority&appName=Test`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoDbClient = new MongoClient(URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

export default mongoDbClient;
