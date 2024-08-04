import express from "express";
import { authorization } from "../../authorization";

export const router = express.Router();

import "./edit";
import "./signin";
import "./signout";
import "./signup";
import { mongoClient } from "../../api/mongodb";
import { userCollection, userDatabase } from "../../dotenv";

router.use(authorization);

router.get("/", async (req, res) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        res.json({
            success: false,
            message: "Insufficient data",
        });
        return;
    }

    const userToken = authHeader.split(" ")[1];

    if (!userToken) {
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
            token: userToken,
        });
        if (!existingUser) {
            return res.json({
                success: false,
                message: "User does not exist",
            });
        }

        const { network, hashedPassword, token, ...sanitizedUser } =
            existingUser;

        res.json({
            success: true,
            ...sanitizedUser,
        });
    } catch (error) {
        console.error("Error querying user:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/:username", async (req, res) => {
    const username = req.params.username;

    if (!username) {
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
        });
        if (!existingUser) {
            return res.json({
                success: false,
                message: "User does not exist",
            });
        }

        const { network, hashedPassword, token, ...sanitizedUser } =
            existingUser;

        res.json({
            success: true,
            ...sanitizedUser,
        });
    } catch (error) {
        console.error("Error querying user:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
