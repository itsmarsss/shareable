import { mongoClient } from "../../api/mongodb";
import { userCollection, userDatabase } from "../../dotenv";
import User from "../../objects/user";
import { router } from "./index";

router.post("/add/:username", async (req, res) => {
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
                message: "Cannot add yourself",
            });
        }

        const sourceNetwork = sourceUser.network || [];
        if (sourceNetwork.includes(username)) {
            return res.json({
                success: false,
                message: "Already in your network",
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

        const sourcePending = sourceUser.pending || [];

        if (sourcePending.includes(username)) {
            const destinationIndex = sourcePending.indexOf(username);
            sourcePending.splice(destinationIndex, 1);

            sourceNetwork.push(username);

            const sourceResult = await collection.updateOne(
                { token: token },
                { $set: { pending: sourcePending, network: sourceNetwork } }
            );

            const destinationNetwork = destinationUser.network || [];
            destinationNetwork.push(sourceUser.username);

            const destinationresult = await collection.updateOne(
                { username: username },
                { $set: { network: destinationNetwork } }
            );

            return res.json({
                success: true,
                message: "Friend added",
            });
        }

        const pending_data = destinationUser.pending || [];
        pending_data.push(sourceUser.username);

        const result = await collection.updateOne(
            { username: username },
            { $set: { pending: pending_data } }
        );

        return res.json({
            success: true,
            message: "Friend request pending",
        });
    } catch (error) {
        console.error("Error querying user:", error);
        res.status(500).send("Internal Server Error");
    }
});
