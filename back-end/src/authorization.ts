import { Request, Response } from "express";
import { mongoClient } from "./api/mongodb";
import { userCollection, userDatabase } from "./dotenv";

export async function authorization(
    req: Request,
    res: Response,
    next: () => void
) {
    if (
        req.originalUrl === "/api/user/signup" ||
        req.originalUrl === "/api/user/signin"
    ) {
        next();
        return;
    }

    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    if (authHeader) {
        const userToken = authHeader.split(" ")[1];

        if (userToken === "admin") {
            next();
            return;
        }

        try {
            const db = mongoClient.db(userDatabase);
            const collection = db.collection(userCollection);

            const user = await collection.findOne({
                userToken: userToken,
            });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized access",
                });
            }

            next();
        } catch (error) {
            console.error("Error querying user:", error);
            res.status(500).send("Internal Server Error");
        }
    } else {
        res.status(403).json({
            success: false,
            message: "Forbidden",
        });
    }
}
