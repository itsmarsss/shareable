import { router } from "./index";
import { mongoClient } from "../../api/mongodb";
import { userCollection, userDatabase } from "../../dotenv";

router.put("/edit", async (req, res) => {
    /*
    try{
        const user = req.body.username;
        const displayName = req.body.displayName;
        const profileUrl = req.body.profileUrl;
        // do hashed password afterwards

        if(!(user && displayName)){ // and password
            res.json({
                success: false,
                message: "Insufficent data",
            });
            return;
        }    
    }
    
    try{
        const db = mongoClient.db(userDatabase);
        const collection = db.collection(userCollection);

        const existingUser = await collection.findOne({
            
        })
    }*/
});
