import { router } from "./index";
import { mongoClient } from "../../api/mongodb";
import { randomBytes } from "crypto";
import { userCollection, userDatabase } from "../../dotenv";
import * as bcrypt from "bcryptjs";
import User from "../../objects/user";

// sign up a user
router.post("/signup", async (req, res) => {
    const displayName = req.body.displayName;
    const username = req.body.username;
    const password = req.body.password;

    if (!(displayName && username && password)) {
        res.json({
            success: false,
            message: "Insufficient data",
        });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const db = mongoClient.db(userDatabase);
        const collection = db.collection(userCollection);

        const existingUser = await collection.findOne({
            username: username.toLowerCase(),
        });
        if (existingUser) {
            return res.json({
                success: false,
                message: "Username already exists",
            });
        }
        const token = randomBytes(20).toString("hex");
        const userData: User = {
            displayName: displayName,
            username: username,
            hashedPassword: hashedPassword,
            token: token,
            profileB64: "",
            network: [],
            shareables: [],
        };

        const result = await collection.insertOne({ ...userData });

        res.json({
            success: true,
            ...userData,
        });
    } catch (error) {
        console.error("Error adding user", error);
        res.status(500).send("Internal Server Error");
    }
});
