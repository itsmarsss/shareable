import express from "express";
const { mongoClient } = require("../api/mongodb");

const router = express.Router();

const userDatabase = "Shareable";
const userCollection = "Users";
const uri = 4;

// sign up a user
router.post("/signup", async (req, res) => {
  const username = req.body.name;
  const password = req.body.password;

  if (!(username && password)) {
    res.json({
      success: false,
      message: "Insufficient data",
    });
    return;
  }

  try {
    const db = mongoClient.db(userDatabase);
    const collection = db.collection(userCollection);

    const existingUser = await collection.findOne({
      username: username.toLowerCase(),
    });
    if (existingUser) {
      return res.json({
        success: false,
        message: "Same username",
      });
    }
    const userData = {
      username: username,
      password: password,
      network: [],
    };
    const result = await collection.insertOne({ ...userData });
    res.json({
      success: true,
      ...userData,
      ...result,
    });
  } catch (error) {
    console.error("Error adding user", error);
    res.status(500).send("Internal Server Error");
  }
});
