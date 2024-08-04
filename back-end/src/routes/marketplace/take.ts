import { router } from "./index";
import { mongoClient } from "../../api/mongodb";
import {
    shareableCollection,
    shareableDatabase,
    userCollection,
    userDatabase,
} from "../../dotenv";
import User from "../../objects/user";
import Shareable from "../../objects/shareable";

router.get("/take/:id", async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            res.json({
                success: false,
                message: "Insufficient data",
            });
            return;
        }

        const shareableDb = mongoClient.db(shareableDatabase);
        const shareableCol = shareableDb.collection(shareableCollection);

        const shareableItem: Shareable | null = (await shareableCol.findOne({
            id: id,
        })) as Shareable | null;
        if (!shareableItem) {
            return res.json({
                success: false,
                message: "Shareable item does not exist",
            });
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

        const userDb = mongoClient.db(userDatabase);
        const userCol = userDb.collection(userCollection);

        const existingUser: User | null = (await userCol.findOne({
            token: token,
        })) as User | null;

        if (!existingUser) {
            return res.json({
                success: false,
                message: "User does not exist",
            });
        }

        const sourceUserNetwork = existingUser.network || [];
        if (!sourceUserNetwork.includes(shareableItem.ownerUsername)) {
            return res.json({
                success: false,
                message: "Source user is not in the destination user's network",
            });
        }

        const shareableItemShareHolder = shareableItem.shareHolders || [];
        if (shareableItem.shareCount >= shareableItemShareHolder.length) {
            return res.json({
                success: false,
                message:
                    "Shareable item has reached the maximum number of share holders",
            });
        }

        const shareHolders = shareableItem.shareHolders || [];
        shareHolders.push(existingUser.username);

        const result = await shareableCol.updateOne(
            { id: id },
            { $set: { shareHolders: shareHolders } }
        );

        return res.json({
            success: false,
            message: "Successfully became a share holder",
        });
    } catch (error) {
        console.error("Error querying shareable item:", error);
        res.status(500).send("Internal Server Error");
    }
});
