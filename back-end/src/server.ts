import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";

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

    const profileRouter = require("./routes/profile");
    const marketplaceRouter = require("./routes/marketplace");

    function logger(req: Request, res: Response, next: () => void) {
        console.log(req.originalUrl);
        console.log(req.socket.remoteAddress);

        next();
    }

    app.use("/api/profile", profileRouter);
    app.use("/api/markelplace", marketplaceRouter);

    app.get("/*", function (req: Request, res: Response) {
        res.sendFile(path.join(__dirname, "..", "build", "index.html"));
    });

    app.listen(3000);
};

startServer();
