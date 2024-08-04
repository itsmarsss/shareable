import { router } from "./index";
import { mongoClient } from "../../api/mongodb";
import { userCollection, userDatabase } from "../../dotenv";
import * as bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import User from "../../objects/user";

// sign in a user
router.post("/signin", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (!(username && password)) {
            res.json({
                success: false,
                message: "Insufficient data",
            });
            return;
        }

        const db = mongoClient.db(userDatabase);
        const collection = db.collection(userCollection);

        const existingUser: User | null = (await collection.findOne({
            username: username,
        })) as User | null;

        if (!existingUser) {
            return res.json({
                success: false,
                message: "User does not exist",
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            existingUser.hashedPassword
        );
        if (!passwordMatch) {
            return res.json({
                success: false,
                message: "Incorrect username or password",
            });
        }

        const token = randomBytes(20).toString("hex");

        const token_data = {
            token: token,
        };

        const result = await collection.updateOne(
            { username: username },
            { $set: token_data }
        );

        res.json({
            success: true,
            user: existingUser,
            token,
        });
    } catch (error) {
        console.error("Error signing in", error);
        res.status(500).send("Internal Server Error");
    }
});
