const express = require("express");

require("dotenv").config();

const router = express.Router();

// router.use(authorization);

router.get("/", async (req, res) => {
    res.status(200).send("ok");
});

module.exports = router;
