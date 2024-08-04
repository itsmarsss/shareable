import { router } from "./";
import { mongoClient } from "../../api/mongodb";
import { userCollection, userDatabase } from "../../dotenv";

// sign in a user
router.post("/signin", async (req, res) => {
    const username = req.body.username;
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
            username: username,
            password: password,
        });
        if (!existingUser) {
            return res.json({
                success: false,
                message: "Incorrect username or password",
            });
        }
        res.json({
            success: true,
            token: existingUser.token,
        });
    } catch (error) {
        console.error("Error signing in", error);
        res.status(500).send("Internal Server Error");
    }
});
