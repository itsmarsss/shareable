import { router } from "./index";
const executePython = require("./pythonExecutor");

router.post("/process-item-tag", async (req, res) => {

    const image = req.body.fileString;

    try{
        const result = executePython(image)
        .then((output: any) => {
        res.json({
            success: true,
            result: output,
        });
        });
    }catch (error){
        console.error("Error parsing photo", error);
        res.status(500).send("Internal Server Error");
    } 
});


/*
import { router } from "./index";
const executePython = require("./pythonExecutor");

router.post("/process-item-tag", async (req, res) => {

    const image = req.body.fileString;

    try{
        const spawn = require("child_process").spawn;
        //const im = JSON.parse(image);
        const pythonProcess = spawn('python3',["src/scripts/imageToText.py", image]);

        const result = await new Promise((resolve, reject) => {
            
            let output: unknown;
        
            pythonProcess.stdout.on("data", (data: any) => {
                output = JSON.parse(data);
                console.log(output);
            });
        
            pythonProcess.stderr.on("data", (data: any) => {
              console.error(`[python3] Error occured: ${data}`);
              reject(`Error occured`);
            });
        
            // Handle exit
            pythonProcess.on("exit", (code: any) => {
              console.log(`Child process exited with code ${code}`);
              resolve(output);
            });
          });

        res.json({
            success: true,
        })

    }catch (error){
        console.error("Error parsing video", error);
        res.status(500).send("Internal Server Error");
    }

});

*/