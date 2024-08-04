import { router } from "./index";
import { mongoClient } from "../../api/mongodb";
import { userCollection, userDatabase } from "../../dotenv";
import User from "../../objects/user";

router.get("/search/:query", async (req, res) => {
    try {
        const query = req.params.query;

        if (!query) {
            res.json({
                success: false,
                message: "Insufficient data",
            });
            return;
        }

        const authHeader = req.headers["authorization"];

        if (!authHeader) {
            res.json({
                success: false,
                message: "Insufficient data",
            });
            return;
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            res.json({
                success: false,
                message: "Insufficient data",
            });
            return;
        }

        const db = mongoClient.db(userDatabase);
        const collection = db.collection(userCollection);

        const existingUser: User | null = (await collection.findOne({
            token: token,
        })) as User | null;

        if (!existingUser) {
            return res.json({
                success: false,
                message: "User does not exist",
            });
        }

        const users = await collection.find().toArray();

        const filteredUsers = users
            .filter(
                (user) =>
                    user.username.includes(query) &&
                    user.username !== existingUser.username
            )
            .map((user) => {
                user.friended = user.network.includes(existingUser.username);
                const {
                    pending,
                    network,
                    hashedPassword,
                    token,
                    ...sanitizedUser
                } = user;
                return sanitizedUser;
            });

        res.json({
            success: true,
            users: filteredUsers,
        });
    } catch (error) {
        console.error("Error getting users:", error);
        res.status(500).send("Internal Server Error");
    }
});
