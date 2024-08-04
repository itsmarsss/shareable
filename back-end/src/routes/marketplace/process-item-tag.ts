import { router } from "./index";
const { executePython } = require("../pythonExecutor");

router.post("/upload", async (req, res) => {

    const image = req.body.image;

    try{
        const result = await executePython("./scripts/imageToText.py", [image])
        console.log(result);
        res.json({
            success: true,
            result
        })
    } catch (error){
        console.error("Error processing image", error);
        res.status(500).send("Internal Server Error");
    }

});
