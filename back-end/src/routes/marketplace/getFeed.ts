import { mongoClient } from "../../api/mongodb";
import {
    shareableCollection,
    shareableDatabase,
    userCollection,
    userDatabase,
} from "../../dotenv";
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

        existingUser.network.map((user) => {
            console.log(user);
        });

        const shareableDb = mongoClient.db(shareableDatabase);
        const shareableCol = shareableDb.collection(shareableCollection);
    } catch (error) {
        console.error("Error getting feed", error);
        res.status(500).send("Internal Server Error");
    }
});
