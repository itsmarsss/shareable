import dotenv from "dotenv";

dotenv.config();

export const MONGO_URI = process.env.MONGO_URI || "";
export const PORT = process.env.PORT || 3000;

export const userDatabase = process.env.USER_DATABASE || "";
export const userCollection = process.env.USER_COLLECTION || "";
