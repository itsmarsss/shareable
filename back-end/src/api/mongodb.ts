const { MongoClient, ServerApiVersion } = require('mongodb');

// edit to ENV file later
const uri = "mongodb+srv://williamwu277:uB0aizNJtJdzqQxx@shareable.szxkm8t.mongodb.net/?retryWrites=true&w=majority&appName=shareable";

let mongoClient = null;

const initialize = async () => {
    mongoClient = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    })
    await mongoClient.connect();
    console.log("MongoDB connected");
};

initialize();
module.exports = {mongoClient, initialize};