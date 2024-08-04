
const executePython = async (image: any) => {

    const spawn = require("child_process").spawn;
    //const im = JSON.parse(image);
    const pythonProcess = spawn('python3',["src/scripts/imageToText.py", image]);

    const result = await new Promise((resolve, reject) => {

      let output: unknown;
    
        pythonProcess.stdout.on("data", (data: any) => {
            output = JSON.parse(data);
            console.log(output);
            resolve(output);
        });
        
        pythonProcess.stderr.on("data", (data: any) => {
          console.error(`[python3] Error occured: ${data}`);
          //reject(`Error occured`);
        });
        
        pythonProcess.on("exit", (code: any) => {
          console.log(`Child process exited with code ${code}`);
          //resolve(output);
        });
    });
    return result;
};

module.exports = executePython;