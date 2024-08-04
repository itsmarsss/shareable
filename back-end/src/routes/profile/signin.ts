import { router } from "./";
import { mongoClient } from "../../api/mongodb";

const userDatabase = "Shareable";
const userCollection = "Users";

// sign up a user
router.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log("MAN.");

    if(!(username && password)){
        res.json({
            success: false,
            message: "Insufficient data",
        });
        return;
    }

    try{
        const db = mongoClient.db(userDatabase);
        const collection = db.collection(userCollection);

        const existingUser = await collection.findOne({
            username: username,//.toLowerCase(),
            password: password,
        });
        if(!existingUser){
            return res.json({
                success: false,
                message: "Incorrect username"
            });
        }
        res.json({
            success: true,
            token: existingUser.token,
        });
    } catch (error)
    {
        console.error("Error signing in", error);
        res.status(500).send("Internal Server Error");
    }
});