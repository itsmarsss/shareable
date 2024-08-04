import { router } from "./index";
import { mongoClient } from "../../api/mongodb";
import { userCollection, userDatabase } from "../../dotenv";

router.post("/signout", async (req, res) => {
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

    try {
        const db = mongoClient.db(userDatabase);
        const collection = db.collection(userCollection);

        const token_data = {
            token: "",
        };

        const result = await collection.updateOne(
            { token: token },
            { $set: token_data }
        );

        res.json({
            success: true,
            message: "Successfully logged out",
        });
    } catch (error) {
        console.error("Error signing user out:", error);
        res.status(500).send("Internal Server Error");
    }
});
