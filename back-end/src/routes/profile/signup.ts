import { router } from "./index";
const { mongoClient } = require("../api/mongodb");
const cryptoRandomString = require('crypto-random-string');


const userDatabase = "Shareable";
const userCollection = "Users";

// sign up a user
router.post("/signup", async (req, res) => {
  console.log("HELLOW WORLD");
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
    const token = cryptoRandomString({length: 48, type: 'base64'});
    const userData = {
      username: username,
      password: password,
      token: token,
      network: [],
    };
    const result = await collection.insertOne({ ...userData });
    res.json({
      success: true,
      ...token,
      ...userData,
      ...result,
    });
  } catch (error) {
    console.error("Error adding user", error);
    res.status(500).send("Internal Server Error");
  }
});
