import { router } from "./index";
import { mongoClient } from "../../api/mongodb";
import { userCollection, userDatabase } from "../../dotenv";

router.put("/edit", async (req, res) => {
    try {
        const displayName = req.body.displayName;
        const username = req.body.username;
        const password = req.body.password;
        const profileB64 = req.body.profileB64;

        if (!(displayName && username && password)) {
            // and password
            res.json({
                success: false,
                message: "Insufficent data",
            });
            return;
        }

        const db = mongoClient.db(userDatabase);
        const collection = db.collection(userCollection);

        const existingUser = await collection.findOne({});
    } catch (error) {
        console.error("Error editing user:", error);
        res.status(500).send("Internal Server Error");
    }
});
