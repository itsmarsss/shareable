import dotenv from "dotenv";

dotenv.config();

export const MONGO_URI = process.env.MONGO_URI || "";
export const PORT = process.env.PORT || 3000;

export const USER_DATABASE = process.env.USER_DATABASE || "";
export const USER_COLLECTION = process.env.USER_COLLECTION || "";
