import express from "express";
import { authorization } from "../../authorization";
import { mongoClient } from "../../api/mongodb";
import { shareableCollection, shareableDatabase } from "../../dotenv";
import Shareable from "../../objects/shareable";

export const router = express.Router();

import "./getFeed";
import "./upload";
import "./process-item-tag";
import "./take";

router.use(authorization);

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            res.json({
                success: false,
                message: "Insufficient data",
            });
            return;
        }

        const db = mongoClient.db(shareableDatabase);
        const collection = db.collection(shareableCollection);

        const shareableItem: Shareable | null = (await collection.findOne({
            id: id,
        })) as Shareable | null;
        if (!shareableItem) {
            return res.json({
                success: false,
                message: "Shareable item does not exist",
            });
        }

        res.json({
            success: true,
            shareableItem: shareableItem,
        });
    } catch (error) {
        console.error("Error querying shareable item:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
