import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import { PORT } from "./dotenv";
import { initialize } from "./api/mongodb";

const startServer = async () => {
    const app = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(logger);
    app.use(cors());

    app.use(express.static(path.join(__dirname, "..", "build")));

    app.set("view engine", "ejs");

    app.get("/", (req: Request, res: Response) => {
        console.log("Root");
        res.render("index", { name: "User!" });
    });

    function logger(req: Request, res: Response, next: () => void) {
        console.log(req.originalUrl);
        console.log(req.socket.remoteAddress);

        next();
    }

    const profileRouter = require("./routes/profile");
    const marketplaceRouter = require("./routes/marketplace");
    const networkRouter = require("./routes/network");

    app.use("/api/profile", profileRouter);
    app.use("/api/marketplace", marketplaceRouter);
    app.use("/api/network", networkRouter);

    app.get("/*", function (req: Request, res: Response) {
        res.sendFile(path.join(__dirname, "..", "build", "index.html"));
    });

    app.listen(PORT);

    console.log(`Server started on port ${PORT} [http://localhost:${PORT}]`);
    initialize();
};

startServer();
