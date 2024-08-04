import { mongoClient } from "../../api/mongodb";
import { userCollection, userDatabase } from "../../dotenv";
import User from "../../objects/user";
import { router } from "./index";

router.post("/remove/:username", async (req, res) => {
    try {
        const username = req.params.username;

        if (!username) {
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

        const sourceUser: User | null = (await collection.findOne({
            token: token,
        })) as User | null;
        if (!sourceUser) {
            return res.json({
                success: false,
                message: "User does not exist",
            });
        }

        if (username === sourceUser.username) {
            return res.json({
                success: false,
                message: "Cannot remove yourself",
            });
        }

        const sourceNetwork = sourceUser.network || [];
        if (!sourceNetwork.includes(username)) {
            return res.json({
                success: false,
                message: "User not in your network",
            });
        }

        const destinationUser: User | null = (await collection.findOne({
            username: username,
        })) as User | null;
        if (!destinationUser) {
            return res.json({
                success: false,
                message: "User does not exist",
            });
        }

        const sourceIndex = sourceNetwork.indexOf(username);
        sourceNetwork.splice(sourceIndex, 1);

        const sourceResult = await collection.updateOne(
            { token: token },
            { $set: { network: sourceNetwork } }
        );

        const destinationNetwork = destinationUser.network || [];
        const destinationIndex = destinationNetwork.indexOf(
            sourceUser.username
        );
        destinationNetwork.splice(destinationIndex, 1);

        const destinationresult = await collection.updateOne(
            { username: username },
            { $set: { network: destinationNetwork } }
        );

        return res.json({
            success: true,
            message: "Friend removed",
        });
    } catch (error) {
        console.error("Error querying user:", error);
        res.status(500).send("Internal Server Error");
    }
});
