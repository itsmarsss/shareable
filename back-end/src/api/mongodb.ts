import express from "express";
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://williamwu277:<password>@shareable.omcl89m.mongodb.net/?retryWrites=true&w=majority&appName=Shareable";

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