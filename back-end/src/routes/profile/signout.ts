import { router } from "./index";
import { mongoClient } from "../../api/mongodb";
import { userCollection, userDatabase } from "../../dotenv";

router.post("/signout", async (req, res) => {
    
    const token = req.body.token;

    try{
        const db = mongoClient.db(userDatabase);
        const collection = db.collection(userCollection);

        const result = await collection.updateOne(
            { token: token },
            { token: "" }
        );

        res.json({
            success: true,
            message: "You have logged out"
        });

    }catch (error) {
        console.error("Error signing user out:", error);
        res.status(500).send("Internal Server Error");
    }

});
