import express from "express";

export const router = express.Router();

import "./signin";

// router.use(authorization);

router.get("/", async (req, res) => {
    res.status(200).send("ok");
});

module.exports = router;
