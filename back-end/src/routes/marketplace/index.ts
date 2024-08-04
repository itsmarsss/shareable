import express from "express";

export const router = express.Router();

// router.use(authorization);

router.get("/", async (req, res) => {
    res.status(200).send("<html>ok</html>");
});

module.exports = router;
