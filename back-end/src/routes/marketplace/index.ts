import express from "express";
import { authorization } from "../../authorization";

export const router = express.Router();

router.use(authorization);

router.get("/", async (req, res) => {
    res.status(200).send("<html>ok</html>");
});

module.exports = router;
