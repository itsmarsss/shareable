import { exec } from "child_process";
import os from "os";

const platform = os.platform();

const command = platform === "win32" ? "npm run copy-win" : "npm run copy-mac";

exec(command, (err, stdout, stderr) => {
    if (err) {
        console.error(`Error: ${stderr}`);
        process.exit(1);
    } else {
        console.log(stdout);
    }
});
