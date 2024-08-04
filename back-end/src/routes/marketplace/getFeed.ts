import { mongoClient } from "../../api/mongodb";
import { userCollection, userDatabase } from "../../dotenv";
import User from "../../objects/user";
import { router } from "./index";

router.get("/feed", async (req, res) => {
    try {
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

        let friendShareables: string[] = [];
        const existingUserNetwork = existingUser.network || [];

        const friendPromises = existingUserNetwork.map(async (username) => {
            const friendUser: User | null = (await collection.findOne({
                username,
            })) as User | null;
            if (friendUser) {
                friendShareables = friendShareables.concat(
                    friendUser.shareables || []
                );
            }
        });

        await Promise.all(friendPromises);

        return res.json({
            success: true,
            shareables: friendShareables,
        });
    } catch (error) {
        console.error("Error getting feed", error);
        res.status(500).send("Internal Server Error");
    }
});
