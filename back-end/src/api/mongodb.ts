import { MongoClient, ServerApiVersion } from "mongodb";
import { MONGO_URI } from "../dotenv";

export let mongoClient: MongoClient;


export const initialize = async () => {
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


// module.exports = {initialize, mongoClient};
