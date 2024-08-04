import { mongoClient } from "../../api/mongodb";
import {
    shareableCollection,
    shareableDatabase,
    userCollection,
    userDatabase,
} from "../../dotenv";
import Shareable from "../../objects/shareable";
import { router } from "./index";

router.post("/upload", async (req, res) => {
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

    const name = req.body.name;
    const description = req.body.description;
    const date = req.body.date;
    const images = req.body.images;
    const price = req.body.price;
    const shareCount = req.body.shareCount;
    const shareHolders = req.body.shareHolders;
    const location = req.body.location;

    if (
        !(
            name &&
            description &&
            date &&
            images &&
            price &&
            shareCount &&
            shareHolders &&
            location
        )
    ) {
        res.json({
            success: false,
            message: "Insufficient data",
        });
        return;
    }

    try {
        const userDb = mongoClient.db(userDatabase);
        const userCol = userDb.collection(userCollection);

        const existingUser = await userCol.findOne({
            token: token,
        });
        if (!existingUser) {
            return res.json({
                success: false,
                message: "User does not exist",
            });
        }

        const shareableDb = mongoClient.db(shareableDatabase);
        const shareableCol = shareableDb.collection(shareableCollection);

        const id =
            Date.now().toString(36) +
            Math.random().toString(36).substring(2, 9);

        const shareableData: Shareable = {
            ownerUsername: existingUser.username,
            id: id,
            name: name,
            description: description,
            date: date,
            images: images,
            price: price,
            shareCount: shareCount,
            shareHolders: shareHolders,
            location: location,
        };

        const result = await shareableCol.insertOne({ ...shareableData });

        res.json({
            success: true,
            ...shareableData,
        });
    } catch (error) {
        console.error("Error adding user", error);
        res.status(500).send("Internal Server Error");
    }
});
