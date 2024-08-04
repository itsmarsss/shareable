import express from "express";
import { authorization } from "../../authorization";

export const router = express.Router();

import "./add";
import "./message";
import "./remove";
import "./search";

router.use(authorization);

router.get("/", async (req, res) => {
    res.status(200).send("ok");
});

module.exports = router;
