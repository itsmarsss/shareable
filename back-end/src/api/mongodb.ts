import { MongoClient, ServerApiVersion } from "mongodb";
import { MONGO_URI } from "../dotenv";

let mongoClient: MongoClient;

const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);

const initialize = async () => {
    mongoClient = new MongoClient(MONGO_URI, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });
    await mongoClient.connect();
    console.log("Connected to MongoDB");
};

initialize();

export { mongoClient, initialize };
