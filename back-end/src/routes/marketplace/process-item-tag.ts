import { router } from "./index";

router.post("/process-item-tag", async (req, res) => {

    const image = req.body.image;

    try{
        const spawn = require("child_process").spawn;
        const pythonProcess = spawn('python3',["src/scripts/imageToText.py", image]);

        let result;

        pythonProcess.stdout.on('data', (data: any) => {
            result = JSON.parse(data);
        });

        pythonProcess.stderr.on("data", (data: any) => {
            console.error(`[python3] Error occured: ${data}`);
        });

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
